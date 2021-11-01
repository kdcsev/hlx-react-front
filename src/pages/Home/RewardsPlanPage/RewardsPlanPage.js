import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_REWARDS_PLAN } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const RewardsPlanPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Rewards Plan";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_REWARDS_PLAN,
      })
    );
  };

  useEffect(() => {
    initPage();
  });

  return (
    <div>
      <HomeLayout>
        <div className="main-content">
          <div
            className="section page-section container has-header content-sm pb-40"
            id="page-section1"
          >
            <div className="container d-padding-top-20">
              <div className="row">
                <div className="col-md-12 md-margin-bottom-30">
                  <h2 className="text-normal-spacing text-center">
                    Check out our amazing rewards plan!
                  </h2>
                  <div className="intro-video-box text-center">
                    <iframe
                      src="https://player.vimeo.com/video/461966916"
                      className="vimeo-iframe"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      title="Rewards Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div
                    className="video-desc mt-10 text-center"
                    style={{ maxWidth: "890px", margin: "10px auto" }}
                  >
                    DISCLAIMER: Your commissions and residuals will vary
                    depending on your work ethic. You may make no money at all
                    and in some cases it could even be possible to lose money.
                  </div>
                  <div className="bottom-h-divider"></div>
                  <h2 className="text-normal-spacing text-center d-padding-bottom-20">
                    Important things to know about our rewards plan:
                  </h2>

                  <div className="rewards-feature-box">
                    <h4 className="text-normal-spacing text-underline">
                      If you are only a customer:
                    </h4>
                    <ul className="text-normal-spacing padding-left-20">
                      <li>
                        If you refer 3 direct members you receive a free
                        membership!
                      </li>
                      <li>
                        These direct members must stay active customers (not
                        affiliates) for you to continue receiving your free
                        membership.
                      </li>
                      <li>
                        If you refer more than 3 members, you receive your free
                        membership and $15 per additional direct member per
                        month sent directly to your credit wallet!
                      </li>
                      <li>
                        Any active direct members are never lost and
                        automatically transferred to your tree if you choose to
                        upgrade to an affiliate.{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="rewards-feature-box">
                    <h4 className="text-normal-spacing text-underline">
                      If you upgrade to an affiliate:
                    </h4>
                    <ul className="text-normal-spacing padding-left-20">
                      <li>
                        You will no longer receive $15 per referral but will be
                        transferred to the HLX Compensation plan.
                      </li>
                      <li>Priority VIP email support.</li>
                      <li>
                        Lead generation and Facebook optimization training
                        course.
                      </li>
                      <li>Access to the HLX compensation plan.</li>
                    </ul>
                  </div>
                  <div className="rewards-feature-box">
                    <h4 className="text-normal-spacing text-underline">
                      The compensation plan:
                    </h4>
                    <ul className="text-normal-spacing padding-left-20">
                      <li>
                        You must always have 3 direct active signups at all
                        times (one per lane).
                      </li>
                      <li>
                        Your rank is determined by the volume of each of your
                        lanes and you get paid based on your lowest lane (See
                        picture 1)
                      </li>
                      <li>
                        Starting from Advisor5K - Three of your initial direct
                        active signups must now meet ranking requirements.
                      </li>
                      <li>
                        Required ranking members must be on separate lanes.
                      </li>
                      <li>The 66% rule must be followed.</li>
                    </ul>
                    <div className="rank-img-wrapper">
                      <img
                        className="rank-table-img block margin-auto wow fadeIn"
                        src="/assets/home/images/20210417/5.jpg"
                        alt=""
                      />
                    </div>
                    <div className="rank-img-wrapper">
                      <img
                        className="rank-table-img block margin-auto wow fadeIn"
                        src="/assets/home/images/20210417/6.jpg"
                        alt=""
                      />
                    </div>
                    <div className="rank-img-wrapper">
                      <img
                        className="rank-table-img block margin-auto wow fadeIn"
                        src="/assets/home/images/20210417/7.jpg"
                        alt=""
                      />
                    </div>
                    <div className="rank-img-wrapper">
                      <img
                        className="rank-table-img block margin-auto wow fadeIn"
                        src="/assets/home/images/20210317/img4-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="rank-img-wrapper">
                      <img
                        className="rank-table-img block margin-auto wow fadeIn"
                        src="/assets/home/images/20210317/img5.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="rewards-feature-box">
                    <h4 className="text-normal-spacing text-underline">
                      The 10 day holding tank:
                    </h4>
                    <ul className="text-normal-spacing padding-left-20">
                      <li>
                        Customer’s personal referrals won’t be placed into the
                        holding tank, they will be placed in to the tree
                        automatically.
                      </li>
                      <li>
                        When you enroll a new member as an affiliate, they will
                        be placed in your 10-day holding tank.
                      </li>
                      <li>
                        At this point, you can then choose where to place them
                        into your tree.
                      </li>
                      <li>
                        If you do not place someone into your tree within 10
                        days, they will automatically be placed at the next
                        available slot (going from left to right)
                      </li>
                    </ul>
                  </div>
                  <div className="rewards-feature-box">
                    <h4 className="text-normal-spacing text-underline">
                      Residuals from your Tree:
                    </h4>
                    <ul className="text-normal-spacing padding-left-20">
                      <li>
                        We payout a weekly residual income every Friday once you
                        achieve a rank.
                      </li>
                      <li>
                        As long as you maintain your rank each week, you will
                        get paid for that rank.
                      </li>
                      <li>
                        You always get paid based on the rank you had in the
                        previous week.
                      </li>
                      <li>
                        You must earn a rank before Friday in order to get paid
                        the following week.
                      </li>
                    </ul>
                  </div>
                  <p className="text-normal-spacing text-desc">
                    IMPORTANT: To be eligible for any ranks you must always have
                    1 personal referral on each lane.
                    <br />
                    Keep scrolling for further important details about this.
                    <br />
                    For a further explanation check out our{" "}
                    <a href="<?php echo base_url('terms-conditions')?>">
                      Terms and Conditions.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default RewardsPlanPage;
