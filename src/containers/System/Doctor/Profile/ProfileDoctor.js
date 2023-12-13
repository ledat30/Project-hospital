import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { updateDoctorImage } from '../../../../services/userService';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    updateImage = async (file) => {
        const { user } = this.props;
        await updateDoctorImage(user.id, file);
        // Thực hiện các thao tác bổ sung sau khi cập nhật hình ảnh thành công (ví dụ: cập nhật trạng thái hoặc hiển thị thông báo thành công).
    }

    handleImageChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            await this.updateImage(file);
        }
    }

    render() {
        let { user } = this.props;
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }

        return (
            <>
                <div className='container-profile'>
                    <div className='left-profile'>
                        <div className='image'
                            style={{ backgroundImage: `url(${imageBase64})` }}>
                        </div>
                        <label htmlFor="image-upload" className="custom-file-upload">
                            <i className="fas fa-cloud-upload-alt"></i> Select Image
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            onChange={this.handleImageChange}
                            accept="image/*"
                            className="hidden-input"
                        />
                        <h6 className='name_doctor'>
                            {user.fullName}
                        </h6>
                    </div>
                    <div className='right-profile'>
                        <div className='top'>
                            <FormattedMessage id={'profile_doctor.information'} />
                        </div>
                        <div className='infomation'>
                            <div className='content-profile'>
                                <FormattedMessage id={'profile_doctor.email'} />{user.email}
                            </div>
                            <div className='content-profile'>
                                <FormattedMessage id={'profile_doctor.sdt'} />
                                {user.phonenumber}
                            </div>
                            <div className='content-profile'>
                                <FormattedMessage id={'profile_doctor.address'} />{user.address}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
