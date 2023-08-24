import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _, { times } from 'lodash';
import { saveScheduleDoctor } from '../../../services/userService';

class ManageScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            rangeTime: [],
            doctorId: {}
        }
    }
    componentDidMount() {
        this.props.fetchAllSchedule();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }


    handleOnchangeDetaPicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, currentDate } = this.state;
        let result = [];
        let { user } = this.props;
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.date = formatedDate;
                    object.timeType = schedule.id;
                    object.doctorId = user.id;
                    result.push(object);
                })

            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveScheduleDoctor({
            arrSchedule: result,
            formatedDate: formatedDate,
            doctorId: user.id,
        })
        if (res && res.errCode === 0) {
            toast.success('Save Infor succeed')
        } else {
            toast.error('Error saveBulkScheduleDoctor')
        }
    }
    render() {
        let { rangeTime } = this.state;
        let { language, user } = this.props;
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let yesterday = new Date(new Date().setDate(new Date().getDate()));
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className=' form-group'>
                            <label className='name1'><FormattedMessage id="manage-schedule.doctor" /></label><br />
                            <span className='name'>{user.fullName}</span>
                        </div>
                        <div className='col-3 form-group'>
                            <label><FormattedMessage id="manage-schedule.day" /></label>
                            <DatePicker onChange={this.handleOnchangeDetaPicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true
                                            ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleDoctor);
