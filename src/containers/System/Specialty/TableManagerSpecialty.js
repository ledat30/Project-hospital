import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerSpecialty.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManagerSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            specialtyRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại

            name: '',
            previewImgURL: '',
            isOpen: false,
            descriptionHTML: '',
            descriptionMarkdown: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: '',
            name_en: '',
            specialtyEditId: '',
            avatar: '',

            editingSpecialty: null,
            creatingSpecialty: null,
        }
    }

    handleCreateSpecialty = () => {
        this.setState({
            name: '',
            name_en: '',
            previewImgURL: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            descriptionHTML_En: '',
            descriptionMarkdown_En: '',
            avatar: '',
            specialtyEditId: '',
            creatingSpecialty: {}
        });
    }

    handleCancel = () => {
        this.setState({
            creatingSpecialty: null,
        });
    }

    componentDidMount() {
        this.props.fetchSpecialtyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listSpecialty !== this.props.listSpecialty
        //     && this.state.specialtyRedux.length === 0) {
        //     this.setState({
        //         specialtyRedux: this.props.listSpecialty
        //     })
        // }
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                specialtyRedux: this.props.listSpecialty.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.specialtyRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                avatar: '',
                previewImgURL: '',
                descriptionHTML_En: '',
                descriptionMarkdown_En: '',
                name_en: '',
            })
        }
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id);
    }

    // handleEditSpecialty = (specialty) => {
    //     this.props.handleEditSpecialtyFromPaentKey(specialty)
    // }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-specialty?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    specialtyRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    specialtyRedux: this.props.listSpecialty,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                specialtyRedux: this.props.listSpecialty,
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
            descriptionMarkdown: text,
        })
    }

    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            descriptionHTML_En: html,
            descriptionMarkdown_En: text,
        })
    }

    handleOnchangInputViEdit = (e) => {
        this.setState({
            editingSpecialty: {
                ...this.state.editingSpecialty,
                name: e.target.value,
            }
        })
    }

    handleOnchangInputEnEdit = (e) => {
        this.setState({
            editingSpecialty: {
                ...this.state.editingSpecialty,
                name_en: e.target.value,
            }
        })
    }

    handleEditorChangeEdit = ({ html, text }) => {
        this.setState({
            editingSpecialty: {
                ...this.state.editingSpecialty,
                descriptionHTML: html,
                descriptionMarkdown: text,
            }
        })
    }

    handleEditorChangeEnEdit = ({ html, text }) => {
        this.setState({
            editingSpecialty: {
                ...this.state.editingSpecialty,
                descriptionHTML_En: html,
                descriptionMarkdown_En: text,
            }
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
        let res = await createNewSpecialty(this.state);

        if (res && res.errCode === 0) {
            toast.success('Add new specialty success!')
            this.props.fetchSpecialtyRedux();
        }
        this.setState({
            creatingSpecialty: null,
        })
    }

    handleCancelEdit = () => {
        this.setState({
            editingSpecialty: null,
        });
    }

    handleEditSpecialty = (specialty) => {
        this.setState({
            editingSpecialty: specialty,
            specialtyEditId: specialty.id,
        });
    }

    handleEditSpecialties = () => {
        this.props.editSpecialtyRedux({
            id: this.state.specialtyEditId,
            descriptionHTML: this.state.editingSpecialty.descriptionHTML,
            descriptionHTML_En: this.state.editingSpecialty.descriptionHTML_En,
            descriptionMarkdown: this.state.editingSpecialty.descriptionMarkdown,
            descriptionMarkdown_En: this.state.editingSpecialty.descriptionMarkdown_En,
            name: this.state.editingSpecialty.name,
            name_en: this.state.editingSpecialty.name_en,
            avatar: this.state.editingSpecialty.avatar
        });
        this.setState({
            editingSpecialty: null,
            specialtyEditId: '',
        });
    }



    render() {
        const { specialtyRedux, offset, perPage } = this.state;
        const pageCount = Math.ceil(specialtyRedux.length / perPage);
        const sliceSpecialty = specialtyRedux.slice(offset, offset + perPage);
        return (
            <>
                <div className='manage-specilty-container'>
                    {this.state.creatingSpecialty && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-specialty.title1'} /></div>

                            <div className='add-new-specialty row'>
                                <div className='col-5 form-group'>
                                    <label><FormattedMessage id={'manage-specialty.name'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingSpecialty.name}
                                        onChange={(e) => this.handleOnchangInputVi(e, 'name')}
                                    />
                                </div>
                                <div className='col-5 form-group'>
                                    <label><FormattedMessage id={'manage-specialty.name_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.creatingSpecialty.name_en}
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
                                        value={this.state.creatingSpecialty.descriptionMarkdown}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage-specialty.Describe_en'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEn}
                                        value={this.state.creatingSpecialty.descriptionMarkdown_En}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleSaveNewSpecialty() }}>
                                            <FormattedMessage id={'manage-specialty.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancel}><FormattedMessage id={'patient.booking-modal.cancel'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </>
                    )}

                    {this.state.editingSpecialty && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage-specialty.title2'} /></div>

                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-specialty.name'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingSpecialty.name}
                                        onChange={(e) => this.handleOnchangInputViEdit(e, 'name')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage-specialty.name_en'} /></label>
                                    <input className='form-control' type='text'
                                        value={this.state.editingSpecialty.name_en}
                                        onChange={(e) => this.handleOnchangInputEnEdit(e, 'name_en')}
                                    />
                                </div>
                                {/* <div className='col-2 form-group'>
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
                                    <label><FormattedMessage id={'manage-specialty.Describe'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEdit}
                                        value={this.state.editingSpecialty.descriptionMarkdown}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage-specialty.Describe_en'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEnEdit}
                                        value={this.state.editingSpecialty.descriptionMarkdown_En}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleEditSpecialties() }}>
                                            <FormattedMessage id={'manage-specialty.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancelEdit}><FormattedMessage id={'patient.booking-modal.cancel'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </>
                    )}
                    <div className='title mt-10'><FormattedMessage id="manage-specialty.title" /></div>
                    <button className='btn-save-policy' onClick={this.handleCreateSpecialty}><FormattedMessage id={'manage-specialty.SAVE'} /></button>
                    <input type='' className='search-user-box' placeholder='Search specialty ...'
                        onChange={(e) => this.searchHandle(e)}
                    />
                    <table id='TableManagerSpecialty'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th><FormattedMessage id={'manage-specialty.name'} /></th>
                                <th><FormattedMessage id={'manage-specialty.name_en'} /></th>
                                <th><FormattedMessage id={'manage-user.action'} /></th>
                            </tr>
                            {sliceSpecialty && sliceSpecialty.length > 0 ? sliceSpecialty.map((item, index) => {
                                const rowIndex = offset + index + 1;
                                return (
                                    <tr key={index}>
                                        <td>{rowIndex}</td>
                                        <td>{item.name}</td>
                                        <td>{item.name_en}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditSpecialty(item)}>
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteSpecialty(item)}>
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
        listSpecialty: state.admin.specialty,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id)),
        editSpecialtyRedux: (data) => dispatch(actions.editSpecialty(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerSpecialty);
