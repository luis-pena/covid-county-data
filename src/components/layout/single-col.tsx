import React, { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SingleColLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="container">
      <div className="container__spacer" />
      <div className="container__middle">{children}</div>
      <div className="container__spacer" />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
        }
        .container__middle {
          padding-bottom: 5rem;
          flex: 4;
        }
        .container__spacer {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default SingleColLayout;
