import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_ABOUT_US } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "About us";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_ABOUT_US,
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
            className="section page-section container has-header content-sm"
            id="page-section1"
          >
            <div className="container d-padding-top-20">
              <h4 className="text-normal-spacing text-desc text-center">
                We are an educational company providing training that assists
                people who are trading the forex market. Our goal is to help
                people and charities all around the world while giving
                assistance to communities filled with people who are eager to
                educate themselves and make a difference in their lives by
                benefiting from the financial markets.
              </h4>
              <div className="row">
                <div className="col-md-12 text-left d-margin-top-60">
                  <h2 className="text-normal-spacing title-v1 people-title d-margin-bottom-20">
                    Meet the Team:
                  </h2>
                  <div
                    className="people-box-container"
                    style={{ maxWidth: "900px", margin: "auto" }}
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <div className="people-box text-center">
                          <img
                            className="people-avatar"
                            src="/assets/home/images/mark_mardaa.png"
                            alt=""
                          />
                          <h4 className="text-normal-spacing people-name mt-20 mb-10">
                            Mark Mardaa
                          </h4>
                          <h4 className="text-normal-spacing people-desc text-bold text-green">
                            Chief Executive Officer
                          </h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="people-box text-center">
                          <img
                            className="people-avatar"
                            src="/assets/home/images/aric_mussman.png"
                            alt=""
                          />
                          <h4 className="text-normal-spacing people-name mt-20 mb-10">
                            Aric Mussman
                          </h4>
                          <h4 className="text-normal-spacing people-desc text-bold text-green">
                            Vice President
                          </h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="people-box text-center">
                          <img
                            className="people-avatar"
                            src="/assets/home/images/joshua-mussuman.png"
                            alt=""
                          />
                          <h4 className="text-normal-spacing people-name mt-20 mb-10">
                            Joshua Mussman
                          </h4>
                          <h4 className="text-normal-spacing people-desc text-bold text-green">
                            Vice President
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default AboutUsPage;
