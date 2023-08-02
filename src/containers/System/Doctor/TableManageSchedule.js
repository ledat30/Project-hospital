import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSchedule.scss';
import * as actions from '../../../store/actions';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';


class TableManageSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }



    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }




    render() {


        return (
            <>
                <div className='col-12'>
                    <div className='title3 mt-10'><FormattedMessage id="menu.doctor.title" /></div>
                    <input type='' className='search-doctor-box' placeholder='Search schedule ...'
                        onChange={(e) => this.searchHandle(e)}
                    />
                    <table id='TableManagerDoctor'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th><FormattedMessage id={'admin.manage-doctor.name'} /></th>
                                <th>Email</th>
                                <th><FormattedMessage id={'admin.manage-doctor.address'} /></th>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSchedule);
