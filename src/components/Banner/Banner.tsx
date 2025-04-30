/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect } from "react";
import "./banner.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie, { RendererType } from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

interface VarsProps {
    target: HTMLElement;
    trigger?: string;
    start?: string;
    endTrigger?: string;
    end?: string;
    path: string;
    scrub?: number;
    markers?: boolean;
    renderer?: RendererType | undefined;
    rendererSettings?: {
        preserveAspectRatio: string;
        [key: string]: any;
    };
    [key: string]: any;
}

interface StProps {
    trigger: string | HTMLElement;
    start: string;
    end: string;
    scrub: number;
    markers: boolean;
    endTrigger?: string;
    [key: string]: any;
}

export default function Banner() {

    const animationRef = useRef<HTMLDivElement>(null);

    function LottieScrollTrigger(vars: VarsProps) {
        const playHead = { frame: 0 };
        const target = vars.target;

        // Basic ScrollTrigger config
        const st: StProps = {
            trigger: vars.trigger || vars.target,
            start: vars.start || "top center",
            end: vars.end || "+=1000",
            scrub: vars.scrub || 1,
            markers: vars.markers || false,
        };


        for (const p in vars) {
            if (p !== "target" && p !== "path") {
                st[p] = vars[p];
            }
        }

        // Initialize Lottie animation
        const animation = Lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || "svg",
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || {
                preserveAspectRatio: "xMidYMid slice"
            }
        });

        // Set up the ScrollTrigger once Lottie is loaded
        animation.addEventListener("DOMLoaded", function () {

            gsap.to(playHead, {
                frame: animation.totalFrames - 1,
                ease: "none",
                onUpdate: () => animation.goToAndStop(playHead.frame, true),
                scrollTrigger: st
            });

            // Force a refresh of ScrollTrigger
            ScrollTrigger.refresh();
        });

        return animation;
    }

    useEffect(() => {
        // Wait for component to be mounted 
        if (!animationRef.current) { return; }

        // Create the animation
        const animation = LottieScrollTrigger({
            target: animationRef.current,
            trigger: ".lottie-container", // Use container as trigger for better detection
            start: "top 80%", // Start animation when 20% of container is visible
            endTrigger: ".end-lottie",
            end: "bottom 20%", // End when bottom of end-trigger reaches 20% from top
            path: "/hero-lottie.json", // Use absolute path from public folder
            scrub: 0.8, // Smoother scrubbing effect
            markers: true, // Enable markers for debugging
        });

        // Clean up
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            animation.destroy();
        };
    }, []);

    return (
        <div className="app-container">

            <section className="lottie-container">
                <div className="animation" ref={animationRef}></div>
            </section>

            <section className="gradient"></section>

            <section className="website-content">
                <div className="end-lottie"></div>
                <h1 className="text-7xl">Lorem ipsum dolor</h1>
                <p className="loremText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laborum delectus aperiam reiciendis, vero alias at? Aperiam illum asperiores nostrum quia, voluptatum rerum laboriosam sit impedit dicta repudiandae, obcaecati officiis?</p>
                {/* Add more content to ensure scrollability */}
                <div className="spacer"></div>
            </section>
        </div>
    )
}
