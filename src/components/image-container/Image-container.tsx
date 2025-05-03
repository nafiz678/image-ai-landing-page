import { useEffect } from "react";
import "./image.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)
export default function ImageContainer() {


    useEffect(() => {
        const slides = gsap.utils.toArray<HTMLElement>(".slide");
        const activeSlideImages = gsap.utils.toArray<HTMLElement>(".active-slide img");

        function getInitialTranslateZ(slide: HTMLElement): number {
            const style = window.getComputedStyle(slide);
            const matrix = style.transform.match(/matrix3d\((.+)\)/);
            if (matrix) {
                const values = matrix[1].split(", ");
                return parseFloat(values[14] || "0");
            }
            return 0;
        }

        function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
            return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
        }

        const triggers: ScrollTrigger[] = [];

        slides.forEach((slide, index) => {
            const initialZ = getInitialTranslateZ(slide);

            const trigger = ScrollTrigger.create({
                trigger: ".imageContainer",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const zIncrement = progress * 22500;
                    const currentZ = initialZ + zIncrement;

                    let opacity;
                    if (currentZ > -2500) {
                        opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                    } else {
                        opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                    }

                    slide.style.opacity = String(opacity);
                    slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

                    const img = activeSlideImages[index];
                    if (!img) return;

                    gsap.to(img, {
                        opacity: currentZ < 100 ? 1 : 0,
                        duration: 1.5,
                        ease: "power3.out"
                    });
                }
            });

            triggers.push(trigger);
        });

        return () => {
            triggers.forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <div className="bg-[#000]">
            <footer>
                <p className="text-sm">Watch show reel</p>
                <p className="text-sm">Coming soon</p>
            </footer>
            <div className="imageContainer">
                <div className="active-slide">
                    <img src="/assets/10.webp" alt="slider image" />
                    <img src="/assets/9.webp" alt="slider image" />
                    <img src="/assets/8.webp" alt="slider image" />
                    <img src="/assets/7.webp" alt="slider image" />
                    <img src="/assets/6.webp" alt="slider image" />
                    <img src="/assets/5.webp" alt="slider image" />
                    <img src="/assets/4.webp" alt="slider image" />
                    <img src="/assets/3.webp" alt="slider image" />
                    <img src="/assets/2.webp" alt="slider image" />
                    <img src="/assets/1.webp" alt="slider image" />
                </div>

                <div className="slider">
                    {/* image 1 */}
                    <div className="slide" id="slide-1">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/10.webp" alt="" />
                        </div>
                    </div>
                    {/* image 2 */}
                    <div className="slide" id="slide-2">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 2023 0936 )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/9.webp" alt="" />
                        </div>
                    </div>
                    {/* image 3 */}
                    <div className="slide" id="slide-3">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 2023 0936 )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/8.webp" alt="" />
                        </div>
                    </div>
                    {/* image 4 */}
                    <div className="slide" id="slide-4">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/7.webp" alt="" />
                        </div>
                    </div>
                    {/* image 5 */}
                    <div className="slide" id="slide-5">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/6.webp" alt="" />
                        </div>
                    </div>
                    {/* image 6 */}
                    <div className="slide" id="slide-6">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/5.webp" alt="" />
                        </div>
                    </div>
                    {/* image 7 */}
                    <div className="slide" id="slide-7">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/4.webp" alt="" />
                        </div>
                    </div>
                    {/* image 8 */}
                    <div className="slide" id="slide-8">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/3.webp" alt="" />
                        </div>
                    </div>
                    {/* image 9 */}
                    <div className="slide" id="slide-9">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/2.webp" alt="" />
                        </div>
                    </div>
                    {/* image 10 */}
                    <div className="slide" id="slide-10">
                        <div className="slide-copy">
                            <p className="text-xs">Neo Elegance</p>
                            <p id="index" className="text-xs">( ES 9342 084F )</p>
                        </div>
                        <div className="slide-img">
                            <img src="/assets/1.webp" alt="" />
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}
