import  ReactDOM  from "react-dom";
import "./assets/base.less"
import store from "./store";
import { Provider } from "react-redux";

import Router from "./router"

ReactDOM.render(
  
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
)