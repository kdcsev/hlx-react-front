import "utils/dropConsole";
// ROUTER
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";

import "./App.css";
// Redux
import { Provider } from "react-redux";

import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

store.subscribe(listener);

function select(state) {
    console.log("state:", state);
    const { token } = state.userDataStore;
    //console.log("token:", token);
    if (token === undefined || token === "") return "";
    return token;
}

function listener() {
    let token = select(store.getState());
    //console.log("bear token:", token);
    axios.defaults.headers.common["Content-Type"] =
        "application/json; charset=UTF-8";
    if (token === "") {
        // console.log("no token");
        delete axios.defaults.headers.common["Authorization"];
    } else {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
}

function App() {
    return (
        <>
            <div>
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <BrowserRouter>
                            <RouterConfig />
                        </BrowserRouter>
                    </PersistGate>
                </Provider>
            </div>
        </>
    );
}

export default App;
