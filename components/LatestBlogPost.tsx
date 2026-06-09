import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@shared/blog";

export function LatestBlogPost() {
  // Get the latest blog post (last item in the array since they're in chronological order)
  const latestPost = blogPosts[blogPosts.length - 1];

  if (!latestPost) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={latestPost.image}
              alt={latestPost.title}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="inline-block">
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: "#22c55e", color: "#0f172a" }}
              >
                LATEST ARTICLE
              </span>
            </div>

            <h3
              className="text-3xl lg:text-4xl font-black text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {latestPost.title}
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              {latestPost.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} style={{ color: "#22c55e" }} />
                <span>{latestPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} style={{ color: "#22c55e" }} />
                <span>{latestPost.readTime}</span>
              </div>
              <div className="text-gray-500">
                By {latestPost.author}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link href={`/blog/${latestPost.slug}`}>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:gap-3"
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#0f172a",
                  }}
                >
                  Read Full Article
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
