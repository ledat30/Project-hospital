import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty, createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imagaBase64: '',
            isOpen: false,
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: ''
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnchangInput = (e, id) => {
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

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                imagaBase64: base64
                // avatar: base64
            })
        }
    }
    openPreviewImg = () => {
        if (!this.state.imagaBase64) return;
        this.setState({
            isOpen: true
        })
    }


    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic success!')
            this.setState({
                name: '',
                imagaBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Add new specialty error!')
            console.log('res', res)
        }
    }
    render() {

        return (
            <div className='manage-specilty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>

                <div className='add-new-specialty row'>
                    <div className='col-5 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(e) => this.handleOnchangInput(e, 'name')}
                        />
                    </div>
                    <div className='col-5 form-group'>
                        <label>Địa chỉ </label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(e) => this.handleOnchangInput(e, 'address')}
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
                                style={{ backgroundImage: `url(${this.state.imagaBase64})` }}
                                onClick={() => this.openPreviewImg()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty' onClick={() => { this.handleSaveNewClinic() }}>
                            Lưu
                        </button>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imagaBase64}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
