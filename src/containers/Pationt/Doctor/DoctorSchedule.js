import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        // console.log('vi:', moment(new Date()).format('dddd- DD/MM'));
        // console.log('en:', moment(new Date()).locale('en').format('ddd- DD/MM'));
        this.setState({
            allDays: allDays,
        })
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd- DD/MM');
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd- DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFormParent !== prevProps.doctorIdFormParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFormParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.doctorIdFormParent && this.props.doctorIdFormParent !== -1) {
            let doctorId = this.props.doctorIdFormParent;
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }

            console.log(res)
        }
    }

    //đóng mở modal bên đặt lịch
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvalableTime, isOpenModalBooking ,dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id={'patient.detail-doctor.Schedule'} /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvalableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ?
                                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                return (
                                                    <button key={index}
                                                        className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span><FormattedMessage id={'patient.detail-doctor.choose'} />
                                            <i className='far fa-hand-point-up'></i><FormattedMessage id={'patient.detail-doctor.book-free'} /></span>
                                    </div>
                                </>
                                :
                                <div className='no_schedule'><FormattedMessage id={'patient.detail-doctor.no_schedule'} /></div>
                            }
                        </div>
                    </div>
                </div>


                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeModalBooking}
                    dataTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
