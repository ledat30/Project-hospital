import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageHandBook.scss';
import * as actions from '../../../store/actions';


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
        if (prevProps.listHandBook !== this.props.listHandBook) {
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


    render() {
        let arrHandBook = this.state.handBookRedux;
        console.log('check arrhandbook', arrHandBook)
        return (
            <>
                <table id='TableManageHandBook'>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
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