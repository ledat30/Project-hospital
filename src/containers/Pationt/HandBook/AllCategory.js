import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AllCategory.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllCategoryHandbook, getAllHandBook } from '../../../services/userService';
import _, { debounce } from 'lodash';
import { LANGUAGES } from '../../../utils';
import ReactPaginate from 'react-paginate';


class AllCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataCategory: [],
            dataHandbook: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 6, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
        }
    }

    async componentDidMount() {
        let res = await getAllCategoryHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataCategory: res.data ? res.data : []
            })
        }

        let handbooks = await getAllHandBook();
        if (handbooks && handbooks.errCode === 0 && this.state.dataHandbook.length === 0) {
            this.setState({
                dataHandbook: handbooks.data ? handbooks.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleViewDetailCategory = (category) => {
        if (this.props.history) {
            this.props.history.push(`/deatil-category/${category.id}`)
        }
    }

    handleViewDetailHandbook = (handBook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handBook.id}`)
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-handbook-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataHandbook: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    dataHandbook: [],
                    currentPage: 0,
                })
            }
        } else {
            let handbooks = await getAllHandBook();
            if (handbooks && handbooks.errCode === 0) {
                this.setState({
                    dataHandbook: handbooks.data ? handbooks.data : [],
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
        let { dataCategory } = this.state;
        const { dataHandbook, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(dataHandbook.length / perPage);
        const sliceHandbook = dataHandbook.slice(offset, offset + perPage);
        let { language } = this.props;
        return (
            <div className='all-categort-container'>
                <HeaderHome />
                <div className='all-categort-body'>
                    <div className='main'>
                        <div className='ct-left'>
                            <div className='title-ct'><FormattedMessage id={'patient.handbook.title_handbook'} /></div>
                            <div className='all-ct'>
                                {dataCategory && dataCategory.length > 0 && dataCategory.map((item, index) => {
                                    return (
                                        <div className='ct' key={index}
                                            onClick={() => this.handleViewDetailCategory(item)} >
                                            <div className='text-ct'>{language === LANGUAGES.VI ? item.nameVI : item.nameEN} </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div className='ct-right'>
                            <div className="container-4">
                                <input type="search" id="search" placeholder="Search..."
                                    onChange={(e) => this.handleInputChange(e)}
                                />
                            </div>
                            <div className='all-blog'>
                                {sliceHandbook && sliceHandbook.length > 0 ? sliceHandbook.map((item, index) => {
                                    return (
                                        <div className='blog' key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className='img-blog'
                                                style={{ backgroundImage: `url(${item.image})` }}>
                                            </div>
                                            <div className='nd-blog'>
                                                <p>{item.title}</p>
                                            </div>
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
                                previousLabel={<FormattedMessage id={'ReactPaginate.dau'}/>}
                                nextLabel={<FormattedMessage id={'ReactPaginate.cuoi'}/>}
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
                </div>
                <HomeFooter />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
