import React, { useEffect, useState } from "react";
import Paging from "./Paging";

//import { Textfit } from "react-textfit";

const index = React.memo(
  (props) => {
    const { type, pdf } = props;
    const [getResolve, setGetResolve] = useState(null);
    let size = 9;

    useEffect(() => {
      let cancel = true;
      if (cancel)
        if (getResolve != pdf)
          setTimeout(() => {
            if (type == "create" || type == "drawer" || type == "template") {
              setGetResolve(pdf);
            }
          }, 1100);
      return () => {
        cancel = false;
        setGetResolve();
      };
    }, []);
    return (
      <>
        <Paging {...props} size={size} type={type} pdf={getResolve} />
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.templateType === nextProps.templateType ||
    prevProps.pdf === nextProps.pdf
);

export default index;
