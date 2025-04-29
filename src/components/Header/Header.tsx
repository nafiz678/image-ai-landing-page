/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import "./header.css"
// import "./header-image.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useLocoScroll from "@/hooks/useLocoScroll";
import grained from "../../lib/gained"; // Adjust the path to where you placed grained.js
import Banner from "../Banner/Banner";


gsap.registerPlugin(ScrollTrigger)

const Header = () => {
    const [start, setStart] = useState(false);

    useGSAP(() => {

        const loaderAnimation = () => {
            const tl = gsap.timeline();

            tl.from("#ig6", { scale: 0, duration: 1 }, "a")
                .from("#ig3", { scale: 0, delay: 0.2, duration: 1 }, "a")
                .from("#ig4", { scale: 0, delay: 0.4, duration: 1 }, "a")
                .from("#ig5", { delay: 0.6, scale: 0, duration: 1 }, "a")
                .from("#ig7", { delay: 0.8, scale: 0, duration: 1 }, "a")
                .from("#ig2", { scale: 0, delay: 1.0, duration: 1 }, "a")
                .from("#ig1", { scale: 0, delay: 1.2, duration: 1 }, "a")
                .from("#ig8", { scale: 0, delay: 1.6, duration: 1 }, "a")
                .from("#ig9", { scale: 0, delay: 0.8, duration: 1 }, "a")

            return tl;
        };

        // Page One Animation: triggered by scroll
        const pageOneAnimation = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#page1",
                    start: "top top",
                    end: "bottom -50%",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                },
            });

            tl.to("#ig1", {
                x: "130%",
                y: "200%",
                delay: 0,
            }, "a")
            .to("#ig2", {
                x: "-90%",
                y: "228%",
                delay: 0.14,
            }, "a")
            .to("#ig3", {
                x: "-70%",
                y: "-140%",
                delay: 0.29,
            }, "a")
            .to("#ig4", {
                x: "140%",
                y: "-150%",
                delay: 0.07,
            }, "a")
            .to("#ig5", {
                x: "120%",
                y: "155%",
                delay: 0.35,
            }, "a")
            .to("#ig6", {
                x: "150%",
                y: "-190%",
                delay: 0.21,
            }, "a")
            .to("#ig7", {
                x: "-80%",
                y: "-180%",
                delay: 0.42,
            }, "a")
            .to("#ig8", {
                x: "80%",
                y: "-180%",
                delay: 0.18,
            }, "a")
            .to("#ig9", {
                x: "-80%",
                y: "-180%",
                delay: 0.25,
            }, "a")
            .to("#page1 h4", {
                opacity: 0,
                delay: 0.5,
            }, "a")

            return tl;
        };

        // Play only loader animation immediately
        const loader = loaderAnimation();

        // Set up scroll animation separately
        pageOneAnimation();

        ScrollTrigger.create({
            animation: gsap.fromTo(".logo",
                // Starting state
                {
                    y: "50vh",
                    scale: 6,
                    yPercent: -50,
                },
                // Ending state
                {
                    y: 0,
                    scale: 1,
                    yPercent: 0,
                }
            ),
            scrub: true,
            trigger: ".content",
            start: "top bottom", // Triggers when top of content enters bottom of viewport
            end: "top top",      // Ends when top of content reaches top of viewport
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            loader.kill();
        };
    }, [])


    useLocoScroll(start);

    useEffect(() => {
        setStart(true); // start locoScroll after mount
    }, []);

    useEffect(() => {
        const bannerSectionOptions = {
          animate: true,
          patternWidth: 100,
          patternHeight: 500,
          grainOpacity: 0.09,
          grainDensity: 1,
          grainWidth: 0.8,
          grainHeight: 0.8,
        };
    
        // Call grained directly with the element ID or DOM element
        grained("#grain-container", bannerSectionOptions);
        // grained(".nav", bannerSectionOptions);
        grained("#imageContentGrain", bannerSectionOptions);
    
        // Optional: Cleanup (remove injected styles if needed)
        return () => {
          const animationStyle = document.getElementById("grained-animation");
          const customStyle = document.getElementById("grained-animation-grain-container");
          if (animationStyle) {animationStyle.remove();}
          if (customStyle) {customStyle.remove();}
        };
      }, []);

    return (
        <section id="grain-container" className="bg-[#000]">
            <div className="nav">
                <div className="item-left">
                    <a href="#">chats</a>
                    <a href="#">playground</a>
                </div>
                <div className="item-right">
                    <a href="https://nikolaire.com" target="_blank">visit us</a>
                    <a href="#">contact</a>
                </div>
            </div>
            <div id="heading" className="logo-container">
                <h1 id="pixn" className="logo px-[1em] pb-[1em] pt-[0.85em] text-white drop-shadow-[0_0_2px_rgba(255,255,255,1)] ">
                    PIXN
                </h1>

                <div id="page1">
                    <img id="ig1" src="https://assets.eweek.com/uploads/2024/02/ew_20240227-best-ai-art-generator.png" alt="" />
                    <img id="ig2" src="https://miro.medium.com/v2/resize:fit:1400/1*0m9OPm7DPtCDazvzQke6bA.png" alt="" />
                    <img id="ig3" src="https://mpost.io/wp-content/uploads/image-74-7.jpg" alt="" />
                    <img id="ig4" src="https://images.unsplash.com/photo-1593073862407-a3ce22748763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8fHwxNjc4ODIyODgx&ixlib=rb-4.0.3&q=80&w=2000" alt="" />
                    <img id="ig5" src="https://cdn.prod.website-files.com/659bd9a5498a8bb97b66d895/66423fccb101408240109e2e_Rectangle%20916.webp" alt="" />
                    <img id="ig6" src="https://nyartlife.com/wp-content/uploads/2023/03/Top-7-Amazing-Artworks-Meet-the-AI-Art-Makers-of-the-Future-AI-generated-eyes_face-of-a-woman.jpg" alt="" />
                    <img id="ig7" src="https://miro.medium.com/v2/resize:fit:1400/1*HUGUXdSzVaA0zSM-1zEImA.jpeg" alt="" />
                    <img id="ig8" src="https://cdn.prod.website-files.com/645cec60ffb18d5ebb37da4b/65f2b9d306dad77d174e4ab6_Picture3.jpg" alt="" />
                    <img id="ig9" src="https://media.licdn.com/dms/image/v2/D5612AQFAGCu9L0JijA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1692732486952?e=2147483647&v=beta&t=gLH7BYDruMYndi2jVPwcmcebob4xgrF6Q9Ic4TAPlWo" alt="" />
                </div>
            </div>
            <div className="containerr"></div>
            <div id="imageContentGrain" className="content">
                <Banner/>
            </div>
        </section>
    );
};

export default Header;