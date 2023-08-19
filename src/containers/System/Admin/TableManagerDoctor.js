import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerDoctor.scss';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';

class TableManagerDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doctorRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 8, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor
            && this.state.doctorRedux.length === 0) {
            this.setState({
                doctorRedux: this.props.listDoctor
            })
        }
    }

    handleDeleteDoctor = (allDoctors) => {
        this.props.deleteDoctorRedux(allDoctors.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromPaentKey(user)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-doctor-admin?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    doctorRedux: result.results,
                    currentPage: 0, // Reset trang hiện tại về 0
                })
            } else {
                this.setState({
                    doctorRedux: this.props.listDoctor,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                doctorRedux: this.props.listDoctor,
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
        const { doctorRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(doctorRedux.length / perPage);
        const sliceUsers = doctorRedux.slice(offset, offset + perPage);
        return (
            <>
                <div className='col-12'>
                    <div className='title3 mt-10'><FormattedMessage id="manage-doctor.title" /></div>
                    <input type='' className='search-doctor-box' placeholder='Search doctor ...'
                        onChange={(e) => this.searchHandle(e)}
                    />
                    <table id='TableManagerDoctor'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th><FormattedMessage id={'admin.manage-doctor.name'} /></th>
                                <th>Email</th>
                                <th><FormattedMessage id={'admin.manage-doctor.address'} /></th>
                                <th><FormattedMessage id={'admin.manage-doctor.action'} /></th>
                            </tr>
                            {sliceUsers && sliceUsers.length > 0 ? sliceUsers.map((item, index) => {
                                const rowIndex = offset + index + 1; // Tính thứ tự hiển thị
                                return (
                                    <tr key={index}>
                                        <td>{rowIndex}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteDoctor(item)}>
                                                <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                                :
                                (
                                    <tr className="error">
                                        <td colSpan={6}>
                                            <FormattedMessage id={"patient.detail-category.tb"} />
                                        </td>
                                    </tr>
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
                </div>
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listDoctor: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        deleteDoctorRedux: (id) => dispatch(actions.deleteDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerDoctor);
