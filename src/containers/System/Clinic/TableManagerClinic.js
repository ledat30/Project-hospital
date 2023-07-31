import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerClinic.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManagerClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            clinicRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinics !== this.props.listClinics
            && this.state.clinicRedux.length === 0) {
            this.setState({
                clinicRedux: this.props.listClinics
            })
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromPaentKey(clinic)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-clinic?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    clinicRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    clinicRedux: this.props.listClinics,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                clinicRedux: this.props.listClinics,
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
        const { clinicRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(clinicRedux.length / perPage);
        const sliceClinic = clinicRedux.slice(offset, offset + perPage);
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search clinic ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagerClinic'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-clinic.name'} /></th>
                            <th><FormattedMessage id={'manage-clinic.name_en'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {sliceClinic && sliceClinic.length > 0 ? sliceClinic.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.name}</td>
                                    <td>{item.name_en}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditClinic(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteClinic(item)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
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
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerClinic);
