import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './TableScheduleAdmin.scss';
import { LANGUAGES } from '../../../utils';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';
import { getAllSchedule } from '../../../services/userService';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';

class TableScheduleAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 10, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại

            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataSchedule: [],
        }
    }
    async componentDidMount() {
        await this.getDataSchedule()
    }

    getDataSchedule = async () => {
        try {
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();

            let res = await getAllSchedule(formatedDate);

            if (res && res.data) {
                this.setState({
                    dataSchedule: res.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleOnchangeDetaPicker = async (date) => {
        const newDate = moment(date[0]).startOf('day').valueOf();
        this.setState(
            {
                currentDate: newDate,
                currentPage: 0,  // Reset trang về 0 khi ngày thay đổi
            },
            async () => {
                await this.getDataSchedule();
            }
        );
    };


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-schedule?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataSchedule: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    dataSchedule: this.state.dataSchedule,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                dataSchedule: this.state.dataSchedule,
                currentPage: 0,
            })
        }
    }, 300)


    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        const { dataSchedule } = this.state;
        const sliceSchedule = dataSchedule.slice(offset, offset + this.state.perPage);

        this.setState({
            currentPage: selectedPage,
            offset: offset,
            sliceSchedule: sliceSchedule,
        });
    };



    render() {
        let { dataSchedule, offset, perPage } = this.state;
        const pageCount = Math.ceil(dataSchedule.length / perPage);
        const sliceSchedule = dataSchedule.slice(offset, offset + perPage);
        let { language } = this.props;
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='title3 mt-10'>Quản lý kế hoạch khám bệnh</div>
                    <div className='manage-patient-body row'>
                        <div className='col-2 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker onChange={this.handleOnchangeDetaPicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <input type='' className='search-schedule-box' placeholder='Search schedule ...'
                            onChange={(e) => this.searchHandle(e)}
                        />
                        <div className='col-12'>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <th>
                                            <FormattedMessage id={'admin.manage-doctor.name'} />
                                        </th>
                                        <th>
                                            <FormattedMessage id={'admin.manage-doctor.max'} />
                                        </th>
                                        <th>
                                            <FormattedMessage id={'admin.manage-doctor.current'} />
                                        </th>
                                        <th>
                                            <FormattedMessage id={'admin.manage-doctor.time'} />
                                        </th>
                                        <th>
                                            <FormattedMessage id={'manage-user.action'} />
                                        </th>
                                    </tr>
                                    {sliceSchedule && sliceSchedule.length > 0 ? (
                                        sliceSchedule.map((item, index) => {
                                            const rowIndex = offset + index + 1;
                                            const action = item.currentNumber <= 5 ? (item.currentNumber === 0 ? <FormattedMessage id={'manage-user.tt'} /> : <FormattedMessage id={'manage-user.tt1'} />) : '';
                                            return (
                                                <tr key={index}>
                                                    <td>{rowIndex}</td>
                                                    <td>{item.doctorData && item.doctorData.fullName}</td>
                                                    <td>{item.maxNumber}</td>
                                                    <td>{item.currentNumber}</td>
                                                    <td>{item.timeTypeData && language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData?.valueEn}
                                                    </td>
                                                    <td>
                                                        {action}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr className="error">
                                            <td colSpan={6}>
                                                <FormattedMessage id={"patient.detail-category.tb"} />
                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                            <ReactPaginate
                                previousLabel={<FormattedMessage id={'ReactPaginate.dau'} />}
                                nextLabel={<FormattedMessage id={'ReactPaginate.cuoi'} />}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakLinkClassName='page-link'
                            />
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableScheduleAdmin);
