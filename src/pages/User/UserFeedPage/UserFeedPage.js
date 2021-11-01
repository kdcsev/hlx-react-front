import { ROUTE_USER_FEED } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateSocket } from "redux/actions/socketActions";
import { updateUser } from "redux/actions/userActions";
import renderHTML from 'react-render-html';
import { apiUserGetProfileInfo } from "services/userCommonService";
import {
  empty,
  encodedStr,
  get_data_value,
  intval,
  showToast,
  show_loading,
  timeConverter,
} from "utils/GlobalFunctions";

const UserFeedPage = (props) => {
  const dispatch = useDispatch();

  //////////////////////////socket part////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  const socketStore = useSelector((x) => x.socketStore);
  const socket = socketStore["socket"];
  useEffect(() => {
    if (!empty(socket)) {
      console.log("------------socketStore---------------", socketStore);
      addSocketListener();
      getFeedList();
    }
  }, [socket]);

  const token = get_data_value(userDataStore, "token");
  const socketHeader = { token: token };

  const addSocketListener = () => {
    socket.off('get_feed_list')
    socket.on("get_feed_list", (data) => {
      console.log("-------------get_feed_list reply data---------", data);
      setFeedList(data);
      if (!empty(data)) {
        setLastPostId(intval(data[0]["id"]));
      }
    });
  };
  const [feedList, setFeedList] = useState([]);
  const [lastPostId, setLastPostId] = useState(0);
  const getFeedList = () => {
    setFeedList([]);
    console.log("-------------edmit get_feed_list ---------");
    socket.emit("get_feed_list", { ...socketHeader, last_id: lastPostId });
    //setLastPostId(lastPostId + 1)
  };
  ///////////////////////////end socket part/////////////////////////////

  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: "News Feed",
        current_route: ROUTE_USER_FEED,
        m_user_menu_collapsed: true,
      })
    );
  };

  useEffect(() => {
    initPage();
    getData();
  }, []);
  const history = useHistory();
  const defaultPageData = {
    user: {},
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiUserGetProfileInfo()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title hidden">News Feed</h4>
              <div className="card-content">
                <div className="feed-list-container full_loaded">
                  <div className="feed-list" id="feed-list">
                    {!empty(feedList) &&
                      feedList.map((item, index) => {
                        return (
                          <div
                            className="feed-item"
                            data-id={item["id"]}
                            key={item["id"]}
                          >
                            <div className="alert alert-warning" role="alert">
                              <div className="feed-box note mb-0 text-left">
                                <p className="feed-subject">
                                  {item["subject"]}
                                </p>
                                <div className="feed-message word-break">{renderHTML(item['message'])}</div>
                                <p className="feed-date unix-timestamp">{timeConverter(item['add_timestamp'])}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="text-center ajax-placeholder">
                    <span className="">No news feed found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedPage;
