import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slide1 from "../assets/img/d8.webp";
import slide2 from "../assets/img/d1.webp";
import slide3 from "../assets/img/kasra-askari-NTGQxXpNnj8-unsplash.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image:slide1,
      title: "Explore Battle Worlds",
      subtitle: "Step into immersive arenas and prove your skill.",
    },
    {
      id: 2,
      image:slide2,
      title: "Adventure Awaits",
      subtitle: "Discover breathtaking indie worlds built by creative devs.",
    },
    {
      id: 3,
      image:slide3,
      title: "Titan Fall.",
      subtitle: "Join millions of players worldwide in epic challenges.",
    },
  ];

  return (
    <div className="w-full mx-auto ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[80vh] bg-cover bg-center  flex flex-col items-center justify-center text-white text-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
