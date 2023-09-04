// Packages
import { useEffect } from "react";
import gsap, { Elastic } from "gsap";

// Assets
import { bgIcons } from "../../assets";

const Background = () => {
  // Selecting a random image
  const randomBackground = () => {
    const random = Math.floor(Math.random() * (bgIcons.length - 1));
    return bgIcons[random];
  };

  // Setting number of images based on window size
  let num = 0;
  const width = window.innerWidth;
  if (width < 500) {
    num = 100;
  } else if (width < 900) {
    num = 150;
  } else if (width < 1200) {
    num = 300;
  } else if (width < 2000) {
    num = 500;
  }
  const imgArray = [];
  for (let i = 0; i < num; i++) {
    imgArray.push(randomBackground());
  }

  useEffect(() => {
    if (num > 0) {
      gsap.to(".image-letter", {
        scale: 1,
        duration: 2,
        stagger: {
          amount: 1,
          from: "random",
        },
        ease: Elastic.easeOut.config(1, 0.3),
      });
    }
  }, [num]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden grid place-items-center -z-10">
      <div className="flex flex-wrap gap-5 md:gap-7 w-[120%]">
        {imgArray.map((image, index) => {
          return (
            <div
              key={index}
              className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] image-letter scale-0 rounded-md shadow-[2px_2px_5px_3px_rgba(0,0,0,0.1)] p-2"
            >
              <img src={image} alt="NC" className="w-full opacity-70" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Background };
