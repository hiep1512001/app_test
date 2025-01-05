import { useState } from 'react'
import * as XLSX from 'xlsx';
import ReactPaginate from "react-paginate";
import fileData from "../static/data.xlsx"
import iconDownload from "../../src/static/icons/download.png"
import iconPrinter from "../../src/static/icons/printing.png"
import iconSearch from "../../src/static/icons/search.png"
//redux
import { connect } from "react-redux";
import * as action from "../actions/index"
const BangDuLieu = (props) => {
    const [timKiemTheo, setTimKiemTheo] = useState("1")
    const [search, setSearch] = useState("")
    const [data, setData] = useState([
    ]);
    const [dataSearch, setDataSearch] = useState([])
    const hanndlSearchTen = () => {

        let filter = data.filter((x) => {
            if (x.ten_tai_san) {
                return (x.ten_tai_san.toLowerCase().indexOf(search.toLowerCase()) != -1)
            }
        });
        setDataSearch(filter)

    }
    const hanndlSearchMa = () => {
        let filter = data.filter((x) => {
            if (x.ma_tai_san) {
                return x.ma_tai_san.toLowerCase().indexOf(search.toLowerCase()) != -1
            }
        });
        setDataSearch(filter)

    }
    const hanndlSearchKhoaPhong = () => {
        let filter = data.filter((x) => {
            if (x.khoa_su_dung) {
                return x.khoa_su_dung.toLowerCase().indexOf(search.toLowerCase()) != -1
            }
        });
        setDataSearch(filter)

    }
    const handelValeISearchChange = async (e) => {
        await setSearch(e.target.value)
    }
    const handlePrint = async (item) => {
        await props.onSetReport(item)
        props.onPrint();
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Xử lý khi nhấn Enter
            if (timKiemTheo === "1") {
                hanndlSearchTen()
            }
            if (timKiemTheo === "2") {
                hanndlSearchMa()
            }
            if (timKiemTheo === "3") {
                hanndlSearchKhoaPhong()
            }
        }
    };
    const handleValueChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Đọc dữ liệu từ file excel
                const abuf = event.target.result;
                const workbook = XLSX.read(abuf, { type: 'array' });
                // Chọn sheet đầu tiên (bạn có thể thay đổi nếu cần)
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                // Chuyển đổi sheet thành JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Lưu dữ liệu vào state
                setData(jsonData);
                setDataSearch(jsonData)
            };
            reader.readAsArrayBuffer(file);
            document.getElementById("inputFile").value = "";
        }
    }
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Số item mỗi trang
    // Tính toán dữ liệu cần hiển thị cho trang hiện tại
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const offset = currentPage * itemsPerPage;
    const currentItems = dataSearch.slice(offset, offset + itemsPerPage);
    var elementTable = currentItems.map((item, index) => {
        return (<tr className="align-middle" key={index}>
            <td><button className='btn btn-outline-primary' onClick={() => { handlePrint(item) }}><img src={iconPrinter} style={{ width: '13px', margin: '0px 5px 0px 0px' }}></img>In</button></td>
            <td>{item.ma_tai_san}</td>
            <td>{item.model}</td>
            <td>{item.ten_tai_san}</td>
            <td>{item.seri}</td>
            <td>{item.don_vi_tinh}</td>
            <td>{item.nam_su_dung}</td>
            <td>{item.khoa_su_dung}</td>
            <td>{item.hang_san_xuat}</td>
            <td>{item.nuoc_san_xuat}</td>
            <td>{item.so_luong_theo_ke_toan}</td>
            <td>{item.nguyen_gia_theo_ke_toan}</td>
            <td>{item.so_luong_kiem_ke}</td>
            <td>{item.nguyen_gia_kiem_ke}</td>
            <td>{item.chenh_lech_thua}</td>
            <td>{item.chenh_lech_thieu}</td>
            <td>{item.ghi_chu}</td>
            <td>{item.phan_loai_tam_nguon_ts}</td>
        </tr>)
    })
    return (
        <div>
            <div className='fixed-right'>
                <a className="btn btn-warning" href={fileData} download={"File dữ liệu mẫu"}>
                    <img src={iconDownload} style={{ width: '13px', margin: '0px 5px 0px 0px' }}></img>Tải file mẫu</a>
            </div>
            <div className='mb-2'>
                <label className="form-label">Nhập file dữ liệu</label>
                <input className="form-control" type="file" id="inputFile" onChange={handleValueChange} />
            </div>
            <div style={data.length === 0 ? { display: 'none' } : { display: "block" }}>
                <div className="row" >
                    <div className='col-2'>
                        <select className="form-select" value={timKiemTheo} onChange={(e) => {
                            setTimKiemTheo(e.target.value)

                        }}>
                            <option value={"1"}>Theo tên sản phẩm</option>
                            <option value={"2"}>Theo mã</option>
                            <option value={"3"}>Theo khoa phòng</option>
                        </select>
                    </div>
                    <div className='col-5'>
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Nhập tên sản phẩm để tìm" value={search} onChange={handelValeISearchChange} onKeyDown={handleKeyDown} />
                            <span className="btn btn-outline-success" onClick={() => {
                                if (timKiemTheo === "1") {
                                    hanndlSearchTen()
                                }
                                if (timKiemTheo === "2") {
                                    hanndlSearchMa()
                                }
                                if (timKiemTheo === "3") {
                                    hanndlSearchKhoaPhong()
                                }
                            }}><img style={{ width: '13px', margin: '0px 5px 0px 0px' }} src={iconSearch}></img>Tìm kiếm</span>
                        </div>
                    </div>
                </div>
                <div className='table-responsive' >
                    <table className="table table-bordered table-striped table-hover ">
                        <thead>
                            <tr className="table-success">
                                <th scope="col">Thao tác</th>
                                <th scope="col">Mã tài sản</th>
                                <th scope="col">Model</th>
                                <th scope="col">Tên tài sản</th>
                                <th scope="col">Serial</th>
                                <th scope="col">Đơn vị tính</th>
                                <th scope="col">Năm sử dụng</th>
                                <th scope="col">Khoa phòng sử dụng</th>
                                <th scope="col">Hảng sản xuất</th>
                                <th scope="col">Nước sản xuất</th>
                                <th scope="col">Số lượng theo sổ kế toán</th>
                                <th scope="col">Nguyên giá theo sổ kế toán</th>
                                <th scope="col">Số lượng theo kiểm kê</th>
                                <th scope="col">Nguyên giá theo kiểm kê</th>
                                <th scope="col">Chênh lệch thừa</th>
                                <th scope="col">Chênh lệch thiếu</th>
                                <th scope="col">Ghi chú</th>
                                <th scope="col">Phân loại nguồn tài sản</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elementTable}
                        </tbody>
                    </table>
                    <div className="col-12 d-flex justify-content-end">
                        {" "}
                        <ReactPaginate
                            previousLabel={"Trước"}
                            nextLabel={"Sau"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(dataSearch.length / itemsPerPage)} // Số trang
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            activeClassName={"active"}
                            previousClassName={"previous"}
                            nextClassName={"next"}
                        />
                    </div>
                </div>
            </div>

        </div>

    )
}
const mapStateToProp = (state) => {
    return {
        taskReport: state.taskReport,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetReport: (value) => {
            dispatch(action.setReport(value));
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProps)(BangDuLieu)