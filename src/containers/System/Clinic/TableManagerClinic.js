import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerClinic.scss';
import * as actions from '../../../store/actions';


class TableManagerClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            clinicRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchClinicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinics !== this.props.listClinics) {
            this.setState({
                clinicRedux: this.props.listClinics
            })
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id);
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromPaentKey(clinic)
    }

    handlePageClick = () => {

    }
    render() {
        let arrClinic = this.state.clinicRedux;
        return (
            <>
                <table id='TableManagerClinic'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrClinic && arrClinic.length > 0 && arrClinic.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
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
                        })}
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listClinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerClinic);
