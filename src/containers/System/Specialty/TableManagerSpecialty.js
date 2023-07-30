import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerSpecialty.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManagerSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            specialtyRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchSpecialtyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty
            && this.state.specialtyRedux.length === 0) {
            this.setState({
                specialtyRedux: this.props.listSpecialty
            })
        }
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id);
    }

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialtyFromPaentKey(specialty)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-specialty?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    specialtyRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    specialtyRedux: this.props.listSpecialty,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                specialtyRedux: this.props.listSpecialty,
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
        const { specialtyRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(specialtyRedux.length / perPage);
        const sliceSpecialty = specialtyRedux.slice(offset, offset + perPage);
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search specialty ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagerSpecialty'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-specialty.name'} /></th>
                            <th><FormattedMessage id={'manage-specialty.name_en'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {sliceSpecialty && sliceSpecialty.length > 0 ? sliceSpecialty.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.name}</td>
                                    <td>{item.name_en}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditSpecialty(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteSpecialty(item)}>
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
        listSpecialty: state.admin.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerSpecialty);
