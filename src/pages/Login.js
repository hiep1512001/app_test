import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../static/appicon.svg";
import Cookies from "js-cookie";
const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [diplayAlert, setDisplayAlert] = useState(false);
    const handelLogin = () => {
        if (userName === "" || password === "") {
            return false;
        }
        if (userName === "bvnd115" && password === "bvnd115") {
            Cookies.set("userNameReportTCKT", userName, { expires: 1 });
            navigate("/");
        } else {
            setDisplayAlert(true);
            return false;
        }
    };
    return (
        <div className="d-flex justify-content-center mt-5 ">
            <div style={{ width: "500px" }} className="card border border-success">
                <div className="card-header bg-success bg-gradient text-white">
                    <img
                        className="rounded-circle me-1"
                        src={logo}
                        style={{ width: "30px" }}
                    />
                    Vui lòng đăng nhập tài khoản
                </div>
                <div className="card-body">
                    <div
                        className="row"
                        id="Alert"
                        style={
                            diplayAlert === false ? { display: "none" } : { display: "block" }
                        }
                    >
                        <div
                            className="alert alert-danger d-flex align-items-center"
                            style={{ height: "30px" }}
                            role="alert"
                        >
                            Tên đăng nhập hoặc mật khẩu không đúng!
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên đăng nhập</label>
                        <input
                            value={userName}
                            type="text"
                            placeholder="Vui lòng nhập tên đăng nhập"
                            className="form-control"
                            style={
                                userName === ""
                                    ? { border: "1px red solid" }
                                    : { border: "1px green solid" }
                            }
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label f className="form-label">
                            Mật Khẩu
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Vui lòng nhập mật khẩu"
                            value={password}
                            style={
                                password === ""
                                    ? { border: "1px red solid" }
                                    : { border: "1px green solid" }
                            }
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        {" "}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handelLogin}
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
