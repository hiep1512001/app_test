import * as type from "../constants/index"
export const getReport = () => {
    return {
        type: type.GETREPORT,
    };
};
export const setReport = (value) => {
    return {
        type: type.SETREPORT,
        value: value,
    };
};