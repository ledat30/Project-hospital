import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePolicy.scss';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewPolicy } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManagePolicy from './TableManagePolicy';
import * as actions from '../../../store/actions';
import HomeFooter from '../../HomePage/HomeFooter';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagePolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameVI: '',
            nameEN: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            policyEditId: '',
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.listPolicy !== this.props.listPolicy) {
            this.setState({
                nameVI: '',
                nameEN: '',
                contentHTMLVi: '',
                contentMarkdownVi: '',
                contentHTMLEn: '',
                contentMarkdownEn: '',
                action: CRUD_ACTIONS.CREATE,
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

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['nameVI', 'nameEN', 'contentHTMLVi', 'contentHTMLEn',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveNewPolicy = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        let res = await createNewPolicy(this.state);

        if (res && res.errCode === 0 && CRUD_ACTIONS.CREATE) {
            toast.success('Add new policy success!')
        }
        this.props.fetchAllPolicyRedux();
    }

    handleEditHandBook = () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editPolicyRedux({
                id: this.state.policyEditId,
                contentHTMLVi: this.state.contentHTMLVi,
                contentMarkdownVi: this.state.contentMarkdownVi,
                contentHTMLEn: this.state.contentHTMLEn,
                contentMarkdownEn: this.state.contentMarkdownEn,
                nameEN: this.state.nameEN,
                nameVI: this.state.nameVI,
            })
        }
        this.props.fetchAllPolicyRedux();
    }

    handleEditPolicyFromPaent = (policy) => {
        this.setState({
            nameEN: policy.nameEN,
            nameVI: policy.nameVI,
            contentHTMLVi: policy.contentHTMLVi,
            contentMarkdownVi: policy.contentMarkdownVi,
            contentHTMLEn: policy.contentHTMLEn,
            contentMarkdownEn: policy.contentMarkdownEn,
            action: CRUD_ACTIONS.EDIT,
            policyEditId: policy.id
        })
    }

    render() {

        return (
            <>
                <div className='manage-specilty-container'>
                    <div className='ms-title'><FormattedMessage id={'manage_policy.title1'} /></div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage_policy.name1'} /></label>
                            <input className='form-control' type='text' value={this.state.nameVI}
                                onChange={(e) => this.handleOnchangInputVi(e, 'nameVI')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={'manage_policy.name2'} /></label>
                            <input className='form-control' type='text' value={this.state.nameEN}
                                onChange={(e) => this.handleOnchangInputEn(e, 'nameEN')}
                            />
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id={'manage_policy.Description_Vi'} /></label>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChangeVi}
                                value={this.state.contentMarkdownVi}
                            />
                        </div>
                        <div className='col-12 mt-4'>
                            <label><FormattedMessage id={'manage_policy.Description_En'} /></label>
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
                                        <FormattedMessage id={'manage_policy.edit'} />
                                    </button>
                                    :
                                    < button className={'btn-save-specialty'}
                                        onClick={() => { this.handleSaveNewPolicy() }}>
                                        <FormattedMessage id={'manage_policy.save'} />
                                    </button>
                                }
                            </div>

                        </div>

                        <div className='col-12'>
                            <div className='title my-3'><FormattedMessage id="manage_policy.title" /></div>
                            <TableManagePolicy
                                handleEditPolicyFromPaentKey={this.handleEditPolicyFromPaent}
                                action={this.state.action}
                            />
                        </div>

                    </div>
                </div>

                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listPolicy: state.admin.policies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
        editPolicyRedux: (data) => dispatch(actions.editPolicy(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePolicy);
