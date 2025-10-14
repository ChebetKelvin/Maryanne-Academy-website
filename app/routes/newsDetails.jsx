import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import newsData from "../newsData";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsItem = newsData.find((n) => n.id === parseInt(id));

  if (!newsItem)
    return (
      <section className="py-20 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">News not found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-white bg-[#e32225] hover:bg-[#41a539] rounded-lg font-semibold shadow-md"
        >
          Go Back
        </button>
      </section>
    );

  const pageUrl = `https://www.academymaryanne.com/news/${newsItem.id}`;
  const pageTitle = `${newsItem.title} | Maryanne Academy News`;
  const pageDescription =
    newsItem.desc.substring(0, 160) +
    " - Read the full story from Maryanne Academy, Meru.";
  const imageUrl = `https://www.academymaryanne.com${newsItem.image}`;

  return (
    <section className="py-16 bg-gray-50 text-gray-800 font-sans mt-20">
      {/* 🔍 SEO Metadata */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Maryanne Academy, Meru school news, education Kenya, CBC learning, student activities, school updates"
        />
        <meta name="author" content="Maryanne Academy" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={pageUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: newsItem.title,
            description: pageDescription,
            image: imageUrl,
            datePublished: newsItem.date,
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
              "@id": pageUrl,
            },
          })}
        </script>
      </Helmet>

      {/* 📰 News Detail Content */}
      <div className="max-w-5xl mx-auto px-4">
        <img
          src={newsItem.image}
          alt={`Maryanne Academy - ${newsItem.title}`}
          loading="lazy"
          className="w-full h-auto object-cover rounded-2xl shadow-md mb-8"
        />
        <h1 className="text-3xl font-bold text-[#e32225] mb-2">
          {newsItem.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">{newsItem.date}</p>

        <article className="prose prose-green max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown>{newsItem.desc}</ReactMarkdown>
        </article>

        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-white bg-[#e32225] hover:bg-[#41a539] rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-200"
          >
            ← Back to News
          </button>
        </div>
      </div>
    </section>
  );
}
