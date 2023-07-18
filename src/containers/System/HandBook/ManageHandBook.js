import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageHandBook.scss';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageHandBook from './TableManageHandBook';
import * as actions from '../../../store/actions';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            previewImgURL: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            avatar: '',
            handbookEditId: ''
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.listHandBook !== this.props.listHandBook) {
            this.setState({
                title: '',
                previewImgURL: '',
                contentHTMLVi: '',
                contentMarkdownVi: '',
                contentHTMLEn: '',
                contentMarkdownEn: '',
                avatar: '',
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
        let arrCheck = ['title', 'contentHTMLVi', 'contentMarkdownVi', 'contentHTMLEn', 'contentMarkdownEn']
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
        }
        this.props.fetchAllHandBookRedux();
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
                avatar: this.state.avatar,
            })
        }
        this.props.fetchAllHandBookRedux();
    }

    handleEditHandBookFromPaent = (handbook) => {
        let imageBase64 = '';
        if (handbook.image) {
            imageBase64 = new Buffer.from(handbook.image, 'base64').toString('binary');
        }
        this.setState({
            title: handbook.title,
            contentHTMLVi: handbook.contentHTMLVi,
            contentMarkdownVi: handbook.contentMarkdownVi,
            contentHTMLEn: handbook.contentHTMLEn,
            contentMarkdownEn: handbook.contentMarkdownEn,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            handbookEditId: handbook.id
        })
    }

    render() {

        return (
            <div className='manage-specilty-container'>
                <div className='ms-title'>Quản lý Cẩm nang</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tiêu đề </label>
                        <input className='form-control' type='text' value={this.state.title}
                            onChange={(e) => this.handleOnchangInput(e, 'title')}
                        />
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
                        <label>Mô tả - Vi</label>
                        <MdEditor style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChangeVi}
                            value={this.state.contentMarkdownVi}
                        />
                    </div>
                    <div className='col-12 mt-4'>
                        <label>Mô tả - En</label>
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

                    <div className='col-12 mb-5'>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listHandBook: state.admin.handbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandBookRedux: () => dispatch(actions.fetchAllHandBookStart()),
        editHandBookRedux: (data) => dispatch(actions.editHandBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
