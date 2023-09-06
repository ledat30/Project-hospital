import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword, resetPassword } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import './Login.scss';
import { toast } from 'react-toastify';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            newPassword: '',
            resetToken: '',
            successMessage: '',
            errorMessage: '',
            showPassword: false,
        };
    }

    handleForgotPassword = async () => {
        try {
            const { email } = this.state;
            await forgotPassword(email);
            this.setState({ successMessage: 'Password reset email sent', errorMessage: '' });
        } catch (error) {
            this.setState({ errorMessage: error.message, successMessage: '' });
        }
    };

    handleResetPassword = async () => {
        try {
            const { resetToken, newPassword } = this.state;
            await resetPassword(resetToken, newPassword);
            this.setState({ successMessage: 'Password reset successful', errorMessage: '' });
            toast.success("Đổi mật khẩu thành công!");
            this.setState({
                email: '',
                newPassword: '',
                resetToken: '',
            })
            this.props.history.push('/login');
        } catch (error) {
            this.setState({ errorMessage: error.message, successMessage: '' });
        }

    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handleResetTokenChange = (e) => {
        this.setState({ resetToken: e.target.value });
    };

    handleNewPasswordChange = (e) => {
        this.setState({ newPassword: e.target.value });
    };

    handleShowHidePassword = () => {

        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        const { errorMessage, email, resetToken, newPassword } = this.state;

        return (
            <div className="login-background">
                <div className="change-password-container">
                    <div className="change-password-content">
                        <div className="col-12 text-center changPassword-title">Change Password</div>
                        <div className="col-12 form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                className="changePassword_input form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={this.handleEmailChange}
                            />
                            <button className="btn_send_email" onClick={this.handleForgotPassword}>Send Reset Email</button>
                        </div>
                        <div className="col-12 form-group">
                            <label>Reset Token: </label>
                            <div className="change-password">
                                <input
                                    type="text"
                                    className="changePassword_input form-control"
                                    placeholder="Enter reset token"
                                    value={resetToken}
                                    onChange={this.handleResetTokenChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 form-group">
                            <label>New Password: </label>
                            <div className="change-password">
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className="changePassword_input form-control"
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={this.handleNewPasswordChange}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.showPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="error-message" style={{ color: 'red' }}>
                            {errorMessage}
                        </div>
                        <div className="col-12 form-group">
                            <button
                                className="btn-login"
                                onClick={this.handleResetPassword}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));