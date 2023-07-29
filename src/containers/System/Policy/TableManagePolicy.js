import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePolicy.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';

class TableManagePolicy extends Component {


    constructor(props) {
        super(props);
        this.state = {
            policyRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }



    componentDidMount() {
        this.props.fetchAllPolicyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listPolicy !== this.props.listPolicy
            && this.state.policyRedux.length === 0) {
            this.setState({
                policyRedux: this.props.listPolicy
            })
        }
    }

    handleDeletePolicy = (policy) => {
        this.props.deletePolicyRedux(policy.id);
    }

    handleEditPolicy = (policy) => {
        this.props.handleEditPolicyFromPaentKey(policy)
    }


    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-policy?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    policyRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    policyRedux: this.props.listPolicy,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                policyRedux: this.props.listPolicy,
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
        const { policyRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(policyRedux.length / perPage);
        const slicePolicy = policyRedux.slice(offset, offset + perPage);

        return (
            <>
                <input type='' className='search-user-box' placeholder='Search policy ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagePolicy'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage_policy.name1'} /></th>
                            <th><FormattedMessage id={'manage_policy.name2'} /></th>
                            <th><FormattedMessage id={'manage_policy.action'} /></th>
                        </tr>
                        {slicePolicy && slicePolicy.length > 0 ? slicePolicy.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.nameVI}</td>
                                    <td>{item.nameEN}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditPolicy(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeletePolicy(item)}>
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
        listPolicy: state.admin.policies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
        deletePolicyRedux: (id) => dispatch(actions.deletePolicy(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePolicy);
