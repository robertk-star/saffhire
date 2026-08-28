export default function StatsSection() {
  const stats = [
    { number: "5+", label: "Years of Success", description: "Giving your business the tools and data it needs to make a more informed hire." },
    { number: "50", label: "States Served", description: "Nationwide background screening support for employers across the United States." },
    { number: "24/7", label: "Portal Access", description: "Access your screening portal anytime, anywhere, with bank-level encrypted security." },
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center ${i < stats.length - 1 ? "lg:border-r border-gray-200" : ""}`}>
              <p className="text-4xl lg:text-5xl font-black mb-2" style={{ fontFamily: "'Montserrat', sans-serif", color: "#22c55e" }}>
                {stat.number}
              </p>
              <p className="font-bold text-gray-900 text-sm mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {stat.label}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed hidden lg:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
