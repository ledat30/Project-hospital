import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Thông tin về sức khoẻ
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="90%" height="350px" src="https://www.youtube.com/embed/Nsy_3ce2Dpg"
                            title="5 chỉ số đánh giá sức khỏe bạn cần ghi nhớ và kiểm tra thường xuyên"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <div className='content-right-header'>
                        5 chỉ số đánh giá sức khỏe bạn cần ghi nhớ và kiểm tra thường xuyên
                        </div>
                        <p>Các cuộc kiểm tra sức khỏe định kỳ sẽ giúp bản thân theo dõi được những chỉ số về sức khoẻ như huyết áp, cân nặng, mức đường trong máu... và phát hiện kịp thời một số bất thường mà cơ thể đang gặp phải ở giai đoạn sớm nhất. Mỗi chỉ số sức khoẻ là một con số biểu lộ nhiều vấn đề cần quan tâm. Sau đây là 5 chỉ số sức khoẻ quan trọng nhất nên tìm hiểu.</p>
                        <div style={{textAlign:'justify' }}>1. Huyết áp: Chỉ số huyết áp bình thường là 120/80 mmHg
                        2. Chỉ số Cholesterol:  100 mg/ dl đối với LDL cholesterol (xấu) và 40 mg/ dl đối với HDL cholesterol (tốt)
                        3. Nhịp tim: Nhịp tim bình thường 60 nhịp trong một phút (bpm)
                        4. Chu vi vòng eo: Không quá 90 cm đối với nữ giới và 100 cm đối với nam giới
                        5. Lượng đường huyết: Chỉ số bình thường từ 80 mg/ dl đến 100 mg/ dl
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
