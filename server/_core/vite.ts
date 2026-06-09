import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../", "..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Register API routes BEFORE static file serving so they take priority
  // RSS feed endpoint
  app.get("/rss.xml", async (req, res) => {
    try {
      const { generateRSSFeed } = await import("../../server/rss");
      const rss = generateRSSFeed();
      res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.send(rss);
    } catch (err) {
      console.error("Error generating RSS feed:", err);
      return res.status(500).send("Error generating RSS feed");
    }
  });

  // Sitemap endpoint
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const { blogPosts } = await import("../../shared/blog");
      
      const baseUrl = "https://saffhire.com";
      
      // Static pages
      const staticPages: Array<{ url: string; priority: string; changefreq: string; lastmod?: string }> = [
        { url: "/", priority: "1.0", changefreq: "weekly" },
        { url: "/blog", priority: "0.9", changefreq: "daily" },
        { url: "/services", priority: "0.8", changefreq: "monthly" },
        { url: "/industries", priority: "0.8", changefreq: "monthly" },
        { url: "/why-saffhire", priority: "0.8", changefreq: "monthly" },
        { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
        { url: "/terms-of-service", priority: "0.5", changefreq: "yearly" },
      ];
      
      // Industry pages
      const industryPages: Array<{ url: string; priority: string; changefreq: string; lastmod?: string }> = [
        { url: "/industries/staffing", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/transportation", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/warehousing", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/healthcare", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/financial-services", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/construction", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/retail", priority: "0.7", changefreq: "monthly" },
        { url: "/industries/education", priority: "0.7", changefreq: "monthly" },
      ];
      
      // Blog pages with lastmod dates
      const blogPages = blogPosts.map(post => ({
        url: `/blog/${post.slug}`,
        priority: "0.8",
        changefreq: "monthly",
        lastmod: post.date,
      }));
      
      const allPages = [...staticPages, ...industryPages, ...blogPages];
      
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
      
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(sitemapContent);
    } catch (err) {
      console.error("Error generating sitemap:", err);
      return res.status(500).send("Error generating sitemap");
    }
  });

  // Robots.txt endpoint
  app.get("/robots.txt", (req, res) => {
    const robotsContent = `# SaffHire Background Screening
# https://saffhire.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /test-

# Crawl delay
Crawl-delay: 1

# Sitemaps
Sitemap: https://saffhire.com/sitemap.xml
Sitemap: https://saffhire.com/rss.xml`;
    
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(robotsContent);
  });

  // Serve static files (robots.txt, sitemap.xml, etc.) with correct MIME types
  app.use(
    express.static(distPath, {
      setHeaders(res, filePath) {
        if (filePath.endsWith(".xml")) {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
        } else if (filePath.endsWith(".txt")) {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
        }
      },
    })
  );

  // Known SPA routes: serve index.html with 200
  const spaRoutes = [
    "/",
    "/blog",
    "/blog/:slug",
    "/referral-partners",
    "/referral-partners/:partner",
    "/industries/:industry",
    "/criminal-background-checks",
    "/employment-verification",
    "/education-verification",
    "/drug-screening",
    "/mvr-checks",
    "/privacy-policy",
    "/terms-of-service",
    "/fcra-news",
    "/404",
    "/services",
    "/industries",
    "/contact",
    "/why-saffhire",
  ];

  // Helper to check if a path matches a known SPA route pattern
  function matchesSpaRoute(reqPath: string): boolean {
    const normalized = reqPath.split("?")[0].replace(/\/+$/, "") || "/";
    for (const route of spaRoutes) {
      // Convert route pattern to regex (handle :param segments)
      const pattern = route
        .replace(/:[^/]+/g, "[^/]+")
        .replace(/\//g, "\\/");
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(normalized)) return true;
    }
    return false;
  }

  // SPA fallback: 200 for known routes, 404 for everything else
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (matchesSpaRoute(req.path)) {
      res.status(200).sendFile(indexPath);
    } else {
      // Unknown route: send 404 with the SPA so the React 404 page renders,
      // but Googlebot receives the correct HTTP 404 status code.
      res.status(404).sendFile(indexPath);
    }
  });
}
