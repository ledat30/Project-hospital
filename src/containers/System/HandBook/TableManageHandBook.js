import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHandBook.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { createNewHandbook } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageHandBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            handBookRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại,

            categoryArr: [],
            doctorArr: [],

            title_en: '',
            title: '',
            previewImgURL: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            categoryId: '',
            user_id: '',
            avatar: '',
            handbookEditId: '',

            editingHandBook: null,
            creatingHandBook: null,
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    componentDidMount() {
        this.props.fetchAllHandBookRedux();
        this.props.fetchAllCategoryHandBookRedux();
        this.props.fetchAllDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook) {
            this.setState({
                handBookRedux: this.props.listHandBook.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.handBookRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
        if (prevProps.listHandBook !== this.props.listHandBook) {
            let arrCategorys = this.props.category;
            let arrDoctor = this.props.listDoctor;

            this.setState({
                title: '',
                previewImgURL: '',
                contentHTMLVi: '',
                contentMarkdownVi: '',
                contentHTMLEn: '',
                contentMarkdownEn: '',
                categoryId: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].id : '',
                user_id: arrDoctor && arrDoctor.length > 0 ? arrDoctor[0].id : '',
                avatar: '',
                title_en: '',
            })
        }
        if (prevProps.category !== this.props.category) {
            let arrCategory = this.props.category;
            this.setState({
                categoryArr: arrCategory,
                categoryId: arrCategory && arrCategory.length > 0 ? arrCategory[0].id : ''
            })
        }
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let arrDoctor = this.props.listDoctor;
            this.setState({
                doctorArr: arrDoctor,
                user_id: arrDoctor && arrDoctor.length > 0 ? arrDoctor[0].id : ''
            })
        }
    }

    handleDeleteHandbook = (handbook) => {
        this.props.deleteHandBookRedux(handbook.id);
    }

    // handleEditHandbook = (handbook) => {
    //     this.props.handleEditHandBookFromPaentKey(handbook)
    // }

    handleCreateHandBook = () => {
        this.setState({
            title_en: '',
            title: '',
            previewImgURL: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            categoryId: '',
            user_id: '',
            avatar: '',
            handbookEditId: '',
            creatingHandBook: {}
        });
    }

    handleCancel = () => {
        this.setState({
            creatingHandBook: null,
        });
    }
    handleCancelEdit = () => {
        this.setState({
            editingHandBook: null,
        });
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

    handleOnchangInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangInputVi = (e) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                title: e.target.value,
            }
        })
    }
    handleOnchangInputAnh = (e) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                title_en: e.target.value,
            }
        })
    }

    handleOnchangInputEn = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    onChangeInputVi = (e) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                categoryId: e.target.value,
            }
        })
    }

    onChangeInputEn = (e) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                user_id: e.target.value,
            }
        })
    }

    handleEditorChangeVi = ({ html, text }) => {
        this.setState({
            contentHTMLVi: html,
            contentMarkdownVi: text,
        })
    }

    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            contentHTMLEn: html,
            contentMarkdownEn: text,
        })
    }

    handleEditorChangeViEdit = ({ html, text }) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                contentHTMLVi: html,
                contentMarkdownVi: text,
            }
        })
    }

    handleEditorChangeEnEDit = ({ html, text }) => {
        this.setState({
            editingHandBook: {
                ...this.state.editingHandBook,
                contentHTMLEn: html,
                contentMarkdownEn: text,
            }
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['title', 'title_en', 'contentHTMLVi', 'contentMarkdownVi', 'contentHTMLEn', 'contentMarkdownEn']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveNewHandbook = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let res = await createNewHandbook(this.state);

        if (res && res.errCode === 0) {
            toast.success('Add new specialty success!')
            this.props.fetchAllHandBookRedux();
        }
        this.setState({
            creatingHandBook: null,
        })
    }

    handleEditHandbook = (handbook) => {
        this.setState({
            editingHandBook: handbook,
            handbookEditId: handbook.id,
        });
    }

    handleUpdateHandBook = (handbook) => {
        let imageBase64 = '';
        if (handbook.image) {
            imageBase64 = new Buffer.from(handbook.image, 'base64').toString('binary');
        }
        this.props.editHandBookRedux({
            id: this.state.handbookEditId,
            contentHTMLVi: handbook.contentHTMLVi,
            contentMarkdownVi: handbook.contentMarkdownVi,
            contentHTMLEn: handbook.contentHTMLEn,
            contentMarkdownEn: handbook.contentMarkdownEn,
            title: handbook.title,
            title_en: handbook.title_en,
            avatar: '',
            previewImgURL: imageBase64,
            categoryId: handbook.categoryId,
            user_id: handbook.user_id,
        })
        this.setState({
            editingHandBook: null,
            handbookEditId: '',
        })
    }


    render() {
        const { handBookRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(handBookRedux.length / perPage);
        const sliceHandbook = handBookRedux.slice(offset, offset + perPage);
        let { language } = this.props;
        let categories = this.state.categoryArr;
        let userDoctor = this.state.doctorArr;
        console.log('check ', categories)
        return (
            <>
                <div className='manage-specilty-container'>
                    {this.state.creatingHandBook && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-handbook.tiitle3'} /></div>

                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-handbook.Title'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingHandBook.title}
                                        onChange={(e) => this.handleOnchangInput(e, 'title')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-handbook.Title1'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingHandBook.title_en}
                                        onChange={(e) => this.handleOnchangInputEn(e, 'title_en')}
                                    />
                                </div>
                                <div className='col-3  form-group'>
                                    <label><FormattedMessage id="manage-user.categoryId" /></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'categoryId') }} value={this.state.creatingHandBook.categoryId}>
                                        {categories && categories.length > 0 &&
                                            categories.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {language === LANGUAGES.VI ? item.nameVI : item.nameEN}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3  form-group'>
                                    <label><FormattedMessage id="manage-user.categoryId" /></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'user_id') }} value={this.state.creatingHandBook.user_id}>
                                        {userDoctor && userDoctor.length > 0 &&
                                            userDoctor.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.fullName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3 form-group'>
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input id='prevewimg' type='file' hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label htmlFor='prevewimg' className='lable-upload'><FormattedMessage id="manage-user.Upload" /> <i className='fas fa-upload'></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImg()}
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage-handbook.Description-Vi'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeVi}
                                        value={this.state.creatingHandBook.contentMarkdownVi}
                                    />
                                </div>
                                <div className='col-12 mt-4'>
                                    <label><FormattedMessage id={'manage-handbook.Description-En'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEn}
                                        value={this.state.creatingHandBook.contentMarkdownEn}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleSaveNewHandbook() }}>
                                            <FormattedMessage id={'manage-handbook.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancel}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                    </div>
                                </div>
                                {this.state.isOpen === true &&
                                    <Lightbox
                                        mainSrc={this.state.previewImgURL}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }
                            </div>
                        </>
                    )}

                    {this.state.editingHandBook && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-handbook.tiitle4'} /></div>

                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-handbook.Title'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingHandBook.title}
                                        onChange={(e) => this.handleOnchangInputVi(e, 'title')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-handbook.Title1'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingHandBook.title_en}
                                        onChange={(e) => this.handleOnchangInputAnh(e, 'title_en')}
                                    />
                                </div>
                                <div className='col-3  form-group'>
                                    <label><FormattedMessage id="manage-user.categoryId" /></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInputVi(event, 'categoryId') }} value={this.state.editingHandBook.categoryId}>
                                        {categories && categories.length > 0 &&
                                            categories.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {language === LANGUAGES.VI ? item.nameVI : item.nameEN}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3  form-group'>
                                    <label><FormattedMessage id="manage-user.categoryId" /></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInputEn(event, 'user_id') }} value={this.state.editingHandBook.user_id}>
                                        {userDoctor && userDoctor.length > 0 &&
                                            userDoctor.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.fullName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/* <div className='col-3 form-group'>
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input id='prevewimg' type='file' hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label htmlFor='prevewimg' className='lable-upload'><FormattedMessage id="manage-user.Upload" /> <i className='fas fa-upload'></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImg()}
                                        >
                                        </div>
                                    </div>
                                </div> */}
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage-handbook.Description-Vi'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeViEdit}
                                        value={this.state.editingHandBook.contentMarkdownVi}
                                    />
                                </div>
                                <div className='col-12 mt-4'>
                                    <label><FormattedMessage id={'manage-handbook.Description-En'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEnEDit}
                                        value={this.state.editingHandBook.contentMarkdownEn}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleUpdateHandBook(this.state.editingHandBook) }}>
                                            <FormattedMessage id={'manage-handbook.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancelEdit}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                    </div>
                                </div>
                                {this.state.isOpen === true &&
                                    <Lightbox
                                        mainSrc={this.state.previewImgURL}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }
                            </div>
                        </>
                    )}

                    <div className='title mt-10'><FormattedMessage id="manage-handbook.title" /></div>
                    <button className='btn-save-policy' onClick={this.handleCreateHandBook}><FormattedMessage id={'manage-handbook.create'} /></button>
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
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listHandBook: state.admin.handbook,
        category: state.admin.category,
        listDoctor: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandBookRedux: () => dispatch(actions.fetchAllHandBookStart()),
        deleteHandBookRedux: (id) => dispatch(actions.deleteHB(id)),
        editHandBookRedux: (data) => dispatch(actions.editHandBook(data)),
        fetchAllCategoryHandBookRedux: () => dispatch(actions.fetchAllCategoryHBStart()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandBook);
