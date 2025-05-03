/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState, useRef } from "react";
import "./header.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useLocoScroll from "@/hooks/useLocoScroll";
// import grained from "../../lib/gained";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const [start, setStart] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const page1Ref = useRef(null);
    const logoRef = useRef(null);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        // Loader animation with responsive timing
        const loaderAnimation = () => {
            const tl = gsap.timeline();
            const delay = isMobile ? 0.1 : 0.2; // Faster delays on mobile
            const duration = isMobile ? 0.8 : 1; // Faster duration on mobile

            tl.from("#ig6", { scale: 0, duration }, "a")
                .from("#ig3", { scale: 0, delay: delay, duration }, "a")
                .from("#ig4", { scale: 0, delay: delay * 2, duration }, "a")
                .from("#ig5", { scale: 0, delay: delay * 3, duration }, "a")
                .from("#ig7", { scale: 0, delay: delay * 4, duration }, "a")
                .from("#ig2", { scale: 0, delay: delay * 5, duration }, "a")
                .from("#ig1", { scale: 0, delay: delay * 6, duration }, "a");
                
            // Add these if they exist in your DOM
            if (document.querySelector("#ig8")) {
                tl.from("#ig8", { scale: 0, delay: delay * 8, duration }, "a");
            }
            if (document.querySelector("#ig9")) {
                tl.from("#ig9", { scale: 0, delay: delay * 4, duration }, "a");
            }

            return tl;
        };

        // Page One Animation: triggered by scroll - adjusted for responsive
        const pageOneAnimation = () => {
            if (!page1Ref.current) return gsap.timeline();
            
            // Adjust travel distance based on screen size
            const multiplier = isMobile ? 0.7 : 1;
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#page1",
                    start: "top top",
                    end: isMobile ? "bottom -30%" : "bottom -50%", // Less distance on mobile
                    scrub: isMobile ? 0.8 : 1, // Slightly faster scrub on mobile
                    pin: true,
                    pinSpacing: true,
                },
            });

            tl.to("#ig1", {
                x: `${130 * multiplier}%`,
                y: `${200 * multiplier}%`,
                delay: 0,
            }, "a")
                .to("#ig2", {
                    x: `${-90 * multiplier}%`,
                    y: `${228 * multiplier}%`,
                    delay: 0.14,
                }, "a")
                .to("#ig3", {
                    x: `${-70 * multiplier}%`,
                    y: `${-140 * multiplier}%`,
                    delay: 0.29,
                }, "a")
                .to("#ig4", {
                    x: `${140 * multiplier}%`,
                    y: `${-150 * multiplier}%`,
                    delay: 0.07,
                }, "a")
                .to("#ig5", {
                    x: `${120 * multiplier}%`,
                    y: `${155 * multiplier}%`,
                    delay: 0.35,
                }, "a")
                .to("#ig6", {
                    x: `${150 * multiplier}%`,
                    y: `${-190 * multiplier}%`,
                    delay: 0.21,
                }, "a")
                .to("#ig7", {
                    x: `${-80 * multiplier}%`,
                    y: `${-280 * multiplier}%`,
                    delay: 0.5,
                }, "a");
                
            // Add these if they exist in your DOM
            if (document.querySelector("#ig8")) {
                tl.to("#ig8", {
                    x: `${80 * multiplier}%`,
                    y: `${-180 * multiplier}%`,
                    delay: 0.18,
                }, "a");
            }
            if (document.querySelector("#ig9")) {
                tl.to("#ig9", {
                    x: `${-80 * multiplier}%`,
                    y: `${-180 * multiplier}%`,
                    delay: 0.25,
                }, "a");
            }
                
            tl.to("#page1 h4", {
                opacity: 0,
                delay: 0.5,
            }, "a");

            return tl;
        };

        // Play only loader animation immediately
        const loader = loaderAnimation();

        // Set up scroll animation separately
        const pageAnimation = pageOneAnimation();

        // Logo animation - adjusted for mobile
        ScrollTrigger.create({
            animation: gsap.fromTo(".logo",
                // Starting state
                {
                    y: isMobile ? "40vh" : "50vh", // Less distance on mobile
                    scale: isMobile ? 4 : 6, // Smaller scale on mobile
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
            if (pageAnimation) pageAnimation.kill();
        };
    }, [isMobile]); // Re-run when isMobile changes

    useLocoScroll(start);

    useEffect(() => {
        setStart(true); // start locoScroll after mount
    }, []);

    return (
        <section id="grain-container" className="bg-[#000]">
            <div className="nav mix-blend-difference fixed top-0 left-0 w-full flex justify-between px-6 py-4 z-50">
                <div className="item-left flex gap-4 text-white">
                    <a href="#">chats</a>
                    <a href="#">playground</a>
                </div>
                <div className="item-right flex gap-4 text-white">
                    <a href="https://nikolaire.com" target="_blank">visit us</a>
                    <a href="#">contact</a>
                </div>
            </div>

            <div id="heading" className="logo-container">
                <h1 id="pixn" className="logo px-[1em] pb-[1em] pt-[0.85em] text-white drop-shadow-[0_0_2px_rgba(255,255,255,1)] text-[2.2em]" ref={logoRef}>
                    PIXN
                </h1>

                <div id="page1" ref={page1Ref}>
                    <img id="ig1" src="https://assets.eweek.com/uploads/2024/02/ew_20240227-best-ai-art-generator.png" alt="AI Art Generator" />
                    <img id="ig2" src="https://miro.medium.com/v2/resize:fit:1400/1*0m9OPm7DPtCDazvzQke6bA.png" alt="Digital Art" />
                    <img id="ig3" src="https://mpost.io/wp-content/uploads/image-74-7.jpg" alt="AI Generated Image" />
                    <img id="ig4" src="https://images.unsplash.com/photo-1593073862407-a3ce22748763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8fHwxNjc4ODIyODgx&ixlib=rb-4.0.3&q=80&w=2000" alt="Digital Art Concept" />
                    <img id="ig5" src="https://cdn.prod.website-files.com/659bd9a5498a8bb97b66d895/66423fccb101408240109e2e_Rectangle%20916.webp" alt="AI Generated Landscape" />
                    <img id="ig6" src="https://nyartlife.com/wp-content/uploads/2023/03/Top-7-Amazing-Artworks-Meet-the-AI-Art-Makers-of-the-Future-AI-generated-eyes_face-of-a-woman.jpg" alt="AI Generated Face" />
                    <img id="ig7" src="https://videos.openai.com/vg-assets/assets%2Ftask_01jr9t55pef349k76q20bfg81v%2Fimg_0.webp?st=2025-05-03T04%3A11%3A32Z&se=2025-05-09T05%3A11%3A32Z&sks=b&skt=2025-05-03T04%3A11%3A32Z&ske=2025-05-09T05%3A11%3A32Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=q%2Fr4%2BeZfpJWkVHqq2NGu8opy4CeeZuKFqXwRAnLv1%2Bs%3D&az=oaivgprodscus" alt="AI Generated Art" />
                    {/* Commented images that might not be used */}
                    {/* <img id="ig8" src="https://cdn.prod.website-files.com/645cec60ffb18d5ebb37da4b/65f2b9d306dad77d174e4ab6_Picture3.jpg" alt="Digital Art" />
                    <img id="ig9" src="https://media.licdn.com/dms/image/v2/D5612AQFAGCu9L0JijA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1692732486952?e=2147483647&v=beta&t=gLH7BYDruMYndi2jVPwcmcebob4xgrF6Q9Ic4TAPlWo" alt="AI Art" /> */}
                </div>
            </div>
            <div className="containerr"></div>

            <div id="imageContentGrain" className="content"></div>
        </section>
    );
};

export default Header;