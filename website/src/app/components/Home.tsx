import Image from "next/image";

const Home = () => {
  return (
    <div
      className="xs:w-[85%] md:w-[80%] flex xs:mt-40 lg:mt-0 xs:h-auto lg:h-screen xs:flex-col lg:flex-row xs:gap-12 lg:gap-0 lg:justify-between items-center section"
      id="home">
      <div className="flex flex-col lg:justify-end xs:items-center lg:items-start gap-4 xs:w-full lg:w-[45%]">
        <h1 className="text-custom-yellow xs:text-3xl lg:text-5xl font-semibold self-start">
          HUMEKA Organization
        </h1>
        <p className="text-justify">
          HUMEKA&apos;s programs focuses on mental health awareness and creating
          safe spaces for teenagers and young adults in Rwanda, fostering
          resilience and social support. We collaborate with partners to tackle
          root causes like poverty and trauma, aiming to make mental health
          support accessible to all. Our evidence-based approach equips youth
          with skills to manage stress, anxiety, and depression, promoting a
          culture that values well-being.
        </p>
      </div>
      <div className="flex xs:w-full lg:w-[40%] h-80 relative">
        <Image
          src="/homepage.jpg"
          alt="homeImage"
          fill={true}
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Home;
