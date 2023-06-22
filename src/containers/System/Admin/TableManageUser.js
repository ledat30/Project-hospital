import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}




class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromPaentKey(user)
    }
    render() {
        let arrUser = this.state.userRedux;
        return (
            <>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                        {arrUser && arrUser.length > 0 && arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.fullName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}>
                                            <i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
