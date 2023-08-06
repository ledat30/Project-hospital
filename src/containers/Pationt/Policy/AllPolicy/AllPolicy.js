import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HeaderHome from '../../../HomePage/HeaderHome';
import HomeFooter from '../../../HomePage/HomeFooter';
import './AllPolicy.scss';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import { getAllPolicy } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { debounce } from 'lodash';

class AllPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataPolicy: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }

    async componentDidMount() {
        let res = await getAllPolicy();
        if (res && res.errCode === 0) {
            this.setState({
                dataPolicy: res.data ? res.data : []
            })
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    handleViewDetailPolicy = (policy) => {
        if (this.props.history) {
            this.props.history.push(`/detail-policy/${policy.id}`)
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-policy-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataPolicy: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    dataPolicy: [],
                    currentPage: 0,
                })
            }
        } else {
            let policy = await getAllPolicy();
            if (policy && policy.errCode === 0) {
                this.setState({
                    dataPolicy: policy.data ? policy.data : [],
                    currentPage: 0,
                })
            }
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
        const { dataPolicy, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(dataPolicy.length / perPage);
        const slicePolicy = dataPolicy.slice(offset, offset + perPage);
        let { language } = this.props;
        return (
            <div className='all-policy-container'>
                <HeaderHome />
                <div className='body'>
                    <div className='category'>
                        <div className='top-category'>
                            <div className="container-5">
                                <input type="search" id="search" placeholder="Search..."
                                    onChange={(e) => this.handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className='category-policy'>
                            <div className='name-category'><FormattedMessage id={'patient.policy.category'} />
                            </div>
                        </div>

                        <div className='all-policy'>
                            {slicePolicy && slicePolicy.length > 0 ? slicePolicy.map((item, index) => {
                                return (
                                    <div className='policy' key={index}
                                        onClick={() => this.handleViewDetailPolicy(item)}
                                    >
                                        <div>{language === LANGUAGES.VI ? item.nameVI : item.nameEN}</div>
                                    </div>
                                )
                            })
                                :
                                (
                                    <b className='tb'>
                                        <FormattedMessage id={'patient.detail-category.tb'} />
                                    </b>
                                )
                            }
                        </div>
                        <ReactPaginate
                            previousLabel={<FormattedMessage id={'ReactPaginate.dau'} />}
                            nextLabel={<FormattedMessage id={'ReactPaginate.cuoi'} />}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={6}
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
                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPolicy));
