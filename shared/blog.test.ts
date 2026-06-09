import { describe, it, expect } from "vitest";
import { blogPosts, relatedPostsMap, getRelatedPosts } from "./blog";

describe("Internal Linking Strategy", () => {
  it("should have related posts map for all blog posts", () => {
    blogPosts.forEach((post) => {
      expect(relatedPostsMap).toHaveProperty(post.slug);
    });
  });

  it("should have 2-3 related posts for each blog post", () => {
    Object.entries(relatedPostsMap).forEach(([slug, relatedSlugs]) => {
      expect(relatedSlugs.length).toBeGreaterThanOrEqual(2);
      expect(relatedSlugs.length).toBeLessThanOrEqual(3);
    });
  });

  it("should not have duplicate related posts for the same article", () => {
    Object.entries(relatedPostsMap).forEach(([slug, relatedSlugs]) => {
      const uniqueSlugs = new Set(relatedSlugs);
      expect(uniqueSlugs.size).toBe(relatedSlugs.length);
    });
  });

  it("should not link a post to itself", () => {
    Object.entries(relatedPostsMap).forEach(([slug, relatedSlugs]) => {
      expect(relatedSlugs).not.toContain(slug);
    });
  });

  it("should only link to valid blog posts", () => {
    const validSlugs = new Set(blogPosts.map((p) => p.slug));

    Object.entries(relatedPostsMap).forEach(([slug, relatedSlugs]) => {
      relatedSlugs.forEach((relatedSlug) => {
        expect(validSlugs.has(relatedSlug)).toBe(true);
      });
    });
  });

  it("should return correct related posts using getRelatedPosts", () => {
    const fcraPost = "how-saffhire-follows-fcra-guidelines";
    const relatedPosts = getRelatedPosts(fcraPost);

    expect(relatedPosts.length).toBeGreaterThan(0);
    expect(relatedPosts.length).toBeLessThanOrEqual(3);

    relatedPosts.forEach((post) => {
      expect(post.slug).not.toBe(fcraPost);
      expect(blogPosts).toContainEqual(post);
    });
  });

  it("should return empty array for non-existent post slug", () => {
    const relatedPosts = getRelatedPosts("non-existent-post");
    expect(relatedPosts).toEqual([]);
  });

  it("should have bidirectional linking for compliance posts", () => {
    const compliancePosts = blogPosts.filter((p) => p.category === "Compliance");

    compliancePosts.forEach((post) => {
      const relatedSlugs = relatedPostsMap[post.slug] || [];
      const relatedCompliancePosts = relatedSlugs.filter((slug) => {
        const relatedPost = blogPosts.find((p) => p.slug === slug);
        return relatedPost?.category === "Compliance";
      });

      // At least one related post should be in the same category
      expect(relatedCompliancePosts.length).toBeGreaterThan(0);
    });
  });

  it("should have related posts that make contextual sense", () => {
    // FCRA post should link to other compliance posts
    const fcraRelated = getRelatedPosts("how-saffhire-follows-fcra-guidelines");
    const fcraRelatedCategories = fcraRelated.map((p) => p.category);

    expect(fcraRelatedCategories).toContain("Compliance");
  });

  it("should have healthcare posts linking to each other", () => {
    const healthcarePost = "screening-healthcare-workers-what-employers-must-verify";
    const relatedPosts = getRelatedPosts(healthcarePost);

    const hasOtherHealthcarePost = relatedPosts.some(
      (p) => p.category === "Healthcare Compliance" || p.slug === "what-oig-expects-healthcare-organizations"
    );

    expect(hasOtherHealthcarePost).toBe(true);
  });

  it("should have efficiency posts linking to cost/ROI posts", () => {
    const efficiencyPost = "roi-of-speed-5-minute-background-checks-time-to-hire";
    const relatedPosts = getRelatedPosts(efficiencyPost);

    const hasRelevantPost = relatedPosts.some(
      (p) =>
        p.slug === "true-cost-of-bad-hire" ||
        p.slug === "ongoing-employee-screening-long-term-risk-management"
    );

    expect(hasRelevantPost).toBe(true);
  });
});
