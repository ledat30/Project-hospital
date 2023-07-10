import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatinet.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnchangeDetaPicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnHoadon = () => {

    }
    render() {
        let { dataPatient } = this.state;
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý lịch khám
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-2 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker onChange={this.handleOnchangeDetaPicker}
                            className="form-control"
                            value={this.state.currentDate}
                        // minDate={yesterday}
                        />
                    </div>
                    <div className='col-12'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Action</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.fullName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='btn-confirm'
                                                        onClick={() => this.handleBtnConfirm()}>
                                                        Xác nhận
                                                    </button>
                                                    <button className='btn-hoadon'
                                                        onClick={() => this.handleBtnHoadon()}>
                                                        Gửi hoá đơn
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className='error'>
                                        Không có lịch đặt khám trong khoảng thời gian này!
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatinet);
