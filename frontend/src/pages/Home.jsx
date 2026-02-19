import Hero from "../components/home/Hero";
import ServiceProcess from "../components/home/ServiceProcess";
import BikeServices from "../components/home/BikeServices";
import CarServices from "../components/home/CarServices";
import WhyBetter from "../components/home/WhyBetter";

const Home = () => {
  return (
    <>
      <Hero />
      <ServiceProcess />
      <BikeServices />
      <CarServices />
      <WhyBetter />
    </>
  );
};

export default Home;
