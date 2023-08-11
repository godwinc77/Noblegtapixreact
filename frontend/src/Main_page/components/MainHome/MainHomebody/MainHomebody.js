import React from "react";

import "./mainhomebody.css";
import img from "../../../assets/bac11.png";

const MainHomebody = () => {
  return (
    <div className={"MainHomebody"}>
      <div className="maintext-con">
        <div className="maintext body-scale-in-center">
          <p>
            {" "}
            WELCOME TO NOBLE GRAPIX STUDIO - UNLEASHING THE ART OF VISUAL
            STORYTELLING!
          </p>
          <p>
            Step into a world of captivating imagery where every moment comes to
            life with the magic of Noble Grapix Studio. We are renowned for
            curating breathtaking and timeless pictures that speak volumes about
            the beauty of life. From the first click of our high-end cameras to
            the final touches in our state-of-the-art editing suite, we ensure
            each image is a masterpiece that captures emotions, memories, and
            dreams. Our passion for photography knows no bounds, and our
            commitment to excellence shines through every frame we capture. At
            Noble Grapix, we believe in going beyond the ordinary, and our
            dedication to delivering the best quality pictures sets us apart as
            industry pioneers. We are equipped with the latest technology and an
            eye for detail, ensuring that every shot is infused with creativity
            and brilliance. Our expert photographers are skilled in capturing
            the essence of your special moments, turning them into cherished
            memories that last a lifetime. Step into our world of picturesque
            backdrops, where each scene becomes a canvas for storytelling. With
            an ambience that exudes comfort and elegance, our studio provides
            the perfect setting for unforgettable photoshoots. But don't just
            take our word for it; let our work speak for itself. Here's a sneak
            peek at some of our finest creations, crafted with love and finesse
            to match the unique taste of each customer. Noble Grapix Studio -
            Where Moments are Transformed into Masterpieces. Book your session
            today and experience photography like never before!
          </p>
        </div>
      </div>
      <div className="bio">
        <img src={img} alt="logo" />
      </div>
    </div>
  );
};

export default MainHomebody;
