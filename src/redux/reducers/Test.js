import { HELLO } from "../constants/Test";

const initState = {
  hello: null,
};

const test = (state = initState, action) => {
  switch (action.type) {
    case HELLO:
      return {
        ...state,
        hello: action.hello,
      };
    default:
      return state;
  }
};
export default test;
