import HeroSection from "../components/Hero";
import HomePage from "../components/Homepage";
import NewsPage from "../components/News";

// ================================
// 🧠 SEO Metadata for Maryanne Academy
// ================================
export function meta() {
  return [
    {
      title:
        "Maryanne Academy | Nurturing Excellence from Early Years to Primary",
    },
    {
      name: "description",
      content:
        "Maryanne Academy is a top private school in Meru offering quality CBC-based education, nurturing discipline, creativity, and strong moral values from Pre-Primary to Grade 6.",
    },
    {
      name: "keywords",
      content:
        "Maryanne Academy, academy Maryanne, private school Meru, primary school Kenya, CBC school Meru, Maryanne Meru, Pre-Primary, Grade 1 to Grade 6, best school in Meru",
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Maryanne Academy" },
    { name: "theme-color", content: "#e32225" },

    // 🌐 Open Graph Tags (for social sharing)
    {
      property: "og:title",
      content: "Maryanne Academy | Quality Education in Meru",
    },
    {
      property: "og:description",
      content:
        "Discover Maryanne Academy — Meru’s trusted school for Pre-Primary and Primary learners, where academic excellence meets strong Christian values.",
    },
    {
      property: "og:image",
      content: "https://www.academymaryanne.com/images/maryanne-cover.jpg",
    },
    { property: "og:url", content: "https://www.academymaryanne.com/" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_KE" },

    // 🐦 Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Maryanne Academy | Quality Education in Meru",
    },
    {
      name: "twitter:description",
      content:
        "Empowering young learners through quality education, care, and creativity — Maryanne Academy, Meru.",
    },
    {
      name: "twitter:image",
      content: "https://www.academymaryanne.com/images/maryanne-cover.jpg",
    },

    // 📄 Canonical Link
    {
      rel: "canonical",
      href: "https://www.academymaryanne.com/",
    },
  ];
}

// ================================
// 🏫 Home Page Component
// ================================
export default function Home() {
  return (
    <main className="bg-gray-100">
      <HeroSection />
      <HomePage />
      <NewsPage />
    </main>
  );
}
