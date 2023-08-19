import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePolicy.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import { createNewPolicy } from '../../../services/userService';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManagePolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            policyRedux: [],
            offset: 0, // Vị trí bắt đầu lấy dữ liệu từ danh sách user
            perPage: 5, // Số lượng user hiển thị trên mỗi trang
            currentPage: 0, // Trang hiện tại
            editingPolicy: null,
            creatingPolicy: null,
            nameVI: '',
            nameEN: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            policyEditId: '',
        }
    }

    handleCreatePolicy = () => {
        this.setState({
            nameVI: '',
            nameEN: '',
            contentHTMLVi: '',
            contentMarkdownVi: '',
            contentHTMLEn: '',
            contentMarkdownEn: '',
            creatingPolicy: {}
        });
    }

    handleChangeVi = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeViEdit = (e, id) => {
        this.setState({
            editingPolicy: {
                ...this.state.editingPolicy,
                nameVI: e.target.value,
            }
        })
    }
    handleChangeEnEdit = (e, id) => {
        this.setState({
            editingPolicy: {
                ...this.state.editingPolicy,
                nameEN: e.target.value,
            }
        })
    }

    handleChangeEn = (e, id) => {
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

    handleEditorChangeViEdit = ({ html, text }) => {
        this.setState({
            editingPolicy: {
                ...this.state.editingPolicy,
                contentHTMLVi: html,
                contentMarkdownVi: text,
            }
        })
    }

    handleEditorChangeEnEdit = ({ html, text }) => {
        this.setState({
            editingPolicy: {
                ...this.state.editingPolicy,
                contentHTMLEn: html,
                contentMarkdownEn: text,
            }
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
        let arrCheck = ['nameVI', 'nameEN', 'contentHTMLVi', 'contentHTMLEn'];
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
        let res = await createNewPolicy(this.state);

        if (res && res.errCode === 0) {
            toast.success('Add new policy success!');
            this.props.fetchAllPolicyRedux();
        }
        this.setState({
            creatingPolicy: null,
        });

    }

    handleCancelAdd = () => {
        this.setState({
            creatingPolicy: null
        });
    }

    handleEditPolicy = (policy) => {
        this.setState({
            editingPolicy: policy,
            policyEditId: policy.id,
        });
    }

    handleUpdatePolicy = () => {
        this.props.editPolicyRedux({
            id: this.state.policyEditId,
            contentHTMLVi: this.state.editingPolicy.contentHTMLVi,
            contentMarkdownVi: this.state.editingPolicy.contentMarkdownVi,
            contentHTMLEn: this.state.editingPolicy.contentHTMLEn,
            contentMarkdownEn: this.state.editingPolicy.contentMarkdownEn,
            nameEN: this.state.editingPolicy.nameEN,
            nameVI: this.state.editingPolicy.nameVI,
        })
        this.setState({
            editingPolicy: null,
            policyEditId: '',
        })
    }

    handleCancel = () => {
        this.setState({
            editingPolicy: null,
        });
    }


    componentDidMount() {
        this.props.fetchAllPolicyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listPolicy !== this.props.listPolicy) {
            this.setState({
                policyRedux: this.props.listPolicy.sort((a, b) => a.id - b.id),
            }, () => {
                const newPageCount = Math.ceil(this.state.policyRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                    });
                }
            });
        }
        if (prevProps.listPolicy !== this.props.listPolicy) {
            this.setState({
                nameVI: '',
                nameEN: '',
                contentHTMLVi: '',
                contentMarkdownVi: '',
                contentHTMLEn: '',
                contentMarkdownEn: '',
            })
        }
    }

    handleDeletePolicy = (policy) => {
        this.props.deletePolicyRedux(policy.id);
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-policy?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    policyRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    policyRedux: this.props.listPolicy,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                policyRedux: this.props.listPolicy,
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

    render() {
        const { policyRedux, offset, perPage } = this.state;
        const pageCount = Math.ceil(policyRedux.length / perPage);
        const slicePolicy = policyRedux.slice(offset, offset + perPage);

        return (
            <>
                <div className='manage-specilty-container'>

                    {this.state.creatingPolicy && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage_policy.title1'} /></div>
                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage_policy.name1'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingPolicy.nameVI}
                                        onChange={(e) => this.handleChangeVi(e, 'nameVI')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage_policy.name2'} /></label>
                                    <input className='form-control' type='text' value={this.state.creatingPolicy.nameEN}
                                        onChange={(e) => this.handleChangeEn(e, 'nameEN')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage_policy.Description_Vi'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeVi}
                                        value={this.state.creatingPolicy.contentMarkdownVi}
                                    />
                                </div>
                                <div className='col-12 mt-4'>
                                    <label><FormattedMessage id={'manage_policy.Description_En'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEn}
                                        value={this.state.creatingPolicy.contentMarkdownEn}
                                    />
                                </div>
                                <div className='col-12'>
                                    <div>
                                        < button className={'btn-save-specialty'}
                                            onClick={() => { this.handleSaveNewPolicy() }}>
                                            <FormattedMessage id={'manage_policy.save'} />
                                        </button>
                                        <button className={'btn_cancel'} onClick={this.handleCancelAdd}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}

                    {this.state.editingPolicy && (
                        <>
                            <div className='ms-title'><FormattedMessage id={'manage_policy.title2'} /></div>
                            <div className='add-new-specialty row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage_policy.name1'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingPolicy.nameVI}
                                        onChange={(e) => this.handleChangeViEdit(e, 'nameVI')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id={'manage_policy.name2'} /></label>
                                    <input className='form-control' type='text' value={this.state.editingPolicy.nameEN}
                                        onChange={(e) => this.handleChangeEnEdit(e, 'nameEN')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id={'manage_policy.Description_Vi'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeViEdit}
                                        value={this.state.editingPolicy.contentMarkdownVi}
                                    />
                                </div>
                                <div className='col-12 mt-4'>
                                    <label><FormattedMessage id={'manage_policy.Description_En'} /></label>
                                    <MdEditor style={{ height: '350px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChangeEnEdit}
                                        value={this.state.editingPolicy.contentMarkdownEn}
                                    />
                                </div>
                                <div className='col-12'>
                                    < button className={"btn-btn-warning"}
                                        onClick={() => { this.handleUpdatePolicy() }}>
                                        <FormattedMessage id={'manage_policy.edit'} />
                                    </button>
                                    <button className={'btn_cancel'} onClick={this.handleCancel}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
                                </div>
                            </div>
                        </>
                    )}

                    <div className='title mt-10'><FormattedMessage id="manage_policy.title" /></div>
                    <button className='btn-save-policy' onClick={this.handleCreatePolicy}><FormattedMessage id={'manage_policy.create'} /></button>
                    <input type='' className='search-user-box' placeholder='Search policy ...'
                        onChange={(e) => this.searchHandle(e)}
                    />
                    <table id='TableManagePolicy'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th><FormattedMessage id={'manage_policy.name1'} /></th>
                                <th><FormattedMessage id={'manage_policy.name2'} /></th>
                                <th><FormattedMessage id={'manage_policy.action'} /></th>
                            </tr>
                            {slicePolicy && slicePolicy.length > 0 ? slicePolicy.map((item, index) => {
                                const rowIndex = offset + index + 1;
                                return (
                                    <tr key={index}>
                                        <td>{rowIndex}</td>
                                        <td>{item.nameVI}</td>
                                        <td>{item.nameEN}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditPolicy(item)}>
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeletePolicy(item)}>
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
        listPolicy: state.admin.policies,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
        deletePolicyRedux: (id) => dispatch(actions.deletePolicy(id)),
        editPolicyRedux: (data) => dispatch(actions.editPolicy(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePolicy);
