import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getLimitPolicy } from '../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../utils';

class HomeFooter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataPolicy: []
        }
    }

    async componentDidMount() {
        let res = await getLimitPolicy();
        if (res && res.errCode === 0) {
            this.setState({
                dataPolicy: res.data ? res.data : []
            })
        }
    }

    handleViewDetailPolicy = (policy) => {
        if (this.props.history) {
            this.props.history.push(`/detail-policy/${policy.id}`)
        }
    }


    render() {
        let { dataPolicy } = this.state;
        let { language } = this.props;
        return (
            <div className='footer '>
                <div className='footer-container'>
                    <div className='footer-left'>
                        <div className='logo'>
                        </div>
                        <div className='footer-bootom'>
                            <b><FormattedMessage id={'footer.health-care'} /></b>
                            <p><i className="fas fa-map-marker-alt"></i><FormattedMessage id={'footer.address'} /></p>
                        </div>
                    </div>
                    <div className='footer-center'>
                        <div className='title-footer-center'>
                            <p><FormattedMessage id={'footer.sp'} /></p>
                            <div className='text-lk'><i className="fas fa-envelope"></i><FormattedMessage id={'footer.email'} /></div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}><b>ledat30052002@gmail.com</b> (7h-18h)</span>
                            <div className='text-lk'><i className="fas fa-phone-volume"></i><FormattedMessage id={'footer.hotline'} /></div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}><b>0386582177 </b>(7h-18h)</span>
                            <div className='text-lk'><i className="fas fa-link"></i><FormattedMessage id={'footer.xh'} /></div>
                            <a href='https://www.facebook.com/groups/1306573389974034/' target='_blank' rel="noreferrer" className='social-login'><i className="fab fa-facebook social-icon fb"></i></a>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <div className='titlr-footor-right'>
                            <p><FormattedMessage id={'footer.policy'} /></p>
                            <div className='text-2k'>
                                {dataPolicy && dataPolicy.length > 0 && dataPolicy.map((item, index) => {
                                    return (
                                        <div className='text-2k' key={index}
                                            onClick={() => this.handleViewDetailPolicy(item)} >
                                            <i className="fas fa-shield-alt"></i> {language === LANGUAGES.VI ? item.nameVI : item.nameEN}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
