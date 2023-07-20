import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategoryHandbook.scss';
import Lightbox from 'react-image-lightbox';
import { CRUD_ACTIONS } from '../../../utils';
import { createNewCategoryHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableCategory from './TableCategory';
import * as actions from '../../../store/actions';

class CategoryHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameVI: '',
            nameEN: '',
            CategoryHandbookEditId: '',
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.listCategory !== this.props.listCategory) {
            this.setState({
                nameEN: '',
                nameVI: '',
                // action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnchangInputVI = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangInputEN = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['nameVI', 'nameEN']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveNewCategory = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        let res = await createNewCategoryHandbook(this.state);

        if (res && res.errCode === 0) {
            toast.success('Add new category success!')
        }
        this.props.fetchAllCategoryHandBookRedux();
    }

    handleEditHandBook = () => {
        // let { action } = this.state;
        // if (action === CRUD_ACTIONS.EDIT) {
        //     this.props.editHandBookRedux({
        //         id: this.state.handbookEditId,
        //         contentHTMLVi: this.state.contentHTMLVi,
        //         contentMarkdownVi: this.state.contentMarkdownVi,
        //         contentHTMLEn: this.state.contentHTMLEn,
        //         contentMarkdownEn: this.state.contentMarkdownEn,
        //         title: this.state.title,
        //         avatar: this.state.avatar,
        //     })
        // }
        // this.props.fetchAllHandBookRedux();
    }

    handleEditHandBookFromPaent = (handbook) => {
        // this.setState({
        //     title: handbook.title,
        //     contentHTMLVi: handbook.contentHTMLVi,
        //     contentMarkdownVi: handbook.contentMarkdownVi,
        //     contentHTMLEn: handbook.contentHTMLEn,
        //     contentMarkdownEn: handbook.contentMarkdownEn,
        //     avatar: '',
        //     previewImgURL: imageBase64,
        //     action: CRUD_ACTIONS.EDIT,
        //     handbookEditId: handbook.id
        // })
    }

    render() {

        return (
            <div className='manage-specilty-container'>
                <div className='ms-title'>Quản lý danh mục cẩm nang</div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên danh mục -vi </label>
                        <input className='form-control' type='text' value={this.state.nameVI}
                            onChange={(e) => this.handleOnchangInputVI(e, 'nameVI')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Tên danh mục -en </label>
                        <input className='form-control' type='text' value={this.state.nameEN}
                            onChange={(e) => this.handleOnchangInputEN(e, 'nameEN')}
                        />
                    </div>
                    <div className='col-12'>
                        <div>
                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                < button className={"btn-btn-warning"}
                                    onClick={() => { this.handleEditHandBook() }}>
                                    <FormattedMessage id={'manage-handbook.ed'} />
                                </button>
                                :
                                < button className={'btn-save-specialty'}
                                    onClick={() => { this.handleSaveNewCategory() }}>
                                    <FormattedMessage id={'manage-handbook.SV'} />
                                </button>
                            }
                        </div>

                    </div>

                    <div className='col-12 mb-5'>
                        <div className='title my-3'><FormattedMessage id="manage-handbook.tl" /></div>
                        <TableCategory
                        // handleEditHandBookFromPaentKey={this.handleEditHandBookFromPaent}
                        // action={this.state.action}
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
        listCategory: state.admin.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategoryHandBookRedux: () => dispatch(actions.fetchAllCategoryHBStart()),
        editHandBookRedux: (data) => dispatch(actions.editHandBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHandbook);
