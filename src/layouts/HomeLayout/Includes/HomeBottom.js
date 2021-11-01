import { APP_NAME } from "config/CONSTANTS";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const HomeBottom = () => {
    const appDataStore = useSelector((x) => x.appDataStore);

    useEffect(() => {
        let doc_title = appDataStore.currentPageTitle;
        doc_title = doc_title + " | " + APP_NAME;
        document.title = doc_title;
      }, [appDataStore])

    return (
        <div>
            
        </div>
    );
};

export default HomeBottom;