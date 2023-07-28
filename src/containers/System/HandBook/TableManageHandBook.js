import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHandBook.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';


class TableManageHandBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            handBookRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchAllHandBookRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook
            && this.state.handBookRedux.length === 0) {
            this.setState({
                handBookRedux: this.props.listHandBook
            })
        }
    }

    handleDeleteHandbook = (handbook) => {
        this.props.deleteHandBookRedux(handbook.id);
    }

    handleEditHandbook = (handbook) => {
        this.props.handleEditHandBookFromPaentKey(handbook)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-handbook?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    handBookRedux: result.results
                })
            } else {
                this.setState({
                    handBookRedux: this.props.listHandBook
                })
            }
        } else {
            this.setState({
                handBookRedux: this.props.listHandBook
            })
        }
    }, 300)

    render() {
        let arrHandBook = this.state.handBookRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search handbook ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManageHandBook'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage-handbook.Title'} /></th>
                            <th><FormattedMessage id={'manage-handbook.Action'} /></th>
                        </tr>
                        {arrHandBook && arrHandBook.length > 0 && arrHandBook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditHandbook(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteHandbook(item)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listHandBook: state.admin.handbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHandBookRedux: () => dispatch(actions.fetchAllHandBookStart()),
        deleteHandBookRedux: (id) => dispatch(actions.deleteHB(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandBook);
