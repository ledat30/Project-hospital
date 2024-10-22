import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManagerClinic from './TableManagerClinic';
import * as actions from '../../../store/actions';
import { createNewClinics } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            previewImgURL: '',
            isOpen: false,
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            avatar: '',
            action: '',
            userEditId: '',
            name_en: '',
            address_en: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: ''
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.listClinics !== this.props.listClinics) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
                name_en: '',
                address_en: '',
                descriptionHTML_En: '',
                descriptionMarkdown_En: ''
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
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
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
        let arrCheck = ['name', 'address', 'name_en', 'address_en', 'descriptionHTML_En', 'descriptionMarkdown_En', 'descriptionHTML', 'descriptionMarkdown']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveNewClinic = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let res = await createNewClinics(this.state)
        let { action } = this.state;


        if (res && res.errCode === 0 && action === CRUD_ACTIONS.CREATE) {
            toast.success(<FormattedMessage id={'toast.toast5'} />)

        }
        this.props.fetchClinicRedux();
    }


    handleEditClinic = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editClinicRedux({
                id: this.state.userEditId,
                name: this.state.name,
                avatar: this.state.avatar,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                name_en: this.state.name_en,
                address_en: this.state.address_en,
                descriptionHTML_En: this.state.descriptionHTML_En,
                descriptionMarkdown_En: this.state.descriptionMarkdown_En,
            })
        }
        this.props.fetchClinicRedux();
    }

    handleEditClinicFromPaent = (clinic) => {
        let imageBase64 = '';
        if (clinic.image) {
            imageBase64 = new Buffer.from(clinic.image, 'base64').toString('binary');
        }
        this.setState({
            name: clinic.name,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            address: clinic.address,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: clinic.id,
            name_en: clinic.name_en,
            address_en: clinic.address_en,
            descriptionHTML_En: clinic.descriptionHTML_En,
            descriptionMarkdown_En: clinic.descriptionMarkdown_En,
        })
    }
    render() {
        return (
            <>
                <div className='manage-specilty-container'>
                    <div className='ms-title'><FormattedMessage id={'manage-clinic.title1'} /> </div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-clinic.name'} /></label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(e) => this.handleOnchangInput(e, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-clinic.name_en'} /></label>
                            <input className='form-control' type='text'
                                value={this.state.name_en}
                                onChange={(e) => this.handleOnchangInputEn(e, 'name_en')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-clinic.address'} /></label>
                            <input className='form-control' type='text' value={this.state.address}
                                onChange={(e) => this.handleOnchangInput(e, 'address')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage-clinic.address_en'} /></label>
                            <input className='form-control' type='text'
                                value={this.state.address_en}
                                onChange={(e) => this.handleOnchangInputEn(e, 'address_en')}
                            />
                        </div>
                        <div className='col-2 form-group'>
                            <label><FormattedMessage id="manage-user.image" /></label>
                            <div className='preview-img-container'>
                                <input id='prevewimg' type='file' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label htmlFor='prevewimg' className='lable-upload'>
                                    <FormattedMessage id="manage-user.Upload" /> <i className='fas fa-upload'></i>
                                </label>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImg()}
                                >
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id="manage-clinic.Describe" /></label>
                            <MdEditor style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id="manage-clinic.Describe-en" /></label>
                            <MdEditor style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeEn}
                                value={this.state.descriptionMarkdown_En}
                            />
                        </div>
                        <div className='col-12'>
                            <div>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    < button className={"btn-btn-warning"}
                                        onClick={() => { this.handleEditClinic() }}>
                                        <FormattedMessage id={'manage-clinic.edit'} />
                                    </button>
                                    :
                                    < button className={'btn-save-specialty'}
                                        onClick={() => { this.handleSaveNewClinic() }}>
                                        <FormattedMessage id={'manage-clinic.save'} />
                                    </button>
                                }
                            </div>


                        </div>
                        <div className='col-12 '>
                            <div className='title my-3'><FormattedMessage id="manage-clinic.title" /></div>
                            <TableManagerClinic
                                handleEditClinicFromPaentKey={this.handleEditClinicFromPaent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div >

                <HomeFooter />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinics: state.admin.clinics

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        editClinicRedux: (data) => dispatch(actions.editClinic(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
