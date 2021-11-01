import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_FREE_BOOK, ROUTE_TERMS_CONDITIONS } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const TermsConditionsPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Terms and Conditions";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_TERMS_CONDITIONS,
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
                    Terms and Conditions
                  </h4>
                  <p className="desc-v1-1">
                    These Terms and Conditions, in their present form and as
                    amended at the discretion of Higher Level FX™, are
                    incorporated into the Higher Level FX™ Business Affiliate
                    User Agreement. These are the terms and conditions of the
                    Business Affiliate's contract with Higher Level FX™. It is
                    the responsibility of each Business Affiliate to read,
                    understand, adhere to, and ensure that they are aware of and
                    operating under the most current version of these Terms and
                    Conditions. You must also comply with the description of the
                    Rewards Plan and honor all applicable laws in the country in
                    which you operate your Higher Level FX™ business. The words
                    "company" and “Higher Level FX", when used in these
                    documents, refer to Higher Level FX™, and the term "BA"
                    means “Business Affiliate". A Business Affiliate is an
                    independent contractor, not an employee of the company.
                    <br />
                    The purpose of the Business Affiliate Agreement is: to deﬁne
                    the relationship between the company and the BA; to set
                    standards of acceptable business behavior; to assist BA in
                    building and protecting their business.
                    <br />
                    <b>Changes</b>
                    <br />
                    The Company may from time to time amend the terms and
                    conditions of the BA User Agreement, Terms and Conditions,
                    Rewards Plan and Software Price List. Amendments shall be
                    effective upon notiﬁcation of the changes in ofﬁcial Higher
                    Level FX™ publications, website(s), and/or electronic
                    notiﬁcations distributed to all active BA’s.
                    <br />
                    <b>
                      Consequences of Delays, Closures and Platform Set Up
                      Mistakes
                    </b>
                    <br />
                    The company shall not be responsible for delays and failures
                    in performing its obligations due to circumstances beyond
                    its reasonable control, such as strikes, labor difﬁculties,
                    riots, war, ﬁre, death, curtailment or interruption of a
                    source of supply, government decrees or orders, cyber
                    hacking, currency exchange issues, ﬁat currency trading
                    platform temporary shutdowns and/or closures, the
                    consequences of an BA clicking the YES/ON button on the
                    trading platforms for withdrawing ﬁat currencies, and any
                    other trading platform set up mistakes made by the BA in
                    direct conﬂict with company trainings and guidelines, etc.
                    <br />
                    <b>Provisions Severable</b>
                    <br />
                    If any provision of the Business Affiliate User Agreement as
                    it currently exists or as may be amended is found to be
                    invalid, illegal, or unenforceable for any reason, only the
                    invalid provision will be severed from the Business
                    Affiliate User Agreement; the remaining terms and provisions
                    shall remain in full force and effect and shall be construed
                    as if such invalid, illegal, or unenforceable provision
                    never comprised a part of the Business Affiliate User
                    Agreement.
                    <br />
                    <b>Titles Not Substantive</b>
                    <br />
                    The titles and headings to these Terms and Conditions are
                    for reference purposes only and do not constitute, and shall
                    not be construed as, substantive terms of the Business
                    Affiliate User Agreement.
                    <br />
                    <b>HigherLevel FX products</b>
                    <br />
                    By purchasing or owning an active HigherLevel FX software
                    license you agree to ALL the following: You fully understand
                    that this is an educational tool which must be used on a
                    demo account and no real money is to be involved what so
                    ever. You fully agree that you will ONLY turn on our
                    software or any of our educational products when you wish to
                    educate yourself so you can examine the trades it took and
                    study them. You must NEVER treat any educational tools from
                    HigherLevel FX as an auto trader for personal or financial
                    gain. Your goals must be education only!
                    <br />
                    <b>Waiver</b>
                    <br />
                    The company never forfeits its right to require BA
                    compliance with the Business Affiliate User Agreement or
                    with applicable laws and regulations governing business
                    conduct. Only in rare circumstances will a policy be waived,
                    and the Compliance Ofﬁcer or an ofﬁcer of the company will
                    convey such waivers in writing. The waiver will apply only
                    to that speciﬁc case.
                    <br />
                    <b>Becoming a BA</b>
                    <br />
                    The requirements to become a BA: Be at least the age of
                    majority in your country of residence; reside in a
                    geographic area where Higher Level FX™ has been approved for
                    business; fully read and accept the company's Terms and
                    Conditions, Full Rewards Plan, Income Disclaimers, Business
                    Affiliate Agreement, Terms of Use, Privacy Policy and Refund
                    Policy; as an independent contractor, assume all appropriate
                    responsibilities for accounting for income tax, insurances
                    and expenses to support your business. The company reserves
                    the right to accept or reject any application for any
                    reason.
                    <br />
                    <b>Username Identiﬁcation and BA Number</b>
                    <br />
                    When the company receives and accepts a new BA account
                    registration, the company will assign a unique BA number to
                    that
                    <br />
                    Business Affiliate. BA must use their BA number whenever
                    they communicate with a company representative regarding
                    business matters.
                    <br />
                    <b>BA Beneﬁts</b>
                    <br />
                    Once the company accepts aBusiness Affiliate Application and
                    Agreement, the beneﬁts of the Rewards Plan and the Business
                    Affiliate Agreement are available to the new BA.
                    <br />
                    These beneﬁts include the right to purchase company software
                    products and services; participate in the company Rewards
                    Plan (receive bonuses and commissions, if eligible); sponsor
                    other individuals as Customers or BA’s into the company
                    business and thereby build a Downline Organization and
                    progress through the company Rewards Plan; receive company
                    literature and other company communications; participate in
                    company-sponsored support, service, training, motivational,
                    and recognition functions upon payment of appropriate
                    charges, if applicable; participate in promotional and
                    incentive contests and programs sponsored by Higher Level
                    FX™ for its BA's; BA may retail Higher Level FX™ software
                    products or services and proﬁt from these sales. Operating
                    as a Business Affiliate Actions of Household Members or
                    Afﬁliated Individuals - If any member of a BA's immediate
                    household engages in any activity, which, if performed by
                    the BA would violate any provision of the Business Affiliate
                    User Agreement, such activity will be deemed a violation by
                    the BA.
                    <br />
                    A BA must adhere to the terms of the company Rewards Plan as
                    set forth in ofﬁcial company literature or ofﬁcial company
                    website(s). BA shall not offer the company opportunity
                    through or in combination with, any other opportunity or
                    unapproved method of marketing (unless approved by the
                    company Corporate or Compliance Department). BA shall not
                    require or encourage other current or prospective Customers
                    or BA’s to participate in the company in any manner that
                    varies from the program as set forth in ofﬁcial company
                    literature. BA shall not require or encourage other current
                    or prospective Customers or BA’s to execute any agreement or
                    contract other than ofﬁcial ofﬂine or online company
                    agreements and contracts in order to become an BA.
                    Similarly, BA shall not require or encourage other current
                    or prospective Customers or BA’s to make any purchase from,
                    or payment to, any individual or other entity to participate
                    in the company Rewards Plan, other than those purchases or
                    payments identiﬁed as recommended or required in ofﬁcial
                    company literature or ofﬁcial company websites(s).
                    <br />
                    <b>Advertising In general</b>
                    <br />
                    BA’s must avoid all discourteous, deceptive, misleading,
                    illegal, unethical, or immoral conduct or practices in their
                    marketing and promotion of Higher Level FX™, the company
                    opportunity, the Rewards Plan, and company software
                    products. No BA may produce unauthorized sales, marketing,
                    and support materials to market or promote the company, the
                    company opportunity, the Rewards Plan, company's products,
                    or their company businesses (unless approved by company
                    Corporate or Compliance Department in writing).
                    <br />
                    All BA’s may only use sales aids and support materials
                    produced or currently approved by the company. Sales,
                    marketing and support materials include, but are not limited
                    to, training and recruiting information, brochures, ﬂyers,
                    pamphlets, posters, postcards, letters, classNameiﬁed
                    advertisements, etc. promoting the company's software
                    products and services, as well as e-mail messages, voicemail
                    message recordings, and Internet Websites used to publicize
                    the company, its software products, services, or Rewards
                    Plan. If BA does use his/her own materials or marketing
                    methods, the BA must contact the company compliance
                    department for pre-approval. Otherwise, the use of such
                    information is unauthorized.
                    <br />
                    <b>Media Inquiries</b>
                    <br />
                    BA must refer all media inquiries regarding Higher Level FX™
                    to the Higher Level FX™ Compliance Department. This will
                    ensure that accurate and consistent information reaches the
                    general public.
                    <br />
                    <b>Trademarks and Copyrights</b>
                    <br />
                    A BA may not use the Higher Level FX™ trademark or trade
                    name or corporate logo to promote their independent
                    business. Rather, they must use the “Business Affiliate"
                    logo to promote their business. A reproducible copy of the
                    logo can be obtained from Higher Level FX™. However, this
                    logo may only be used on personal stationery and speciﬁcally
                    approved literature but not on clothing, signage, or motor
                    vehicles (unless pre-approved by company Compliance
                    Department). BA may describe themselves as a “Higher Level
                    FX™ Business Affiliate" in the business pages of ofﬂine and
                    online telephone directories. BA should not answer the
                    telephone in any manner that might indicate or suggest that
                    the caller has reached a Higher Level FX™ corporate ofﬁce.
                    BA may not record or reproduce materials from any company
                    corporate function, event, speech, etc. (unless pre-approved
                    by company Compliance Department). BA may not record,
                    reproduce, or copy any presentation or speech by any company
                    spokesperson, representative, speaker, ofﬁcer, director, or
                    other BA. BA may not reproduce or copy any recording of a
                    company-produced media presentation including audiotapes,
                    videotapes, CDs, etc. BA may not publish, or cause to be
                    published, in any written or electronic media, the name,
                    photograph or likeness, copyrighted materials, or property
                    of individual Business Affiliates with the company without
                    express written authorization from the individual and/or
                    company. Business Affiliates may not publish, or cause to be
                    published, in any written form or electronic media, the
                    copyrighted materials or property of the company, without
                    express written authorization from the company.
                    <br />
                    <b>Use of Business Affiliate's Name, Likeness, and Image</b>
                    <br />
                    Business Affiliate's consent to the company's use of their
                    name, testimonial (or other statements about the company,
                    its products or opportunity in printed or recorded form,
                    including translations, paraphrases, and electronic
                    reproductions of the same), and image or likeness (as
                    produced or recorded in photographic, digital, electronic,
                    video or ﬁlm media) in connection with advertising,
                    promoting and publicizing Higher Level FX™ opportunity or
                    products, or any company related or sponsored events.
                    <br />
                    <b>Trading Proﬁt Claims</b>
                    <br />
                    BA must not make claims that Higher Level FX's software will
                    produce any guaranteed proﬁts of any kind. There are many
                    variables which affect the performance of the software such
                    as market conditions, ﬁat currency volatility, day and time
                    of the trade, just to mention of few variables. Thus there
                    is no way to predict trading software results. You can only
                    mention performance characteristics as contained in ofﬁcial
                    Higher Level FX literature.
                    <br />
                    <b>Income Claims</b>
                    <br />
                    BA's may not make income projections or claims or disclose
                    their Higher Level FX income (including the showing of
                    checks, copies of checks, bank statements, or trading
                    results) when presenting or discussing the Higher Level FX
                    opportunity or Rewards Plan, except as set forth in ofﬁcial
                    Higher Level FX literature.
                    <br />
                    <b>Unauthorized Recruiting</b>
                    <br />
                    As an independent contractor, BA's may participate in other
                    direct selling or network marketing or multi-level marketing
                    ventures (collectively, "multi-level marketing"), and BA's
                    may engage in selling activities related to non Higher Level
                    FX products and services if they desire to do so. Although a
                    BA may elect to participate in another multi-level marketing
                    opportunity, they are prohibited from unauthorized
                    recruiting activities, which include the following:
                    recruiting or enrolling Higher Level FX customers or BA's
                    for other multi-level marketing business ventures, either
                    directly or through a third party. This includes, but is not
                    limited to, presenting or assisting in the presentation of
                    other multi-level marketing business ventures to any Higher
                    Level FX customer or BA, or implicitly or explicitly
                    encouraging any Higher Level FX customer or BA to join other
                    business ventures. It is a violation of this policy to
                    recruit or enroll a Higher Level FX customer or BA for
                    another multi-level marketing business, even if the BA does
                    not know that the prospect is also a Higher Level FX
                    customer or BA; producing any literature, recording, or
                    promotional material of any nature for another multi-level
                    marketing business which is used by the BA or any third
                    person to recruit Higher Level FX customers or BA for that
                    business venture; selling, offering to sell, or promoting
                    any competing products or services to Higher Level FX
                    customers or BA. The only exception to this rule is that
                    direct customer and personal enrollees of the BA can be
                    exposed to a product or service (ﬁrst level, personally
                    sponsored only). Higher Level FX may cancel the BA's
                    agreement for violations to this provision. In addition,
                    when a BA participates in other multi-level marketing
                    ventures, the BA may not participate in any Higher Level FX
                    leadership meetings, conferences, qualiﬁcation seminars, and
                    the like.
                    <br />
                    <b>Post-cancellation Solicitation Prohibited</b>
                    <br />
                    A former BA shall not directly or through a third party
                    solicit any BA or customer to enroll in any direct sales,
                    network marketing, or multi-level marketing program or
                    opportunity for a period of one (1) year after the
                    cancellation of an individual or entity's BA User Agreement.
                    This provision shall survive the expiration of the BA
                    obligations to Higher Level FX, pursuant to the BA User
                    Agreement.
                    <br />
                    <b>Downline Genealogy Reports</b>
                    <br />
                    The Higher Level FX Downline Genealogy Reports are
                    conﬁdential and contain proprietary business trade secrets.
                    A BA may not use the reports for any purpose other than for
                    developing their Higher Level FX business. During any term
                    of the BA User Agreement and for a period of ﬁve (5) years
                    after the termination or expiration of the BA User Agreement
                    between Business Affiliate and Higher Level FX, for any
                    reason whatsoever, a BA shall not, on his/her own behalf or
                    on behalf of any other person, partnership, association,
                    corporation, or other entity: disclose any information
                    contained in the reports to any third party; use the reports
                    to compete with Higher Level FX or recruit or solicit any BA
                    or customer listed on the reports to participate in other
                    multilevel marketing ventures. This provision shall survive
                    the termination or expiration of this Agreement.
                    <br />
                    <b>Corporation, Partnerships, and Trusts</b>
                    <br />
                    A corporation, partnership, or trust (collectively referred
                    to in this section as an "Entity") may apply to be a BA by
                    submitting its Articles of Incorporation, Partnership
                    Agreement, or trust documents (these documents are
                    collectively referred to as the "Entity Documents") to
                    Higher Level FX along with a properly completed Corporation,
                    Partnership DBA Registration Form. A BA may change its
                    status under the same sponsor from an individual to a
                    partnership, corporation, or trust, or from one type of
                    entity to another. To do so, the BA must provide the entity
                    documents and a properly completed BA Agreement and the
                    appropriate registration form. The Corporation, Partnership
                    DBA Registration Form must be signed by all of the
                    directors, shareholders, partners, trustees, or other
                    individuals having an ownership interest in the business.
                    Members of the entity are jointly and severally liable for
                    any indebtedness or other obligations to Higher Level FX. As
                    set forth herein, individual may participate directly or
                    indirectly in more than one BA but must be enrolled by the
                    same sponsor. It is the responsibility of those persons
                    involved in the Entity to conform to the laws of the country
                    and state in which their Entity is formed. Higher Level FX
                    reserves the right to approve or disapprove any Business
                    Affiliate Application and Agreement submitted by an Entity.
                    For the purpose of recognition and rewards, Higher Level FX
                    will only recognize a maximum of two persons in the Entity.
                    The Entity must nominate each year, at it’s Business
                    Affiliate renewal time, the two nominees who may be the
                    recipients of any recognition, rewards, trips, and the like
                    which the entity becomes entitled to participate in.
                    <br />
                    <b>Deceptive Practices</b>
                    <br />
                    BA must fairly and truthfully explain the Higher Level FX
                    products, opportunity, Rewards Plan, and Terms and
                    Conditions to prospective BA's. This includes: being honest
                    and thorough in presenting material from the Higher Level FX
                    Rewards Plan to all potential BA's; making clear that income
                    from the Higher Level FX Rewards Plan is based on software
                    sales and not merely on sponsoring other BA's; BA shall not
                    make trading proﬁt claims; making estimates of proﬁt that
                    are based on reasonable predictions for what an average BA
                    would achieve in normal circumstances; representing that
                    past earnings in a given set of circumstances do not
                    necessarily reﬂect future earnings; not misrepresenting the
                    amount of expenditure that an average BA might incur in
                    carrying on the business; not misrepresenting the amount of
                    time an average BA would have to devote to the business to
                    achieve the proﬁt estimated, and not stating that proﬁts or
                    earnings are guaranteed for any individual BA; never stating
                    or inferring that you will build a downline organization for
                    anyone else; never stating that proﬁts or earnings are
                    guaranteed for an individual BA; and never stating that any
                    consumer, business, or government agency has approved or
                    endorsed the Higher Level FX products or its Rewards Plan.
                    <br />
                    <b>Independent Contractor Status</b>
                    <br />
                    BA's are independent contractors and are not purchasers of a
                    franchise or business opportunity. The agreement between
                    Higher Level FX and it’s BA does not create an
                    employer/employee relationship, agency, partnership, or
                    joint venture between the Company and the BA. All BA's are
                    responsible for paying their own income and employment
                    taxes. BA will not be treated as employees for any purpose
                    including, but not limited to, workers compensation,
                    superannuation, or insurance. Each BA is encouraged to
                    establish his/her own goals, hours, and methods of sale, so
                    long as he/she complies with applicable laws and the terms
                    and conditions of the BA User Agreement.
                    <br />
                    <b>International</b>
                    <br />
                    BA may sell and promote Higher Level FX's software products,
                    opportunity, and services or recruit or enroll any potential
                    BA or customer only in countries in which Higher Level FX is
                    approved for business, as announced in ofﬁcial Higher Level
                    FX communications. If a BA desires to conduct business in an
                    authorized country other than the one in which they are a
                    BA, they must comply with all the applicable laws and
                    regulations for that country. Adherence to Laws and
                    Ordinances - You must obey all laws that apply to your
                    business in all jurisdictions and countries you are
                    conducting Higher Level FX business.
                    <br />
                    <b>One BA per Account</b>
                    <br />
                    A BA may operate, receive compensation from, or have an
                    ownership interest, legal or equitable, as a sole
                    proprietorship, partner, shareholder, trustee, or
                    beneﬁciary, in only one BA account. However, notwithstanding
                    this rule, your spouse and their children who are of legal
                    age may become a BA and operate their individual BA's as
                    long as your spouse and family member's BA accounts are
                    placed below one of your BA accounts and not in a cross line
                    sales organization. The BA accounts must be a bona ﬁde BA
                    that is operated by the person listed on the agreement and
                    not by the owner of the ﬁrst BA. BA shall not use business
                    entities, trusts, or other devices to avoid this policy. An
                    exception to this policy will be considered on a
                    case-by-case basis if two BA marry or in cases of a BA
                    receiving an interest in another BA account through
                    inheritance from an immediate family member. Requests for
                    exceptions to this policy must be submitted in writing to
                    the Compliance Department.
                    <br />
                    <b>Sale, Transfer, or Assignment of BA</b>
                    <br />
                    A BA may not sell, transfer, or assign their BA rights to
                    any person or entity without Higher Level FX's express
                    written approval. To obtain approval, you must: be a BA in
                    good standing as determined by Higher Level FX in its sole
                    discretion; before any transfer will be approved by Higher
                    Level FX, any debt obligations the selling BA has with
                    Higher Level FX must be satisﬁed; the transferring BA must
                    be in good standing and not in violation of any of the terms
                    of the BA User Agreement or these Terms and Conditions, to
                    transfer their BA; the combining of BA is not permitted.
                    Higher Level FX will not approve the transfer of a BA to any
                    individual or Entity that is a current BA or who has an
                    ownership interest in any BA. Similarly, Higher Level FX
                    will not approve the transfer of a BA to any individual or
                    Entity that has previously had any ownership interest in or
                    operated, a BA; no individual Business Centers may be
                    transferred separately from the BA. If a BA wishes to
                    transfer their BA account, all Business Centers must be
                    included in the transfer; the transferring BA must notify
                    the Higher Level FX Compliance Department of their intent to
                    transfer the BA account by completing and submitting a
                    signed Transfer of BA and BA Application Form. No changes in
                    the line of sponsorship can result from the transfer of a
                    BA; the transferee must be eligible to become a BA and be
                    acceptable to Higher Level FX in every respect.
                    <br />
                    <b>Separation of an BA</b>
                    <br />
                    If BA's wish to dissolve their jointly held BA, they must do
                    so in such a way as to not disturb the income or interests
                    of their Upline and Downline Organizations. BA should
                    consider the following when deciding whether or not to
                    dissolve a jointly held BA: if a jointly owned BA is
                    dissolved, any one of the joint owners may operate the BA,
                    but the other joint owners must relinquish their rights to,
                    and interests in, the BA; Higher Level FX cannot divide a
                    Downline Organization, nor can it split commission or bonus
                    checks between the joint owners; if a jointly owned BA is
                    dissolved, the individual(s) who relinquished ownership in
                    the original BA may apply as new BA under any sponsor but
                    may not purchase or join an existing BA.
                    <br />
                    <b>Succession</b>
                    <br />
                    If a BA dies or becomes incapacitated, their rights to
                    commissions, bonuses, and Downline Organization, together
                    with all BA responsibilities, will pass to his/her
                    successor(s). Upon death or incapacitation, the successor(s)
                    must present the Higher Level FX Compliance Department with
                    proof of death or incapacitation, along with proof of
                    successions, such as a Grant of Probate or an Enduring Power
                    of Attorney, and a properly completed BA Application and
                    Agreement. You may inherit and retain another BA even though
                    you currently own or operate a BA.
                    <br />
                    <b>7-Day Trial</b>
                    <br />
                    If membership isn't cancelled within the 7-day trial it will
                    automatically go to a normal membership and begin being
                    charged $159 per month. Affiliate accounts are not eligible
                    for trial.
                    <br />
                    <b>Taxes</b>
                    <br />
                    BA must comply with all relevant taxation legislation. BA
                    should seek professional advice from their own accountant or
                    tax advisor as to how to keep proper business records and
                    account for tax aspects of their independent business. BA's
                    Higher Level FX income may be subject to income tax and so
                    must be properly accounted for in annual income tax returns.
                    BA's conducting their Higher Level FX business in a
                    businesslike manner may also be entitled to deduct certain
                    expenses incurred in earning their Higher Level FX income.
                    Such expenses should be properly recorded and evidenced by
                    receipts.
                    <br />
                    <b>Telephone and Email Solicitation</b>
                    <br />
                    The use of any automated telephone solicitation equipment in
                    connection with the marketing or promotion of Higher Level
                    FX, its products, or the Higher Level FX opportunity is
                    strictly prohibited. The use of telemarketing operations to
                    sell software products or services over the telephone, or to
                    recruit BA's is strictly prohibited.
                    <br />
                    BA's are also forbidden from sending unsolicited e-mail
                    messages or "spamming" to sell products or to recruit other
                    BA’s. All BA’s should also make themselves familiar with
                    relevant privacy legislation.
                    <br />
                    <b>Territories</b>
                    <br />
                    There are no exclusive territories for marketing Higher
                    Level FX software products or services, nor shall any BA
                    imply or state that he/she has an exclusive territory to
                    market Higher Level FX products or services.
                    <br />
                    <b>Compensation Plan</b>
                    <br />
                    BEING A CUSTOMER: You will get $15 EVERY MONTH for each
                    customer referral that signs up (recurring as long as they
                    stay active). If you sign up 3 other paying customers you
                    will get your products for free as long as you keep at least
                    3 other paying customers under you. After your first 3
                    customer referrals instead of paying you $45 per month, we
                    are going to give you access to all customer products for
                    free (a $159 value). From then on your software is free as
                    long as they stay active and for every additional customer
                    referral you will get $15 per month. ALSO you will receive
                    $15 for each additional customer you personally sign up
                    after your first 3. If one of those customers decides to
                    upgrade to an affiliate then they no longer count towards
                    your 3. If a person signs up as an affiliate they do not
                    earn you the $15 per month and do not count towards your 3.
                    If one of your 3 personal referrals signs up 3 paying
                    customers then they no longer count towards your 3. You must
                    have 3 paying customers who are not eligible for free
                    products and who are not affiliates. UPGRADING TO AN
                    AFFILIATE: To upgrade it is $15 per month and you are not
                    required to keep your product subscription. You will however
                    lose the free product access even if you had 3 customers
                    under you. You will have full access to our compensation
                    plan and be able to build your tree as an affiliate. Any
                    customers you had signed up before becoming an affiliate
                    will carry over into your tree. THE 66% RULE: Affiliates who
                    meet the 66% rule, meaning that EACH of their legs has at
                    least 66% of customers and at most 33% of customers who are
                    affiliates OR "Affiliate ONLY", will get paid based on the
                    highest possible rank they have achieved. People who DO NOT
                    meet the 66% rule, will get paid based on the highest rank
                    level where all requirements are fulfilled. Here is how you
                    get paid if any of your lanes are under 66%: You have 500
                    affiliates and 100 customers on your first lane. Therefore
                    your percentage ratio is 16.6% which is under 66%. In this
                    case, your 100 customers will be your 66% and the rest will
                    be filled with affiliates. You will be ranked based off 150
                    people in this lane (100 customers + 50 affiliates). THE 10
                    DAY HOLDING TANK: - When you enroll a new member, they will
                    be placed in your 10-day holding tank. - At this point, you
                    can then choose where to place them into your tree. - If you
                    do not place someone into your tree within 10 days, they
                    will automatically be placed at the next available slot
                    (going from left to right). RESIDUALS FROM YOUR TREE: - We
                    payout a weekly residual income every Friday once you
                    achieve a rank. - As long as you maintain your rank each
                    week, you will get paid for that rank. - You always get paid
                    based on the rank you had in the previous week. - You must
                    earn a rank before Friday in order to get paid the following
                    week. To be eligible for any ranks you must always have 1
                    personal referral on each lane.
                    <br />
                    <b>Trade Shows and Expositions</b>
                    <br />
                    BA may display and/or sell Higher Level FX products at trade
                    shows and expositions, but may not display or sell Higher
                    Level FX products at swap meets, garage sales, ﬂea markets,
                    or farmers' markets as these events are not conducive to the
                    image Higher Level FX wishes to portray. Higher Level FX
                    cannot supply inventory on consignment to BA operating
                    stands at such events. All literature displayed at the event
                    must be ofﬁcial Higher Level FX literature and must clearly
                    identify the individual(s) as Business Affiliates.
                    <br />
                    <b>Transfer of Sponsorship Conﬂicting Enrollments</b>
                    <br />
                    Every prospective BA has the ultimate right to choose
                    his/her own sponsor. As a general rule, the ﬁrst BA who does
                    meaningful work with a prospective BA is considered to have
                    a ﬁrst claim to sponsorship. Basic tenets of common sense
                    and consideration should govern any dispute that may arise.
                    In the event that a prospective BA or any BA on behalf of a
                    prospective BA, submit more than one BA Application and
                    Agreement to Higher Level FX, listing a different sponsor on
                    each, the company will only consider valid the ﬁrst BA
                    Application and Agreement that it receives, accepts, and
                    processes. If there is any question concerning the
                    sponsorship of an BA, the ﬁnal decision will be made by
                    Higher Level FX.
                    <br />
                    <b>Change of Sponsorship and Cross-line recruiting</b>
                    <br />
                    Higher Level FX will not permit any change in the line of
                    sponsorship except in the following circumstances: where a
                    BA has been fraudulently or unethically induced into
                    joining. If you terminate your BA in writing you may rejoin
                    under the Sponsor of your choice after a period of four (4)
                    months; following termination of your BA, you may
                    participate as a customer during the four (4) month period.
                    In the event you terminate your BA, you forfeit all rights,
                    bonuses, and commissions under your previous line of
                    sponsoring. You may not avoid compliance with this policy
                    through the use of DBAs, assumed names, corporations,
                    partnerships, trusts, spouse names, fictitious ID numbers,
                    etc. If you have been "inactive" (i.e., no purchases or
                    sales of Higher Level FX products or participation in any
                    other form as an BA) for a period of four (4) successive
                    months, you may terminate your BA in writing and rejoin
                    immediately under the sponsor of your choice. Cross-line
                    raiding is strictly prohibited. "Cross-line raiding" is
                    deﬁned as the enrollment or attempted enrollment of an
                    individual or Entity that already has a current BA User
                    Agreement with Higher Level FX, or who has had such
                    agreement within the preceding six (6) calendar months
                    within a different line of sponsorship. The use of trade
                    names, DBAs, assumed names, corporations, partnerships,
                    trusts, spouse names, ﬁctitious ID numbers or any other
                    vehicle to circumvent this policy is prohibited. BA may not
                    demean, discredit, or invalidate other BA in an attempt to
                    entice another Business Affiliate to become part of the ﬁrst
                    BA's downline organization.
                    <br />
                    <b>
                      Responsibilities of Business Affiliates and Sponsors
                      Ongoing Supervision, Training, and Sales
                    </b>
                    <br />
                    Any BA who sponsors another BA into Higher Level FX must
                    train the new BA in product knowledge, effective sales
                    techniques, the Rewards Plan, and the Terms and Conditions.
                    BA must also supervise and monitor BA in their downline
                    organization to ensure they conduct business professionally
                    and ethically, promote sales properly, and provide quality
                    customer service. As a BA progresses through the various
                    levels of leadership, his/her responsibilities to train and
                    motivate downline BA will increase.
                    <br />
                    <b>Non-Disparagement</b>
                    <br />
                    In setting the proper example for their downline, BA must
                    not disparage other BA, Higher Level FX's Products, the
                    Rewards Plan, or the company's employees. Such disparagement
                    constitutes a material breach of these Terms and Conditions.
                    Holding Applications or Orders - All BA must forward to
                    Higher Level FX any forms and applications they receive from
                    other BA or applicant BA, or customers or applicant
                    customers, on the next business day after which the forms or
                    applications are signed.
                    <br />
                    <b>Reporting Policy Violations</b>
                    <br />
                    BA should report any observed violations of a policy
                    violation to the Higher Level FX Compliance Department.
                    <br />
                    <b>Bonuses and Commissions Bonus and Commission Cycles</b>
                    <br />
                    Higher Level FX pays commissions on a daily, weekly and
                    monthly cycles to the BA's account located in the BA Back
                    Ofﬁce. A BA must review their commissions and report any
                    errors or discrepancies to Higher Level FX within ten (10)
                    days from the date of the commission payment. Errors or
                    discrepancies which are not brought to Higher Level FX's
                    attention within the 10 day period will be deemed waived by
                    the BA.
                    <br />
                    <b>Adjustment of Bonuses and Commissions</b>
                    <br />
                    BA's earn commissions and bonuses based on software product
                    sales to end consumers. Accordingly, Higher Level FX will
                    adjust commissions and bonuses earned from any sale when the
                    BA or any other end consumer returns the sold software
                    product for a refund. Higher Level FX will deduct the sales
                    volume attributable to the returned product from the upline
                    BA's group volume within the ﬁrst two (2) weeks after the
                    refund is given.
                    <br />
                    <b>Loss of Rights to Commissions</b>
                    <br />
                    You must be an active BA and in compliance with the terms of
                    the Business Affiliate User Agreement to qualify for
                    commissions and bonuses.
                    <br />
                    <b>Unclaimed Commissions</b>
                    <br />
                    BA’s who provide Higher Level FX with incomplete or invalid
                    bank account information will have their commission and
                    bonus retained as a credit. Any unclaimed credit will be
                    held in trust for 12 months, during which time Higher Level
                    FX may periodically notify the BA in writing of their credit
                    balance.
                    <br />
                    <b>
                      Dispute Resolution and Disciplinary Proceedings between
                      Business Affiliates Grievances and Complaints
                    </b>
                    <br />
                    When a Business Affiliate has a grievance or complaint with
                    another Business Affiliate regarding any practice or conduct
                    in relationship to their respective Higher Level FX
                    businesses, the complaining Business Affiliate should ﬁrst
                    discuss the problem with the other Business Affiliate. If
                    this does not resolve the problem, the complaining Business
                    Affiliate should report the problem to their upline to
                    resolve the issue at a local level. If the matter cannot be
                    resolved, it must be reported in writing to the Higher Level
                    FX Compliance Department. The Compliance Department will
                    review the complaint and make a ﬁnal decision. The complaint
                    should identify speciﬁc instances of alleged improper
                    conduct and, to the extent possible, identify the relevant
                    dates on which the event(s) complained of took place, the
                    location(s) where they occurred, and all persons who have
                    ﬁrsthand knowledge of the improper conduct.
                    <br />
                    <b>Compliance Department Review</b>
                    <br />
                    Upon receipt of a written complaint, the Higher Level FX
                    Compliance Department will investigate the matter, review
                    the applicable policies, and render a decision on how the
                    dispute shall be resolved. The Compliance Department may
                    also issue disciplinary sanctions consistent with the
                    provisions of this Agreement Disputes between Higher Level
                    FX and Business Affiliates.
                    <br />
                    <b>Mediation and arbitration</b>
                    <br />
                    All unresolved disputes and claims relating to Higher Level
                    FX, its Rewards Plan, its products, the rights and
                    obligations of its BA and Higher Level FX, or any other
                    claim or cause of action relating to product purchase(s) or
                    performance, either of a BA or of Higher Level FX under the
                    Business Affiliate User Agreement, shall ﬁrst be put before
                    a mediator acceptable to both parties for resolution. Each
                    party shall bear its own costs in the mediation. Should
                    mediation fail to resolve the dispute then it shall be put
                    before arbitration at a location determined by Higher Level
                    FX. Each party to the arbitration shall be responsible for
                    their own costs, including travel expenses, legal and ﬁling
                    fees. This agreement to mediate and, failing mediation,
                    arbitrate will survive any cancellation or expiration of the
                    Business Affiliate User Agreement. Nothing in these Terms
                    and Conditions shall prevent Higher Level FX from applying
                    to and obtaining from any court having jurisdiction a writ
                    of attachment, temporary injunction, preliminary injunction,
                    permanent injunction, or other available relief to safeguard
                    and protect Higher Level FX's interest prior to, during, or
                    following the ﬁling of any arbitration or another
                    proceeding, or pending the rendering of a decision or award
                    in connection with any arbitration or other proceeding. The
                    existence of any BA claim or cause of action against Higher
                    Level FX does not preclude Higher Level FX from enforcing
                    the BA's covenants and agreements contained in the Business
                    Affiliate User Agreement.
                    <br />
                    <b>Disciplinary Actions</b>
                    <br />
                    Violation of any of the terms and conditions of the Business
                    Affiliate User Agreement, or any illegal, fraudulent,
                    deceptive, or unethical business conduct by a BA, may
                    result, at Higher Level FX's discretion, in one or more of
                    the following sanctions: a written warning, clarifying the
                    meaning and application of a speciﬁc policy or procedure,
                    and advising that a continued breach will result in further
                    sanctions; probation, which may include requiring a BA to
                    take remedial action and will include follow-up monitoring
                    by Higher Level FX to ensure compliance with the Agreement;
                    withdrawal or denial of an award or recognition, or
                    restricting participation in Higher Level FX sponsored
                    events for a speciﬁed period of time or until the BA
                    satisﬁes certain speciﬁed conditions; suspension of certain
                    privileges of BA, including but not limited to placing a
                    software product order, participating in Higher Level FX
                    programs, progressing in the Rewards Plan, or participating
                    as a sponsor, for a speciﬁed period of time or until the BA
                    satisﬁes certain speciﬁed conditions; withholding
                    commissions or bonuses for a speciﬁed period of time or
                    until the BA satisﬁes certain speciﬁed conditions; imposing
                    fair and reasonable ﬁnes or other penalties in proportion to
                    actual damages incurred by Higher Level FX and as permitted
                    by law; and/or terminating an BA.
                    <br />
                    <b>Business Affiliate Services Changes to the BA</b>
                    <br />
                    Each BA must immediately notify Higher Level FX of all
                    changes to the information contained in the Business
                    Affiliate Application and Agreement. BA may modify their
                    existing Business Affiliate User Agreement by submitting a
                    written request, a properly executed Business Affiliate User
                    Agreement, and appropriate supporting documentation. Certain
                    changes can be made by the BA in the BA's Back Ofﬁce.
                    <br />
                    <b>Addition of Co-applicants</b>
                    <br />
                    When adding a co-applicant to an existing BA, Higher Level
                    FX requires both a written request and a properly completed
                    Business Affiliate User Agreement containing the applicant's
                    and co-applicant’s signatures. The modiﬁcations permitted
                    within the scope of this paragraph do not include a change
                    of sponsorship.
                    <br />
                    <b>Commission Statements/tax Invoices</b>
                    <br />
                    Commission Statements/Tax Invoices are provided for all
                    active BA's receiving a commission in your BA Back Ofﬁce.
                    <br />
                    <b>Errors or Questions</b>
                    <br />
                    In the event a BA has questions about or believes that any
                    errors have been made regarding commissions, bonuses,
                    Downline genealogy reports, orders, or charges, the BA must
                    notify Higher Level FX within thirty (30) days of the date
                    of the purported error or incident in question. Higher Level
                    FX will not be responsible for any error, omission, or
                    problem not reported within ten (10) days.
                    <br />
                    <b>Resolving Problems</b>
                    <br />
                    If you have any questions regarding shipments, orders,
                    commissions and bonuses, or the Rewards Plan, please message
                    Higher Level FX Support in your BA Back Ofﬁce.
                    <br />
                    <b>Inactivity and Cancellation Policies</b>
                    <br />
                    BA’s who do not meet the active status requirements speciﬁed
                    in the Higher Level FX Rewards Plan may not receive a
                    commission and may lose accumulated sales volume for the
                    sales generated through their downline organization.
                    <br />
                    <b>Involuntary Cancellation</b>
                    <br />
                    A BA's violation of any of the terms of the Business
                    Affiliate User Agreement, including any amendments which may
                    be made by Higher Level FX in its sole discretion from time
                    to time, constitutes a material breach of the Business
                    Affiliate User Agreement and may result, at Higher Level
                    FX's option, in any of the disciplinary actions listed
                    herein, including cancellation of their BA. Involuntary
                    cancellation of a BA will result in the BA's loss of all
                    rights to his/her downline organization and any bonuses and
                    commissions generated thereby. A BA whose agreement is
                    involuntarily canceled shall receive commissions and bonuses
                    only for the last full calendar week prior to termination.
                    When a BA is involuntarily canceled, the BA will be notiﬁed
                    by certiﬁed mail at the address on ﬁle with the company or
                    email on ﬁle. Cancellation is effective on the date on which
                    written notice is mailed via certiﬁed mail, return receipt
                    requested, to the Business Affiliate's last known address or
                    when the BA receives actual notice of cancellation,
                    whichever occurs ﬁrst or the date and time the email was
                    sent. In the event of such involuntary cancellation, the
                    Business Affiliate must immediately cease to represent
                    themself as a BA. The BA may appeal the termination to the
                    Higher Level FX Compliance Department. The BA's appeal must
                    be in writing and must be received by the company within
                    ﬁfteen (15) calendar days of the date of Higher Level FX ’s
                    cancellation letter. If Higher Level FX does not receive the
                    appeal within the ﬁfteen day period, the cancellation will
                    be ﬁnal. The BA must submit all supporting documentation
                    with his/her appeal correspondence. The written appeal will
                    be reviewed by the Compliance Department. If the BA ﬁles a
                    timely appeal of termination, the Compliance Department will
                    review and reconsider the termination, consider any other
                    appropriate action, and notify the BA in writing of it’s
                    decision. This decision of the Compliance Department will be
                    ﬁnal. A BA whose Business Affiliate User Agreement is
                    involuntarily canceled may re-apply to become a BA twelve
                    (12) calendar months from the date of cancellation. Any such
                    BA wishing to re-apply must submit a letter to the Higher
                    Level FX Compliance Department setting forth the reasons why
                    he/she believes Higher Level FX should allow him or her to
                    operate a BA. It is within Higher Level FX's sole discretion
                    whether to permit such an individual to again operate a
                    Higher Level FX business.
                    <br />
                    <b>Written Cancellation</b>
                    <br />
                    A BA may cancel his/her Agreement with Higher Level FX at
                    any time and for any reason by providing written notice or
                    email to Higher Level FX indicating his/her intent to
                    discontinue his/her BA status. The written notice or email
                    must include the BA's signature, printed name, address, and
                    appropriate identiﬁcation number.
                    <br />
                    <b>Effect of Cancellation</b>
                    <br />
                    Following a BA's voluntary or involuntary cancellation, such
                    former BA shall have no right, title, claim, or interest to
                    the downline organization which they operated or any bonus
                    and/or commission from the sales generated by the
                    organization. Following a BA's voluntary or involuntary
                    cancellation, the former BA shall not hold himself or
                    herself out as a Business Affiliate, shall not have the
                    right to sell Higher Level FX software products or services,
                    must remove any Higher Level FX sign from public view, and
                    must discontinue using any other materials bearing any
                    Higher Level FX logo, trademark, or service mark. A BA who
                    is voluntarily canceled will receive commissions and bonuses
                    only for the last full calendar week prior to his/her
                    cancellation. A BA whose Agreement is involuntarily canceled
                    will receive commissions and bonuses only for the last full
                    calendar week prior to cancellation unless monies were
                    withheld by the company during an investigation period. If
                    an investigation of the BA's conduct results in his/ her
                    involuntary cancellation, he/she shall not be entitled to
                    recover withheld commissions and bonuses.
                    <br />
                    <b>Definitions</b>
                    <br />
                    <b>Active BA</b> - A BA who is trading ﬁat currency using
                    Higher Level FX's software on a daily basis as set forth in
                    the Higher Level FX Rewards Plan.
                    <br />
                    <b>BA</b> - An individual who has executed a Business
                    Affiliate User Application and Agreement which has been
                    accepted by Higher Level FX. BA's are required to meet
                    certain qualiﬁcations and are responsible for the training,
                    motivation, support, and development of the BA's in their
                    respective downline organizations. BA is entitled to
                    purchase Higher Level FX software products at BA prices,
                    enroll customers and new BA's, and take part in all Higher
                    Level FX BA programs.
                    <br />
                    <b>BA User Agreement</b> - The term Business Affiliate User
                    Agreement, as used in the Terms and Conditions, refers to
                    the Business Affiliate Application and Agreement, Higher
                    Level FX's Terms and Conditions, and the Rewards Plan.
                    <br />
                    <b>Cancellation</b> - Termination of an individual's BA.
                    <br />
                    <b>Voluntary Cancellation</b> - The termination of a BA
                    instituted by the BA who elects to discontinue his/her
                    afﬁliation with Higher Level FX for any reason.
                    <br />
                    <b>Downline Organization</b> - A BA's downline organization
                    consists of all BA’s and customers below him/her.
                    <br />
                    <b>Genealogy Report</b> - A report generated by Higher Level
                    FX that provides critical data relating to the identities of
                    BA and sales information of each BA's downline organization.
                    This report contains proprietary trade secret information.
                    <br />
                    <b>Immediate Household</b> - A BA, his or her spouse or
                    de-facto, and dependents.
                    <br />
                    <b>Level</b> - The layers of downline BA's in a particular
                    BA's downline organization. This term refers to the
                    relationship of a BA relative to a particular upline BA,
                    determined by the number of BA between them who are related
                    by sponsorship.
                    <br />
                    <b>Ofﬁcial Higher Level FX Material</b> - Literature, audio
                    or videotapes, and other materials developed, printed,
                    published, or distributed by Higher Level FX.
                    <br />
                    <b>Sponsor</b> - A BA who enrolls a new BA or customer and
                    is listed as the sponsor on the Business Affiliate User
                    Application and Agreement. As the term implies, the sponsor
                    has a responsibility to assist those he/she brings into the
                    business.
                    <br />
                    <b>Upline</b> - The term refers to the BA or BA's above a
                    particular BA in a sponsorship line to the company.
                    Conversely stated, it is the line of sponsors that links any
                    particular BA to the Company.
                    <br />
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

export default TermsConditionsPage;
