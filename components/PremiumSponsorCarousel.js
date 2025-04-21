import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const sponsors = [
  {
    name: "Glamp Luxe Retreats",
    image: "/sponsors/glamp-luxe.png",
    link: "https://example.com"
  },
  {
    name: "Wilderness Escapes",
    image: "/sponsors/wilderness.png",
    link: "https://example.com"
  },
  {
    name: "Airstream Elite",
    image: "/sponsors/airstream.png",
    link: "https://example.com"
  }
];

export default function PremiumSponsorCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) return;
    swiperRef.current = new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: true,
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }, []);

  return (
    <div className="swiper sponsor-carousel">
      <div className="swiper-wrapper">
        {sponsors.map((sponsor, index) => (
          <div className="swiper-slide" key={index}>
            <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
              <img src={sponsor.image} alt={sponsor.name} />
              <p>{sponsor.name}</p>
            </a>
          </div>
        ))}
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
}
