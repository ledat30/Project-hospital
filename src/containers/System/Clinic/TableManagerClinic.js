import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerClinic.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';


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
        if (prevProps.listClinics !== this.props.listClinics
            && this.state.clinicRedux.length === 0) {
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

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-clinic?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    clinicRedux: result.results
                })
            } else {
                this.setState({
                    clinicRedux: this.props.listClinics
                })
            }
        } else {
            this.setState({
                clinicRedux: this.props.listClinics
            })
        }
    }, 300)

    render() {
        let arrClinic = this.state.clinicRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search clinic ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagerClinic'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage-user.fullName'} /></th>
                            <th><FormattedMessage id={'manage-user.address'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {arrClinic && arrClinic.length > 0 ? arrClinic.map((item, index) => {
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
                        })
                            :
                            (
                                <b><FormattedMessage id={'patient.detail-category.tb'} /></b>
                            )
                        }
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
