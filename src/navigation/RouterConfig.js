import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "navigation/NotFound";
import {
  ROUTE_LOGIN,
  ROUTE_FREE_BOOK,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_USER_DASHBOARD,
  ROUTE_USER_FEED,
  ROUTE_USER_SOFTWARE,
  ROUTE_REGISTER,
  ROUTE_REWARDS_PLAN,
  ROUTE_ABOUT_US,
  ROUTE_SUPPORT,
  ROUTE_USER_AGREEMENT,
  ROUTE_TERMS_CONDITIONS,
  ROUTE_PRIVACY_POLICY,
  ROUTE_RISK_WARNING,
  ROUTE_AFFILIATE_AGREEMENT,
  ROUTE_INCOME_DISCLAIME,
  ROUTE_TRIAL_POLICY,
  ROUTE_COMPLIANCE,
  ROUTE_USER_VPS,
  ROUTE_USER_TEAM,
  ROUTE_USER_LICENSE,
  ROUTE_USER_ACADEMY,
  ROUTE_USER_MARKETING,
  ROUTE_USER_CHART,
  ROUTE_USER_WALLET,
  ROUTE_USER_AFFILIATE,
  ROUTE_USER_TICKET,
  ROUTE_USER_SUPPORT,
  ROUTE_USER_VERIFICATION,
  ROUTE_USER_PROFILE,
  ROUTE_WELCOME,
  ROUTE_CONFIRM_PASSWORD,
  ROUTE_USER_ACADEMY_BASIC,
  ROUTE_USER_ACADEMY_ADVANCED,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_VERIFICATION_CONFIRM,
  ROUTE_USER_PAY_LICENSE,
  ROUTE_USER_PAY_AFFILIATE,
  ROUTE_USER_TEAM_DETAIL,
  ROUTE_USER_TICKET_ADD,
  ROUTE_USER_TICKET_DETAIL,
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_USERS,
  ROUTE_ADMIN_LICESES,
  ROUTE_ADMIN_PAYMENTS,
  ROUTE_ADMIN_WITHDRAWS,
  ROUTE_ADMIN_TICKET,
  ROUTE_ADMIN_FEED,
  ROUTE_ADMIN_TICKET_DETAIL,
  ROUTE_ADMIN_FEED_DETAIL,
  ROUTE_ADMIN_ANNOUNCEMENT,
  ROUTE_ADMIN_PROFILE,
  ROUTE_ADMIN_STATS,
  ROUTE_ADMIN_TEAM,
  ROUTE_ADMIN_TEAM_DETAIL,
  ROUTE_ADMIN_RANK,
  ROUTE_ADMIN_RANK_DETAIL,
  ROUTE_ADMIN_COUPON,

} from "navigation/CONSTANTS";
import HomePage from "pages/Home/HomePage/HomePage";
import FreeBookPage from "pages/Home/FreeBookPage/FreeBookPage";
import UserLayout from "layouts/UserLayout/UserLayout";
import UserDashboardPage from "pages/User/UserDashboardPage/UserDashboardPage";
import UserFeedPage from "pages/User/UserFeedPage/UserFeedPage";
import UserSoftwarePage from "pages/User/UserSoftwarePage/UserSoftwarePage";
import LoginPage from "pages/Home/LoginPage/LoginPage";
import RegisterPage from "pages/Home/RegisterPage/RegisterPage";
import ForgotPasswordPage from "pages/Home/ForgotPasswordPage/ForgotPasswordPage";
import RewardsPlanPage from "pages/Home/RewardsPlanPage/RewardsPlanPage";
import AboutUsPage from "pages/Home/AboutUsPage/AboutUsPage";
import SupportPage from "pages/Home/SupportPage/SupportPage";
import UserAgreementPage from "pages/Home/UserAgreementPage/UserAgreementPage";
import TermsConditionsPage from "pages/Home/TermsConditionsPage/TermsConditionsPage";
import PrivacyPolicyPage from "pages/Home/PrivacyPolicyPage/PrivacyPolicyPage";
import RiskWarningPage from "pages/Home/RiskWarningPage/RiskWarningPage";
import AffiliateAgreementPage from "pages/Home/AffiliateAgreementPage/AffiliateAgreementPage";
import IncomeDisclaimerPage from "pages/Home/IncomeDisclaimerPage/IncomeDisclaimerPage";
import TrialPolicyPage from "pages/Home/TrialPolicyPage/TrialPolicyPage";
import CompliancePage from "pages/Home/CompliancePage/CompliancePage";
import UserVpsPage from "pages/User/UserVpsPage/UserVpsPage";
import UserTeamPage from "pages/User/UserTeamPage/UserTeamPage";
import UserLicensePage from "pages/User/UserLicensePage/UserLicensePage";
import UserAcademyPage from "pages/User/UserAcademyPage/UserAcademyPage";
import UserMarketingPage from "pages/User/UserMarketingPage/UserMarketingPage";
import UserChartPage from "pages/User/UserChartPage/UserChartPage";
import UserWalletPage from "pages/User/UserWalletPage/UserWalletPage";
import UserAffiliateIntroPage from "pages/User/UserAffiliateIntroPage/UserAffiliateIntroPage";
import UserTicketPage from "pages/User/UserTicketPage/UserTicketPage";
import UserSupportPage from "pages/User/UserSupportPage/UserSupportPage";
import UserVerificationPage from "pages/User/UserVerificationPage/UserVerificationPage";
import UserProfilePage from "pages/User/UserProfilePage/UserProfilePage";
import WelcomePage from "pages/Home/WelcomePage/WelcomePage";
import ConfirmPasswordPage from "pages/Home/ConfirmPasswordPage/ConfirmPasswordPage";
import UserBasicAcademyPage from "pages/User/UserAcademyPage/inc/UserBasicAcademyPage";
import UserAdvancedAcademyPage from "pages/User/UserAcademyPage/inc/UserAdvancedAcademyPage";
import UserPaymentListPage from "pages/User/UserPaymentListPage/UserPaymentListPage";
import UserPayLicensePage from "pages/User/UserPayLicensePage/UserPayLicensePage";
import UserPayAffiliatePage from "pages/User/UserPayAffiliatePage/UserPayAffiliatePage";
import UserAddTicketPage from "pages/User/UserTicketPage/UserAddTicketPage";
import UserDetailTicketPage from "pages/User/UserTicketPage/UserDetailTicketPage";
import AdminDashboardPage from "pages/Admin/AdminDashboardPage/AdminDashboardPage";
import AdminUsersPage from "pages/Admin/AdminUsersPage/AdminUsersPage";
import AdminLicensesPage from "pages/Admin/AdminLicensesPage/AdminLicensesPage";
import AdminPaymentsPage from "pages/Admin/AdminPaymentsPage/AdminPaymentsPage";
import AdminWithdrawPage from "pages/Admin/AdminWithdrawPage/AdminWithdrawPage";
import AdminTicketPage from "pages/Admin/AdminTicketPage/AdminTicketPage";
import AdminFeedPage from "pages/Admin/AdminFeedPage/AdminFeedPage";
import AdminDetailTicketPage from "pages/Admin/AdminTicketPage/AdminDetailTicketPage";
import AdminDetailFeedPage from "pages/Admin/AdminFeedPage/AdminDetailFeedPage";
import AdminAnnouncementPage from "pages/Admin/AdminAnnouncementPage/AdminAnnouncementPage";
import AdminProfilePage from "pages/Admin/AdminProfilePage/AdminProfilePage";
import AdminStatsPage from "pages/Admin/AdminStatsPage/AdminStatsPage";
import AdminTeamPage from "pages/Admin/AdminTeamPage/AdminTeamPage";
import NotFoundPage from "pages/Home/NotFoundPage/NotFoundPage";
import AdminRankPage from "pages/Admin/AdminRankPage/AdminRankPage";
import AdminRankDetailPage from "pages/Admin/AdminRankPage/AdminRankDetailPage";
import AdminCouponPage from "pages/Admin/AdminCouponPage/AdminCouponPage";
export const RouterConfig = () => {

  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={ROUTE_FREE_BOOK } component={FreeBookPage} />
        <Route exact path={ROUTE_LOGIN} component={LoginPage} />
        <Route exact path={ROUTE_REGISTER} component={RegisterPage} />
        <Route exact path={ROUTE_FORGOT_PASSWORD} component={ForgotPasswordPage} />
        <Route exact path={ROUTE_CONFIRM_PASSWORD} component={ConfirmPasswordPage} />
        <Route exact path={ROUTE_REWARDS_PLAN} component={RewardsPlanPage} />
        <Route exact path={ROUTE_ABOUT_US} component={AboutUsPage} />
        <Route exact path={ROUTE_SUPPORT} component={SupportPage} />
        <Route exact path={ROUTE_USER_AGREEMENT} component={UserAgreementPage} />
        <Route exact path={ROUTE_TERMS_CONDITIONS} component={TermsConditionsPage} />
        <Route exact path={ROUTE_PRIVACY_POLICY} component={PrivacyPolicyPage} />
        <Route exact path={ROUTE_RISK_WARNING} component={RiskWarningPage} />
        <Route exact path={ROUTE_AFFILIATE_AGREEMENT} component={AffiliateAgreementPage} />
        <Route exact path={ROUTE_INCOME_DISCLAIME} component={IncomeDisclaimerPage} />
        <Route exact path={ROUTE_TRIAL_POLICY} component={TrialPolicyPage} />
        <Route exact path={ROUTE_COMPLIANCE} component={CompliancePage} />
        <Route exact path={ROUTE_WELCOME} component={WelcomePage} />

        <Route exact path={ROUTE_ADMIN_DASHBOARD} component={AdminDashboardPage} />
        <Route exact path={ROUTE_ADMIN_USERS} component={AdminUsersPage} />
        <Route exact path={ROUTE_ADMIN_LICESES} component={AdminLicensesPage} />
        <Route exact path={ROUTE_ADMIN_PAYMENTS} component={AdminPaymentsPage} />
        <Route exact path={ROUTE_ADMIN_WITHDRAWS} component={AdminWithdrawPage} />
        <Route exact path={ROUTE_ADMIN_TICKET} component={AdminTicketPage} />
        <Route exact path={ROUTE_ADMIN_TICKET_DETAIL} component={AdminDetailTicketPage} />
        <Route exact path={ROUTE_ADMIN_FEED} component={AdminFeedPage} />
        <Route exact path={ROUTE_ADMIN_FEED_DETAIL} component={AdminDetailFeedPage} />
        <Route exact path={ROUTE_ADMIN_ANNOUNCEMENT} component={AdminAnnouncementPage} />
        <Route exact path={ROUTE_ADMIN_PROFILE} component={AdminProfilePage} />
        <Route exact path={ROUTE_ADMIN_STATS} component={AdminStatsPage} />
        <Route exact path={ROUTE_ADMIN_TEAM} component={AdminTeamPage} />
        <Route exact path={ROUTE_ADMIN_TEAM_DETAIL} component={AdminTeamPage} />
        <Route exact path={ROUTE_ADMIN_RANK} component={AdminRankPage} />
        <Route exact path={ROUTE_ADMIN_RANK_DETAIL} component={AdminRankDetailPage} />
        <Route exact path={ROUTE_ADMIN_COUPON} component={AdminCouponPage} />
        
        <UserLayout>
          <Route exact path={ROUTE_USER_FEED} component={UserFeedPage} />
          <Route exact path={ROUTE_USER_SOFTWARE} component={UserSoftwarePage} />
          <Route exact path={ROUTE_USER_DASHBOARD} component={UserDashboardPage} />
          <Route exact path={ROUTE_USER_VPS} component={UserVpsPage} />
          <Route exact path={ROUTE_USER_TEAM} component={UserTeamPage} />
          <Route exact path={ROUTE_USER_TEAM_DETAIL} component={UserTeamPage} />
          <Route exact path={ROUTE_USER_LICENSE} component={UserLicensePage} />
          <Route exact path={ROUTE_USER_ACADEMY} component={UserAcademyPage} />
          <Route exact path={ROUTE_USER_ACADEMY_BASIC + "/:type"} component={UserBasicAcademyPage} />
          <Route exact path={ROUTE_USER_ACADEMY_ADVANCED} component={UserAdvancedAcademyPage} />
          <Route exact path={ROUTE_USER_MARKETING} component={UserMarketingPage} />
          <Route exact path={ROUTE_USER_CHART} component={UserChartPage} />
          <Route exact path={ROUTE_USER_WALLET} component={UserWalletPage} />
          <Route exact path={ROUTE_USER_PAYMENT} component={UserPaymentListPage} />
          <Route exact path={ROUTE_USER_AFFILIATE} component={UserAffiliateIntroPage} />
          <Route exact path={ROUTE_USER_TICKET} component={UserTicketPage} />
          <Route exact path={ROUTE_USER_TICKET_ADD} component={UserAddTicketPage} />
          <Route exact path={ROUTE_USER_TICKET_DETAIL} component={UserDetailTicketPage} />
          <Route exact path={ROUTE_USER_SUPPORT} component={UserSupportPage} />  
          <Route exact path={ROUTE_USER_VERIFICATION} component={UserVerificationPage} />  
          <Route exact path={ROUTE_USER_VERIFICATION_CONFIRM} component={UserVerificationPage} />
          <Route exact path={ROUTE_USER_PROFILE} component={UserProfilePage} />          
          <Route exact path={ROUTE_USER_PAY_LICENSE} component={UserPayLicensePage} />
          <Route exact path={ROUTE_USER_PAY_AFFILIATE} component={UserPayAffiliatePage} />

          {/* <Route exact path="" component={NotFoundPage} /> */}
          
        </UserLayout>

      </Switch>
    </div>
  );
};




