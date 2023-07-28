import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerSpecialty.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';


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
        if (prevProps.listSpecialty !== this.props.listSpecialty
            && this.state.specialtyRedux.length === 0) {
            this.setState({
                specialtyRedux: this.props.listSpecialty
            })
        }
    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id);
    }

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialtyFromPaentKey(specialty)
    }

    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-specialty?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    specialtyRedux: result.results
                })
            } else {
                this.setState({
                    specialtyRedux: this.props.listSpecialty
                })
            }
        } else {
            this.setState({
                specialtyRedux: this.props.listSpecialty
            })
        }
    }, 300)

    render() {
        let arrSpecialty = this.state.specialtyRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search specialty ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagerSpecialty'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage-specialty.name'} /></th>
                            <th><FormattedMessage id={'manage-user.action'} /></th>
                        </tr>
                        {arrSpecialty && arrSpecialty.length > 0 ? arrSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditSpecialty(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteSpecialty(item)}>
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
