import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            scheduleId: '',
            currentNumber: 0,
            isShowLoading: false
        }
    }
    async componentDidMount() {
        this.props.fetchGenders()
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeTypes = this.props.dataTime.timeType;
                let scheduleId = this.props.dataTime.id;

                this.setState({
                    doctorId: doctorId,
                    timeType: timeTypes,
                    scheduleId: scheduleId,
                })
            }
        }


        if (this.props.dataTime.currentNumber !== prevProps.dataTime.currentNumber) {
            const currentNumber = this.props.dataTime.currentNumber;
            if (currentNumber === 0) {
                this.setState({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    reason: '',
                    birthday: '',
                    selectedGender: ''
                });
            }
        }
    }

    handleOnchangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDetaPicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return `${time} - ${date}`
        }
        return ''
    }

    builDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.fullName}`
                :
                `${dataTime.doctorData.fullName}`
            return name;
        }
        return ''
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();

        let timeString = this.buildTimeBooking(this.props.dataTime);

        let doctorName = this.builDoctorName(this.props.dataTime);
        this.setState({
            isShowLoading: true
        })
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            scheduleId: this.state.scheduleId,
            timeString: timeString,
            doctorName: doctorName,
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment success!')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')
        }
        this.setState({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            scheduleId: '',
            isShowLoading: false
        })
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        const { currentNumber } = dataTime;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'} size='lg' centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id={'patient.booking-modal.title'} /></span>
                        <span className='right' onClick={closeBookingClose}><i className="fas fa-times-circle"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className='left_currentNumber'>
                            <FormattedMessage id={'patient.booking-modal.current'} />{dataTime && dataTime.currentNumber}<FormattedMessage id={'patient.booking-modal.text'} />
                        </div>
                        {currentNumber !== 0 && (
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.fullname'} /></label>
                                    <input className='form-control' value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.phone'} /></label>
                                    <input className='form-control' value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangInput(event, 'phoneNumber')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.email'} /></label>
                                    <input className='form-control' value={this.state.email}
                                        onChange={(event) => this.handleOnchangInput(event, 'email')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.address'} /> </label>
                                    <input className='form-control' value={this.state.address}
                                        onChange={(event) => this.handleOnchangInput(event, 'address')} />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.reason'} /></label>
                                    <input className='form-control' value={this.state.reason}
                                        onChange={(event) => this.handleOnchangInput(event, 'reason')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.date'} /></label>
                                    <DatePicker onChange={this.handleOnchangeDetaPicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'patient.booking-modal.sex'} /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='booking-modal-footer'>
                        {currentNumber !== 0 && (
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id={'patient.booking-modal.Confirm'} />
                            </button>
                        )}
                        <button className='btn-booking-cancel' onClick={closeBookingClose}>
                            <FormattedMessage id={'patient.booking-modal.cancel'} />
                        </button>
                    </div>
                </div>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                </LoadingOverlay>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
