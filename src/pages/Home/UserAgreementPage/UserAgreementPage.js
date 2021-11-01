import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_USER_AGREEMENT } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const UserAgreementPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "User Agreement";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_USER_AGREEMENT,
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
                    User Agreement
                  </h4>
                  <p className="desc-v1-1">
                    HLFX International LLC, herein subsequently referred to as
                    COMPANY and name of APPLICANT, herein subsequently referred
                    to as APPLICANT, contractually agree to the COMPANY’S
                    following terms and conditions;
                    <br />
                    APPLICANT hereby applies for authorization as a user and
                    participant in COMPANY'S network marketing program.
                    <br />
                    For a period of 21 days from the submission of this
                    application, or until such time as COMPANY notiﬁes APPLICANT
                    of the acceptance or rejection, of this application,
                    whichever date occurring sooner, APPLICANT will be informed
                    as to whether it is provisionally authorized as a user and
                    participant and granted the right and authorization to sell
                    COMPANY’S software products and services. COMPANY reserves
                    and retains the right to accept or reject or terminate the
                    application for any reason. We have the right to refuse
                    anyone.
                    <br />
                    Upon COMPANY’S acceptance of APPLICANT as a participant and
                    user, APPLICANT is authorized as a participant and user for
                    a period of thirty (30) days from the date of acceptance.
                    COMPANY reserves the right to terminate this Agreement at
                    any time if the COMPANY decides to: (A) cease business
                    operations or (B) dissolve as a business entity or (C)
                    terminate distribution of its software products and/or
                    services via direct selling channels, or (D) if at any time,
                    after at least 7 days' notice, APPLICANT breaches this
                    contractual agreement and/or fails to remedy any breach
                    prior to the conclusion of the notice period. We have the
                    right to cancel someone's account if they are doing things
                    we don't agree with.
                    <br />
                    APPLICANT has fully read and fully agrees to be bound by the
                    terms of this agreement, as well as by COMPANY’S full
                    Compensation Plan, Policies & Procedures, Income
                    Disclaimers, COMPANY’S Partners Agreement, Terms of Use,
                    Privacy Policy, Spam Policy and Refund Policy, all of which
                    are incorporated by reference herein and are made a part of
                    this contractual agreement. COMPANY reserves the right to
                    amend or modify the Compensation Plan, Policies &
                    Procedures, Income Disclaimers, COMPANY’S partners
                    agreement, terms of Use, privacy policy, spam policy and
                    refund policy at any time in its sole discretion, and
                    APPLICANT agrees to be bound by such amendments or
                    modifications.
                    <br />
                    APPLICANT is an independent contractor under the terms of
                    this contractual agreement, and is not an agent, employee,
                    or legal representative of COMPANY, and is not authorized in
                    any way to represent being such. APPLICANT therefore has no
                    power to bind COMPANY to any obligation incurred in such
                    capacity by APPLICANT and APPLICANT is solely responsible
                    for any and all applicable income, sales, social security,
                    unemployment or other tax, license, or fee arising out of
                    APPLICANT's activities pursuant to this contractual
                    agreement.
                    <br />
                    APPLICANT will not produce, promote, market, or use
                    materials of any kind describing the COMPANY'S names,
                    programs, products, and trademarked, copyrighted, or
                    otherwise protected materials except as permitted in the
                    COMPANY’S policies.
                    <br />
                    APPLICANT has the obligation and duty to supervise, monitor
                    and train any user, or participant that he/she may sponsor
                    as described in the Terms and Conditions. APPLICANT will
                    explain the COMPANY'S programs honestly completely, and
                    accurately when presenting them to other interested
                    participants.
                    <br />
                    APPLICANT understands and will make clear in any
                    presentation the following: that no earnings and/or exchange
                    trading proﬁts are guaranteed by COMPANY or its programs; no
                    participant or user will earn money solely for sponsoring
                    COMPANY; there is no specific amount of software product
                    that must be purchased at any level; commissions are based
                    on software product and service sales; and there are no
                    exclusive territories for participants in the program.
                    <br />
                    APPLICANT agrees that compensation is only paid for sales of
                    software product as deﬁned in the Terms and Conditions of
                    this agreement and in the COMPANY’S Rewards Plan.
                    <br />
                    Any sale or assignment of this agreement must be approved by
                    COMPANY. Successors in interest or assigns must comply with
                    all program requirements.
                    <br />
                    The undersigned hereby acknowledges that he/she is of legal
                    age and authorized to bind APPLICANT to each of the terms
                    set forth herein and to the terms of the Policies &
                    Procedures.
                    <br />
                  </p>
                  <p className="desc-v1-1">
                    READ THIS SECTION CAREFULLY. IT MAY SIGNIFICANTLY AFFECT
                    YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN
                    COURT.
                    <br />
                    These BINDING ARBITRATION AND className ACTION WAIVER
                    provisions apply to you if you are domiciled in and/or
                    acquire and use the Product in the West Indies These
                    provisions may also apply to you if you are domiciled in
                    and/or acquire and use the Product from outside the West
                    Indies. See JURISDICTION AND APPLICABLE LAW below for
                    details.
                    <br />
                    Binding Arbitration: If the parties do not reach an agreed
                    upon solution within a period of 30 days from the time
                    informal dispute resolution is pursued pursuant to the
                    paragraph above, then either party may initiate binding
                    arbitration as the sole means to formally resolve claims,
                    subject to the terms set forth below. Specifically, all
                    claims arising out of or relating to this Agreement
                    (including its interpretation, formation, performance and
                    breach), the parties' relationship with each other and/or
                    your use of the Product shall be finally settled by binding
                    arbitration administered by HLFX in accordance with the
                    provisions of its Comprehensive Arbitration Rules or
                    Streamlined Arbitrations Rules, as appropriate, excluding
                    any rules or procedures governing or permitting className
                    actions. This arbitration provision is made pursuant to a
                    transaction involving HLFX, and the Federal Arbitration Act
                    (the "FAA") shall apply to the interpretation,
                    applicability, enforceability and formation of this
                    Agreement notwithstanding any other choice of law provision
                    contained in this Agreement. The arbitrator, and not any
                    federal, state, or local court or agency, shall have
                    exclusive authority to resolve all disputes arising out of
                    or relating to the interpretation, applicability,
                    enforceability, or formation of this Agreement, including
                    without limitation any claim that all or any part of this
                    Agreement is void or voidable, or whether a claim is subject
                    to arbitration. The arbitrator shall be empowered to grant
                    whatever relief would be available in a court under law or
                    in equity. The arbitrator's award shall be binding on the
                    parties and may be entered as a judgment in any court of
                    competent jurisdiction.
                    <br />
                    Venue and jurisdiction for any action pertaining to this
                    agreement or any disagreement or claim between the parties
                    hereto shall be governed by the laws, and government of
                    Nevis, West Indies.
                    <br />
                    No purchase or investment is necessary to become a
                    participant or user.
                    <br />
                    APPLICANT has the right to cancel this agreement at any time
                    and for any reason.
                    <br />
                    APPLICANT is free to participate in other multilevel
                    marketing ventures, but cannot sell or promote to other
                    COMPANY’S participants or customers similar or competitive
                    products or services or any other multilevel marketing
                    opportunity, except for APPLICANT’S direct enrollees in
                    COMPANY’S business.
                    <br />
                    COMPANY’S genealogy reports are conﬁdential and proprietary
                    business trade secrets. APPLICANT may not use the reports
                    for any purpose other than to develop your COMPANY business.
                    Speciﬁcally, APPLICANT must not disclose any information
                    contained in the reports to a third party or use the reports
                    to compete with the company or to recruit or solicit other
                    participants or Customers to participate in other multilevel
                    marketing ventures.
                    <br />
                    COMPANY’S failure to exercise any rights as set forth in
                    this agreement or to insist on APPLICANT’S strict compliance
                    with the terms and conditions of this User Agreement and the
                    Policies & Procedures do not constitute a waiver of
                    COMPANY’S right to require compliance therewith.
                    <br />
                    COMPANY’S waiver of any participant’s default does not
                    affect COMPANY’S rights with respect to any subsequent
                    default or the rights or obligations of any other
                    participants. Delays or omissions by the COMPANY in
                    exercising rights which might arise from a partner's default
                    do not affect COMPANY’S rights concerning the default or any
                    subsequent default.
                    <br />
                    COMPANY reserves the right to cancel any participant at any
                    time for cause if the participant violates the terms and
                    conditions of this Agreement or the provisions of the
                    Policies & Procedures and Rewards Plan.
                    <br />
                    APPLICANT may be required from time to time to provide
                    COMPANY with personal information relating to your
                    contractual agreement. COMPANY’S right to use your personal
                    information and your rights to access and correct the
                    personal information you give COMPANY are described in
                    COMPANY’S Policies & Procedures. By signing this Agreement,
                    you consent to COMPANY’S collection, use, and disclosure of
                    your personal information in accordance with COMPANY’S
                    Policies & Procedures.
                    <br />
                    By signing this Agreement, you give COMPANY consent to
                    contact you by telephone, facsimile transmission, e-mail or
                    text, concerning you contractual agreement, and any related
                    COMPANY matter.
                    <br />
                    Participant agrees not to contact or initiate contact at any
                    time or for any purpose, either directly or indirectly, with
                    any ofﬁcers, directors, shareholders, consultants,
                    attorneys, employees, agents or other afﬁliates of COMPANY’S
                    Vendors or Suppliers, unless such approval is speciﬁcally
                    granted in written form by COMPANY, which shall be
                    considered on a case-by-case basis. Any communication sent
                    by any participant to COMPANY’S Vendors or Suppliers, either
                    directly or indirectly to any ofﬁcers, directors,
                    shareholders, consultants, attorneys, employees, agents or
                    other afﬁliates of COMPANY’S Vendors or Suppliers is in
                    direct violation of this agreement and could result in the
                    termination of APPLICANT’S agreement. This includes any and
                    all verbal and or written communications. From time to time
                    the COMPANY may invite guests from COMPANY’S Vendors or
                    Suppliers to speak on COMPANY webinars and conference calls.
                    Such guest appearances do not constitute COMPANY’S approval
                    for further communications with the COMPANY’S Vendors or
                    Suppliers. APPLICANT agrees and understand that the only
                    entity which has an Agreement with COMPANY’S Vendors or
                    Suppliers is COMPANY.
                    <br />
                    To the maximum extent permitted by law, COMPANY, its parent
                    or afﬁliated companies, directors, ofﬁcers, shareholders,
                    employees, assigns, and agents (collectively referred to as
                    "afﬁliates"), shall not be liable for, and APPLICANT
                    releases COMPANY and its afﬁliates from, all claims for
                    consequential and exemplary damages for any claim or cause
                    of action relating to the agreement.APPLICANT further agrees
                    to release COMPANY and its afﬁliates from all liability
                    arising from or relating to: (a) APPLICANT’S, or any other
                    participant’s, breach of the agreements; (b) the promotion
                    or operation of a COMPANY’S business by APPLICANT or any
                    other participant and any activities related to it,
                    including, but not limited to, the presentation of
                    Products/Services or the COMPANY Rewards Plan, the operation
                    of a motor vehicle, the lease of meeting or training
                    facilities, etc., and agrees to indemnify COMPANY and its
                    afﬁliates for any liability, damages, ﬁnes, penalties, or
                    any incorrect data or information provided by App or any
                    other APPLICANT’S to participant (d) COMPANY, or any other
                    participant’s, failure to provide any information or data
                    necessary for COMPANY to operate its business; or awards
                    arising from any unauthorized conduct that APPLICANT
                    undertakes in operating COMPANY business. APPLICANT further
                    agree to indemnify COMPANY for any liability, damages, ﬁnes,
                    penalties or other awards arising from any unauthorized
                    conduct that APPLICANT undertakes in operating my
                    APPLICANT’S company business.
                    <br />
                    The COMPANY grants to APPLICANT a non-exclusive, royalty
                    free, revocable license to use the intellectual property in
                    the name of COMPANY, trademarks (whether registered or
                    unregistered), and other intellectual property rights in any
                    materials or documents pertaining to the subject matter of
                    this Agreement for the purpose of promoting the software
                    products and services and sourcing potential customers.
                    APPLICANT agrees that COMPANY may impose restrictions on
                    APPLICANT’S use of the COMPANY’S name, trade names and
                    trademarks, logos and other intellectual property and
                    advertising in order to protect the rights, reputation and
                    image of COMPANY, provided that such restrictions are
                    applied to all participants generally. APPLICANT also agrees
                    not to apply singly or in association with any other party
                    for registration of any intellectual property owned by
                    COMPANY capable of registration but not registered and to
                    give all reasonable assistance, at COMPANY’S reasonable
                    cost, to assist COMPANY to register any such intellectual
                    property.
                    <br />
                    If a participant wishes to bring an action against COMPANY
                    for any act or omission relating to or arising from the
                    Agreement, such action must be brought within 30 days from
                    the date of the alleged conduct giving rise to the cause of
                    action. Failure to bring such action within such time shall
                    bar all claims against COMPANY for such any act or omission.
                    Participant waives all claims that any other statutes of
                    limitations may apply.
                    <br />
                    This software is intended for educational purposes. It is
                    recommended to be used as on demo account. HLFX does not,
                    and will not recommend trades using real money.By purchasing
                    this software for educational purposes. APPLICANT agrees to
                    all terms and conditions. HLFX is in no way liable for any
                    money lost while using this software. Trade at your own
                    risk.
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

export default UserAgreementPage;
