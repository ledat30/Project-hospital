import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HeaderHome extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux event :actions

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    returnToCategory = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'
                                onClick={() => this.returnToHome()}
                            >
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.Speciality" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.Searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.Select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-docter" /></div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.returnToCategory()}>
                                    <div><b><FormattedMessage id="homeheader.blog" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.Health-issues-to-know" /></div>
                                </div>

                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='child-content '>
                                <div> <i className='fas fa-question-circle'></i> <FormattedMessage id="homeheader.support" /></div>
                                <div className='subs-title'>0386582177</div>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN </span> /
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.tiitle1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.tiitle2" />
                            </div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder=' Search ...' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='far fa-hospital'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-procedures'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-briefcase-medical'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
