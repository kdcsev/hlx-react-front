import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./HomeLayout.css";
import HomeBottom from "./Includes/HomeBottom";
import HomeChatBox from "./Includes/HomeChatBox";
import HomeFooter from "./Includes/HomeFooter";
import HomeHeader from "./Includes/HomeHeader";
import HomeLoader from "./Includes/HomeLoader";
import HomeNavbar from "./Includes/HomeNavbar";

function HomeLayout(props) {
    const appDataStore = useSelector((x) => x.appDataStore);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    return (
        <div>
            <div className="home-page">
                <HomeHeader></HomeHeader>
                <HomeLoader></HomeLoader>
                <a href="#main" className="btn skip-to-content">Skip to Content</a>

                <div className="page" id="top">
                    <HomeNavbar></HomeNavbar>
                    <main id="main" className="wow fadeIn">{props.children}</main>
                </div>
                <HomeFooter></HomeFooter>
                <HomeChatBox></HomeChatBox>
                <HomeBottom></HomeBottom>
            </div>
        </div>
    );
}
export default HomeLayout;
