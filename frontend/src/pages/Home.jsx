import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import AboutPreview from "../components/home/AboutPreview";
import JourneyPreview from "../components/home/JourneyPreview";
import PoliticalPreview from "../components/home/PoliticalPreview";
import Vision from "../components/home/Vision";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="py-8">
        <Stats />
      </div>

      <div className="py-8">
        <AboutPreview />
      </div>

      <div className="py-8">
        <JourneyPreview />
      </div>

      <div className="py-8">
        <PoliticalPreview />
      </div>

      <div className="py-8">
        <Vision />
      </div>

      
    </>
  );
}