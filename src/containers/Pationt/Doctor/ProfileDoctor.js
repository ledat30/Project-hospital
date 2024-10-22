import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

export class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data
            })
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div><FormattedMessage id={'patient.booking-modal.Free-booking'} /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        const { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice,
            doctorId } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.fullName}`;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.fullName}`;
        }
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className='down'>
                                {isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile && dataProfile.Doctor_infor
                                            && dataProfile.Doctor_infor.description
                                            && dataProfile.Doctor_infor.description_en
                                            &&
                                            <span>
                                                {language === LANGUAGES.VI ? dataProfile.Doctor_infor.description : dataProfile.Doctor_infor.description_en}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {isShowLinkDetail === true &&
                        <div className='view-detail-doctor'>
                            <Link to={`/detail-doctor/${doctorId}`}><FormattedMessage id="homepage.see-more" /></Link>
                        </div>
                    }

                    {isShowPrice === true &&
                        <div className='price'>
                            <FormattedMessage id={'patient.booking-modal.examination_price'} />
                            {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currentcy'
                                    value={dataProfile.Doctor_infor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandsepartor="true"
                                    suffix={' VND'}
                                />
                            }
                            {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currentcy'
                                    value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandsepartor="true"
                                    suffix={' $'}
                                />
                            }
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
