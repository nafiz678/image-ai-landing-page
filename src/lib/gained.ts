/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
interface GrainedOptions {
    animate?: boolean;
    patternWidth?: number;
    patternHeight?: number;
    grainOpacity?: number;
    grainDensity?: number;
    grainWidth?: number;
    grainHeight?: number;
    grainChaos?: number;
    grainSpeed?: number;
  }
  
  (function (window: Window & typeof globalThis, doc: Document) {
    "use strict";
  
    function grained(ele: string | HTMLElement, opt: GrainedOptions) {
      let element: HTMLElement | null = null;
      let elementId: string | null = null;
      let selectorElement: string | null = null;
  
      if (typeof ele === "string") {
        element = doc.getElementById(ele.split("#")[1]);
      } else if (typeof ele === "object") {
        element = ele;
      }
  
      if (!element) {
        console.error(`Grained: cannot find the element with id + ${ele}`);
        return;
      } else {
        elementId = element.id;
      }
  
      // set style for parent
      if (element.style.position !== "absolute") {
        element.style.position = "relative";
      }
      element.style.overflow = "hidden";
  
      const prefixes = ["", "-moz-", "-o-animation-", "-webkit-", "-ms-"];
  
      // default option values
      const options: Required<GrainedOptions> = {
        animate: true,
        patternWidth: 100,
        patternHeight: 100,
        grainOpacity: 0.1,
        grainDensity: 1,
        grainWidth: 1,
        grainHeight: 1,
        grainChaos: 0.5,
        grainSpeed: 20,
        ...opt,
      };
  
      const generateNoise = (): string => {
        const canvas = doc.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Grained: cannot get canvas context");
          return "";
        }
        canvas.width = options.patternWidth;
        canvas.height = options.patternHeight;
        for (let w = 0; w < options.patternWidth; w += options.grainDensity) {
          for (let h = 0; h < options.patternHeight; h += options.grainDensity) {
            const rgb = (Math.random() * 256) | 0;
            ctx.fillStyle = `rgba(${rgb},${rgb},${rgb},${options.grainOpacity})`;
            ctx.fillRect(w, h, options.grainWidth, options.grainHeight);
          }
        }
        return canvas.toDataURL("image/png");
      };
  
      function addCSSRule(
        sheet: CSSStyleSheet,
        selector: string,
        rules: string,
        index?: number
      ) {
        const ins = selector.length ? `${selector}{${rules}}` : rules;
        if ("insertRule" in sheet) {
          sheet.insertRule(ins, index ?? sheet.cssRules.length);
        } else if ("addRule" in sheet) {
          (sheet as any).addRule(selector, rules, index);
        }
      }
  
      const noise = generateNoise();
  
      let animation = "";
      const keyFrames = [
        "0%:-10%,10%",
        "10%:-25%,0%",
        "20%:-30%,10%",
        "30%:-30%,30%",
        "40%::-20%,20%",
        "50%:-15%,10%",
        "60%:-20%,20%",
        "70%:-5%,20%",
        "80%:-25%,5%",
        "90%:-30%,25%",
        "100%:-10%,10%",
      ];
  
      let pre = prefixes.length;
      while (pre--) {
        animation += `@${  prefixes[pre]  }keyframes grained{`;
        for (let key = 0; key < keyFrames.length; key++) {
          const keyVal = keyFrames[key].split(":");
          animation += `${keyVal[0]  }{`;
          animation += `${prefixes[pre]  }transform:translate(${  keyVal[1]  });`;
          animation += "}";
        }
        animation += "}";
      }
  
      // add animation keyframe
      const animationAdded = doc.getElementById("grained-animation");
      if (animationAdded?.parentElement) {
        animationAdded.parentElement.removeChild(animationAdded);
      }
      let style = doc.createElement("style");
      style.type = "text/css";
      style.id = "grained-animation";
      style.innerHTML = animation;
      doc.body.appendChild(style);
  
      // add customized style
      const styleAdded = doc.getElementById(`grained-animation-${  elementId}`);
      if (styleAdded?.parentElement) {
        styleAdded.parentElement.removeChild(styleAdded);
      }
  
      style = doc.createElement("style");
      style.type = "text/css";
      style.id = `grained-animation-${  elementId}`;
      doc.body.appendChild(style);
  
      let rule =
        `background-image: url(${ 
        noise 
        });position: absolute;content: '';height: 300%;width: 300%;left: -100%;top: -100%;`;
  
      pre = prefixes.length;
      if (options.animate) {
        while (pre--) {
          rule +=
            `${prefixes[pre]  }animation-name:grained;${ 
            prefixes[pre]  }animation-iteration-count: infinite;${ 
            prefixes[pre]  }animation-duration: ${  options.grainChaos  }s;${ 
            prefixes[pre]  }animation-timing-function: steps(${  options.grainSpeed  }, end);`;
        }
      }
  
      // selector element to add grains
      selectorElement = `#${  elementId  }::before`;
  
      if (style.sheet) {
        addCSSRule(style.sheet, selectorElement, rule);
      }
    }
  
    (window as any).grained = grained;
  })(window, document);
  
  export default (window as any).grained;
  