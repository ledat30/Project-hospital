import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            fullName: '',
            address: '',
            phonenumber: ''
        }
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                fullName: '',
                address: '',
                phonenumber: ''
            })
        })
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                fullName: user.fullName,
                address: user.address,
                phonenumber: user.phonenumber
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParnet();
    }

    handleOnchangleInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'fullName', 'phonenumber', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;

    }

    handleSaveUser = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            //call api edit user modal
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            // centered
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className={'modal-user-container'} size='lg' >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' placeholder='E-mail'
                                onChange={(event) => { this.handleOnchangleInput(event, "email") }}
                                value={this.state.email} disabled />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' placeholder='Password'
                                onChange={(event) => { this.handleOnchangleInput(event, "password") }}
                                value={this.state.password} disabled />
                        </div>
                        <div className='input-container'>
                            <label>FullName</label>
                            <input type='text' placeholder='Full-name'
                                onChange={(event) => { this.handleOnchangleInput(event, "fullName") }}
                                value={this.state.fullName} />
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='text' placeholder='phone number'
                                onChange={(event) => { this.handleOnchangleInput(event, "phonenumber") }}
                                value={this.state.phonenumber} />
                        </div>
                        <div className='input-container max-with-input '>
                            <label>Address</label>
                            <input type='text' placeholder='1234 Main St'
                                onChange={(event) => { this.handleOnchangleInput(event, "address") }}
                                value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => { this.handleSaveUser() }}>Save</Button>{''}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}>Close </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




