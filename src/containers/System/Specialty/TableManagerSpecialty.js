import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerSpecialty.scss';
import * as actions from '../../../store/actions';


class TableManagerSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            specialtyRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchSpecialtyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                specialtyRedux: this.props.listSpecialty
            })
        }
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromPaentKey(user)
    }

    handlePageClick = () => {

    }
    render() {
        let arrSpecialty = this.state.specialtyRedux;
        return (
            <>
                <table id='TableManagerSpecialty'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Action</th> 
                        </tr>
                        {arrSpecialty && arrSpecialty.length > 0 && arrSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteSpecialty(item)}>
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
        listSpecialty: state.admin.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerSpecialty);
