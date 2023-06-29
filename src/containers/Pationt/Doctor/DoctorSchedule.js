import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }
    async componentDidMount() {
        let { language } = this.props;

        // console.log('vi:', moment(new Date()).format('dddd- DD/MM'));
        // console.log('en:', moment(new Date()).locale('en').format('ddd- DD/MM'));
        this.setArrDate(language);
    }

    setArrDate = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd- DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd- DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate(this.props.language);
        }
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.doctorIdFormParent && this.props.doctorIdFormParent !== -1) {
            let doctorId = this.props.doctorIdFormParent;
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log(res)
        }
    }

    render() {
        let { allDays } = this.state;

        return (
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

                </div>
            </div>
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
