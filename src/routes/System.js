import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHandBook from '../containers/System/HandBook/ManageHandBook';
import ManagePolicy from '../containers/System/Policy/ManagePolicy';
import CategoryHandbook from '../containers/System/HandBook/CategoryHandbook';
import TableManagerDoctor from '../containers/System/Admin/TableManagerDoctor';
import TableManagePolicy from '../containers/System/Policy/TableManagePolicy';
import TableManageHandBook from '../containers/System/HandBook/TableManageHandBook';
import TableManagerSpecialty from '../containers/System/Specialty/TableManagerSpecialty';
import TableManagerClinic from '../containers/System/Clinic/TableManagerClinic';
class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={TableManagerDoctor} />
                            <Route path="/system/create_edit" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={TableManagerSpecialty} />
                            <Route path="/system/manage-clinic" component={TableManagerClinic} />
                            <Route path="/system/manage-handbook" component={TableManageHandBook} />
                            <Route path="/system/manage-policy" component={TableManagePolicy} />
                            <Route path="/system/manage-categoryhandbook" component={CategoryHandbook} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
