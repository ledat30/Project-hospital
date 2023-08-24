import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerClinic.scss';
import './ManageClinic.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinics } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManagerClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            clinicRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại

            name: '',
            previewImgURL: '',
            isOpen: false,
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            avatar: '',
            clinicEditId: '',
            name_en: '',
            address_en: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: '',

            editingClinic: null,
            creatingClinic: null,
        }
    }



    componentDidMount() {
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listClinics !== this.props.listClinics
        //     && this.state.clinicRedux.length === 0) {
        //     this.setState({
        //         clinicRedux: this.props.listClinics
        //     })
        // }
        if (prevProps.listClinics !== this.props.listClinics) {
            this.setState({
                clinicRedux: this.props.listClinics.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.clinicRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
    }

    // handleEditClinic = (clinic) => {
    //     this.props.handleEditClinicFromPaentKey(clinic)
    // }

    handleCancelEdit = () => {
        this.setState({
            editingClinic: null,
        });
    }

    handleEditClinic = (clinic) => {
        this.setState({
            editingClinic: clinic,
            clinicEditId: clinic.id,
        });
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-clinic?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    clinicRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    clinicRedux: this.props.listClinics,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                clinicRedux: this.props.listClinics,
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

    handleCancel = () => {
        this.setState({
            creatingClinic: null,
        });
    }

    handleCreateClinic = () => {
        this.setState({
            name: '',
            previewImgURL: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: '',
            avatar: '',
            clinicEditId: '',
            name_en: '',
            address_en: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: '',
            creatingClinic: {}
        });
    }

    handleOnchangInputName = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangInputNameEn = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            descriptionHTML_En: html,
            descriptionMarkdown_En: text,
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

        if (res && res.errCode === 0) {
            toast.success(<FormattedMessage id={'toast.toast5'} />)
            this.props.fetchClinicRedux();
        }
        this.setState({
            creatingClinic: null,
        })
    }

    handleOnchangInputNameEdit = (e) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                name: e.target.value,
            }
        })
    }
    handleOnchangInputNameEnEdit = (e) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                name_en: e.target.value,
            }
        })
    }

    handleOnchangInputAddress = (e) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                address: e.target.value,
            }
        })
    }

    handleOnchangInputAddressEn = (e) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                address_en: e.target.value,
            }
        })
    }

    handleEditorChangeEdit = ({ html, text }) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                descriptionHTML: html,
                descriptionMarkdown: text,
            }
        })
    }

    handleEditorChangeEnEdit = ({ html, text }) => {
        this.setState({
            editingClinic: {
                ...this.state.editingClinic,
                descriptionHTML_En: html,
                descriptionMarkdown_En: text,
            }
        })
    }

    handleEditClinics = () => {
        this.props.editClinicRedux({
            id: this.state.clinicEditId,
            descriptionHTML: this.state.editingClinic.descriptionHTML,
            descriptionHTML_En: this.state.editingClinic.descriptionHTML_En,
            descriptionMarkdown: this.state.editingClinic.descriptionMarkdown,
            descriptionMarkdown_En: this.state.editingClinic.descriptionMarkdown_En,
            name: this.state.editingClinic.name,
            name_en: this.state.editingClinic.name_en,
            avatar: this.state.editingClinic.avatar,
            address: this.state.editingClinic.address,
            address_en: this.state.editingClinic.address_en,
        });
        this.setState({
            editingClinic: null,
            clinicEditId: '',
        });
    }

    render() {
        const { clinicRedux, offset, perPage, currentPage } = this.state;
        const pageCount = Math.ceil(clinicRedux.length / perPage);
        const sliceClinic = clinicRedux.slice(offset, offset + perPage);
        return (
            <>
                <div className='manage-specilty-container'>
                    {this.state.creatingClinic && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-clinic.title1'} /> </div>

                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.name'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingClinic.name}
                                        onChange={(e) => this.handleOnchangInputName(e, 'name')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.name_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.creatingClinic.name_en}
                                        onChange={(e) => this.handleOnchangInputNameEn(e, 'name_en')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.address'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingClinic.address}
                                        onChange={(e) => this.handleOnchangInputName(e, 'address')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.address_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.creatingClinic.address_en}
                                        onChange={(e) => this.handleOnchangInputNameEn(e, 'address_en')}
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
                                        value={this.state.creatingClinic.descriptionMarkdown}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id="manage-clinic.Describe-en" /></label>
                                    <MdEditor style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEn}
                                        value={this.state.creatingClinic.descriptionMarkdown_En}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleSaveNewClinic() }}>
                                            <FormattedMessage id={'manage-clinic.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancel}><FormattedMessage id={'patient.booking-modal.cancel'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </>
                    )}
                    {this.state.editingClinic && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-clinic.title2'} /> </div>

                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.name'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingClinic.name}
                                        onChange={(e) => this.handleOnchangInputNameEdit(e, 'name')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.name_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.editingClinic.name_en}
                                        onChange={(e) => this.handleOnchangInputNameEnEdit(e, 'name_en')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.address'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingClinic.address}
                                        onChange={(e) => this.handleOnchangInputAddress(e, 'address')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-clinic.address_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.editingClinic.address_en}
                                        onChange={(e) => this.handleOnchangInputAddressEn(e, 'address_en')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id="manage-clinic.Describe" /></label>
                                    <MdEditor style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEdit}
                                        value={this.state.editingClinic.descriptionMarkdown}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id="manage-clinic.Describe-en" /></label>
                                    <MdEditor style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEnEdit}
                                        value={this.state.editingClinic.descriptionMarkdown_En}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleEditClinics() }}>
                                            <FormattedMessage id={'manage-clinic.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancelEdit}><FormattedMessage id={'patient.booking-modal.cancel'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='title mt-10'><FormattedMessage id="manage-clinic.title" /></div>
                    <button className='btn-save-policy' onClick={this.handleCreateClinic}><FormattedMessage id={'manage-clinic.create'} /></button>
                    <input type='' className='search-user-box' placeholder='Search clinic ...'
                        onChange={(e) => this.searchHandle(e)}
                    />
                    <table id='TableManagerClinic'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th><FormattedMessage id={'manage-clinic.name'} /></th>
                                <th><FormattedMessage id={'manage-clinic.name_en'} /></th>
                                <th><FormattedMessage id={'manage-user.action'} /></th>
                            </tr>
                            {sliceClinic && sliceClinic.length > 0 ? sliceClinic.map((item, index) => {
                                const rowIndex = offset + index + 1;
                                return (
                                    <tr key={index}>
                                        <td>{rowIndex}</td>
                                        <td>{item.name}</td>
                                        <td>{item.name_en}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditClinic(item)}>
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteClinic(item)}>
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
        deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id)),
        editClinicRedux: (data) => dispatch(actions.editClinic(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerClinic);
