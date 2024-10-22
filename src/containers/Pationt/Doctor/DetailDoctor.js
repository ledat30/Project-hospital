import React, { Component } from 'react';
import { connect } from "react-redux";
import HeaderHome from '../../HomePage/HeaderHome';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorExtrainfor from './DoctorExtrainfor';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';
import { FormattedMessage } from 'react-intl';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detaiDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detaiDoctor: res.data,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { language } = this.props;
        let { detaiDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detaiDoctor && detaiDoctor.positionData) {
            nameVi = `${detaiDoctor.positionData.valueVi},${detaiDoctor.fullName}`;
            nameEn = `${detaiDoctor.positionData.valueEn},${detaiDoctor.fullName}`;
        }

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 1 ?
            "https://www.facebook.com/ledat30052002/" : window.location.href;

        return (
            <>
                <HeaderHome isShowBanner={false} />

                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detaiDoctor && detaiDoctor.image ? detaiDoctor.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className='down'>
                                {detaiDoctor && detaiDoctor.Doctor_infor
                                    && detaiDoctor.Doctor_infor.description
                                    && detaiDoctor.Doctor_infor.description_en
                                    &&
                                    <span>
                                        {language === LANGUAGES.VI ? detaiDoctor.Doctor_infor.description : detaiDoctor.Doctor_infor.description_en}  <br />
                                        <b>{detaiDoctor.Doctor_infor.count} <FormattedMessage id={'patient.handbook.view1'} /></b>
                                    </span>
                                }
                                <div className='like-share-plugin'>
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFormParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtrainfor doctorIdFormParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detaiDoctor && detaiDoctor.Doctor_infor && detaiDoctor.Doctor_infor.contentHTML && detaiDoctor.Doctor_infor.contentHTML_en
                            &&
                            <div dangerouslySetInnerHTML={language === LANGUAGES.VI ?
                                { __html: detaiDoctor.Doctor_infor.contentHTML }
                                :
                                { __html: detaiDoctor.Doctor_infor.contentHTML_en }}></div>
                        }
                    </div>
                    <div className='comment-doctor'>
                        <Comment
                            dataHref={currentURL}
                            width={"100%"} />
                    </div>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
