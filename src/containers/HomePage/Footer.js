import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {

        return (
            <div className='footer '>
                <div className='footer-container'>
                    <div className='footer-left'>
                        <div className='logo'>
                        </div>
                        <div className='footer-bootom'>
                            <b>Chắm sóc sức khoẻ cùng Health care</b>
                            <p><i class="fas fa-map-marker-alt"></i> Đường 181,Kim Sơn,Gia Lâm,Hà Nội </p>
                        </div>
                    </div>
                    <div className='footer-center'>
                        <div className='title-footer-center'>
                            <p>Hỗ trợ khách hàng</p>
                            <div className='text-lk'><i class="fas fa-envelope"></i> Eamil ưu tiên</div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}>ledat30052002@gmail.com (7h-18h)</span>
                            <div className='text-lk'><i class="fas fa-phone-volume"></i> Hotline</div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}>0386582177 (7h-18h)</span>
                            <div className='text-lk'><i class="fas fa-link"></i> Liên kết mạng xã hội</div>
                            <a href='https://www.facebook.com/le.dat.1276487' target='_blank' className='social-login'><i className="fab fa-facebook social-icon fb"></i></a>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
