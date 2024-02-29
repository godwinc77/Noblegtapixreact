import React from "react";
import "./training.css";

const Training = () => {
  return (
    <div className="training">
      <div className="training-body">
        <p className="training-text">
          IF YOU'RE SEARCHING FOR THE OPTIMAL ENVIRONMENT TO ENHANCE YOUR SKILLS
          IN PHOTOGRAPHY, PHOTO-EDITING, OR MAKE-UP, YOUR SEARCH ENDS HERE.
          NOBLE GRAPIX AND JUSTKLASSIC OFFER TOP-NOTCH CLASSES THAT CATER TO
          YOUR SPECIFIC NEEDS. THE INVESTMENT YOU MAKE IN THESE COURSES IS TRULY
          VALUABLE, PROVIDING YOU WITH KNOWLEDGE AND EXPERTISE THAT ARE WORTH
          EVERY PENNY.
        </p>
        <div className="training- details">
          <div className="trainig-list">
            <h3>PRICE-LIST</h3>
            <div class="trainig-list-info">
              <ul
                style={{ listStyleType: "none" }}
                class="trainig-list-text trainingz"
              >
                <li>1 MONTH BEGINNER CLASS(photography&photo-editing)</li>
                <li>
                  2 MONTH BEGINNER TO MASTER CLASS(photography&photo-editing)
                </li>
                <li>5 DAYS UPGRADE TO MASTER CLASS(photo-editing) </li>
                <li>MAKE-UP CLASS</li>
              </ul>

              <ul
                style={{ listStyleType: "none" }}
                class="trainig-list-text2 trainingz"
              >
                <li>50k</li>
                <li>100k</li>
                <li>40k</li>
                <li>50k</li>
              </ul>
            </div>
          </div>
          <div className="training-contact">
            <div className="training-contact-info">
              <h3 className="training-contact-head">
                CONTACT THE FOLLOWING PHONE NUMBERS FOR MORE INFO ON YOUR
                SUITABLE CLASSES
              </h3>
              <div className="training-contact-text">
                <h3>0810-991-0656 - PHOTOGRAPHY & PHOTO-EDITING CLASS</h3>
                <h3>0817-246-8877 - MAKE-UP CLASS</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
