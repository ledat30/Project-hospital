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
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers && this.state.userRedux.length === 0) {
        //     this.setState({
        //         userRedux: this.props.listUsers,
        //     });
        // }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.userRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
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
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-user?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    userRedux: result.results,
                    currentPage: 0, // Reset trang hiện tại về 0
                })
            } else {
                this.setState({
                    userRedux: this.props.listUsers,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                userRedux: this.props.listUsers,
                currentPage: 0,
            })
        }
    }, 300)


    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
        });
    };

    render() {
        const { userRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(userRedux.length / perPage);
        const sliceUsers = userRedux.slice(offset, offset + perPage);

        return (
            <>
                <input type='' className='search-user-box' placeholder='Search user ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-user.fullName'} /></th>
                            <th><FormattedMessage id={'manage-user.email'} /></th>
                            <th><FormattedMessage id={'manage-user.address'} /></th>
                            <th><FormattedMessage id={'manage-user.phonenumber'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {sliceUsers && sliceUsers.length > 0 ? sliceUsers.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
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
                        })
                            :
                            (
                                <b><FormattedMessage id={'patient.detail-category.tb'} /></b>
                            )
                        }
                    </tbody>
                </table>


                <ReactPaginate
                    previousLabel={<FormattedMessage id={'ReactPaginate.dau'} />}
                    nextLabel={<FormattedMessage id={'ReactPaginate.cuoi'} />}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakLinkClassName='page-link'
                />
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
