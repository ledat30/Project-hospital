import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }
    render() {
        let arrUser = this.state.userRedux;
        return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                    {arrUser && arrUser.length > 0 && arrUser.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.phonenumber}</td>
                                <td>
                                    <button className='btn-edit' ><i className='fas fa-pencil-alt'></i></button>
                                    <button className='btn-delete'
                                        onClick={() => this.handleDeleteUser(item)}>
                                        <i className='fas fa-trash'></i></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
