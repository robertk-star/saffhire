# SaffHire TODO

## Footer Updates
- [x] Update Login link in footer to https://saffhire.instascreen.net/sso/login.taz
- [x] Change "Available 24/7" text to "Portal Available 24-7."
- [x] Remove International Screening link from footer services list
- [x] Update "Create Account" link in footer to https://sendlink.co/documents/doc-form/69679c4ebf297f0594403f7a?locale=en-US
- [x] Add Criminal Background Checks page link to footer services
- [x] Add Employment Verification page link to footer services
- [x] Add Drug Screening page link to footer services
- [x] Add MVR page link to footer services
- [x] Update Privacy Policy footer link to /privacy-policy
- [x] Update Terms of Service footer link to /terms-of-service
- [x] Update FCRA Notice footer link to /fcra-news

## New Pages
- [x] Create Criminal Background Checks page (/criminal-background-checks)
- [x] Create Employment Verification page (/employment-verification)
- [x] Create Drug Screening page (/drug-screening)
- [x] Create Motor Vehicle Records (MVR) page (/mvr-checks)
- [x] Create Privacy Policy page (/privacy-policy)
- [x] Create Terms of Service page (/terms-of-service)
- [x] Create FCRA Compliance News page (/fcra-news)

## Routing
- [x] Register all new pages in App.tsx

## Logo Fixes (Previous)
- [x] BenefitsMe logo displaying correctly on Referral Partners page
- [x] GMG Savings logo displaying correctly on Referral Partners page

## Em Dash Removal
- [x] Remove all em dashes (—) from all TSX/component files

## Defense by Design Referral Page
- [x] Research Defense by Design website
- [x] Create /referral-partners/defense-by-design page
- [x] Add to Referral Partners listing page
- [x] Register route in App.tsx

## Drug Screening Page Update
- [x] Remove Common Drug Panel Options section from Drug Screening page

## Education Verification Page
- [x] Create /education-verification page
- [x] Register route in App.tsx
- [x] Link in footer under Our Services

## Sandene Strategies Referral Page
- [x] Research Sandene Strategies website and gather content/logo
- [x] Create /referral-partners/sandene-strategies page
- [x] Add card to Referral Partners listing page
- [x] Register route in App.tsx

## Blog Post #1 Fixes
- [x] Replace featured image (tax photo) with compliance-themed image
- [x] Remove "How SaffHire Automates FCRA Compliance" section from article

## CTA Button Audit
- [x] Ensure all Get a Quote and Contact buttons point to /#contact

## Homepage Stats Section
- [x] Remove "10K+ Screenings Completed" stats section from homepage

## Blog Post: EEOC Guidance and Criminal Records
- [x] Generate featured image for EEOC blog post
- [x] Write blog post content and add to registry
- [x] Add to blog listing page

## Replace Unsplash Images with Original AI-Generated Photos
- [x] Generate replacement for "Why Choose Us" professional woman headshot
- [x] Generate replacement for original FCRA blog post compliance desk photo
- [x] Update all three image URLs in the codebase

## Blog Post: Ban-the-Box Laws by State
- [x] Generate featured image for Ban-the-Box blog post
- [x] Write full article and add to blogRegistry.tsx
- [x] Add card to Blog.tsx listing

## Blog Ordering
- [x] Reverse blog post order so newest appears first

## Meta Pixel Tracking
- [x] Add Meta Pixel code (ID: 510518682962381) to index.html

## Favicon Fix
- [x] Fix SaffHire favicon so it displays in the browser tab

## Blog Post: ROI of Speed - 5-Minute Background Checks
- [x] Generate featured image for ROI of Speed blog post
- [x] Write full article with keywords: fast background checks, employment background check, hiring efficiency
- [x] Add to blogRegistry.tsx and Blog.tsx listing

## Blog Post: How to Choose the Best Background Check Company
- [x] Generate featured image
- [x] Write full article with primary keywords: background check company, background check services for employers
- [x] Secondary keywords: employment verification services, background screening solutions
- [x] Add to blogRegistry.tsx and Blog.tsx listing

## Blog Ordering Fix
- [x] Reorder blogPosts array in Blog.tsx newest to oldest

## Remove Blog Post
- [x] Remove "How to Choose the Best Background Check Company" from Blog.tsx
- [x] Remove "How to Choose the Best Background Check Company" from blogRegistry.tsx

## Blog Post: Why Ongoing Employee Screening Will Change the Way You Manage Long-Term Risk
- [x] Generate featured hero image
- [x] Write full SEO-optimized article (keywords: employee screening services, background screening solutions)
- [x] Add article component and registry entry to blogRegistry.tsx
- [x] Add post card to Blog.tsx listing

## Blog Hero Image Fix
- [x] Fix hero image cropping in BlogPost.tsx so full image displays without top/bottom cutoff

## Blog Post: What the OIG Expects from Healthcare Organizations
- [x] Generate featured hero image
- [x] Write full article matching site blog style
- [x] Add article component and registry entry to blogRegistry.tsx
- [x] Add post card to Blog.tsx listing

## Blog Hero Image Partial Hide Fix
- [x] Fix hero image still partially hidden in BlogPost.tsx

## Em Dash Replacement (Style Rule)
- [x] Replace all em dashes (—) with commas in blogRegistry.tsx (all blog articles)
- [x] Enforce no-em-dash rule for all future blog posts

## SEO Indexing Fixes (Google Search Console)
- [x] Fix server to serve robots.txt as a real static file with text/plain MIME type
- [x] Fix server to serve sitemap.xml as a real static file with application/xml MIME type
- [x] Generate valid XML sitemap with all canonical URLs
- [x] Implement proper HTTP 404 responses for unmatched routes (not soft 404s)
- [x] Add self-referencing canonical <link> tags to all pages via react-helmet-async

## www to non-www 301 Redirect
- [x] Add www.saffhire.com → saffhire.com permanent 301 redirect middleware in Express server

## Missing Routes / Hash Link SEO Fix
- [x] Audit all hash links and nav links across the site
- [x] Create /services page (previously only /#services anchor existed)
- [x] Create /industries page (previously only /#services anchor existed)
- [x] Create /contact page (previously only /#contact anchor existed)
- [x] Create /why-saffhire page (previously only /#why-saffhire anchor existed)
- [x] Register all new routes in App.tsx
- [x] Update sitemap.xml with new routes
- [x] Update server SPA route list in vite.ts

## Soft 404 Fixes (35 URLs from Search Console)
- [x] Add 301 redirects for legacy /services/* paths to /industries/*
- [x] Add 301 redirect for /contact-us → /contact
- [x] Add 301 redirect for /contact-style-1 → /contact
- [x] Add 301 redirect for /create-an-account → external signup URL
- [x] Add proper 404 status for junk paths (/projects/*, /node/*, /index.php/*)
- [x] Test all redirects return HTTP 301 with correct Location header

## Not Found (404) Fixes (14 URLs from Search Console)
- [x] Add 301 redirects for /transportation, /education, /energy, /churches-non-profit → /industries/* pages
- [x] Add 301 redirect for /blog/1 → /blog
- [x] Add 301 redirect for /blog/instant-drug-screening-now-available → /drug-screening
- [x] Add 301 redirect for /partners/dominion-payroll → /referral-partners
- [x] Note: email.mg.saffhire.com is a Mailgun subdomain, cannot be fixed in code (out of scope)

## Alternate Page / Duplicate Canonical Fixes (5 URLs)
- [x] Add HTTP → HTTPS 301 redirect for http://saffhire.com/
- [x] Add 301 redirect for /node/44 → homepage
- [x] Add 301 redirect for /projects?page=* → homepage (query string junk paths)

## Duplicate Without User-Selected Canonical Fixes (5 URLs)
- [x] Strip LinkedIn UTM tracking parameters (?trk=*) and redirect to clean URL
- [x] Add 301 redirect for /partners → /referral-partners
- [x] Add 404 for /rss.xml (RSS feed not implemented)
- [x] Note: /services and /industries already have proper routes, www→non-www redirect handles those

## Crawled Currently Not Indexed Fixes (19 URLs)
- [x] /services already exists (200 OK) — Google chose not to index, likely thin content
- [x] Add 404 for /user/login?destination=* (Drupal login page) — now returns 404
- [x] /index.php/* paths already redirect via existing middleware
- [x] Add 301 for /services/energy → /industries/energy
- [x] /partners already redirects to /referral-partners
- [x] /projects already returns 404
- [x] /node/46, /node/47 now return 404 via /node/* junk prefix rule
- [x] /image-captcha-refresh/* now returns 404 via junk prefix rule
- [x] /rss.xml already returns 404

## Blog Post: Birthdate Redaction
- [x] Extract content and images from PDF
- [x] Upload images to CDN
- [x] Write full article and add to blogRegistry.tsx
- [x] Add post card to Blog.tsx listing

## Remove Birthdate Redaction Blog Post
- [x] Remove "Birthdate Redaction: Why Some States Are Slowing Down Your Background Checks" from Blog.tsx
- [x] Remove BirthdateRedactionBlog component from blogRegistry.tsx

## Blog Post: Birthdate Redaction (New Version)
- [x] Upload provided images to CDN
- [x] Write full article with provided content and internal backlinks
- [x] Add article component and registry entry to blogRegistry.tsx
- [x] Add post card to Blog.tsx listing

## Blog Post: How Long Background Checks Can Go Back (7-Year Rule)
- [x] Write blog post component with full content (no em dashes, internal backlinks)
- [x] Add blog post to blogRegistry.tsx with metadata
- [x] Add blog post card to Blog.tsx listing
- [x] Create checkpoint and update image URLs

## Blog Post: The True Cost of a Bad Hire
- [x] Write blog post component with cost data, scenarios, and SaffHire positioning
- [x] Add blog post to blogRegistry.tsx with metadata
- [x] Add blog post card to Blog.tsx listing
- [x] Generate hero image and update URLs
- [x] Create checkpoint

## Blog Internal Linking Strategy
- [x] Add internal hyperlinks between related blog posts
- [x] FCRA Guidelines should link to: FCRA Checklist, EEOC Guidance, Ban-the-Box
- [x] FCRA Checklist should link to: FCRA Guidelines, EEOC Guidance, 7-Year Rule
- [x] EEOC Guidance should link to: FCRA Guidelines, FCRA Checklist, Ban-the-Box, 7-Year Rule
- [x] Ban-the-Box should link to: FCRA Guidelines, EEOC Guidance, ROI of Speed
- [x] ROI of Speed should link to: Ban-the-Box, Ongoing Screening, True Cost of Bad Hire
- [x] Ongoing Screening should link to: ROI of Speed, OIG Healthcare, True Cost of Bad Hire
- [x] OIG Healthcare should link to: Ongoing Screening, FCRA Compliance
- [x] Birthdate Redaction should link to: FCRA Checklist, 7-Year Rule
- [x] 7-Year Rule should link to: FCRA Checklist, EEOC Guidance, Birthdate Redaction
- [x] True Cost of Bad Hire should link to: ROI of Speed, FCRA Guidelines, Ongoing Screening
- [x] Create checkpoint after adding all internal links

## Blog Post: The Top Industries That Require the Most Screening
- [x] Write blog post component with all 6 industries and screening gaps content
- [x] Add blog post to blogRegistry.tsx with metadata and internal links
- [x] Add blog post card to Blog.tsx listing
- [x] Generate hero image
- [x] Create checkpoint

## Referral Partner Page: Fynn
- [x] Extract and optimize Fynn logo from PDF
- [x] Create Fynn referral partner page component with all details
- [x] Add partner page route to App.tsx and navigation
- [x] Add Fynn to main referral partners listing page
- [x] Create checkpoint

## Fynn Partner Page Form Update
- [x] Update Fynn partner page with Request an Introduction button
- [x] Add working form with facility type field
- [x] Integrate with trpc referral submission
- [x] Create checkpoint

## Referral Partner Page: Staffing for Healthcare
- [x] Extract information and logo from www.staffingforhealthcare.com
- [x] Upload logo to get CDN URL
- [x] Create Staffing for Healthcare referral partner page component with form
- [x] Add partner page route to App.tsx
- [x] Add Staffing for Healthcare to main referral partners listing page
- [x] Create checkpoint

## Referral Partner Page: Level-C Solutions
- [x] Extract information and logo from levelcsolutions.com
- [x] Upload logo to get CDN URL
- [x] Create Level-C Solutions referral partner page component with form
- [x] Add partner page route to App.tsx
- [x] Add Level-C Solutions to main referral partners listing page
- [x] Create checkpoint

## Account Setup Page with AI Intake Form
- [x] Create AccountSetup page component with conversational AI form UI
- [x] Add tRPC procedure for storing intake responses
- [x] Add Claude API placeholder functions for later integration
- [x] Add route to App.tsx
- [x] Create checkpoint

## Signup Chatbot Flow - Comprehensive Credentialing
- [x] Design database schema for storing signup information
- [x] Create server-side tRPC procedures (validation, storage, email, GoHighLevel)
- [x] Build SignupChatbot component with conversational UI
- [x] Add conditional logic for contact and billing address sections
- [x] Implement multi-user collection with admin status
- [x] Add summary review and correction flow
- [x] Set up GoHighLevel API integration
- [x] Configure email notifications to Robert
- [x] Add route to App.tsx
- [x] Test all conditional flows with vitest (13 tests passing)
- [x] Create checkpoint

## Claude API Integration for AI Questionnaire
- [x] Store Claude API key securely as environment variable
- [x] Create Claude API helper functions for generating adaptive questions
- [x] Update signup router to use Claude for dynamic question generation
- [x] Update AccountSetup component to display AI-generated questions
- [x] Test Claude integration and create checkpoint

## Hidden Test Route for Signup Form
- [x] Change AccountSetup route from /account-setup to /test-signup (hidden test URL)
- [ ] Change route back to /account-setup when ready to link from website

## Signup Form UX Redesign - Conversational Flow
- [x] Remove direct error messages from AccountSetup component
- [x] Update Claude integration to ask clarifying questions instead of rejecting responses
- [x] Implement natural conversation flow with follow-up questions
- [x] Update validateResponse to suggest clarifications rather than show errors
- [x] Test conversational flow and save checkpoint

## Google Sheets Real-Time Logging Integration
- [x] Set up Google Cloud project and Sheets API
- [x] Create service account and download JSON credentials
- [x] Create Google Sheet with all intake form columns
- [x] Share Google Sheet with service account email
- [x] Create googleSheets.ts helper module with logIntakeToSheet function
- [x] Integrate Google Sheets logging into submitIntake procedure
- [x] Log every response in real-time as users fill out form
- [x] Track incomplete submissions for follow-up
- [x] Write vitest tests for Google Sheets integration
- [ ] Test end-to-end: submit form and verify data appears in Google Sheet

## Email Notifications to Robert
- [x] Enhance notification to include all filled fields
- [x] Organize notification with section headers (Client Info, Contact Info, etc.)
- [x] Include tracking info (Session ID, Timestamp, GoHighLevel IDs)
- [x] Write vitest tests for notification formatting
- [x] Configure to send to robertk@saffhire.com via Manus Notification system


## Google Sheets Real-Time Logging Fix
- [x] Fix JWT authentication in Google Sheets helper
- [x] Implement real-time logging as each response is answered
- [x] Test Google Sheets integration

## Remove Unnecessary Sections and Duplicate Questions
- [x] Update Claude system prompt to exclude packages, background screening, signatures, dates
- [x] Add deduplication logic to prevent duplicate questions
- [x] Write tests for deduplication and clarification flow
- [x] Verify TypeScript compilation is clean

## Chat Form UX Improvements
- [x] Redesign AccountSetup as pure chat interface
- [x] Remove submit button, implement auto-submit when complete
- [x] Add progress bar for user feedback
- [x] Implement auto-scrolling to latest message
- [x] Auto-focus input field after each question


## Chat Form UX Fixes
- [x] Remove LLC assumption from initial form data
- [x] Fix chat scroll to show question at top instead of bottom


## Real-Time Google Sheets Logging - Fixed
- [x] Log each answer to Google Sheets immediately as user responds
- [x] Update existing row instead of creating new row for each answer
- [x] Generate persistent session ID for entire form session
- [x] Find existing row by session ID and update instead of append
- [x] Test real-time logging with multiple responses

## Question Scroll Fix
- [x] Fix scroll-to-top logic to properly show new questions
- [x] Ensure old messages scroll down as new questions appear

## Completion Message Update
- [x] Update completion/thank-you message to: "Thank you for providing your information! You will be receiving an agreement to review and sign. In the meantime, we will get started on setting up your account."
- [x] Update SYSTEM_PROMPT in claudeQuestionnaire.ts to instruct Claude to use the correct closing message
- [x] Update hardcoded message in AccountSetup.tsx submitForm function
- [x] Update thank-you card shown after submission

## Email Notification Fix
- [x] Fix submitIntake validation: remove required authorizedSignerName/Title so form can complete
- [x] Relax phone/EIN regex validation to allow flexible formats from Claude
- [x] Add real email notification to robertk@saffhire.com via Google Apps Script MailApp on form completion
- [x] Update google-apps-script.js to send email when status=Completed
- [x] Update AccountSetup.tsx to log final Completed status to Google Sheets after submitIntake succeeds


## Blog: Healthcare Worker Screening Article
- [x] Create blog post article component (ScreeningHealthcareWorkers)
- [x] Add blog post metadata to Blog.tsx blogPosts array
- [x] Add blog post registry entry to blogRegistry.tsx
- [x] Verify blog link in navigation (already exists)
- [x] Verify no TypeScript errors


## SEO Improvements (Phase 2)
- [ ] Add meta descriptions to all pages
- [ ] Implement Open Graph tags on all pages
- [ ] Add canonical tags to all pages
- [ ] Add FAQ schema to service pages

## Homepage Location Keywords Update
- [x] Update main H1 headline to include "Frisco, TX"
- [x] Add sentence in About section mentioning Frisco, Texas headquarters and nationwide service
- [x] Update Contact section "Service Area" to "Headquartered in Frisco, TX, Serving Businesses Nationwide"
- [x] Add "Frisco, TX | Serving All 50 States" under SaffHire logo in footer

## Industry Pages Meta Description Updates
- [x] Update /industries/healthcare meta description
- [x] Update /industries/staffing meta description
- [x] Update /industries/transportation meta description
- [x] Update /industries/manufacturing meta description
- [x] Update /industries/hospitality meta description
- [x] Update /industries/energy meta description
- [x] Update /industries/education meta description
- [x] Update /industries/church-nonprofit meta description

## FAQ Page Creation
- [x] Create FAQ page component at /faq with organized Q&A sections
- [x] Add FAQ schema markup (JSON-LD) for Google rich snippets
- [x] Update Navbar to include FAQ link
- [x] Update Footer to include FAQ link in Quick Links
- [x] Test FAQ page rendering and schema validation

## SEO Sitemap and Robots Configuration
- [x] Create XML sitemap at /sitemap.xml with all public pages
- [x] Add robots.txt file at /robots.txt with crawler directives
- [x] Test sitemap and robots.txt accessibility

## 301 Permanent Redirects for Outdated Pages
- [x] Set up 301 redirect /staffing → /industries/staffing
- [x] Set up 301 redirect /healthcare → /industries/healthcare
- [x] Set up 301 redirect /manufacturing-warehousing → /industries/manufacturing
- [x] Set up 301 redirect /services → /criminal-background-checks
- [x] Test all redirects and verify they work correctly

## Referral Partners Page Updates
- [x] Update meta description for /referral-partners page
- [x] Add H1 heading "Refer Clients to SaffHire and Earn" to page

## Internal Linking & SEO Structure
- [ ] Make industry cards on homepage link to their respective industry pages
- [ ] Add "Related Services" sections to all industry pages
- [ ] Add "Industries We Serve" sections to all service pages
- [ ] Add service and industry links throughout blog posts
- [ ] Add FAQ link to main navigation dropdown under "Why SaffHire"
- [ ] Add FAQ link to footer Quick Links section
- [ ] Test all internal links for proper routing

## Internal Linking & SEO Structure
- [x] Add "Related Services" sections to all industry pages (Healthcare, Staffing, Transportation, Manufacturing, Hospitality, Energy, Education, Church/Non-Profit)
- [x] Add "Industries We Serve" sections to service pages (Criminal Background Checks, Drug Screening)
- [x] Verify FAQ links in navbar and footer
- [x] Industry cards on homepage already link to industry pages
- [ ] Add internal service/industry links to blog posts (optional enhancement)


## New Blog Post
- [x] Create blog post: "The FCRA Adverse Action Two-Step: Why One Notice Is Not Enough (And What It's Costing You)"
- [x] URL slug: fcra-adverse-action-two-step-notice-requirements-2026
- [x] Add to blog registry (blogRegistry.tsx)
- [x] Add to shared blog posts list (shared/blog.ts)
- [x] Add to related posts mapping for internal linking
- [x] Blog post automatically routed via BlogPost.tsx component
- [x] Blog post now appears on /blog page listing
- [x] Generate hero image for blog post
- [x] Update blog post with hero image URL
- [x] Create LatestBlogPost component for homepage
- [x] Add LatestBlogPost widget to homepage (positioned between Testimonials and Contact)


## CRITICAL RULES FOR THIS PROJECT

### Blog Post Display Rule
- Newest blog posts ALWAYS appear at the TOP of the /blog page
- This is implemented via .reverse() in Blog.tsx that reverses the array order
- When adding new posts to shared/blog.ts, add them at the END of the array
- They will automatically appear at the top of /blog due to the reverse() function
- NEVER change this behavior without explicit user approval

## Navigation: Replace Services with Industries Dropdown
- [x] Update Navbar component to replace "Services" dropdown with "Industries" dropdown
- [x] Add 8 industry links to dropdown (Healthcare, Staffing, Transportation, Manufacturing, Hospitality, Energy, Education, Churches/Non-Profit)
- [x] Test desktop hover dropdown functionality
- [x] Test mobile collapsible menu functionality
- [x] Verify all industry links route correctly to /industries/{slug} pages
- [x] Create checkpoint with updated navigation

## Blog Post: New FCRA Enforcement Is Coming
- [x] Research current FCRA enforcement trends and FTC actions in 2026
- [x] Write blog post component with practical compliance steps
- [x] Add blog post metadata to blogPosts.ts
- [x] Add blog post registry entry to blogRegistry.tsx
- [x] Generate hero image for blog post
- [x] Update blog post with hero image URL
- [x] Create checkpoint

## Blog Post: Replace FCRA Enforcement with Bad Hire Content
- [x] Replace FCRAEnforcement2026Blog.tsx component with new content about bad hires and client relationships
- [x] Update blog post metadata in blogRegistry.tsx (title, description, category, date, tags)
- [x] Test blog post rendering and verify all content displays correctly
- [x] Generate new hero image showing client relationship tension
- [x] Update blog post hero image URL to new image
- [x] Create checkpoint

## Blog Post: Why Trucking Companies Can't Afford Bad Hiring Decisions
- [x] Create TruckingBadHiringBlog.tsx component with comprehensive article
- [x] Add blog post entry to blogPosts.ts with metadata and slug
- [x] Add blog post entry to blogRegistry.tsx with component reference
- [x] Update blogRegistry.tsx import to include TruckingBadHiringBlog
- [x] Verify blog post appears on /blog listing page
- [x] Verify blog post displays correctly at direct URL
- [x] Generate professional hero image for trucking blog
- [x] Update blog post with new hero image URL
- [x] Fix blog post sorting to display newest posts first
- [x] Generate RSS feed with new blog post included
- [x] Verify trucking blog post appears at top of /blog page
- [x] Verify RSS feed includes new blog post with hero image
- [x] Create checkpoint


## Blog Post: New FCRA Enforcement Is Coming: What Employers Need to Know Before It Costs Them (2026 Compliance Update)
- [x] Create FCRAEnforcement2026UpdateBlog.tsx component with comprehensive article
- [x] Add blog post entry to blogPosts.ts with metadata and slug
- [x] Add blog post entry to blogRegistry.tsx with component reference
- [x] Update blogRegistry.tsx import to include FCRAEnforcement2026UpdateBlog
- [x] Generate professional hero image for FCRA Enforcement blog post
- [x] Update blog post with new hero image URL in both blogPosts.ts and blogRegistry.tsx
- [x] Verify blog post appears at top of /blog listing page
- [x] Verify blog post displays correctly at direct URL with proper formatting
- [x] Generate RSS feed with new blog post included
- [x] Create checkpoint
- [x] Remove FCRA Enforcement 2026 blog post from blogPosts.ts
- [x] Remove FCRAEnforcement2026UpdateBlog import from blogRegistry.tsx
- [x] Remove FCRA Enforcement 2026 blog post entry from blogRegistry.tsx
- [x] Delete FCRAEnforcement2026UpdateBlog.tsx component file
- [x] Regenerate RSS feed without FCRA Enforcement 2026 blog post
- [x] Verify blog post removed from /blog listing page


## Blog Post: Why Warehousing Companies Can't Afford Hiring Mistakes
- [x] Create WarehousingHiringMistakesBlog.tsx component with comprehensive article
- [x] Add blog post entry to blogPosts.ts with metadata and slug
- [x] Add blog post entry to blogRegistry.tsx with component reference
- [x] Update blogRegistry.tsx import to include WarehousingHiringMistakesBlog
- [x] Generate professional hero image for warehousing blog post
- [x] Update blog post with new hero image URL in all files
- [x] Fix PageSEO import (default export instead of named export)
- [x] Verify blog post appears at top of /blog listing page with hero image
- [x] Verify blog post displays correctly at direct URL with proper formatting
- [x] Generate RSS feed with new blog post included (18 total posts)
- [x] Create checkpoint
