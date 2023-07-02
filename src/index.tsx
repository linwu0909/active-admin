import dva, { DvaOption } from "dva";
import router from "./router";
import "./index.css";
import global from "./model/global";
import { IGlobalState } from "./model/type";

const initialGlobalState = () => {
  const globalLocal = JSON.parse(localStorage.getItem("global") || "{}");
  // 首先同步现有数据 =》 再同步localStorage到数据 遵循后进先出原则
  return {
    ...global.state,
    ...globalLocal,
  };
};

const app = dva({
  // 每次state改变触发
  onStateChange(state: { global: IGlobalState }) {
    localStorage.setItem("global", JSON.stringify(state.global));
  },
  initialState: {
    global: initialGlobalState(),
  },
} as unknown as DvaOption);

app.router(router);

app.model(global);

app.start("#root");
