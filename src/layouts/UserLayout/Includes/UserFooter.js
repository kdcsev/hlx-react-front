import { APP_NAME } from "config/CONSTANTS";
import { ROUTE_ROOT } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserFooter = () => {
  const appDataStore = useSelector((x) => x.appDataStore);

  useEffect(() => {
      let doc_title = appDataStore.currentPageTitle;
      doc_title = doc_title + " | " + APP_NAME;
      document.title = doc_title;
    }, [appDataStore])
    
  return (
    <div>
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2021
            <Link
                to={ROUTE_ROOT}
                target="_blank"
                rel="noreferrer"
                className="ml-1"
              >
              {APP_NAME}
            </Link>
            . All rights reserved.
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Designed by: HLX Team<i className="ti-heart text-danger ml-1"></i>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default UserFooter;
