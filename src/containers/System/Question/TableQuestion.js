import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './TableQuestion.scss';
import { createNewQuestion } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';

class TableQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
            editingQuestion: null,
            creatingQuestion: null,
            question_vi: '',
            question_en: '',
            answer_vi: '',
            answer_en: '',
            questionEditId: ''
        }
    }

    handleCreateQuestion = () => {
        this.setState({
            question_vi: '',
            question_en: '',
            answer_vi: '',
            answer_en: '',
            creatingQuestion: {}
        });
    }

    handleCancelAdd = () => {
        this.setState({
            creatingQuestion: null
        });
    }

    handleChangeVi = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeEn = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeTextEn = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeTextVI = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }



    async componentDidMount() {
        this.props.fetchAllQuestionRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.ListQuestion !== this.props.ListQuestion) {
            this.setState({
                questionRedux: this.props.ListQuestion.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.questionRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['question_en', 'question_vi', 'answer_en', 'answer_vi'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleSaveNewQuestion = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let res = await createNewQuestion(this.state);

        if (res && res.errCode === 0) {
            toast.success('Add new question success!');
            this.props.fetchAllQuestionRedux();
        }
        this.setState({
            creatingQuestion: null,
        });

    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-question?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    questionRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    questionRedux: this.props.ListQuestion,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                questionRedux: this.props.ListQuestion,
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

    handleDeleteQuestion = (question) => {
        this.props.deleteQuestionRedux(question.id);
    }

    handleEditQuestion = (question) => {
        this.setState({
            editingQuestion: question,
            questionEditId: question.id,
        });
    }

    handleCancel = () => {
        this.setState({
            editingQuestion: null,
        });
    }

    handleChangeViEdit = (e, id) => {
        this.setState({
            editingQuestion: {
                ...this.state.editingQuestion,
                question_vi: e.target.value,
            }
        })
    }

    handleChangeEnEdit = (e, id) => {
        this.setState({
            editingQuestion: {
                ...this.state.editingQuestion,
                question_en: e.target.value,
            }
        })
    }

    handleOnchangeTextVIEdit = (e, id) => {
        this.setState({
            editingQuestion: {
                ...this.state.editingQuestion,
                answer_vi: e.target.value,
            }
        })
    }
    handleOnchangeTextEnEdit = (e, id) => {
        this.setState({
            editingQuestion: {
                ...this.state.editingQuestion,
                answer_en: e.target.value,
            }
        })
    }

    handleUpdateQuestion = () => {
        this.props.editQuestionRedux({
            id: this.state.questionEditId,
            question_en: this.state.editingQuestion.question_en,
            question_vi: this.state.editingQuestion.question_vi,
            answer_en: this.state.editingQuestion.answer_en,
            answer_vi: this.state.editingQuestion.answer_vi,
        })
        this.setState({
            editingQuestion: null,
            policyEditId: '',
        })
    }


    render() {
        const { questionRedux, offset, perPage } = this.state;
        const pageCount = Math.ceil(questionRedux.length / perPage);
        const sliceQuestion = questionRedux.slice(offset, offset + perPage);
        return (
            <div className='manage-question-container'>
                {this.state.creatingQuestion && (
                    <>
                        <div className='ms-title1'><FormattedMessage id={'manage-question.tiitle1'} /></div>
                        <div className='add-new-specialty row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-question.name2'} /></label>
                                <input className='form-control' type='text' value={this.state.creatingQuestion.question_vi}
                                    onChange={(e) => this.handleChangeVi(e, 'question_vi')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-question.name1'} /></label>
                                <input className='form-control' type='text' value={this.state.creatingQuestion.question_en}
                                    onChange={(e) => this.handleChangeEn(e, 'question_en')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id={'manage-question.rep1'} /></label>
                                <textarea className='form-control' rows={6}
                                    onChange={(event) => this.handleOnchangeTextVI(event, 'answer_vi')}
                                    value={this.state.creatingQuestion.answer_vi}
                                >
                                </textarea>
                            </div>

                            <div className='col-12 form-group'>
                                <label><FormattedMessage id={'manage-question.rep2'} /></label>
                                <textarea className='form-control' rows={6}
                                    onChange={(event) => this.handleOnchangeTextEn(event, 'answer_en')}
                                    value={this.state.creatingQuestion.answer_en}
                                >
                                </textarea>
                            </div>

                            <div className='col-12'>
                                <div>
                                    < button className={'btn-save-question'}
                                        onClick={() => { this.handleSaveNewQuestion() }}>
                                        <FormattedMessage id={'manage-question.save'} />
                                    </button>
                                    <button className={'btn_cancel'} onClick={this.handleCancelAdd}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                </div>

                            </div>
                        </div>
                    </>
                )}

                {this.state.editingQuestion && (
                    <>
                        <div className='ms-title1'><FormattedMessage id={'manage-question.tiitle2'} /></div>
                        <div className='add-new-specialty row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-question.name2'} /></label>
                                <input className='form-control' type='text' value={this.state.editingQuestion.question_vi}
                                    onChange={(e) => this.handleChangeViEdit(e, 'question_vi')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={'manage-question.name1'} /></label>
                                <input className='form-control' type='text' value={this.state.editingQuestion.question_en}
                                    onChange={(e) => this.handleChangeEnEdit(e, 'question_en')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id={'manage-question.rep1'} /></label>
                                <textarea className='form-control' rows={6}
                                    onChange={(event) => this.handleOnchangeTextVIEdit(event, 'answer_vi')}
                                    value={this.state.editingQuestion.answer_vi}
                                >
                                </textarea>
                            </div>

                            <div className='col-12 form-group'>
                                <label><FormattedMessage id={'manage-question.rep2'} /></label>
                                <textarea className='form-control' rows={6}
                                    onChange={(event) => this.handleOnchangeTextEnEdit(event, 'answer_en')}
                                    value={this.state.editingQuestion.answer_en}
                                >
                                </textarea>
                            </div>

                            <div className='col-12'>
                                <div>
                                    < button className={'btn-save-question'}
                                        onClick={() => { this.handleUpdateQuestion() }}>
                                        <FormattedMessage id={'manage-question.save'} />
                                    </button>
                                    <button className={'btn_cancel'} onClick={this.handleCancel}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                </div>

                            </div>
                        </div>
                    </>
                )}

                <div className='title mt-10'><FormattedMessage id="manage-question.tiitle" /></div>
                <button className='btn-save-policy' onClick={this.handleCreateQuestion}><FormattedMessage id={'manage-question.create'} /></button>
                <input type='' className='search-user-box' placeholder='Search policy ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManageQuestion'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'manage-question.name2'} /></th>
                            <th><FormattedMessage id={'manage-question.name1'} /></th>
                            <th><FormattedMessage id={'manage_policy.action'} /></th>
                        </tr>
                        {sliceQuestion && sliceQuestion.length > 0 ? sliceQuestion.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.question_vi}</td>
                                    <td>{item.question_en}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditQuestion(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteQuestion(item)}>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        ListQuestion: state.admin.question,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllQuestionRedux: () => dispatch(actions.fetchAllQuestion()),
        deleteQuestionRedux: (id) => dispatch(actions.deleteQuestions(id)),
        editQuestionRedux: (data) => dispatch(actions.editQuestions(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableQuestion);
