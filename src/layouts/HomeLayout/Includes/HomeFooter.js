import {
  ROUTE_AFFILIATE_AGREEMENT,
  ROUTE_COMPLIANCE,
  ROUTE_INCOME_DISCLAIME,
  ROUTE_LOGIN,
  ROUTE_PRIVACY_POLICY,
  ROUTE_REWARDS_PLAN,
  ROUTE_RISK_WARNING,
  ROUTE_ROOT,
  ROUTE_TERMS_CONDITIONS,
  ROUTE_TRIAL_POLICY,
  ROUTE_USER_AGREEMENT,
} from "navigation/CONSTANTS";
import React from "react";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <footer className="page-section bg-gray-lighter footer pt-40 pb-40">
      <div className="footer-v1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-padding-right-20">
              <div className="text-normal-spacing text-left d-padding-right-40">
                <b>HIGHER LEVEL FX™</b> is an educational company providing
                software, training and support with a unique focus on trading in
                the global currency market.
              </div>
            </div>
            <div className="col-md-6">
              <div className="resource-support-wrapper text-left">
                <div className="text-normal-spacing resources-block desc-v1">
                  <b>RESOURCES</b>&nbsp;:&nbsp;
                  <Link to={ROUTE_LOGIN} className="desc-v1">
                    Login
                  </Link>
                  &nbsp;|&nbsp;
                  <Link to={ROUTE_ROOT} className="desc-v1">
                    Why HLX?
                  </Link>
                  &nbsp;|&nbsp;
                  <Link to={ROUTE_REWARDS_PLAN} className="desc-v1">
                    Rewards Plan
                  </Link>
                  <br />
                  <b>FOR BUSINESS INQUIRIES</b>&nbsp;:&nbsp;
                  <a
                    href="mailto:admin@higherlevelfx.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    admin@higherlevelfx.com
                  </a>
                  <br />
                  <span className="">
                    Hunkins Waterfront Plaza, Suite 556, Main Street,
                    Charlestown, Nevis, West indies
                  </span>
                </div>
                <div className="social-btn-group text-right mt-4 mb-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-right">
                        <a
                          href="https://www.facebook.com/higherlevelfx/"
                          target="_blank"
                          rel="noreferrer"
                          className="social-btn social-facebook-btn"
                        >
                          Facebook &nbsp;{" "}
                          <img
                            className="icon-img"
                            src="/assets/home/images/20210314/facebook.png"
                            alt=""
                          />
                        </a>
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <a
                          href="https://www.instagram.com/higherlevelfx/"
                          target="_blank"
                          rel="noreferrer"
                          className="social-btn social-instagram-btn"
                        >
                          Instagram &nbsp;{" "}
                          <img
                            className="icon-img"
                            src="/assets/home/images/20210314/instagram.png"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-no-fixed1 pt-20">
        <div className="footer">
          <div className="container">
            <div className="block">
              <h5 className="text-normal-spacing bottom-link-list">
                <Link to={ROUTE_ROOT}>COPYRIGHT © 2021 Higher Level FX™</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_USER_AGREEMENT}>User Agreement</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_TERMS_CONDITIONS}>Terms and Conditions</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_PRIVACY_POLICY}>Privacy Policy</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_RISK_WARNING}>Risk Warning</Link>&nbsp;|&nbsp;
                <Link to={ROUTE_AFFILIATE_AGREEMENT}>Affiliate Agreement</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_INCOME_DISCLAIME}>Income Disclaimer</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_TRIAL_POLICY}>7-Day Trial Policy</Link>
                &nbsp;|&nbsp;
                <Link to={ROUTE_COMPLIANCE}>Compliance</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
