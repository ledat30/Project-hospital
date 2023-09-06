import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
import { toast } from 'react-toastify';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })


    }

    handleLogin = async () => {

        this.setState({
            errMessage: ''
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('loging success');
                toast.success("Đăng nhập thành công!");
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('error message', e.response);
        }
    }

    handleShowHidePassword = () => {

        this.setState({
            showPassword: !this.state.showPassword
        })
        console.log(this.state.showPassword);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    returnToChangePassword = () => {
        if (this.props.history) {
            this.props.history.push(`/reset-password`)
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center login-title">Login</div>
                        <div className="col-12 form-group">
                            <label>Email: </label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Enter your email"
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUserName(e)}
                            />

                        </div>
                        <div className="col-12 form-group">
                            <label>Password: </label>
                            <div className="login-password">
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.showPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <button className="forgot_password" onClick={() => this.returnToChangePassword()}>Forgot your password?</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };


};

export default connect(mapStateToProps, mapDispatchToProps)(Login);