import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import './AllQuestion.scss';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import { getAllQuestion } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { debounce } from 'lodash';

class AllQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataQuestion: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại

            isShowDetailQuestion: null,
        }
    }

    showHideDetailQuestion = (item) => {
        this.setState({
            isShowDetailQuestion: item
        })
    }

    async componentDidMount() {
        let res = await getAllQuestion();
        if (res && res.errCode === 0) {
            this.setState({
                dataQuestion: res.data ? res.data : []
            })
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-question?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataQuestion: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    dataQuestion: [],
                    currentPage: 0,
                })
            }
        } else {
            let question = await getAllQuestion();
            if (question && question.errCode === 0) {
                this.setState({
                    dataQuestion: question.data ? question.data : [],
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
        const { dataQuestion, offset, perPage, isShowDetailQuestion } = this.state;
        console.log('check question', dataQuestion)
        const pageCount = Math.ceil(dataQuestion.length / perPage);
        const sliceQuestion = dataQuestion.slice(offset, offset + perPage);
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
                            <div className='name-category'><FormattedMessage id={'patient.question.category'} />
                            </div>
                        </div>

                        <div className='all-question'>
                            {sliceQuestion && sliceQuestion.length > 0 ? sliceQuestion.map((item, index) => {
                                return (
                                    <div className='containerr' key={index}>
                                        {isShowDetailQuestion !== item.id &&
                                            <div className='question' onClick={() => this.showHideDetailQuestion(item)}>
                                                <div >
                                                    {language === LANGUAGES.VI ? item.question_vi : item.question_en}
                                                </div>
                                            </div>
                                        }
                                        {isShowDetailQuestion === item &&
                                            <div className='rep' onClick={() => this.showHideDetailQuestion(null)}>
                                                <p className='text'>{language === LANGUAGES.VI ? item.answer_vi : item.answer_en}</p>
                                            </div>
                                        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllQuestion));
