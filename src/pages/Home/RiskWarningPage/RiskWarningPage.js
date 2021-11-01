import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_RISK_WARNING } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const RiskWarningPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Risk Warning"
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_RISK_WARNING,
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
    <div className="section page-section container has-header content-sm" id="page-section1">
        <div className="container d-padding-top-20">
            <div className="row d-margin-top-20">
                <div className="col-md-12 md-margin-bottom-30">
                    <h4 className="text-normal-spacing d-margin-bottom-40">Risk Warning</h4>
                    <p className="desc-v1-1">
                        Before you enter foreign exchange and stock markets, you have to remember that trading currencies and other investment products is trading in nature and always involves a considerable risk. As a result of various financial fluctuations, you may not only significantly increase your capital, but also lose it completely.<br/><br/>

                    </p>
                    <p className="desc-v1-1">
                        Therefore, our clients have to assure Higher Level FX™ that they understand all the possible consequences of such risks, they know all the specifics, rules and regulations governing the use of investment products, including corporate events, resulting in the change of underlying assets. Client understands that there are special risks and features that affect prices, exchange rates and investment products.

                        These risks include decrease in liquidity, price change, high volatility and circumstances beyond control. Before you open an account with us, make sure to study in detail the user agreement, as well as the basic principles and rules of the financial markets.

                        Higher Level FX™ is not liable for any damages that occurred as a result of government restrictions, regulations of foreign exchange or stock markets, military actions, suspension of trading and other circumstances beyond control.

                        By purchasing or owning an active HigherLevel FX software license you agree to ALL the following: You fully understand that this is an educational tool which must be used on a demo account and no real money is to be involved what so ever. You fully agree that you will ONLY turn on our software or any of our educational products when you wish to educate yourself so you can examine the trades it took and study them. You must NEVER treat any educational tools from HigherLevel FX as an auto trader for personal or financial gain. Your goals must be education only!
                    </p>
                    <p className="desc-v1-1">

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

export default RiskWarningPage;
