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
                            <b>Chăm sóc sức khoẻ cùng Health care</b>
                            <p><i className="fas fa-map-marker-alt"></i> Đường 181,Kim Sơn,Gia Lâm,Hà Nội </p>
                        </div>
                    </div>
                    <div className='footer-center'>
                        <div className='title-footer-center'>
                            <p>Hỗ trợ khách hàng</p>
                            <div className='text-lk'><i className="fas fa-envelope"></i> Email ưu tiên</div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}><b>ledat30052002@gmail.com</b> (7h-18h)</span>
                            <div className='text-lk'><i className="fas fa-phone-volume"></i> Hotline</div>
                            <span className='text-lk' style={{ color: '#45c3d2' }}><b>0386582177 </b>(7h-18h)</span>
                            <div className='text-lk'><i className="fas fa-link"></i> Liên kết mạng xã hội</div>
                            <a href='https://www.facebook.com/le.dat.1276487' target='_blank' className='social-login'><i className="fab fa-facebook social-icon fb"></i></a>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.207318037857!2d105.98658315363527!3d21.02438913101041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a639434f9919%3A0xa28914d65a784015!2zVHLGsOG7nW5nIG3huqdtIG5vbiBLaW0gU8ahbiwgS2ltIFPGoW4sIEdpYSBMw6JtLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1686717092949!5m2!1svi!2s" style={{border:'none'}} width="540" height="248" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
