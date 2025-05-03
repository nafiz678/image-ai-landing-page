import { useEffect, useState } from "react"
import "./imageSlider.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"


export default function ImageSlider() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDeviceSize();
    
    window.addEventListener('resize', checkDeviceSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useEffect(() => {
    const setupScrollTrigger = () => {
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true
      });
      
      lenis.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    // Initialize only after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupScrollTrigger);
    } else {
      setupScrollTrigger();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', setupScrollTrigger);
    };
  }, []);

  const getRadius = () => {
    if (window.innerWidth <= 480) {
      return window.innerWidth * 10; // More extreme radius for very small screens
    } else if (window.innerWidth <= 768) {
      return window.innerWidth * 8; // Larger radius for mobile
    } else if (window.innerWidth <= 900) {
      return window.innerWidth * 7.5; // Original mobile calculation
    } else {
      return window.innerWidth * 2.5; // Original desktop calculation
    }
  }

  useEffect(() => {
    const stickySection = document.querySelector(".steps");
    const stickyHeight = window.innerHeight * (isMobile ? 10 : 7); // Increase scroll distance on mobile
    const cards = document.querySelectorAll(".card");
    const countContainer = document.querySelector(".count-container");

    const totalCards = cards.length;

    // Adjust arc angle based on screen size
    const arcAngle = isMobile ? Math.PI * 0.5 : Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    function PositionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = isMobile ? 1 + totalCards / 6 : 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * (isMobile ? 0.85 : 0.75);

      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center"
        });
      });
    }

    PositionCards(0);

    let currentCardIndex = 0;

    const options = {
      root: null,
      rootMargin: "0% 0%",
      threshold: 0.5,
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {

          const cardIndex = Array.from(cards).indexOf(entry.target);
          currentCardIndex = cardIndex;

          // Adjust counter position based on device size
          const counterStep = isMobile ? 80 : 150;
          const targetY = counterStep - currentCardIndex * counterStep;
          
          gsap.to(countContainer, {
            y: targetY,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
          });
        }
      });
    }, options);

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        PositionCards(self.progress);
      }
    });

    cards.forEach((card) => {
      observer.observe(card);
    });

    // Handle resize and orientation changes
    const handleResize = () => {
      PositionCards(0);
      
      // Force ScrollTrigger to recalculate
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="ImageContainer">
      <section className="steps imageSliderSection">
        <div className={`step-counter ${isMobile ? 'mobile-counter' : ''}`}>
          <div className="counter-title">
            <h1>Create</h1>
          </div>
          <div className="count">
            <div className="count-container">
              <h1>01</h1>
              <h1>02</h1>
              <h1>03</h1>
              <h1>04</h1>
              <h1>05</h1>
              <h1>06</h1>
            </div>
          </div>
        </div>

        <div className="cards">
          {/* card 1 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/2.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Effortlessly enhance your AI-generated vintage car models with our intuitive tool, bringing classic designs to life in no time.</p>
            </div>
          </div>

          {/* card 2 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/1.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Transform real faces into stunning AI-generated sci-fi characters with ease, blending realism and imagination in seconds.</p>
            </div>
          </div>

          {/* card 3 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/3.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Effortlessly enhance and transform your images with powerful AI-driven precision and clarity.</p>
            </div>
          </div>

          {/* card 4 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/4.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Bring your imagination to life by turning ideas into stunning fictional characters and anime-style animations with AI.</p>
            </div>
          </div>

          {/* card 5 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/7.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Let your imagination take form—turn ideas into striking images with the vision of a futuristic robot mind.</p>
            </div>
          </div>

          {/* card 6 */}
          <div className="card">
            <div className="card-img">
              <img className="imageSliderImg w-full h-full object-cover" src="/assets/10.webp" alt="" />
            </div>
            <div className="card-content">
              <p>Create magical Ghibli-style images and explore endless anime genres—no limits, just your imagination and AI.</p>
            </div>
          </div>

          <div className="card empty"></div>
          <div className="card empty"></div>
        </div>
      </section>

      <section className="outro imageSliderSection">
        <p className={isMobile ? 'mobile-outro-text' : ''}>
          Our 3D design is to enhance your creative flow, <span>Providing an all in one solution</span> for crafting stunning visual and prototypes
        </p>
      </section>
    </div>
  )
}