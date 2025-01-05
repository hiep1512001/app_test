import * as type from "../../constants/index"
var defaultState = {
    ma_tai_san: "",
    ten_tai_san: "",
    seri: "",
    model: "",
    don_vi_tinh: "",
    hang_san_xuat: "",
    nuoc_san_xuat: "",
    nam_su_dung: "",
    khoa_su_dung: ""
};
const taskReport = (state = defaultState, action) => {
    switch (action.type) {
        case type.SETREPORT: {
            state = action.value
            return state
        }
        case type.GETREPORT:
            return state
        default:
            return state;
    }
};
export default taskReport;
