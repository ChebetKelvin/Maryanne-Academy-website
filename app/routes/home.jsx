import HeroSection from "../components/Hero";
import HomePage from "../components/Homepage";
import NewsPage from "../components/News";

export function meta() {
  return [
    { title: "Maryanne Academy" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-gray-100 p-4">
      <HeroSection />
      <HomePage />
      <NewsPage />
    </main>
  );
}
