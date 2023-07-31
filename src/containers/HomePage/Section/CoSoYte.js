import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';

class CoSoYte extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    returnToClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/all-clinic`)
        }
    }
    render() {
        let { dataClinic } = this.state;
        let { language } = this.props;
        return (
            <div className='section-share section-medical-facility section-medical'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={'homepage.clinic'} /></span>
                        <button className='btn-section' onClick={() => this.returnToClinic()}><FormattedMessage id={'homepage.see-clinic'} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'contain ', backgroundColor: 'white' }}
                                            />
                                            <div className='clinic-name'>
                                                {language === LANGUAGES.VI ? item.name : item.name_en}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoSoYte));
