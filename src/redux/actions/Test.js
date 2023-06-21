import { HELLO } from "../constants/Test";

export const setHello = (hello) => {
  return {
    type: HELLO,
    hello: hello,
  };
};
