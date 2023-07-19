import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <FormattedMessage id={'homepage.Health-Information'} />
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="90%" height="350px" src="https://www.youtube.com/embed/Nsy_3ce2Dpg"
                            title="5 chỉ số đánh giá sức khỏe bạn cần ghi nhớ và kiểm tra thường xuyên"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <div className='content-right-header'>
                            <FormattedMessage id={'homepage.content.content-health-infor'} />
                        </div>
                        <p><FormattedMessage id={'homepage.content.content-health-infor-2'} /></p>
                        <div style={{ textAlign: 'justify' }}><FormattedMessage id={'homepage.content.content-health-infor-3'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
