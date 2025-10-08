import { useParams, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import newsData from "../newsData";

export default function NewsDetail() {
  const { id } = useParams();
  let navigate = useNavigate();
  const newsItem = newsData.find((n) => n.id === parseInt(id));

  if (!newsItem) return <p>News not found.</p>;

  return (
    <section className="py-16 bg-gray-50 text-gray-800 font-sans mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-full object-cover rounded-2xl shadow-md mb-8"
        />
        <h2 className="text-3xl font-bold text-[#e32225] mb-2">
          {newsItem.title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{newsItem.date}</p>

        <div className="prose prose-green max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown>{newsItem.desc}</ReactMarkdown>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mt-4 ml-65 text-white bg-[#e32225] hover:bg-[#41a539] rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-200 ease-in-out"
      >
        Back
      </button>
    </section>
  );
}
