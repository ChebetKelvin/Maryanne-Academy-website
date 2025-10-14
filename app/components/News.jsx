import { Link } from "react-router";
import { Helmet } from "react-helmet";
import newsData from "../newsData";

export default function NewsPage() {
  return (
    <section className="bg-gray-50 py-16">
      {/* 🔍 SEO Meta Tags */}
      <Helmet>
        <title>Latest News & Updates | Maryanne Academy</title>
        <meta
          name="description"
          content="Stay updated with the latest news, events, and important announcements from Maryanne Academy — Meru’s leading private school offering holistic education from Pre-Primary to Grade 6."
        />
        <meta
          name="keywords"
          content="Maryanne Academy news, Maryanne Academy Meru, Meru private school updates, Kenya education news, CBC school events"
        />
        <meta name="author" content="Maryanne Academy" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Latest News & Updates | Maryanne Academy"
        />
        <meta
          property="og:description"
          content="Catch up on recent school activities, new programs, and community highlights from Maryanne Academy, Meru."
        />
        <meta
          property="og:image"
          content="https://www.academymaryanne.com/images/news-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://www.academymaryanne.com/news"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Latest News & Events | Maryanne Academy"
        />
        <meta
          name="twitter:description"
          content="Explore the latest school updates, events, and programs from Maryanne Academy, Meru."
        />
        <meta
          name="twitter:image"
          content="https://www.academymaryanne.com/images/news-banner.jpg"
        />
        <meta name="twitter:site" content="@maryanneacademy" />
        <link rel="canonical" href="https://www.academymaryanne.com/news" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: "Latest News & Updates | Maryanne Academy",
            description:
              "Stay updated with the latest school news and announcements from Maryanne Academy, Meru.",
            image: "https://www.academymaryanne.com/images/news-banner.jpg",
            author: { "@type": "Organization", name: "Maryanne Academy" },
            publisher: {
              "@type": "Organization",
              name: "Maryanne Academy",
              logo: {
                "@type": "ImageObject",
                url: "https://www.academymaryanne.com/images/maryanne-logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.academymaryanne.com/news",
            },
          })}
        </script>
      </Helmet>

      {/* 📰 News Section */}
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#41a539] text-center mb-12">
          Latest News & Updates
        </h1>

        {/* 📚 News Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <Link
              to={`/news/${item.id}`}
              key={item.id}
              aria-label={`Read more: ${item.title}`}
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width="400"
                    height="250"
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#e32225] mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                  <p className="text-gray-700 line-clamp-3">
                    {item.desc.substring(0, 100)}...
                  </p>
                  <span className="text-[#41a539] font-semibold mt-3 inline-block hover:underline">
                    Read More →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
