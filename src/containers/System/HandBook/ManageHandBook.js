import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageHandBook.scss';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageHandBook from './TableManageHandBook';
import * as actions from '../../../store/actions';
import HomeFooter from '../../HomePage/HomeFooter';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            handbookEditId: ''
        }
    }
    async componentDidMount() {
        this.props.fetchAllCategoryHandBookRedux();
        this.props.fetchAllHandBookRedux();
        this.props.fetchAllDoctor();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
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
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnchangInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangInputEn = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
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

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
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
        let { action } = this.state;
        let res = await createNewHandbook(this.state);

        if (res && res.errCode === 0 && action === CRUD_ACTIONS.CREATE) {
            toast.success('Add new specialty success!')
            this.props.fetchAllHandBookRedux();
        }
    }

    handleEditHandBook = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editHandBookRedux({
                id: this.state.handbookEditId,
                contentHTMLVi: this.state.contentHTMLVi,
                contentMarkdownVi: this.state.contentMarkdownVi,
                contentHTMLEn: this.state.contentHTMLEn,
                contentMarkdownEn: this.state.contentMarkdownEn,
                title: this.state.title,
                title_en: this.state.title_en,
                categoryId: this.state.categoryId,
                user_id: this.state.user_id,
                avatar: this.state.avatar,
            });
            this.props.fetchAllHandBookRedux();
        }

    }

    handleEditHandBookFromPaent = (handbook) => {
        let imageBase64 = '';
        if (handbook.image) {
            imageBase64 = new Buffer.from(handbook.image, 'base64').toString('binary');
        }
        this.setState({
            title: handbook.title,
            title_en: handbook.title_en,
            contentHTMLVi: handbook.contentHTMLVi,
            contentMarkdownVi: handbook.contentMarkdownVi,
            contentHTMLEn: handbook.contentHTMLEn,
            contentMarkdownEn: handbook.contentMarkdownEn,
            categoryId: handbook.categoryId,
            user_id: handbook.user_id,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            handbookEditId: handbook.id
        })
    }

    render() {
        let { language } = this.props;
        let categories = this.state.categoryArr;
        let userDoctor = this.state.doctorArr;
        return (
            <>
                <div className='manage-specilty-container'>
                    <div className='ms-title'><FormattedMessage id={'manage-handbook.tiitle3'} /></div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-handbook.Title'} /></label>
                            <input className='form-control' type='text' value={this.state.title}
                                onChange={(e) => this.handleOnchangInput(e, 'title')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-handbook.Title1'} /></label>
                            <input className='form-control' type='text' value={this.state.title_en}
                                onChange={(e) => this.handleOnchangInputEn(e, 'title_en')}
                            />
                        </div>
                        <div className='col-3  form-group'>
                            <label><FormattedMessage id="manage-user.categoryId" /></label>
                            <select className="form-control"
                                onChange={(event) => { this.onChangeInput(event, 'categoryId') }} value={this.state.categoryId}>
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
                                onChange={(event) => { this.onChangeInput(event, 'user_id') }} value={this.state.user_id}>
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
                                value={this.state.contentMarkdownVi}
                            />
                        </div>
                        <div className='col-12 mt-4'>
                            <label><FormattedMessage id={'manage-handbook.Description-En'} /></label>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeEn}
                                value={this.state.contentMarkdownEn}
                            />
                        </div>
                        <div className='col-12'>
                            <div>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    < button className={"btn-btn-warning"}
                                        onClick={() => { this.handleEditHandBook() }}>
                                        <FormattedMessage id={'manage-handbook.edit'} />
                                    </button>
                                    :
                                    < button className={'btn-save-specialty'}
                                        onClick={() => { this.handleSaveNewHandbook() }}>
                                        <FormattedMessage id={'manage-handbook.save'} />
                                    </button>
                                }
                            </div>

                        </div>

                        <div className='col-12'>
                            <div className='title my-3'><FormattedMessage id="manage-handbook.title" /></div>
                            <TableManageHandBook
                                handleEditHandBookFromPaentKey={this.handleEditHandBookFromPaent}
                                action={this.state.action}
                            />
                        </div>

                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>

                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listHandBook: state.admin.handbook,
        category: state.admin.category,
        listDoctor: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandBookRedux: () => dispatch(actions.fetchAllHandBookStart()),
        editHandBookRedux: (data) => dispatch(actions.editHandBook(data)),
        fetchAllCategoryHandBookRedux: () => dispatch(actions.fetchAllCategoryHBStart()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
