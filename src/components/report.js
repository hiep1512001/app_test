import React from "react";
import Barcode from "react-barcode";
//redux
import { connect } from "react-redux";
const Report = (props) => {
  return (
    <div className="size-report">
      <div className="row">
        <Barcode height={15} fontSize={10} format="CODE128" value={props.taskReport.ma_tai_san} />
      </div>
      <div className="row">
        <label className="text-report " style={{ fontWeight: "500" }}>Tên tài sản : {props.taskReport.ten_tai_san}</label>
      </div>
      <div className="row">
        <label className="text-report">Số serial: {props.taskReport.seri}</label>
      </div>
      <div className="row ">
        <label className="text-report">Model: {props.taskReport.model}, Đơn vị tính: {props.taskReport.don_vi_tinh}</label>
      </div>{" "}
      <div className="row ">
        <label className="text-report">Hãng sản xuất: {props.taskReport.hang_san_xuat}</label>
      </div>{" "}
      <div className="row ">
        <label className="text-report">Nước sản xuất: {props.taskReport.nuoc_san_xuat}</label>
      </div>
      <div className="row ">
        <label className="text-report">Ngày sử dụng: {props.taskReport.nam_su_dung}</label>
      </div>
      <div className="row ">
        <label className="d-flex justify-content-center text-report-title">
          {props.taskReport.khoa_su_dung}
        </label>
      </div>
    </div>
  );
};
const mapStateToProp = (state) => {
  return {
    taskReport: state.taskReport
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(Report);
