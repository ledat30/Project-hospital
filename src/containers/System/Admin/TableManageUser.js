import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';


class TableManageUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }



    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers && this.state.userRedux.length === 0) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromPaentKey(user)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        console.log('check', key)
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-user?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    userRedux: result.results
                })
            } else {
                this.setState({
                    userRedux: this.props.listUsers
                })
            }
        } else {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }, 300)

    render() {
        let arrUser = this.state.userRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search user ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage-user.fullName'} /></th>
                            <th><FormattedMessage id={'manage-user.email'} /></th>
                            <th><FormattedMessage id={'manage-user.address'} /></th>
                            <th><FormattedMessage id={'manage-user.phonenumber'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {arrUser && arrUser.length > 0 && arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.fullName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}>
                                            <i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
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
