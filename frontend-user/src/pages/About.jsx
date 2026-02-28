import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import QualityPromise from "../components/about/QualityPromise";
import Achievements from "../components/about/Achievements";

const About = () => {
  return (
    <div className="bg-gray-100">
      <AboutHero />
      <MissionVision />
      <QualityPromise />
      <Achievements />
    </div>
  );
};

export default About;
