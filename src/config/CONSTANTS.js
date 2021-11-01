// any app specific constants that you don't want to keep in config can go here.
export const APP_NAME = "Higher Level FX";
export const BASE_SITE_URL = "https://prod.superpython-higherlevelfx.com"; // "https://superpython-higherlevelfx.com", "http://54.244.14.37"; //"http://localhost"; //if development then localhost, if server then ip
export const BASE_FRONT_URL = BASE_SITE_URL;
export const BASE_API_URL = BASE_SITE_URL + ":8088";
export const SOCKET_SERVER_URL = BASE_SITE_URL + ":8088";
export const BASE_UPLOAD_URL = (BASE_SITE_URL !== "http://localhost" ? BASE_SITE_URL : BASE_API_URL);

export const LICENSE_TRIAL_PRICE = 1 //$
export const LICENSE_PRICE = 159 //$
export const AFFILIATE_COMMISSION = 15 //$
export const FEE_PERIOD = 30 //days
export const MLM_LEG_COUNT = 3
export const MAX_LEVEL = 2
export const MAX_TANK_DURATION = 10 //days
export const LICENSE_LIFE_TIME =  30; //days
export const TRIAL_LICENSE_PRICE =  1; //
export const TRIAL_LICENSE_DURATION =  7;//days
export const AFFILIATE_LIFE_TIME =  30; //days
export const LICENSE_AMOUNT =  2; //$
export const ACTIVE_CUSTOMER_COUNT =  3; //active customer cnt for free license
export const RULE_PERCENT =  0.66; //percent
export const REFERRAL_FUNDS =  15; //$
export const REFERRAL_FUNDS_LIFE_TIME =  30; //days
export const SITE_MODE = "live";
export const SMS_FUNC = "disabled";

export const SYSTEM_ERROR = "System error. Please try again later!";

export const CTA_YES = "Yes";
export const CTA_NO = "No";
export const CTA_CANCEL = "Cancel";

export const logoUrl = "/assets/images/logo.png";
export const googleKey = "6LfrFKQUAAAAAMzFobDZ7ZWy982lDxeps8cd1I2i";


