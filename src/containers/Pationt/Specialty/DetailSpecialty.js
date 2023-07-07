import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtrainfor from '../Doctor/DoctorExtrainfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeFooter from '../../HomePage/HomeFooter';


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [41, 40, 39]
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    render() {
        let { arrDoctorId } = this.state;
        return (
            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-sepcialty-body'>
                    <div className='description-specialty'>

                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='content-left-dt'>
                                        <div>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='content-right-dt'>
                                        <div className='doctor-schdule-dt'>
                                            <DoctorSchedule
                                                doctorIdFormParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtrainfor doctorIdFormParent={item} />
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
