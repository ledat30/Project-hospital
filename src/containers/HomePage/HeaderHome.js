import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
import { debounce } from 'lodash';

class HeaderHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchKeyword: '',
            result: [],
        };
        this.dropdownRef = React.createRef();
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    };

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
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

    returnToDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/all-doctor`)
        }
    }

    returnToContact = () => {
        if (this.props.history) {
            this.props.history.push(`/contact`)
        }
    }


    returnToSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/all-specialty`)
        }
    }

    returnToClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/all-clinic`)
        }
    }

    handleViewSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/all-specialty`)
        }
    }

    handleViewBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }

    returnToPolicy = () => {
        if (this.props.history) {
            this.props.history.push(`/all-policy`)
        }
    }

    returnToQuestion = () => {
        if (this.props.history) {
            this.props.history.push(`/all-question`)
        }
    }

    handleSearch = debounce(async (e) => {
        const keyword = e.target.value;
        this.setState({
            searchKeyword: keyword,
            result: [],
            hasSearchResults: false
        });
        if (keyword) {
            let result = await fetch(`http://localhost:8080/api/search-home-website?q=${keyword}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    result: [
                        ...result.clinicResults,
                        ...result.handbookResults,
                        ...result.renamedResults,
                        ...result.doctorResults,
                        ...result.policyResults
                    ],
                    hasSearchResults:
                        result.clinicResults.length > 0 ||
                        result.handbookResults.length > 0 ||
                        result.renamedResults.length > 0 ||
                        result.doctorResults.length > 0 ||
                        result.policyResults.length > 0
                });
            } else {
                this.setState({
                    result: [],
                    hasSearchResults: false
                })
            }
        }
    }, 300)

    ToDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`);
    };

    ToDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    };

    ToDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    ToDetailPolicy = (policy) => {
        this.props.history.push(`/detail-policy/${policy.id}`);
    };

    ToDetailHandbook = (handBook) => {
        this.props.history.push(`/detail-handbook/${handBook.id}`);
    };


    render() {
        let language = this.props.language;
        const { searchKeyword, result, isOpen } = this.state;
        const hasSearchResults = result && result.length > 0;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className={`dropdown ${isOpen ? 'open' : ''}`}
                                ref={this.dropdownRef}>
                                <div className='dropdown-toggles'>
                                    <button className='but' onClick={this.toggleMenu}>
                                        <i className='fas fa-bars'></i>
                                    </button>
                                </div>
                                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                                    <li className='li' onClick={() => this.returnToPolicy()}><FormattedMessage id={'homeheader.policy'} /></li>
                                    <li className='li' onClick={() => this.returnToQuestion()}><FormattedMessage id={'homeheader.question'} /></li>
                                </ul>
                            </div>

                            <div className='header-logo'
                                onClick={() => this.returnToHome()}
                            >
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div onClick={() => this.returnToSpecialty()}>
                                    <div><b><FormattedMessage id="homeheader.Speciality" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.Searchdoctor" /></div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.returnToClinic()}>
                                    <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.Select-room" /></div>
                                </div>

                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.returnToDoctor()}>
                                    <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.select-docter" /></div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.returnToCategory()}>
                                    <div><b><FormattedMessage id="homeheader.blog" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.Health-issues-to-know" /></div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div onClick={() => this.returnToContact()}>
                                    <div><b><FormattedMessage id="homeheader.support" /></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.support1" /></div>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
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
                                <input type='text'
                                    placeholder=' Search ...'
                                    value={searchKeyword}
                                    onChange={(e) => {
                                        this.setState({ searchKeyword: e.target.value });
                                        this.handleSearch(e);
                                    }}
                                />
                            </div>
                            <div className='search-results'>
                                {result && result.map((item, index) => (
                                    <div className='search-result-item' key={index}>
                                        <div className='name-result'>
                                            <div onClick={() => this.ToDetailClinic(item)}>
                                                {language === LANGUAGES.VI ? item.name : item.name_en}
                                            </div>
                                            <div onClick={() => this.ToDetailSpecialty(item)}>
                                                {language === LANGUAGES.VI ? item.name_specialty : item.name_en_specialty}
                                            </div>
                                            <div onClick={() => this.ToDetailHandbook(item)}>
                                                {language === LANGUAGES.VI ? item.title : item.title_en}
                                            </div>
                                            <div onClick={() => this.ToDetailPolicy(item)}>
                                                {language === LANGUAGES.VI ? item.nameVI : item.nameEN}
                                            </div>
                                            <div onClick={() => this.ToDetailDoctor(item)}>
                                                {item.fullName}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {!hasSearchResults && searchKeyword.length > 0 && (
                                    <div className='no-results'>
                                        Không có kết quả tìm kiếm.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'
                                    onClick={() => this.handleViewSpecialty()}
                                >
                                    <div className='icon-child'>
                                        <i className='far fa-hospital'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className='option-child'
                                    onClick={() => this.handleViewSpecialty()}>
                                    <div className='icon-child'>
                                        <i className='fas fa-procedures'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className='option-child'
                                    onClick={() => this.handleViewBlog()}
                                >
                                    <div className='icon-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className='option-child'
                                    onClick={() => this.handleViewSpecialty()}
                                >
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
