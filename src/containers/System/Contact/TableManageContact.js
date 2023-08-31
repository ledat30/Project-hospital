import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import '../../System/Admin/TableManagerDoctor.scss';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';

class TableManageContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactRedux: [],
            offset: 0,
            perPage: 10,
            currentPage: 0,
        }
    }
    async componentDidMount() {
        this.props.fetchContactRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.language !== prevProps.language) {
        }

        if (prevProps.listContact !== this.props.listContact) {
            const sortedContactRedux = this.props.listContact.sort((a, b) => b.id - a.id); // Sắp xếp danh sách contact theo id giảm dần
            this.setState({
                contactRedux: sortedContactRedux,
            }, () => {
                const newPageCount = Math.ceil(sortedContactRedux.length / this.state.perPage);
                if (this.state.currentPage >= newPageCount) {
                    this.setState({
                        currentPage: 0,
                        offset: 0,
                    });
                }
            });
        }
    }


    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
        });
    };

    handleDeleteContact = (contact) => {
        this.props.deleteContactRedux(contact.id);
        const updatedContactRedux = this.state.contactRedux.filter(item => item.id !== contact.id);
        this.setState({
            contactRedux: updatedContactRedux,
            currentPage: 0,
            offset: 0,
        });
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-contact?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    contactRedux: result.results,
                    currentPage: 0,
                })
            } else {
                this.setState({
                    contactRedux: this.props.listContact,
                    currentPage: 0,
                })
            }
        } else {
            this.setState({
                contactRedux: this.props.listContact,
                currentPage: 0,
            })
        }
    }, 300)

    render() {
        let { contactRedux, offset, perPage } = this.state;
        const pageCount = Math.ceil(contactRedux.length / perPage);
        const sliceUsers = contactRedux.slice(offset, offset + perPage);
        return (
            <div className='col-12'>
                <div className='title3 mt-10'><FormattedMessage id="manage-contact.title" /></div>
                <input type='' className='search-doctor-box' placeholder='Search contact ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagerDoctor'>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th><FormattedMessage id={'admin.manage-doctor.name'} /></th>
                            <th>Email</th>
                            <th><FormattedMessage id={'manage-contact.message'} /></th>
                            <th><FormattedMessage id={'admin.manage-doctor.action'} /></th>
                        </tr>
                        {sliceUsers && sliceUsers.length > 0 ? sliceUsers.map((item, index) => {
                            const rowIndex = offset + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{rowIndex}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteContact(item)}>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listContact: state.admin.contact
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchContactRedux: () => dispatch(actions.fetchAllContact()),
        deleteContactRedux: (id) => dispatch(actions.deleteContacts(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageContact);
