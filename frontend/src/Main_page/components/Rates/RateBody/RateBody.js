import React from "react";
import "./ratebody.css";

const RateBody = () => {
  return (
    <div className="ratebody-con">
      <div className="ratebody-head">
        <span className="ratebody-head1">
          <p className="nob">NOBLEGARPIX</p>
          <p className="nob1">STUDIO</p>
        </span>
        <span className="ratebody-head2">
          <p>BIRTHDAY</p>
          <p>|</p>
          <p>LIFESTYLE</p>
          <p>|</p>
          <p>CORPATE</p>
          <p>|</p>
          <p>PREWEDDING</p>
          <p>|</p>
          <p>MATERNITY</p>
        </span>
      </div>
      <div className="ratebody-package-con">
        <div className="ratebody-package">
          <span className="ratebody-package-head">
            <p>STUDIO PACKEGES</p>
          </span>
          <div className="ratebody-box">
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>BASIC SESSION - 20K</p>
              </span>
              <span className="ratebody-box-body">
                <p>2 edited pics</p>
                <p>max 1 outfit</p>
                <p>35 mins</p>
              </span>
            </div>
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>STANDARD SESSION - 40K</p>
              </span>
              <span className="ratebody-box-body">
                <p>4 edited pics</p>
                <p>max 2 outfit</p>
                <p>1 hour</p>
              </span>
            </div>
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>PREMIUM SESSION - 60K</p>
              </span>
              <span className="ratebody-box-body">
                <p>6 edited pics</p>
                <p>max 3 outfit</p>
                <p>2 hours</p>
              </span>
            </div>
          </div>
        </div>
        <div className="ratebody-package">
          <span className="ratebody-package-head">
            <p>OUTDOOR PACKEGES</p>
          </span>
          <div className="ratebody-box">
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>BASIC SESSION - 50K</p>
              </span>
              <span className="ratebody-box-body">
                <p>4 edited pics</p>
                <p>max 2 outfit</p>
                <p>1 hour</p>
              </span>
            </div>
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>STANDARD SESSION - 70K</p>
              </span>
              <span className="ratebody-box-body">
                <p>6 edited pics</p>
                <p>max 3 outfit</p>
                <p>2 hours</p>
              </span>
            </div>
            <div className="ratebody-box-con">
              <span className="ratebody-box-head">
                <p>PREMIUM SESSION - 90K</p>
              </span>
              <span className="ratebody-box-body">
                <p>8 edited pics</p>
                <p>max 4 outfit</p>
                <p>3 hours</p>
              </span>
            </div>
          </div>
        </div>
        <div className="ratebody-package">
          <span className="ratebody-package-head">
            <p>EVENTS/PARTIES</p>
          </span>
          <span className="text">
            <p>
              {" "}
              50 edited images & unlimited low resolution unedited raw pictures
              - 180k
            </p>
          </span>
        </div>
        <div className="ratebody-package">
          <span className="ratebody-package-head">
            <p>OTHER SERVICES</p>
          </span>
          <span className="text text-con">
            <p>MAKEUP - 15K</p>
            <p>HAIR STYLING - 10K</p>
            <p>BIRTHDAY VIDEO SESSION</p>
          </span>
        </div>
      </div>
      <div className="ratebody-terms">
        <div className="ratebody-terms-head">
          <span className="ratebody-package-head">
            <p>TERMS AND CONDITIONS</p>
          </span>
          <span className="ratebody-head-text">
            <p>please read carefully</p>
          </span>
        </div>
        <div className="ratebody-text">
          <p>-Extra edit cost 10lk per picture</p>
          <p>
            -Full payment should be made ahead of a shoot date to secure an
            appointment
          </p>
          <p>-Late bookings come with an extra charge of 10k</p>
          <p>
            -Lateness of more than an hour comes with an ectra charge of 10k
          </p>
          <p>
            -Upon booking, clients is only allowed to come with a maximum of two
            persons
          </p>
          <p>
            -Change of appointment should be done at least two days ahead if not
            5k extra
          </p>
          <p>-Edited pictures will be delivered 2 - 3 days</p>
          <p>-Same day delivery cost extra 10k</p>
          <p>-Closing time is 6pm, shoot after 6pm cost 6k extra</p>
          <p>
            -Under no circumstance will we offer refunds if clients decide to
            cancle their shoot
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RateBody;
