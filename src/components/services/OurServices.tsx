import { useEffect } from "react";
import "./services.css";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function OurServices() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const services = gsap.utils.toArray<HTMLElement>(".service");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const service = entry.target as HTMLElement;
            const imgContainer = service.querySelector(".img");

            if (!imgContainer) return;

            ScrollTrigger.create({
              trigger: service,
              start: "bottom bottom",
              end: "top top",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                const newWidth = 30 + 70 * progress;
                gsap.set(imgContainer, {
                  width: `${newWidth}%`,
                });
              }
            });

            ScrollTrigger.create({
              trigger: service,
              start: "top bottom",
              end: "top top",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                const newHeight = 150 + 300 * progress;
                gsap.set(service, {
                  height: `${newHeight}px`,
                });
              }
            });

            obs.unobserve(service);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    services.forEach((service) => observer.observe(service));

    return () => {
      gsap.ticker.remove(tickerCallback); // ✅ correct way to remove it
      observer.disconnect();
    };
  }, []);


  const servicesData = [
    {
      title: "Digital Marketing",
      desc: "We drive targeted traffic through SEO, PPC, and social media strategies.",
      img: "https://www.radissonbd.com/frontend/assets/images/Digital-Marketing.jpg",
    },
    {
      title: "Frontend Development",
      desc: "We create responsive, beautiful, and interactive web UIs.",
      img: "https://www.radissonbd.com/frontend/assets/images/Digital-Marketing.jpg",
    },
    {
      title: "Backend Solutions",
      desc: "Secure, scalable backend APIs tailored for your application.",
      img: "https://www.radissonbd.com/frontend/assets/images/Digital-Marketing.jpg",
    },
    {
      title: "UI/UX Design",
      desc: "User-centered designs that increase engagement and usability.",
      img: "https://www.radissonbd.com/frontend/assets/images/Digital-Marketing.jpg",
    },
    {
      title: "Content Creation",
      desc: "Creative content that aligns with your brand and speaks to your audience.",
      img: "https://www.radissonbd.com/frontend/assets/images/Digital-Marketing.jpg",
    },
  ];

  return (
    <div className="bg-[#000] text-white">
      <div className="ServicesContainer">
        <section className="hero"></section>

        <section className="services">
          <div className="services-header">
            <div className="col"></div>
            <div className="col">
              <h1 className="serviceH1">All Services</h1>
            </div>
          </div>

          {servicesData.map((service, index) => (
            <div className="service" key={index}>
              <div className="service-info">
                <h1 className="serviceH1">{service.title}</h1>
                <p className="serviceP">{service.desc}</p>
              </div>
              <div className="service-img">
                <div className="img">
                  <img className="servicesImg" src={service.img} alt={service.title} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="footer"></section>
      </div>
    </div>
  );
}
