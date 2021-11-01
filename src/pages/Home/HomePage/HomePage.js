// @flow strict

import React, { useEffect } from "react";
import ReactTextRotator from "react-text-rotator";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, withRouter } from "react-router";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_REGISTER, ROUTE_ROOT } from "navigation/CONSTANTS";
import { UpdateAppData } from "redux/actions/appActions";
import { APP_NAME } from "config/CONSTANTS";
import { Link } from "react-router-dom";

function SubHomePage(props) {
  const content = [
    {
      text: "GET STARTED NOW FOR $1!",
      className: "classA",
      animation: "fade",
    },
    {
      text: "TRADE ON A HIGHER LEVEL",
      className: "classA",
      animation: "fade",
    },
  ];
  const carouselTitle = "Messages from customers";
  const carouselItems = [
    {
      title: carouselTitle,
      content:
        "HLX is the first company I've come across that is truly pushing and striving for the best products on the market. I have no doubt that they will continue to innovate and implement only the highest quality of services to their customers. There are no marketing tactics that try to get people to join, and no fake hype. Probably one of the most transparent companies I've seen.",
      author: "Jacob Diamse",
    },
    {
      title: carouselTitle,
      content:
        "HigherLevelFX has been an absolute game changer for my trading career. After failing miserably in Forex for a solid 2 1/2 years a buddy introduced me to HFX & I finally became a profitable trader! The education, tools & support I’ve received have been second to none. The value they provide pails in comparison to the monthly membership. They’re always updating, tweaking & refining their process to bring the best in class to the table. And because of this I’ll be a lifelong customer of HFX! Thank you HFX team for everything you do!",
      author: "Drew Taylor",
    },
    {
      title: carouselTitle,
      content:
        "I have been with HLX and using the Alpha software since the beginning. I am very impressed by their constant evolving tools and services that will definitely keep them on the cutting edge for years to come.  I strongly recommend this company for education and support for those who want to learn and grow in a great Forex community such as HLX. Long live HLX!",
      author: "Jason Brus",
    },
    {
      title: carouselTitle,
      content:
        "When a friend asked me to join HLX, I was initially very hesitant thinking I would have to undergo the same misfortune I experienced with the previous company I joined in. Several issues were encountered in that company, so it did not last long. The pandemic triggered me to find another source of income hence I decided to join. Fortunately for me, the people behind HLX are so helpful, responsive and are always available to listen to customer's feedback. The company also constantly improves their products and services. With this, I was very glad I got into this since they always put their customers first above anything else. Being with this company has helped me a lot especially during this pandemic. As a result, I also invited my Philippine friends to be part of HLX and just like me, they are also very pleased and satisfied of the products and services.",
      author: "Mark Vincent Po",
    },
    {
      title: carouselTitle,
      content:
        "I have been part of the HLX family from the beginning and I have to say they are the best. They education system is truly useful and practical, you will find your material whether you are beginner or advanced trader. Thanks to their strategy I understand the market more and I became a better trader overall. They forged their trading strategy into an EA software that is available to try on demo account and it is absolutely mind blowing, best ever! This company really knows what they are doing.",
      author: "Gergo Fancsali",
    },
    {
      title: carouselTitle,
      content:
        "As an FX trader that’s been with many companies, some good mostly bad…I’ve never been so profitable as I have with this company.  Although you hear it said many times, they are truly the “real deal”. Rest, weary traveler, you’ve finally come to an oasis for prosperity! They more than deserve their praise.  Sign on, and see for yourself!",
      author: "Joel Kim",
    },
  ];
  return (
    <div>
      <div className="main-content">
        <section
          className="home-section bg-gray-lighter bg-scroll"
          data-background="/assets/home/images/20210622/hlx_background.jpg?v=1"
          id="home"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210622/hlx_background.jpg?v=1')",
          }}
        >
          <div className="js-height-full container-1400">
            <div className="home-content">
              <div className="home-text">
                <h1 className="hs-line-8-1 no-transp mb-50 mb-xs-30 text-black">
                  A new approach to learning how to trade!
                </h1>
                <h2 className="text-fade-slider-box hs-line-14-1 mb-50 mb-xs-30 text-black">
                  <ReactTextRotator
                    content={content}
                    time={5000}
                    startDelay={10}
                  />
                </h2>
                <div className="local-scroll">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row grid-sm-row">
                          <div className="col-md-12 mt-10 text-center">
                            <Link
                              to={ROUTE_REGISTER}
                              activeclassname="active"
                              className="btn btn-mod btn-border btn-medium btn-round"
                            >
                              Get started now!
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="local-scroll">
              <a href="#membersihp" className="scroll-down">
                <i
                  className="fa fa-angle-down scroll-down-icon"
                  aria-hidden="true"
                ></i>
                <span className="sr-only">Scroll to the next section</span>
              </a>
            </div>
          </div>
        </section>
        <section
          className="page-section pt-100 pb-100 pt-xs-60 pb-xs-60 bg-white"
          id="membersihp"
        >
          <div className="container-1400 relative">
            <h2 className="section-title font-alt mb-70 mb-sm-40 text-left m-text-center t-show-mobile">
              Membership
            </h2>
            <div className="row">
              <div className="col-md-4 mb-sm-40">
                <div className="work-full-media mt-0 white-shadow wow fadeInDown">
                  <div className="alpha-box block position-relative text-center">
                    <div className="alpha-img-box mb-10">
                      <img
                        src="/assets/home/images/20210314/eagle-logo-membership.jpg"
                        className="width-30"
                        alt=""
                      />
                    </div>
                    <h4 className="text-normal-spacing alpha-title mb-10">
                      ALPHA GOLD
                    </h4>
                    <div className="text-normal-spacing alpha-desc mb-20">
                      Free VPS
                      <br />
                      Two software licenses
                      <br />
                      Threee Educatoinal Software
                      <br />
                      Basic & Advanced HLX Academy
                      <br />
                    </div>
                    <h3 className="text-normal-spacing alpha-price-box mt-20 mb-20">
                      $159 every 4 weeks
                    </h3>
                    <div className="alpha-button-box mb-xs-40">
                      <div className="mt-20 text-normal-spacing">
                        <Link
                          to={ROUTE_REGISTER}
                          activeclassname="active"
                          className="btn btn-mod btn-border btn-round btn-medium"
                        >
                          Get started now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-lg-offset-1">
                <h2 className="section-title font-alt mb-70 mb-sm-40 text-left m-text-center t-show-desktop">
                  Membership
                </h2>
                <div className="">
                  <h4 className="mb-30 mb-xxs-10 m-text-center text-normal-spacing">
                    For those looking to elevate their trading experience to the
                    next level:
                  </h4>
                  <ul className="text-normal-spacing list-1">
                    <li>2 Software Licenses</li>
                    <li>
                      Access to Higher Level Academy + Higher Level Advanced
                      Academy
                    </li>
                    <li>
                      HLX Advanced Academy is the perfect place to learn and
                      build a complete understanding of the markets. Designed to
                      maximize your Risk/Reward and precision on the charts. In
                      our opinion, the knowledge you will gain here cannot be
                      found anywhere in the world!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="mt-0 mb-0" />
        <section
          className="page-section pt-0 pb-0 banner-section bg-dark"
          data-background="/assets/home/images/20210314/picture-higher-level-academy.jpg"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210314/picture-higher-level-academy.jpg')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-md-8 col-lg-7">
                <div className="mt-80 mb-80">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt">
                      Higher Level Academy
                    </h3>
                    <div className="banner-decription text-normal-spacing">
                      Forex education like never seen before. We take you deep
                      into the world of technical analysis. Showing you step by
                      step how to analyze and break down the markets. Taking you
                      from a complete beginner to understanding high Risk/Reward
                      entries with precision. This could change your life!
                    </div>
                    <div className="local-scroll">
                      <Link
                        to={ROUTE_REGISTER}
                        activeclassname="active"
                        className="btn btn-mod btn-w btn-medium btn-round"
                      >
                        Get started now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-md-4 col-lg-4 banner-image img-box wow fadeInDown">
                <img
                  src="/assets/home/images/20210314/higherlevel-academy.png"
                  className="width-80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box"></div>
        <section
          className="page-section pt-0 pb-0 banner-section bg-dark"
          data-background="/assets/home/images/20210314/picture-alpha.jpg"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210314/picture-alpha.jpg')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-sm-4 wow fadeInDown">
                <div className="banner-image-box-1 img-box">
                  <img
                    src="/assets/home/images/20210314/alpha.png"
                    className="width-80 mt-xs-80"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-lg-offset-1">
                <div className="mt-80 mb-80">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt text-right m-text-center">
                      Alpha 2.5
                    </h3>
                    <div className="banner-decription text-normal-spacing">
                      Cutting-edge training software. Engineered for precision!
                      The only software you will ever need to become a better
                      trader. Imagine being able to look over the shoulder of a
                      professional trader as they make real-time trades. We've
                      developed a software that can be loaded on a demo account
                      for you to monitor and see simulated trading in action.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box"></div>
        <section
          className="page-section pt-0 pb-0 banner-section bg-white"
          data-background="/assets/home/images/20210410/bg1.jpg"
          style={{
            backgroundImage: "url('/assets/home/images/20210410/bg1.jpg')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-md-8 col-lg-7">
                <div className="mt-80 mb-80">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt text-black">
                      Alpha GR
                    </h3>
                    <div className="banner-decription text-normal-spacing text-black">
                      Alpha GR analyzes the market 24/5. There is no fixed
                      algorithm as its strategy. It's always changing based upon
                      historical patterns in the gathered data.
                    </div>
                    <div className="banner-decription text-normal-spacing text-black">
                      It teaches you how to use stop losses like a pro, how to
                      use pending orders, and leverage smart hedging.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-md-4 col-lg-4 banner-image banner-image-alpha-gr img-box wow fadeInDown">
                <img
                  src="/assets/home/images/20210410/alpha-gr.png"
                  className="width-80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box t-show-desktop"></div>
        <section
          className="page-section pt-0 pb-0 banner-section bg-white"
          data-background="/assets/home/images/20210420/white.jpg?v=1"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210420/white.jpg?v=1')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-sm-4 wow fadeInLeft">
                <div className="banner-image-box-1 img-box">
                  <img
                    src="/assets/home/images/20210420/8.png"
                    className="width-80 mt-xs-80"
                    style={{ bottom: "0" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-lg-offset-1">
                <div className="mt-60 mb-60">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt text-right m-text-center text-black">
                      Alpha GO
                    </h3>
                    <div className="banner-decription text-normal-spacing text-black">
                      <p className="mb-20">
                        The reason it’s called Alpha GO is that you can learn
                        with it while “On the GO” without needing to be around
                        your VPS.
                      </p>
                      <p className="mb-20">
                        Alpha GO is an educational tool that teaches you how to
                        turn a bad trade around. It only handles your manual
                        trades on your demo account if they start going in the
                        wrong direction based on the way you placed your trades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box hidden"></div>
        <section
          className="hidden page-section pt-0 pb-0 banner-section bg-dark"
          data-background="/assets/home/images/20210314/picture-live-trading.jpg"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210314/picture-live-trading.jpg')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-md-12">
                <div className="mt-80 mb-80">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt text-center mb-60">
                      LIVE TRADING SESSIONS
                    </h3>
                    <div className="banner-decription text-normal-spacing text-center">
                      This is the go-to place to experience the excitement of
                      the
                      <br /> FX market week in week out. With in-depth market
                      analysis, breakdowns &amp; discussions.
                      <br />
                      Giving a complete insight into what it takes to trade at a
                      world-className level.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box"></div>
        <section className="page-section pt-0 pb-0 banner-section bg-dark">
          <div className="container relative">
            <div className="row">
              <div className="col-sm-4 wow fadeInLeft">
                <div className="block mt-20 mt-xs-80 img-box text-left m-text-center">
                  <img
                    src="/assets/home/images/20210314/hlx-application.png"
                    className="width-80"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-lg-offset-1">
                <div className="mt-60 mb-60">
                  <div className="banner-content">
                    <h3 className="banner-heading font-alt text-left m-text-center">
                      HLX Trade Alerts App (coming soon!)
                    </h3>
                    <div className="banner-decription text-normal-spacing">
                      <ul className="mt-40 list-1 m-text-left">
                        <li>
                          This is a completely independent full-on platform used
                          to breakdown trades without needing your MT4!
                        </li>
                        <li>
                          Let us scan the market EVERY SECOND for you and send
                          you the most accurate trade alerts!
                        </li>
                        <li>You also get Live charts and Forex Calculators!</li>
                        <li>
                          Integrated Economic Calendar to keep you informed!
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box"></div>
        <section
          className="page-section pt-0 pb-0 banner-section bg-white"
          data-background="/assets/home/images/20210314/picture-affiliate.jpg"
          style={{
            backgroundImage:
              "url('/assets/home/images/20210314/picture-affiliate.jpg')",
          }}
        >
          <div className="container relative">
            <div className="row">
              <div className="col-sm-4 wow fadeInLeft animated">
                <div className="block img-box mt-50 mt-50 mt-xs-80 text-left m-text-center">
                  <img
                    src="/assets/home/images/20210314/affiliate.png"
                    className="width-80"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-7 col-lg-offset-1">
                <div className="mt-60 mb-120 mb-xs-60">
                  <div className="banner-content">
                    <h3 className="banner-heading text-black font-alt text-right m-text-center">
                      Affiliate Package
                    </h3>
                    <div className="banner-heading text-black text-normal-spacing text-left m-text-center">
                      What's inside the affiliate package?
                    </div>
                    <div className="banner-decription text-black text-normal-spacing">
                      <ul className="mt-40 list-1 m-text-left">
                        <li>Enhanced Backoffice!</li>
                        <li>Dedicated VIP Support Team!</li>
                        <li>Access to Our Rewards Plan!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider-box"></div>

        <section
          className="page-section bg-dark bg-dark-alfa-95"
          data-background="/assets/home/images/20210314/map.jpg"
          style={{
            backgroundImage: "url('/assets/home/images/20210314/map.jpg')",
            opacity: "1",
            display: "block",
          }}
        >
          <OwlCarousel
            className="owl-theme"
            loop={true}
            margin={10}
            nav={true}
            autoplay={true}
            lazyLoad={true}
            items={1}
          >
            {carouselItems.map((item, index) => (
              <div className="item" key={index}>
                <div className="container relative">
                  <div className="row">
                    <div className="col-md-12 align-center">
                      <h4 className="small-title font-alt">{item.title}</h4>
                      <div className="lead">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <blockquote className="blockquote testimonial white mt-3">
                        <p>{item.content}</p>
                        <footer className="testimonial-author blockquote-footer">
                          {item.author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </section>

        <section className="page-section bg-white pt-40 pb-40">
          <div className="container relative">
            <div className="row">
              <div className="col-md-12 align-center">
                <h5 className="text-normal-spacing mb-40 mb-xs-20">
                  We know that once you see what we have to offer and experience
                  it hands-on, you are going to want to continue your growth
                  with us! If for any reason you decide that it isn't for you,
                  cancel anytime!
                  <br /> No questions asked!
                </h5>
                <div className="divider-half-1"></div>
                <h5 className="text-normal-spacing mt-40 mb-10 mb-xs-20">
                  <span className="text-green text-underline">
                    *Upgrade Notice
                  </span>
                  : If membership isn't cancelled within the 7-day trial it will
                  automatically go to a normal membership and begin being
                  charged $159 per month.
                </h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
function HomePage(props) {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Home";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_ROOT,
      })
    );
    //document.title = page_title;
  };

  useEffect(() => {
    initPage();
  });
  return (
    <div>
      <HomeLayout>
        <SubHomePage></SubHomePage>
      </HomeLayout>
    </div>
  );
}
export default HomePage;
