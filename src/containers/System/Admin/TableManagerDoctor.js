import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerDoctor.scss';
import * as actions from '../../../store/actions';

class TableManagerDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            doctorRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            this.setState({
                doctorRedux: this.props.listDoctor
            })
        }
    }

    handleDeleteDoctor = (allDoctors) => {
        this.props.deleteDoctorRedux(allDoctors.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromPaentKey(user)
    }

    handlePageClick = () => {

    }
    render() {
        let arrDoctor = this.state.doctorRedux;
        console.log('check doctor', arrDoctor)
        return (
            <>
                <table id='TableManagerDoctor'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'admin.manage-doctor.name'}/></th>
                            <th><FormattedMessage id={'admin.manage-doctor.name_clinic'}/></th>
                            <th><FormattedMessage id={'admin.manage-doctor.address_clinic'}/></th>
                            <th><FormattedMessage id={'admin.manage-doctor.action'}/></th>
                        </tr>
                        {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.fullName}</td>
                                    <td>{item.Doctor_infor.nameClinic}</td>
                                    <td>{item.Doctor_infor.addressClinic}</td>
                                    <td>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteDoctor(item)}>
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
        listDoctor: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        deleteDoctorRedux: (id) => dispatch(actions.deleteDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerDoctor);
