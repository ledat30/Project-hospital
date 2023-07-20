import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePolicy.scss';
import * as actions from '../../../store/actions';


class TableManagePolicy extends Component {


    constructor(props) {
        super(props);
        this.state = {
            policyRedux: []
        }
    }



    componentDidMount() {
        this.props.fetchAllPolicyRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listPolicy !== this.props.listPolicy) {
            this.setState({
                policyRedux: this.props.listPolicy
            })
        }
    }

    handleDeletePolicy = (policy) => {
        this.props.deletePolicyRedux(policy.id);
    }

    handleEditPolicy = (policy) => {
        this.props.handleEditPolicyFromPaentKey(policy)
    }


    render() {
        let arrPolicy = this.state.policyRedux;
        return (
            <>
                <table id='TableManagePolicy'>
                    <tbody>
                        <tr>
                            <th>Chính sách - vi</th>
                            <th>Chính sách - en</th>
                            <th>Action</th>
                        </tr>
                        {arrPolicy && arrPolicy.length > 0 && arrPolicy.map((item, index) => {
                            return (
                                <tr key={index}>
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
                        })}
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listPolicy: state.admin.policies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPolicyRedux: () => dispatch(actions.fetchAllPolicyStart()),
        deletePolicyRedux: (id) => dispatch(actions.deletePolicy(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePolicy);
