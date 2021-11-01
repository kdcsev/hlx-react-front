import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_FREE_BOOK, ROUTE_PRIVACY_POLICY } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const PrivacyPolicyPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Privacy Policy";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_PRIVACY_POLICY,
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
                  <h4 className="text-normal-spacing d-margin-bottom-30">
                    PRIVACY NOTICE (HLX Trader App)
                  </h4>
                  <p className="desc-v1-1">Last updated August 22, 2021</p>
                  <p className="desc-v1-1">
                    Thank you for choosing to be part of our community at HL4X
                    International LLC, doing business as Higher Level FX
                    ("Higher Level FX," "we," "us," or "our"). We are committed
                    to protecting your personal information and your right to
                    privacy. If you have any questions or concerns about this
                    privacy notice or our practices with regard to your personal
                    information, please contact us at higherlevelfx@gmail.com.
                  </p>
                  <div className="desc-v1-1">
                    This privacy notice describes how we might use your
                    information if you:
                    <ul>
                      <li>
                        Download and use our mobile application — HLX Trader
                      </li>
                      <li>
                        Engage with us in other related ways ― including any
                        sales, marketing, or events
                      </li>
                    </ul>
                  </div>
                  <div className="desc-v1-1">
                    In this privacy notice, if we refer to:
                    <ul>
                      <li>
                        "App," we are referring to any application of ours that
                        references or links to this policy, including any listed
                        above
                      </li>
                      <li>
                        "Services," we are referring to our App, and other
                        related services, including any sales, marketing, or
                        events
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    The purpose of this privacy notice is to explain to you in
                    the clearest way possible what information we collect, how
                    we use it, and what rights you have in relation to it. If
                    there are any terms in this privacy notice that you do not
                    agree with, please discontinue use of our Services
                    immediately.
                    <br />
                    Please read this privacy notice carefully, as it will help
                    you understand what we do with the information that we
                    collect.
                  </p>
                  <div className="desc-v1-1">
                    TABLE OF CONTENTS
                    <br />
                    <div>
                      1. WHAT INFORMATION DO WE COLLECT?
                      <br />
                      2. HOW DO WE USE YOUR INFORMATION?
                      <br />
                      3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                      <br />
                      4. WHO WILL YOUR INFORMATION BE SHARED WITH?
                      <br />
                      5. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                      <br />
                      6. HOW LONG DO WE KEEP YOUR INFORMATION?
                      <br />
                      7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                      <br />
                      8. WHAT ARE YOUR PRIVACY RIGHTS?
                      <br />
                      9. CONTROLS FOR DO-NOT-TRACK FEATURES
                      <br />
                      10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                      <br />
                      11. DO WE MAKE UPDATES TO THIS NOTICE?
                      <br />
                      12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                      <br />
                      13. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE
                      COLLECT FROM YOU?
                      <br />
                    </div>
                    <br />
                  </div>
                  <p className="desc-v1-1">
                    1. WHAT INFORMATION DO WE COLLECT? <br />
                    Personal information you disclose to us
                    <br />
                    We collect personal information that you voluntarily provide
                    to us when you register on the App, express an interest in
                    obtaining information about us or our products and Services,
                    when you participate in activities on the App or otherwise
                    when you contact us.
                    <br />
                    The personal information that we collect depends on the
                    context of your interactions with us and the App, the
                    choices you make and the products and features you use. The
                    personal information we collect may include the following:
                    <br />
                    All personal information that you provide to us must be
                    true, complete and accurate, and you must notify us of any
                    changes to such personal information.
                    <br />
                    Information collected through our App
                    <br />
                    If you use our App, we also collect the following
                    information:
                    <br />
                    Push Notifications. We may request to send you push
                    notifications regarding your account or certain features of
                    the App. If you wish to opt-out from receiving these types
                    of communications, you may turn them off in your device's
                    settings.
                    <br />
                    This information is primarily needed to maintain the
                    security and operation of our App, for troubleshooting and
                    for our internal analytics and reporting purposes.
                    <br />
                    Information collected from other sources
                    <br />
                    In order to enhance our ability to provide relevant
                    marketing, offers and services to you and update our
                    records, we may obtain information about you from other
                    sources, such as public databases, joint marketing partners,
                    affiliate programs, data providers, as well as from other
                    third parties. This information includes mailing addresses,
                    job titles, email addresses, phone numbers, intent data (or
                    user behavior data), Internet Protocol (IP) addresses,
                    social media profiles, social media URLs and custom
                    profiles, for purposes of targeted advertising and event
                    promotion.
                    <br />
                  </p>
                  <p className="desc-v1-1">
                    2. HOW DO WE USE YOUR INFORMATION?
                    <br />
                    We use personal information collected via our App for a
                    variety of business purposes described below. We process
                    your personal information for these purposes in reliance on
                    our legitimate business interests, in order to enter into or
                    perform a contract with you, with your consent, and/or for
                    compliance with our legal obligations. We indicate the
                    specific processing grounds we rely on next to each purpose
                    listed below.
                    <br />
                  </p>
                  <div className="desc-v1-1">
                    We use the information we collect or receive:
                    <br />
                    <ul>
                      <li>
                        To facilitate account creation and logon process. If you
                        choose to link your account with us to a third-party
                        account (such as your Google or Facebook account), we
                        use the information you allowed us to collect from those
                        third parties to facilitate account creation and logon
                        process for the performance of the contract.
                      </li>
                      <li>
                        Request feedback. We may use your information to request
                        feedback and to contact you about your use of our App.
                      </li>
                      <li>
                        To enable user-to-user communications. We may use your
                        information in order to enable user-to-user
                        communications with each user's consent.
                      </li>
                      <li>
                        To manage user accounts. We may use your information for
                        the purposes of managing our account and keeping it in
                        working order.
                      </li>
                      <li>
                        To send administrative information to you. We may use
                        your personal information to send you product, service
                        and new feature information and/or information about
                        changes to our terms, conditions, and policies.
                      </li>
                      <li>
                        To protect our Services. We may use your information as
                        part of our efforts to keep our App safe and secure (for
                        example, for fraud monitoring and prevention).
                      </li>
                      <li>
                        To enforce our terms, conditions and policies for
                        business purposes, to comply with legal and regulatory
                        requirements or in connection with our contract.
                      </li>
                      <li>
                        To respond to legal requests and prevent harm. If we
                        receive a subpoena or other legal request, we may need
                        to inspect the data we hold to determine how to respond.
                      </li>
                      <li>
                        Administer prize draws and competitions. We may use your
                        information to administer prize draws and competitions
                        when you elect to participate in our competitions.
                      </li>
                      <li>
                        To deliver and facilitate delivery of services to the
                        user. We may use your information to provide you with
                        the requested service.
                      </li>
                      <li>
                        To respond to user inquiries/offer support to users. We
                        may use your information to respond to your inquiries
                        and solve any potential issues you might have with the
                        use of our Services.
                      </li>
                      <li>
                        To send you marketing and promotional communications. We
                        and/or our third-party marketing partners may use the
                        personal information you send to us for our marketing
                        purposes, if this is in accordance with your marketing
                        preferences. For example, when expressing an interest in
                        obtaining information about us or our App, subscribing
                        to marketing or otherwise contacting us, we will collect
                        personal information from you. You can opt-out of our
                        marketing emails at any time (see the "WHAT ARE YOUR
                        PRIVACY RIGHTS?" below).
                      </li>
                      <li>
                        Deliver targeted advertising to you. We may use your
                        information to develop and display personalized content
                        and advertising (and work with third parties who do so)
                        tailored to your interests and/or location and to
                        measure its effectiveness.
                      </li>
                      <li>
                        For other business purposes. We may use your information
                        for other business purposes, such as data analysis,
                        identifying usage trends, determining the effectiveness
                        of our promotional campaigns and to evaluate and improve
                        our App, products, marketing and your experience. We may
                        use and store this information in aggregated and
                        anonymized form so that it is not associated with
                        individual end users and does not include personal
                        information. We will not use identifiable personal
                        information without your consent.
                      </li>
                    </ul>
                  </div>

                  <div className="desc-v1-1">
                    3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                    <br />
                    We may process or share your data that we hold based on the
                    following legal basis:
                    <ul>
                      <li>
                        Consent: We may process your data if you have given us
                        specific consent to use your personal information for a
                        specific purpose.
                      </li>
                      <li>
                        Legitimate Interests: We may process your data when it
                        is reasonably necessary to achieve our legitimate
                        business interests.
                      </li>
                      <li>
                        Performance of a Contract: Where we have entered into a
                        contract with you, we may process your personal
                        information to fulfill the terms of our contract.
                      </li>
                      <li>
                        Legal Obligations: We may disclose your information
                        where we are legally required to do so in order to
                        comply with applicable law, governmental requests, a
                        judicial proceeding, court order, or legal process, such
                        as in response to a court order or a subpoena (including
                        in response to public authorities to meet national
                        security or law enforcement requirements).
                      </li>
                      <li>
                        Vital Interests: We may disclose your information where
                        we believe it is necessary to investigate, prevent, or
                        take action regarding potential violations of our
                        policies, suspected fraud, situations involving
                        potential threats to the safety of any person and
                        illegal activities, or as evidence in litigation in
                        which we are involved.
                      </li>
                    </ul>
                  </div>
                  <div className="desc-v1-1">
                    More specifically, we may need to process your data or share
                    your personal information in the following situations:
                    <br />
                    <ul>
                      <li>
                        Business Transfers. We may share or transfer your
                        information in connection with, or during negotiations
                        of, any merger, sale of company assets, financing, or
                        acquisition of all or a portion of our business to
                        another company.
                      </li>
                      <li>
                        Vendors, Consultants and Other Third-Party Service
                        Providers. We may share your data with third-party
                        vendors, service providers, contractors or agents who
                        perform services for us or on our behalf and require
                        access to such information to do that work. Examples
                        include: payment processing, data analysis, email
                        delivery, hosting services, customer service and
                        marketing efforts. We may allow selected third parties
                        to use tracking technology on the App, which will enable
                        them to collect data on our behalf about how you
                        interact with our App over time. This information may be
                        used to, among other things, analyze and track data,
                        determine the popularity of certain content, pages or
                        features, and better understand online activity. Unless
                        described in this notice, we do not share, sell, rent or
                        trade any of your information with third parties for
                        their promotional purposes. We have contracts in place
                        with our data processors, which are designed to help
                        safeguard your personal information. This means that
                        they cannot do anything with your personal information
                        unless we have instructed them to do it. They will also
                        not share your personal information with any
                        organization apart from us. They also commit to protect
                        the data they hold on our behalf and to retain it for
                        the period we instruct.
                      </li>
                      <li>
                        Business Partners. We may share your information with
                        our business partners to offer you certain products,
                        services or promotions.
                      </li>
                    </ul>
                  </div>
                  <div className="desc-v1-1">
                    4. WHO WILL YOUR INFORMATION BE SHARED WITH?
                    <br />
                    We only share and disclose your information with the
                    following categories of third parties. If we have processed
                    your data based on your consent and you wish to revoke your
                    consent, please contact us using the contact details
                    provided in the section below titled "HOW CAN YOU CONTACT US
                    ABOUT THIS NOTICE?".
                    <ul>
                      <li>Sales & Marketing Tools</li>
                      <li>Testing Tools</li>
                      <li>
                        User Account Registration & Authentication Services
                      </li>
                    </ul>
                  </div>

                  <div className="desc-v1-1">
                    5. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                    <br />
                    Our servers are in the cloud. If you are accessing our App
                    from outside, please be aware that your information may be
                    transferred to, stored, and processed by us in our
                    facilities and by those third parties with whom we may share
                    your personal information (see "WILL YOUR INFORMATION BE
                    SHARED WITH ANYONE?" above), in and other countries.
                    <br />
                    If you are a resident in the European Economic Area (EEA) or
                    United Kingdom (UK), then these countries may not
                    necessarily have data protection laws or other similar laws
                    as comprehensive as those in your country. We will however
                    take all necessary measures to protect your personal
                    information in accordance with this privacy notice and
                    applicable law.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    6. HOW LONG DO WE KEEP YOUR INFORMATION?
                    <br />
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this privacy
                    notice, unless a longer retention period is required or
                    permitted by law (such as tax, accounting or other legal
                    requirements). No purpose in this notice will require us
                    keeping your personal information for longer than sixty (60)
                    months past the termination of the user's account.
                    <br />
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymize such information, or, if this is not possible (for
                    example, because your personal information has been stored
                    in backup archives), then we will securely store your
                    personal information and isolate it from any further
                    processing until deletion is possible.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                    <br />
                    We have implemented appropriate technical and organizational
                    security measures designed to protect the security of any
                    personal information we process. However, despite our
                    safeguards and efforts to secure your information, no
                    electronic transmission over the Internet or information
                    storage technology can be guaranteed to be 100% secure, so
                    we cannot promise or guarantee that hackers, cybercriminals,
                    or other unauthorized third parties will not be able to
                    defeat our security, and improperly collect, access, steal,
                    or modify your information. Although we will do our best to
                    protect your personal information, transmission of personal
                    information to and from our App is at your own risk. You
                    should only access the App within a secure environment.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    8. WHAT ARE YOUR PRIVACY RIGHTS?
                    <br />
                    In some regions (like the EEA and UK), you have certain
                    rights under applicable data protection laws. These may
                    include the right (i) to request access and obtain a copy of
                    your personal information, (ii) to request rectification or
                    erasure; (iii) to restrict the processing of your personal
                    information; and (iv) if applicable, to data portability. In
                    certain circumstances, you may also have the right to object
                    to the processing of your personal information. To make such
                    a request, please use the contact details provided below. We
                    will consider and act upon any request in accordance with
                    applicable data protection laws.
                    <br />
                    If we are relying on your consent to process your personal
                    information, you have the right to withdraw your consent at
                    any time. Please note however that this will not affect the
                    lawfulness of the processing before its withdrawal, nor will
                    it affect the processing of your personal information
                    conducted in reliance on lawful processing grounds other
                    than consent.
                    <br />
                    If you are a resident in the EEA or UK and you believe we
                    are unlawfully processing your personal information, you
                    also have the right to complain to your local data
                    protection supervisory authority. You can find their contact
                    details here:{" "}
                    <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html">
                      https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html
                    </a>{" "}
                    .<br />
                    If you are a resident in Switzerland, the contact details
                    for the data protection authorities are available here:{" "}
                    <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">
                      https://www.edoeb.admin.ch/edoeb/en/home.html
                    </a>
                    .<br />
                    If you have questions or comments about your privacy rights,
                    you may email us at admin@higherlevelfx.com.
                    <br />
                    Account Information
                    <br />
                    If you would at any time like to review or change the
                    information in your account or terminate your account, you
                    can:
                    <br />
                    <ul>
                      <li>
                        Log in to your account settings and update your user
                        account.
                      </li>
                    </ul>
                    Upon your request to terminate your account, we will
                    deactivate or delete your account and information from our
                    active databases. However, we may retain some information in
                    our files to prevent fraud, troubleshoot problems, assist
                    with any investigations, enforce our Terms of Use and/or
                    comply with applicable legal requirements.
                    <br />
                    Opting out of email marketing: You can unsubscribe from our
                    marketing email list at any time by clicking on the
                    unsubscribe link in the emails that we send or by contacting
                    us using the details provided below. You will then be
                    removed from the marketing email list — however, we may
                    still communicate with you, for example to send you
                    service-related emails that are necessary for the
                    administration and use of your account, to respond to
                    service requests, or for other non-marketing purposes. To
                    otherwise opt-out, you may:
                    <br />
                    <ul>
                      <li>
                        Access your account settings and update your
                        preferences.
                        <br />
                      </li>
                    </ul>
                  </div>
                  <div className="desc-v1-1">
                    9. CONTROLS FOR DO-NOT-TRACK FEATURES
                    <br />
                    Most web browsers and some mobile operating systems and
                    mobile applications include a Do-Not-Track ("DNT") feature
                    or setting you can activate to signal your privacy
                    preference not to have data about your online browsing
                    activities monitored and collected. At this stage no uniform
                    technology standard for recognizing and implementing DNT
                    signals has been finalized. As such, we do not currently
                    respond to DNT browser signals or any other mechanism that
                    automatically communicates your choice not to be tracked
                    online. If a standard for online tracking is adopted that we
                    must follow in the future, we will inform you about that
                    practice in a revised version of this privacy notice.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                    <br />
                    California Civil Code Section 1798.83, also known as the
                    "Shine The Light" law, permits our users who are California
                    residents to request and obtain from us, once a year and
                    free of charge, information about categories of personal
                    information (if any) we disclosed to third parties for
                    direct marketing purposes and the names and addresses of all
                    third parties with which we shared personal information in
                    the immediately preceding calendar year. If you are a
                    California resident and would like to make such a request,
                    please submit your request in writing to us using the
                    contact information provided below.
                    <br />
                    If you are under 18 years of age, reside in California, and
                    have a registered account with the App, you have the right
                    to request removal of unwanted data that you publicly post
                    on the App. To request removal of such data, please contact
                    us using the contact information provided below, and include
                    the email address associated with your account and a
                    statement that you reside in California. We will make sure
                    the data is not publicly displayed on the App, but please be
                    aware that the data may not be completely or comprehensively
                    removed from all our systems (e.g. backups, etc.).
                    <br />
                    CCPA Privacy Notice
                    <br />
                    The California Code of Regulations defines a "resident" as:
                    <br />
                    (1) every individual who is in the State of California for
                    other than a temporary or transitory purpose and
                    <br />
                    (2) every individual who is domiciled in the State of
                    California who is outside the State of California for a
                    temporary or transitory purpose
                    <br />
                    All other individuals are defined as "non-residents."
                    <br />
                    If this definition of "resident" applies to you, we must
                    adhere to certain rights and obligations regarding your
                    personal information.
                    <br />
                    We may also collect other personal information outside of
                    these categories instances where you interact with us
                    in-person, online, or by phone or mail in the context of:
                    <br />
                    <ul>
                      <li>
                        Receiving help through our customer support channels;
                      </li>
                      <li>
                        Participation in customer surveys or contests; and
                      </li>
                      <li>
                        Facilitation in the delivery of our Services and to
                        respond to your inquiries.
                      </li>
                    </ul>
                    How do we use and share your personal information?
                    <br />
                    More information about our data collection and sharing
                    practices can be found in this privacy notice.
                    <br />
                    You may contact us or by referring to the contact details at
                    the bottom of this document.
                    <br />
                    If you are using an authorized agent to exercise your right
                    to opt-out we may deny a request if the authorized agent
                    does not submit proof that they have been validly authorized
                    to act on your behalf.
                    <br />
                    Will your information be shared with anyone else?
                    <br />
                    We may disclose your personal information with our service
                    providers pursuant to a written contract between us and each
                    service provider. Each service provider is a for-profit
                    entity that processes the information on our behalf.
                    <br />
                    We may use your personal information for our own business
                    purposes, such as for undertaking internal research for
                    technological development and demonstration. This is not
                    considered to be "selling" of your personal data.
                    <br />
                    HL4X International LLC has disclosed the following
                    categories of personal information to third parties for a
                    business or commercial purpose in the preceding twelve (12)
                    months:
                    <br />
                    <ul>
                      <li>
                        Category B. Personal information, as defined in the
                        California Customer Records law, such as your name,
                        contact information, education, employment, employment
                        history and financial information.
                      </li>
                    </ul>
                    The categories of third parties to whom we disclosed
                    personal information for a business or commercial purpose
                    can be found under "WHO WILL YOUR INFORMATION BE SHARED
                    WITH?".
                    <br />
                    HL4X International LLC has not sold any personal information
                    to third parties for a business or commercial purpose in the
                    preceding twelve (12) months. HL4X International LLC will
                    not sell personal information in the future belonging to
                    website visitors, users and other consumers.
                    <br />
                    Your rights with respect to your personal data
                    <br />
                    Right to request deletion of the data - Request to delete
                    <br />
                    You can ask for the deletion of your personal information.
                    If you ask us to delete your personal information, we will
                    respect your request and delete your personal information,
                    subject to certain exceptions provided by law, such as (but
                    not limited to) the exercise by another consumer of his or
                    her right to free speech, our compliance requirements
                    resulting from a legal obligation or any processing that may
                    be required to protect against illegal activities.
                    <br />
                    Right to be informed - Request to know
                    <br />
                    Depending on the circumstances, you have a right to know:
                    <br />
                    <ul>
                      <li>
                        whether we collect and use your personal information;
                      </li>
                      <li>
                        the categories of personal information that we collect;
                      </li>
                      <li>
                        the purposes for which the collected personal
                        information is used; whether we sell your personal
                        information to third parties;
                      </li>
                      <li>
                        the categories of personal information that we sold or
                        disclosed for a business purpose;
                      </li>
                      <li>
                        the categories of third parties to whom the personal
                        information was sold or disclosed for a business
                        purpose; and
                      </li>
                      <li>
                        the business or commercial purpose for collecting or
                        selling personal information.
                      </li>
                    </ul>
                    In accordance with applicable law, we are not obligated to
                    provide or delete consumer information that is de-identified
                    in response to a consumer request or to re-identify
                    individual data to verify a consumer request.
                    <br />
                    Right to Non-Discrimination for the Exercise of a Consumer’s
                    Privacy Rights
                    <br />
                    We will not discriminate against you if you exercise your
                    privacy rights.
                    <br />
                    Verification process
                    <br />
                    Upon receiving your request, we will need to verify your
                    identity to determine you are the same person about whom we
                    have the information in our system. These verification
                    efforts require us to ask you to provide information so that
                    we can match it with information you have previously
                    provided us. For instance, depending on the type of request
                    you submit, we may ask you to provide certain information so
                    that we can match the information you provide with the
                    information we already have on file, or we may contact you
                    through a communication method (e.g. phone or email) that
                    you have previously provided to us. We may also use other
                    verification methods as the circumstances dictate.
                    <br />
                    We will only use personal information provided in your
                    request to verify your identity or authority to make the
                    request. To the extent possible, we will avoid requesting
                    additional information from you for the purposes of
                    verification. If, however, we cannot verify your identity
                    from the information already maintained by us, we may
                    request that you provide additional information for the
                    purposes of verifying your identity, and for security or
                    fraud-prevention purposes. We will delete such additionally
                    provided information as soon as we finish verifying you.
                    <br />
                    Other privacy rights
                    <br />
                    <ul>
                      <li>
                        you may object to the processing of your personal data
                      </li>
                      <li>
                        you may request correction of your personal data if it
                        is incorrect or no longer relevant, or ask to restrict
                        the processing of the data
                      </li>
                      <li>
                        you can designate an authorized agent to make a request
                        under the CCPA on your behalf. We may deny a request
                        from an authorized agent that does not submit proof that
                        they have been validly authorized to act on your behalf
                        in accordance with the CCPA.
                      </li>
                      <li>
                        you may request to opt-out from future selling of your
                        personal information to third parties. Upon receiving a
                        request to opt-out, we will act upon the request as soon
                        as feasibly possible, but no later than 15 days from the
                        date of the request submission.
                      </li>
                    </ul>
                    To exercise these rights, you can contact us or by referring
                    to the contact details at the bottom of this document. If
                    you have a complaint about how we handle your data, we would
                    like to hear from you.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    11. DO WE MAKE UPDATES TO THIS NOTICE?
                    <br />
                    We may update this privacy notice from time to time. The
                    updated version will be indicated by an updated "Revised"
                    date and the updated version will be effective as soon as it
                    is accessible. If we make material changes to this privacy
                    notice, we may notify you either by prominently posting a
                    notice of such changes or by directly sending you a
                    notification. We encourage you to review this privacy notice
                    frequently to be informed of how we are protecting your
                    information.
                    <br />
                    <br />
                  </div>
                  <div className="desc-v1-1">
                    12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                    <br />
                    If you have questions or comments about this notice, you may
                    email us at admin@higherlevelfx.com or by post to:
                    <br />
                    <br />
                    HL4X International LLC
                    <br />
                    Brown Hill
                    <br />
                    St John's Parish, Nevis, W.I
                    <br />
                    KN0802
                    <br />
                    Saint Kitts and Nevis
                    <br />
                  </div>
                  <p className="desc-v1-1">&nbsp;</p>
                </div>
              </div>
            </div>

            <div className="container d-padding-top-20">
              <div className="row d-margin-top-20">
                <div className="col-md-12 md-margin-bottom-30">
                  <h4 className="text-normal-spacing d-margin-bottom-30">
                    Privacy Policy (Website)
                  </h4>
                  <p className="desc-v1-1">Effective March 02, 2020</p>
                  <p className="desc-v1-1">
                    HL4X International LLC (“Company”, “We”, or “Us”) recognizes
                    and values the importance of privacy. We want you as a
                    visitor to our website (“Website”) to feel confident using
                    our products and services, and this privacy policy notice
                    (“Notice”) is to help you better understand how we collect,
                    use, and disclose your information.
                  </p>
                  <div className="desc-v1-1">
                    This Policy describes the following:
                    <ul>
                      <li>
                        What information we collect and how it is collected
                      </li>
                      <li>How we use your information</li>
                      <li>With whom we may share your information with</li>
                      <li>Your rights and choices</li>
                      <li>Security and storage of the information</li>
                      <li>Third party websites</li>
                      <li>Transfer of your information</li>
                      <li>Do Not Track</li>
                      <li>Children and privacy</li>
                      <li>Contact information and changes to this notice</li>
                    </ul>
                  </div>
                  <div className="desc-v1-1">
                    INFORMATION WE COLLECT
                    <br />
                    We collect information about you directly from you and
                    automatically through your use of our Website. We may
                    combine information automatically collected with other
                    information that we have collected about you including from
                    publicly available sources. How we collect and process this
                    information is as follows:
                    <ul>
                      <li>
                        When you register an account with us, you provide us
                        with personally identifiable information like name,
                        email address, phone number, username, and password,
                        etc. Moreover, you have the ability to add information
                        to your profile after registration.
                      </li>
                      <li>
                        If you buy something through our Website, we may collect
                        information on this transaction, such as payment
                        information, purchase activity, and shipping/contact
                        details.
                      </li>
                      <li>
                        Occasionally, you may voluntarily provide information to
                        us to complete surveys and questionnaires or to
                        participate in user polls. We use this information to
                        improve our products and services and to ensure that
                        we’re providing accurate disclosures. We may also use
                        your information to provide you newsletters and other
                        marketing information that coincides with your
                        preferences. You may customize your marketing
                        preferences, or let us know if you do not wish to
                        receive any promotional materials, by adjusting your
                        Subscriptions & Email options on the Site.
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    From time to time, we may collect personal information about
                    you from third party sources which we will use for our
                    business purposes (for example, in order to better serve you
                    with content or promotions). However, we will only use this
                    information where these third parties either have your
                    consent or are otherwise legally permitted or required to
                    disclose your personal information to us.
                  </p>
                  <p className="desc-v1-1">
                    B. Information Collected Automatically
                  </p>
                  <p className="desc-v1-1">
                    When you visit our Website, We may collect certain user
                    information automatically from your device. In some
                    territories, including California and countries in the
                    European Economic Area, this information may be considered
                    personal data or personally identifiable information under
                    applicable data protection laws.
                  </p>
                  <p className="desc-v1-1">
                    More broadly speaking, the user information We collect
                    automatically may include information like your IP address,
                    device type, unique device identification numbers,
                    browser-type, broad geographic location (e.g. country or
                    city-level location), and other technical information. We
                    may also collect user information about how your device has
                    interacted with our Website, including the pages accessed
                    and links clicked.
                  </p>
                  <div className="desc-v1-1">
                    Like many websites, We use cookies, web beacons, and other
                    technologies to receive and store certain types of
                    information when you interact with us through your device.
                    Using these technologies helps us customize your experience
                    with our Website, improve your experience, and tailor
                    marketing messages. Specific types of information we may
                    automatically collect includes:
                    <br />
                    <ul>
                      <li>
                        Log & Device data. Information about your interactions
                        with our Website, which may include log data like your
                        web address you came from or are going to, your device
                        model, operating system, browser type, unique device
                        identifier, Internet Protocol (“IP”) address, mobile
                        network carrier, and time zone or location. Whether We
                        collect some or all of this information often depends on
                        what type of device you’re using and its settings.
                      </li>
                      <li>
                        Cookie data. Depending on how you’re accessing our
                        Website, We may use “Cookies” (a small text file sent by
                        your computer each time you visit our Website or similar
                        technologies to record log data. When We use Cookies, we
                        may use ‘session’ cookies (that last until you close
                        your browser) or ‘persistent’ cookies (that last until
                        you or your browser deletes them). For example, we may
                        use Cookies to keep you logged into the Website. Some of
                        the Cookies We use are associated with your registered
                        account (including personal information about you, such
                        as the email address you gave us), and other Cookies are
                        not.
                      </li>
                      <li>
                        Other Web Site Analytics Services. We also may use
                        third-party service providers to provide certain
                        analytics and Viewer interactions services in connection
                        with our operation of our Website, including the
                        collection and tracking of certain data and information
                        regarding the characteristics and activities of visitors
                        to the Website.
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    Collecting this information automatically enables us to
                    better understand the visitors who come to our Website,
                    where they come from, and what content on our Website is of
                    interest to them. We use this information for our business
                    purposes, including internal analytics purposes and to
                    improve the quality and relevance of our Website to our
                    visitors.
                  </p>
                  <p className="desc-v1-1">
                    Please note that nothing in this Notice addresses, or should
                    be read to limit or restrict, how we collect, use or process
                    anonymous, de-identified, or aggregate information.
                  </p>
                  <p className="desc-v1-1">HOW WE USE YOUR INFORMATION</p>
                  <div className="desc-v1-1">
                    We may use information that we collect about you, including
                    personal information, to: <br />
                    <ul>
                      <li>
                        Provide the Features of the Website and Products &
                        Services You Request. We will use your information to
                        provide our Website to you; including managing your
                        account; responding to your inquiries; and for other
                        customer service and support purposes. We use the
                        payment information you provide to us in order to alert
                        you of past, current, and upcoming charges, to allow us
                        to present the billing history to you on your billing
                        page in the Website, and to perform internal financial
                        processes, such as looking at the status of a credit
                        card charge. In the event of a credit card dispute, we
                        also share account information with your bank to verify
                        the legitimacy of a charge.
                      </li>
                      <li>
                        To Communicate Our Products, Services, Events, and/for
                        Other Promotional Purposes. If you have an account with
                        us (or have placed an order with us), we may use the
                        contact details you provided to send you marketing
                        communications, where permitted by applicable law. We
                        may use the information that you provide to us to
                        personalize communications and advertisements regarding
                        our products and services that may be of interest to
                        you.
                      </li>
                      <li>
                        To Operate, Improve and Maintain our Business, Products,
                        and Services. We use the personal data you provide to us
                        to operate our business. For example, when you make a
                        purchase, we use that information for accounting,
                        audits, and other internal functions. We may use
                        personal data about how you use our products and
                        services to enhance your user experience and to help us
                        diagnose technical and service problems and administer
                        our Website.
                      </li>
                      <li>
                        Legal Compliance. We may use your information to comply
                        with applicable legal or regulatory obligations,
                        including complying with requests from law enforcement
                        or other governmental authorities, or in legal
                        proceedings involving [Company].
                      </li>
                      <li>
                        Other. We also may use your information to manage our
                        business or perform functions as otherwise described to
                        you at the time of collection subject to your consent.
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    WITH WHOM WE MAY SHARE YOUR INFORMATION WITH:
                  </p>
                  <p className="desc-v1-1">
                    We do not sell your information to any third parties or
                    disclose it in exchange for money or other valuable
                    consideration. We do not share your personal information
                    with others except as indicated within this Notice, or when
                    we inform you and give you an opportunity to opt-out of
                    having your personal information shared.
                  </p>
                  <div className="desc-v1-1">
                    We may share information we collect about you, including
                    personal information, in the following ways:
                    <br />
                    <ul>
                      <li>
                        With third-party service providers, agents, contractors,
                        or government entities.
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    We use other companies, agents, or contractors (“Service
                    Providers”) to perform services on our behalf or to assist
                    us with providing services to you.
                  </p>
                  <p className="desc-v1-1">
                    We may engage Service Providers to process credit card
                    transactions or other payment methods. We may also engage
                    Service Providers to provide services such as monitoring and
                    developing this Website and our Products/Services; aiding in
                    communications, infrastructure, and IT services; customer
                    service; and analyzing and enhancing data. These Service
                    Providers may have access to your personal or other
                    information in order to provide these functions. In
                    addition, some of the above-listed types of information that
                    we request may be collected by third party providers on our
                    behalf.
                  </p>
                  <p className="desc-v1-1">
                    We may share information with Service Providers and
                    government entities for legal, security, and safety
                    purposes. This includes sharing information in order to
                    enforce policies or contracts, address security breaches,
                    and assist in the investigation of fraud, security issues,
                    or other concerns.
                  </p>
                  <p className="desc-v1-1">
                    We require Service Providers to agree to take reasonable
                    steps to keep the personal information that we provide to
                    them securely. We do not authorize them to use or disclose
                    your personal information except in connection with
                    providing their services.
                  </p>
                  <p className="desc-v1-1">YOUR RIGHTS AND CHOICES</p>
                  <p className="desc-v1-1">
                    In certain circumstances, local data protection laws (such
                    as the Global Data Protection Regulation or California
                    Consumer Privacy Act) may give you rights with respect to
                    personal information if you are located in or are a resident
                    of that country, state, or territory (including if you are
                    located in the EU/EEA).
                  </p>
                  <p className="desc-v1-1">
                    IMPORTANT: WE ARE ONLY REQUIRED TO HONOR RIGHTS TO THE
                    EXTENT THAT THESE RIGHTS HAVE BEEN GRANTED TO YOU AND APPLY
                    TO YOU UNDER APPLICABLE DATA PROTECTION LAWS. PLEASE CONSULT
                    YOUR LOCAL DATA PROTECTION LAWS TO DETERMINE WHAT RIGHTS MAY
                    BE AVAILABLE TO YOU AND WHEN ACCESS TO THESE RIGHTS ARE
                    LIMITED.
                  </p>
                  <p className="desc-v1-1">
                    A. What Rights May Be Available to You
                  </p>
                  <div className="desc-v1-1">
                    These rights differ based upon local data protection laws in
                    your country, state, or territory, but these rights may
                    include one or more of the following:
                    <br />
                    <ul>
                      <li>
                        Access to Personal Information. You may have the right
                        to obtain confirmation from us that we process your
                        personal information and, if so, you may have the right
                        to request access to your personal information.
                      </li>
                      <li>
                        Rectification. You may have the right to request that we
                        rectify inaccurate personal information concerning you
                        and, depending on the purposes of the processing, you
                        may have the right to have incomplete personal
                        information completed.
                      </li>
                      <li>
                        Erasure/Deletion. You may have the right to require us
                        to erase some or all of the personal information
                        concerning you.
                      </li>
                      <li>
                        Restriction of Processing. You may have the right to
                        require us to restrict the further processing your
                        personal information. In such cases, the respective
                        information will be marked as restricted, and may only
                        be processed by us for certain purposes.
                      </li>
                      <li>
                        Object. You may have the right to object, on grounds
                        relating to your particular situation, to the processing
                        of your personal information by us, and we may be
                        required to no longer process some or all of your
                        personal information.
                      </li>
                      <li>
                        Data Portability. You may have the right to receive a
                        copy of your personal information which you have
                        provided to us, in a structured, commonly used, and
                        machine-readable format, and you may have the right to
                        transmit that personal information to another entity
                        without hindrance from us.
                      </li>
                      <li>
                        Withdraw Consent. You may have the right to withdraw
                        consent you have provided to us where we rely solely on
                        your consent to process your personal information. You
                        can always provide your consent to us again at a later
                        time.
                      </li>
                      <li>
                        Right to Complain. You may have the right to lodge a
                        complaint to an applicable supervisory authority or
                        other regulators if you are not satisfied with our
                        responses to your requests or how we manage your
                        personal information. For example, if you are located in
                        the EU/EEA, a list of and more information about the
                        EU/EEA Data Protection Authorities can be found here:{" "}
                        <br />
                        <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
                          http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
                        </a>
                        We encourage you to first or also reach out to us at
                        info@higherlevelfx.com, so we have an opportunity to
                        address your concerns directly.
                      </li>
                      <li>
                        California Resident. If you are a California resident,
                        California Civil Code Section 1798.83 may permit you the
                        right to request information regarding the disclosure of
                        personal information about you by us to third parties
                        for the third parties’ direct marketing purposes.
                        Moreover, California residents are also directed to the
                        section titled “Do Not Track” herein.
                      </li>
                      <li>
                        Nevada Resident. If you are a Nevada resident, Nevada
                        residents may also have certain rights regarding the
                        sale of personal information. Nevada residents may
                        opt-out of the future sale of their information to a
                        third party so that they may license or sell information
                        by emailing us at info@higherlevelfx.com
                      </li>
                    </ul>
                  </div>
                  <p className="desc-v1-1">
                    SECURITY AND STORAGE OF INFORMATION
                  </p>
                  <p className="desc-v1-1">
                    We take the security of your personal data very seriously.
                    We work hard to protect the personal data that you provide
                    from loss, misuse, and unauthorized access, or disclosure.
                    Given the nature of communications and information
                    processing technology, there is no guarantee that personal
                    data will be absolutely safe from access, alteration, or
                    destruction by a breach of any of our physical, technical,
                    and managerial safeguards.
                  </p>
                  <p className="desc-v1-1">
                    You should take steps to protect against unauthorized access
                    to your device and account by, among other things, choosing
                    a unique and complex password that nobody else knows or can
                    easily guess and keeping your log-in and password private.
                    We are not responsible for any lost, stolen, or compromised
                    passwords or for any activity on your account via
                    unauthorized password activity.
                  </p>
                  <p className="desc-v1-1">
                    We retain the personal data we collect for so long as is
                    reasonably necessary to fulfill the purposes for which the
                    data was collected, to perform our contractual and legal
                    obligations, and for any applicable statute of limitations
                    periods for the purposes of bringing and defending claims.
                  </p>
                  <p className="desc-v1-1">THIRD-PARTY WEBSITES</p>
                  <p className="desc-v1-1">
                    Our Website may contain links to third-party websites and
                    applications. Any access to and use of such linked websites
                    and applications is not governed by this Notice but instead
                    is governed by the privacy policies of those third parties.
                    We do not endorse these parties, their content, or any
                    products and services they offer, and we do not endorse
                    these parties, their content, or any products and services
                    they offer, and we are not responsible for the information
                    practices of such third-party websites or applications.
                  </p>
                  <p className="desc-v1-1">TRANSFER OF YOUR INFORMATION</p>
                  <p className="desc-v1-1">
                    This Website is based in the United States. Your information
                    may be processed, transferred to, and maintained on servers,
                    and databases located within the U.S. and elsewhere where
                    the privacy laws may not be as protective as your
                    jurisdiction. We reserve the right to transfer your
                    information to and from any state, province, country, or
                    other governmental jurisdiction. Your consent to this Notice
                    followed by your submission or our collection of such
                    information represents your agreement to any such transfer.
                  </p>
                  <p className="desc-v1-1">DO NOT TRACK</p>
                  <p className="desc-v1-1">
                    Web browsers can transmit “Do Not Track” signals or other
                    mechanisms that provide consumers the ability to exercise
                    choice regarding the collection of personal information
                    about an individual’s online activities over time and across
                    third-party websites or online services. Currently, no
                    universally accepted standard exists for how to interpret
                    such signals, although work to create consensus is ongoing.
                    Therefore, we do not currently respond to or take any action
                    with respect to the web browser Do Not Track.
                  </p>
                  <p className="desc-v1-1">CHILDREN AND PRIVACY</p>
                  <p className="desc-v1-1">
                    HL4X International LLC is not directed to children under
                    eighteen (18) years of age and we do not knowingly collect
                    personal information from children under 18. If we discover
                    that a child under 18 has provided us with personal
                    information, we will promptly delete such personal
                    information from our systems. You may learn more about
                    protecting children’s privacy online by visiting:
                    <br />
                    <a href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security/children%27s-privacy">
                      https://www.ftc.gov/tips-advice/business-center/privacy-and-security/children%27s-privacy
                    </a>
                  </p>
                  <p className="desc-v1-1">
                    CONTACT INFORMATION & CHANGES TO THIS NOTICE
                  </p>
                  <p className="desc-v1-1">
                    If you have any questions or comments about this notice, our
                    Privacy Statement, the ways in which we collect and use your
                    personal information, your choices and rights regarding such
                    use, or wish to exercise your rights under California law,
                    please do not hesitate to contact us at
                    info@higherlevelfx.com
                  </p>
                  <p className="desc-v1-1">
                    This Notice is current as of the Effective Date set forth
                    above. We reserve the right to amend this Notice at our
                    discretion and at any time and will notify you of such
                    amendment(s) on our homepage. Please note that if you
                    continue to visit and use this Website after those changes
                    are in effect, you agree to the revised Notice.
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

export default PrivacyPolicyPage;
