import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableCategory.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableCategory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            CategoryhandBookRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchAllCategoryHandBookRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listCategory !== this.props.listCategory ) {
            this.setState({
                CategoryhandBookRedux: this.props.listCategory.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.CategoryhandBookRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
    }

    handleDeleteCategoryHandbook = (categoryHandBook) => {
        this.props.deleteCategoryRedux(categoryHandBook.id);
    }

    handleEditCategoryHandbook = (category) => {
        this.props.handleEditCategoryHandBookFromPaentKey(category)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-category?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    CategoryhandBookRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    CategoryhandBookRedux: this.props.listCategory,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                CategoryhandBookRedux: this.props.listCategory,
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
        const { CategoryhandBookRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(CategoryhandBookRedux.length / perPage);
        const sliceCateogy = CategoryhandBookRedux.slice(offset, offset + perPage);
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search category ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableCategory'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-handbook.name1'} /></th>
                            <th><FormattedMessage id={'manage-handbook.name2'} /></th>
                            <th><FormattedMessage id={'manage-handbook.Action'} /></th>
                        </tr>
                        {sliceCateogy && sliceCateogy.length > 0 ? sliceCateogy.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.nameVI}</td>
                                    <td>{item.nameEN}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditCategoryHandbook(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteCategoryHandbook(item)}>
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
        listCategory: state.admin.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategoryHandBookRedux: () => dispatch(actions.fetchAllCategoryHBStart()),
        deleteCategoryRedux: (id) => dispatch(actions.deleteCategoryHB(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
