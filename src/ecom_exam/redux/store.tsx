import { createStore } from "redux";
import reducer from "./reducer";

export const productStore = createStore(reducer)