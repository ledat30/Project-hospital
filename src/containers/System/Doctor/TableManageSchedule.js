import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSchedule.scss';
import ReactPaginate from 'react-paginate';
import { getScheduleByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';

class TableManageSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataScheduleByDate: [],
        }
    }



    async componentDidMount() {
        await this.getDataScheduleByDate()
    }

    getDataScheduleByDate = async () => {
        try {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();

            let res = await getScheduleByDate({
                doctorId: user.id,
                date: formatedDate
            })

            if (res && res.errCode === 0) {
                this.setState({
                    dataScheduleByDate: res.data
                })
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
                currentPage: 0,
            },
            async () => {
                await this.getDataScheduleByDate();
            }
        );
    };


    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { dataScheduleByDate } = this.state;
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
                                    {dataScheduleByDate && dataScheduleByDate.length > 0 ? (
                                        dataScheduleByDate.map((item, index) => {
                                            const rowIndex = index + 1;
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
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSchedule);
