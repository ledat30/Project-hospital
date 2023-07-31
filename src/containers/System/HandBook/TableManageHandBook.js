import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHandBook.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManageHandBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            handBookRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchAllHandBookRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook
            && this.state.handBookRedux.length === 0) {
            this.setState({
                handBookRedux: this.props.listHandBook
            })
        }
    }

    handleDeleteHandbook = (handbook) => {
        this.props.deleteHandBookRedux(handbook.id);
    }

    handleEditHandbook = (handbook) => {
        this.props.handleEditHandBookFromPaentKey(handbook)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-handbook?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    handBookRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    handBookRedux: this.props.listHandBook,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                handBookRedux: this.props.listHandBook,
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
        const { handBookRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(handBookRedux.length / perPage);
        const sliceHandbook = handBookRedux.slice(offset, offset + perPage);

        return (
            <>
                <input type='' className='search-user-box' placeholder='Search handbook ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManageHandBook'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-handbook.Title'} /></th>
                            <th><FormattedMessage id={'manage-handbook.Title1'} /></th>
                            <th><FormattedMessage id={'manage-handbook.Action'} /></th>
                        </tr>
                        {sliceHandbook && sliceHandbook.length > 0 ? sliceHandbook.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.title}</td>
                                    <td>{item.title_en}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditHandbook(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteHandbook(item)}>
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
        listHandBook: state.admin.handbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandBookRedux: () => dispatch(actions.fetchAllHandBookStart()),
        deleteHandBookRedux: (id) => dispatch(actions.deleteHB(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandBook);
