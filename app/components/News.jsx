import { Link } from "react-router";
import newsData from "../newsData";

export default function NewsPage() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#41a539] text-center mb-12">
          Latest News & Updates
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#e32225] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                  <p className="text-gray-700">
                    {item.desc.substring(0, 100)}...
                  </p>
                  <span className="text-[#41a539] font-semibold mt-3 inline-block hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
