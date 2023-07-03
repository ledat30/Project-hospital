import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'

class DoctorExtrainfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            axtraInfor: {}
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorIdFormParent !== prevProps.doctorIdFormParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFormParent)
            if (res && res.errCode === 0) {
                this.setState({
                    axtraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, axtraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id={'patient.extra-infor-doctor.address_clinic'} /></div>
                    <div className='name-clinic'>
                        {axtraInfor && axtraInfor.nameClinic ? axtraInfor.nameClinic : ''}
                    </div>
                    <div className='address-detail'>
                        {axtraInfor && axtraInfor.addressClinic ? axtraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'><FormattedMessage id={'patient.extra-infor-doctor.price'} /> : {axtraInfor && axtraInfor.priceTypeData && language === LANGUAGES.VI
                            &&
                            <NumberFormat
                                className='currentcy'
                                value={axtraInfor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSepartor={true}
                                suffix={'VND'}
                            />
                        }

                            {axtraInfor && axtraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    className='currentcy'
                                    value={axtraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSepartor={true}
                                    suffix={'$'}
                                />
                            }
                            <span onClick={() => this.showHideDetailInfor(true)}> <FormattedMessage id={'patient.extra-infor-doctor.see-detail'} /></span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'><FormattedMessage id={'patient.extra-infor-doctor.price'} />:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id={'patient.extra-infor-doctor.price'} /> </span>
                                    <span className='right'>
                                        {axtraInfor && axtraInfor.priceTypeData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className='currentcy'
                                                value={axtraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSepartor={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {axtraInfor && axtraInfor.priceTypeData && language === LANGUAGES.EN
                                            &&
                                            <NumberFormat
                                                className='currentcy'
                                                value={axtraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSepartor={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {axtraInfor && axtraInfor.note ? axtraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <span><FormattedMessage id={'patient.extra-infor-doctor.Payments'} /> :</span> {axtraInfor && axtraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ?
                                    axtraInfor.paymentTypeData.valueVi : ''}
                                {axtraInfor && axtraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ?
                                    axtraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id={'patient.extra-infor-doctor.hide-price-list'} /></span>
                            </div>
                        </>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
