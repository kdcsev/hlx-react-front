import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_INCOME_DISCLAIME } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const IncomeDisclaimerPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Income Disclaimer";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_INCOME_DISCLAIME,
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
              <div className="row d-margin-top-20">
                <div className="col-md-12 md-margin-bottom-30">
                  <h4 className="text-normal-spacing d-margin-bottom-40">
                    Income Disclaimer
                  </h4>

                  <p className="desc-v1-1">
                    While we make every effort to ensure that we accurately
                    represent all the products and services reviewed on this
                    website and their potential for income, it should be noted
                    that earnings and income statements made by Higher Level FX
                    are estimates only of what we think you can possibly earn.
                    There is no guarantee that you will make these levels of
                    income and you accept the risk that the earnings and income
                    statements differ by individual. As with any business, your
                    results may vary, and will be based on your individual
                    capacity, business experience, expertise, and level of
                    desire. There are no guarantees concerning the level of
                    success you may experience. The testimonials and examples
                    used are exceptional results, which do not apply to the
                    average purchaser, and are not intended to represent or
                    guarantee that anyone will achieve the same or similar
                    results. Each individual’s success depends on his or her
                    background, dedication, desire and motivation. There is no
                    assurance that examples of past earnings can be duplicated
                    in the future. We cannot guarantee your future results
                    and/or success. There are some unknown risks in business and
                    on the internet that we cannot foresee which could reduce
                    results you experience. The use of our information, products
                    and services should be based on your own due diligence and
                    you agree that Higher Level FX is not liable for any success
                    or failure of your business that is directly or indirectly
                    related to the purchase and use of our information, products
                    and services reviewed or advertised on this website.
                  </p>
                  <p className="desc-v1-1"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default IncomeDisclaimerPage;
