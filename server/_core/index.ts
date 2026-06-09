import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { generateSitemap } from "../sitemap";
import { generateRSSFeed } from "../rss";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // HTTP → HTTPS + www → non-www permanent redirects
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    const proto = req.headers["x-forwarded-proto"] as string || req.protocol;
    
    // Skip redirects for RSS feed, sitemap, robots.txt, and API routes
    if (req.path === "/rss.xml" || req.path === "/sitemap.xml" || req.path === "/robots.txt" || req.path.startsWith("/api/")) {
      return next();
    }

    // Force HTTPS
    if (proto === "http") {
      const nonWwwHost = host.startsWith("www.") ? host.slice(4) : host;
      return res.redirect(301, `https://${nonWwwHost}${req.originalUrl}`);
    }

    // www → non-www
    if (host.startsWith("www.")) {
      const nonWwwHost = host.slice(4);
      return res.redirect(301, `https://${nonWwwHost}${req.originalUrl}`);
    }

    next();
  });

  // Legacy URL redirects (301) — old WordPress/Drupal paths from previous site
  const legacyRedirects: Record<string, string> = {
    "/services/healthcare": "/industries/healthcare",
    "/services/staffing": "/industries/staffing",
    "/services/transportation": "/industries/transportation",
    "/services/churches-non-profit": "/industries/church-nonprofit",
    "/services/manufacturingwarehousing": "/industries/manufacturing",
    "/services/manufacturing-warehousing": "/industries/manufacturing",
    "/services/education": "/industries/education",
    "/services/hospitality": "/industries/hospitality",
    "/services/energy": "/industries/energy",
    "/contact-us": "/contact",
    "/contact-style-1": "/contact",
    "/create-an-account": "https://sendlink.co/documents/doc-form/69679c4ebf297f0594403f7a?locale=en-US",
    "/index.php/services/healthcare": "/industries/healthcare",
    "/index.php/services/staffing": "/industries/staffing",
    "/index.php/services/transportation": "/industries/transportation",
    "/index.php/services/hospitality": "/industries/hospitality",
    "/index.php/services": "/services",
    "/index.php/contact-us": "/contact",
    "/index.php/contact-style-1": "/contact",
    "/index.php/why-saffhire": "/why-saffhire",
    // Legacy industry short-paths (old site used /industry-name directly)
    "/transportation": "/industries/transportation",
    "/education": "/industries/education",
    "/energy": "/industries/energy",
    "/churches-non-profit": "/industries/church-nonprofit",
    "/staffing": "/industries/staffing",
    "/healthcare": "/industries/healthcare",
    "/manufacturing-warehousing": "/industries/manufacturing",
    "/services": "/criminal-background-checks",
    // Legacy blog paths
    "/blog/1": "/blog",
    "/blog/instant-drug-screening-now-available": "/drug-screening",
    // Legacy partner paths
    "/partners/dominion-payroll": "/referral-partners",
    "/partners": "/referral-partners",
  };

  app.use((req, res, next) => {
    const path = req.path.replace(/\/+$/, "") || "/";

    // Strip LinkedIn and other UTM tracking parameters — redirect to clean canonical URL
    const trackingParams = ["trk", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const hasTrackingParam = trackingParams.some(p => req.query[p] !== undefined);
    if (hasTrackingParam) {
      const cleanPath = path === "/" || path === "" ? "/" : path;
      return res.redirect(301, `https://saffhire.com${cleanPath}`);
    }

    // 301 redirect for known legacy paths
    const destination = legacyRedirects[path];
    if (destination) {
      const isExternal = destination.startsWith("http");
      return res.redirect(301, isExternal ? destination : `https://saffhire.com${destination}`);
    }

    // Redirect /projects?page=* query string paths to homepage (must happen before 404 check)
    if (path === "/projects" && req.query.page !== undefined) {
      return res.redirect(301, "https://saffhire.com/");
    }

    // Redirect /node/44 to homepage
    if (path === "/node/44") {
      return res.redirect(301, "https://saffhire.com/");
    }

    // True 404 for junk CMS paths that should never exist on this site
    const junkPrefixes = [
      "/projects/",
      "/node/",
      "/index.php/",
      "/user/",                   // Drupal user login/account paths
      "/image-captcha-refresh/",  // Drupal CAPTCHA endpoints
    ];
    const isJunk = junkPrefixes.some(prefix => path.startsWith(prefix)) ||
      path === "/node" || path.match(/^\/node\/\d+$/) ||
      path === "/projects" ||
      path === "/user";
    if (isJunk) {
      return res.status(404).send("Not Found");
    }

    next();
  });

  // Sitemap route
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://saffhire.com";
    const sitemap = generateSitemap(baseUrl);
    res.type("application/xml").send(sitemap);
  });

  // Robots.txt route
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://saffhire.com/sitemap.xml
`;
    res.type("text/plain").send(robotsTxt);
  });

  // RSS feed route
  app.get("/rss.xml", (req, res) => {
    try {
      const rss = generateRSSFeed();
      res.type("application/rss+xml").send(rss);
    } catch (error) {
      console.error("Error generating RSS feed:", error);
      res.status(500).send("Error generating RSS feed");
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
