import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";

import BangDuLieu from "./components/BangDuLieu";
import Report from "./components/report";
const App = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="container-fluid">
      <div className="row d-flex text-center">
        {" "}
        <h2>Bệnh viện nhân dân 115</h2>
      </div>
      <div>
        <BangDuLieu onPrint={reactToPrintFn}></BangDuLieu>
      </div>
      {/* Phần báo cáo */}
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <Report></Report>
        </div>
      </div>
    </div>
  );
};

export default App;
