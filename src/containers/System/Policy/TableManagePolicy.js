import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagePolicy.scss';
import * as actions from '../../../store/actions';
import { debounce } from 'lodash';


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
        if (prevProps.listPolicy !== this.props.listPolicy
            && this.state.policyRedux.length === 0) {
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


    searchHandle = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-policy?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    policyRedux: result.results
                })
            } else {
                this.setState({
                    policyRedux: this.props.listPolicy
                })
            }
        } else {
            this.setState({
                policyRedux: this.props.listPolicy
            })
        }
    }, 300)

    render() {
        let arrPolicy = this.state.policyRedux;
        return (
            <>
                <input type='' className='search-user-box' placeholder='Search policy ...'
                    onChange={(e) => this.searchHandle(e)}
                />
                <table id='TableManagePolicy'>
                    <tbody>
                        <tr>
                            <th><FormattedMessage id={'manage_policy.name1'} /></th>
                            <th><FormattedMessage id={'manage_policy.name2'} /></th>
                            <th><FormattedMessage id={'manage_policy.action'} /></th>
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
