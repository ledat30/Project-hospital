import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtrainfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ phòng khám</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa răng</div>
                    <div className='address-detail'>Kim sơn - Gia lâm - Hà Nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>Giá khám: 250.000đ.
                            <span onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>Giá khám:</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám </span>
                                    <span className='right'>250.000đ</span>
                                </div>
                                <div className='note'>
                                    ĐƯợc ưu tiên khám khi đặt lịuch qua đây
                                </div>
                            </div>
                            <div className='payment'>Người bệnh có thể thay toán bằng nhiều hình thức</div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
                            </div>
                        </>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
