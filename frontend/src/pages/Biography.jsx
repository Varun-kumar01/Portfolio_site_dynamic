import BiographyHero from "../components/biography/BiographyHero";
import ProfileSection from "../components/biography/ProfileSection";
import Education from "../components/biography/Education";
import PoliticalTimeline from "../components/biography/PoliticalTimeline";
import LeadershipRoles from "../components/biography/LeadershipRoles";
import Awards from "../components/biography/Awards";
import GalleryStrip from "../components/biography/GalleryStrip";

export default function Biography() {
  return (
    <>
      <BiographyHero />
      <ProfileSection />
      <Education />
      <PoliticalTimeline />
      <LeadershipRoles />
      <Awards />
      <GalleryStrip />
    </>
  );
}