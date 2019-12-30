// Todi:change later
import { SIMPLE_ACTION } from "./simpleAction";

const initialState = {
  result: "yay"
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SIMPLE_ACTION:
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
};
