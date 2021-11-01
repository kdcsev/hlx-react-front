import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_AFFILIATE_AGREEMENT } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const AffiliateAgreementPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Affiliate Agreement";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_AFFILIATE_AGREEMENT,
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
                    AFFILIATE AGREEMENT
                  </h4>
                  <p className="desc-v1-1">
                    1. Authorization and Contract. By executing this Affiliate
                    Application & Agreement (“Agreement”), you apply for legal
                    authorization to become an HL4X International LLC business
                    owner and enter into a contract with HL4X International LLC.
                    You acknowledge that prior to signing you have received,
                    read and understood the Company Income Disclaimer Statement,
                    that you have read and understood the Company Policies and
                    Procedures, which are incorporated into this Agreement and
                    made part of it as if restated in full, as posted on the
                    company website, and that you have read and agree to all
                    terms set forth in this Agreement. The company reserves the
                    right to reject any application for any reason within thirty
                    (30) days of receipt.
                  </p>
                  <p className="desc-v1-1">
                    2. Expiration, Renewal, and Termination. The term of this
                    Agreement is one year (subject to renewal, prior
                    cancellation, and/or disqualification as provided in the
                    Policies and Procedures). If you fail to annually renew your
                    business, or if it is canceled or terminated for any reason,
                    you understand that you will permanently lose all rights as
                    an Affiliate. You shall not be eligible to sell Company
                    services nor shall you be eligible to receive royalties,
                    bonuses, or other income resulting from the activities of
                    your former downline sales organization. In the event of
                    cancellation, termination or nonrenewal, you waive all
                    rights you have, including but not limited to property
                    rights, to your former downline organization and to any
                    bonuses, commissions or other remuneration derived through
                    the sales and other activities of your former downline
                    organization. Company reserves the right to terminate all
                    Affiliate Agreements upon thirty (30) days’ notice if the
                    Company elects to (1) cease business operations; (2)
                    dissolve as a business entity; or (3) terminate distribution
                    of its services via direct selling channels. The affiliate
                    may cancel this Agreement at any time, and for any reason,
                    upon written notice to Company at its principal business
                    address. The company may cancel this Agreement for any
                    reason upon written notice to Affiliate. The company may
                    also take actions short of termination of the Agreement if
                    the Affiliate breaches any of its provisions.
                  </p>
                  <p className="desc-v1-1">
                    3. Independent Contractor Status. You agree this
                    authorization does not make you an employee, agent, or legal
                    representative of the Company or your Sponsoring Affiliate.
                    As a self-employed independent contractor, you will be
                    operating your own independent business, buying and selling
                    services available through the Company on your own account.
                    You have complete freedom in determining the number of hours
                    that you will devote to your business, and you have the sole
                    discretion of scheduling such hours. You will receive IRS
                    Form 1099-MISC reflecting the amount of income paid to you
                    during the calendar year. It will be your sole
                    responsibility to account for such income on your individual
                    income tax returns.
                  </p>
                  <p className="desc-v1-1">
                    4. Presenting the Plan. You agree when presenting the
                    Company Compensation Plan to present it in its entirety as
                    outlined in official Company materials, emphasizing that
                    sales to end consumers are required to receive compensation
                    in the form of bonuses on downline volume. In presenting the
                    plan to prospects, you agree not to utilize any literature,
                    materials or aids not produced or specifically authorized in
                    writing by the Company. You agree to instruct all
                    prospective Affiliates to review the Company Income
                    Disclaimer Statement.
                  </p>
                  <p className="desc-v1-1">
                    5. Selling the Service. You agree to make no representations
                    or claims about any services beyond those shown in official
                    Company literature. You further agree to sell services
                    available through Company only in authorized territories. No
                    claims (which include personal testimonials) as to the
                    guarantee of income or market success may be stated, except
                    those stated in official Company literature and website.
                  </p>
                  <p className="desc-v1-1">
                    6. HL4X International LLC’s Proprietary Information and
                    Trade Secrets. You recognize and agree that, as further set
                    forth in the Policies and Procedures, information compiled
                    by or maintained by Company, including Line of Sponsorship
                    (LOS) information (i.e., information that discloses or
                    relates to all or part of the specific arrangement of
                    sponsorship within the Company business including, without
                    limitation, Affiliate lists, sponsorship trees, and all
                    Company Affiliate information generated therefrom, in its
                    present or future forms), constitutes a commercially
                    advantageous, unique and proprietary trade secret of
                    Company, which it keeps as proprietary and confidential and
                    treats as a trade secret. During the term of your contract
                    with Company, Company grants you a personal, non-exclusive,
                    non-transferable and revocable right to use trade secret,
                    confidential, and proprietary business information
                    (Proprietary Information), which includes, without
                    limitation, LOS information, business reports, manufacturing
                    and service developments, and Affiliate sales, earnings and
                    other financial reports to facilitate your business.
                  </p>
                  <p className="desc-v1-1">
                    7. Non-Solicitation Agreement. In accordance with the
                    Policies and Procedures, you agree that during the period
                    while you are an Affiliate, and for one (1) calendar year
                    following resignation, non-renewal, or termination of your
                    business, you will not encourage, solicit, or otherwise
                    attempt to recruit or persuade any other HL4X International
                    LLC Affiliates to compete with the business of HL4X
                    International LLC.
                  </p>
                  <p className="desc-v1-1">
                    8. Images / Recordings / Consents. You agree to permit
                    Company to obtain photographs, videos, and other recorded
                    media of you or your likeness. You acknowledge and agree to
                    allow any such recorded media to be used by the Company for
                    any lawful purpose, and without compensation.
                  </p>
                  <p className="desc-v1-1">
                    9. Modification of Terms. With the exception of the dispute
                    resolution section in Policies and Procedures, which can
                    only be modified by way of mutual consent, the terms of this
                    Agreement may be modified as specified in the Policies and
                    Procedures.
                  </p>
                  <p className="desc-v1-1">
                    10. Jurisdiction and Governing Law. The formation,
                    construction, interpretation, and enforceability of your
                    contract with Company as set forth in this Affiliate
                    Agreement and any incorporated documents shall be governed
                    by and interpreted in all respects under the laws of the
                    State of Wyoming without regard to conflict of law
                    provisions. Louisiana residents: notwithstanding the
                    foregoing, Louisiana residents may bring an action against
                    HL4X International LLC with jurisdiction and venue as
                    provided by Louisiana law.
                  </p>
                  <p className="desc-v1-1">
                    11. Dispute Resolution. All disputes and claims relating to
                    Company, its services, the rights and obligations of an
                    Affiliate and Company, or any other claims or causes of
                    action relating to the performance of either an Affiliate or
                    Company under the Agreement or the Company Policies and
                    Procedures shall be settled totally and finally by mediation
                    and arbitration as enumerated in the Policies and Procedures
                    in the city of Laramie, Wyoming, or such other location as
                    Company prescribed, in accordance with the Federal
                    Arbitration Act and the Commercial Arbitration Rules of the
                    American Arbitration Association, except that all parties
                    shall be entitled to discovery rights allowed under the
                    Federal Rules of Civil Procedure. Additionally, you agree
                    not to initiate or participate in any className action
                    proceeding against the Company, whether in a judicial or
                    mediation or arbitration proceeding, and you waive all
                    rights to become a member of any certified className in any
                    lawsuit or proceeding. This agreement to arbitrate shall
                    survive any termination or expiration of the Agreement.
                    Nothing in the Agreement shall prevent Company from applying
                    to and obtaining from any court having jurisdiction a writ
                    of attachment, garnishment, temporary injunction,
                    preliminary injunction, permanent injunction or other
                    equitable relief available to safeguard and protect its
                    interest prior to, during or following the filing of any
                    arbitration or other proceeding or pending the rendition of
                    a decision or award in connection with any arbitration or
                    other proceeding.
                  </p>
                  <p className="desc-v1-1">
                    12. Time Limitation. If an Affiliate wishes to bring an
                    action against Company for any act or omission relating to
                    or arising from the Agreement, such action must be brought
                    within one (1) year from the date of the alleged conduct
                    giving rise to the cause of action. Affiliate waives all
                    claims that any other statutes of limitations apply.
                  </p>
                  <p className="desc-v1-1">
                    13. Refund/Trial Policy. The company offers a seven-day
                    trial for $1. If membership isn't canceled within the 7-day
                    trial it will automatically go to a normal membership and
                    begin being charged $159 per month. Affiliate accounts are
                    not eligible for the trial. All subsequent fees are
                    nonrefundable. There is absolutely no refund.
                  </p>
                  <p className="desc-v1-1">
                    14. Miscellaneous. If any provision of the Agreement is held
                    to be invalid or unenforceable, such provision shall be
                    reformed only to the extent necessary to make it
                    enforceable, and the balance of the Agreement will remain in
                    full force and effect. This Agreement may be executed in any
                    number of counterparts, each of which shall be deemed an
                    original, but all of which together shall constitute one
                    instrument. The provisions of this Agreement, including all
                    documents incorporated herein by reference, embody the whole
                    agreement between you and Company and supersedes any prior
                    agreements, understandings, and obligations between you and
                    Company concerning the subject matter of your contract with
                    Company.
                  </p>
                  <p className="desc-v1-1">
                    15. Submission of Electronic W-9. Under penalty of perjury,
                    I certify that (1) the number shown on this form is my
                    correct taxpayer identification number (or I am waiting for
                    a number to be issued to me), and (2), I am not subject to
                    backup withholding because: (a) I am exempt from backup
                    withholding, or (b) I have not been notified by the Internal
                    Revenue Service (IRS) that I am subject to backup
                    withholding as a result of a failure to report all interest
                    or dividends, or (c) the IRS has notified me that I am no
                    longer subject to backup withholding, and (3) I am a U.S.
                    Citizen or other U.S. person.
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

export default AffiliateAgreementPage;
