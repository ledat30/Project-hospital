import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManagerSpecialty from './TableManagerSpecialty';
import * as actions from '../../../store/actions';
import HomeFooter from '../../HomePage/HomeFooter';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            previewImgURL: '',
            isOpen: false,
            descriptionHTML: '',
            descriptionMarkdown: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: '',
            name_en: '',
            specialtyEditId: '',
            avatar: ''
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
                descriptionHTML_En: '',
                descriptionMarkdown_En: '',
                name_en: '',
            })
        }
    }

    handleOnchangInputVi = (e, id) => {
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            descriptionHTML_En: html,
            descriptionMarkdown_En: text
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
        let arrCheck = ['name', 'name_en', 'descriptionHTML_En', 'descriptionMarkdown_En', 'descriptionHTML', 'descriptionMarkdown']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveNewSpecialty = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        let res = await createNewSpecialty(this.state);

        if (res && res.errCode === 0 && action === CRUD_ACTIONS.CREATE) {
            toast.success('Add new specialty success!')
        }
        this.props.fetchSpecialtyRedux();
    }

    handleEditSpecialty = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editSpecialtyRedux({
                id: this.state.specialtyEditId,
                name: this.state.name,
                name_en: this.state.name_en,
                descriptionHTML_En: this.state.descriptionHTML_En,
                descriptionMarkdown_En: this.state.descriptionMarkdown_En,
                avatar: this.state.avatar,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
        }
        this.props.fetchSpecialtyRedux();
    }

    handleEditSpecialtyFromPaent = (specialty) => {
        let imageBase64 = '';
        if (specialty.image) {
            imageBase64 = new Buffer.from(specialty.image, 'base64').toString('binary');
        }
        this.setState({
            name: specialty.name,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            name_en: specialty.name_en,
            descriptionHTML_En: specialty.descriptionHTML_En,
            descriptionMarkdown_En: specialty.descriptionMarkdown_En,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            specialtyEditId: specialty.id
        })
    }

    render() {
        return (
            <>
                <div className='manage-specilty-container'>
                    <div className='ms-title'><FormattedMessage id={'manage-specialty.title1'} /></div>

                    <div className='add-new-specialty row'>
                        <div className='col-5 form-group'>
                            <label><FormattedMessage id={'manage-specialty.name'} /></label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(e) => this.handleOnchangInputVi(e, 'name')}
                            />
                        </div>
                        <div className='col-5 form-group'>
                            <label><FormattedMessage id={'manage-specialty.name_en'} /></label>
                            <input className='form-control' type='text'
                                value={this.state.name_en}
                                onChange={(e) => this.handleOnchangInputEn(e, 'name_en')}
                            />
                        </div>
                        <div className='col-2 form-group'>
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
                            <label><FormattedMessage id={'manage-specialty.Describe'} /></label>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id={'manage-specialty.Describe_en'} /></label>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeEn}
                                value={this.state.descriptionMarkdown_En}
                            />
                        </div>
                        <div className='col-12'>
                            <div>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    < button className={"btn-btn-warning"}
                                        onClick={() => { this.handleEditSpecialty() }}>
                                        <FormattedMessage id={'manage-specialty.edit'} />
                                    </button>
                                    :
                                    < button className={'btn-save-specialty'}
                                        onClick={() => { this.handleSaveNewSpecialty() }}>
                                        <FormattedMessage id={'manage-specialty.save'} />
                                    </button>
                                }
                            </div>

                        </div>

                        <div className='col-12 '>
                            <div className='title my-3'><FormattedMessage id="manage-specialty.title" /></div>
                            <TableManagerSpecialty
                                handleEditSpecialtyFromPaentKey={this.handleEditSpecialtyFromPaent}
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
        listSpecialty: state.admin.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        editSpecialtyRedux: (data) => dispatch(actions.editSpecialty(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
