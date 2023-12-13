import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import CategoryHandbook from '../containers/System/HandBook/CategoryHandbook';
import TableManagerDoctor from '../containers/System/Admin/TableManagerDoctor';
import TableManagePolicy from '../containers/System/Policy/TableManagePolicy';
import TableManageHandBook from '../containers/System/HandBook/TableManageHandBook';
import TableManagerSpecialty from '../containers/System/Specialty/TableManagerSpecialty';
import TableManagerClinic from '../containers/System/Clinic/TableManagerClinic';
import TableQuestion from '../containers/System/Question/TableQuestion';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import TableScheduleAdmin from '../containers/System/Doctor/TableScheduleAdmin';
import TableManageContact from '../containers/System/Contact/TableManageContact';
import ManageStatistical from '../containers/System/Statistical/ManageStatistical';

class System extends Component {
    render() {

        const { userRole } = this.props;
        const isUserAdmin = userRole === 1;
        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {isUserAdmin && (
                                <>
                                    <Route path="/system/user-redux" component={UserRedux} />
                                    <Route path="/system/manage-doctor" component={TableManagerDoctor} />
                                    <Route path="/system/create_edit" component={ManageDoctor} />
                                    <Route path="/system/manage-specialty" component={TableManagerSpecialty} />
                                    <Route path="/system/manage-clinic" component={TableManagerClinic} />
                                    <Route path="/system/manage-schedule" component={TableScheduleAdmin} />
                                    <Route path="/system/create-schedule" component={ManageSchedule} />
                                    <Route path="/system/manage-handbook" component={TableManageHandBook} />
                                    <Route path="/system/manage-contact" component={TableManageContact} />
                                    <Route path="/system/manage-question" component={TableQuestion} />
                                    <Route path="/system/manage-policy" component={TableManagePolicy} />
                                    <Route path="/system/manage-categoryhandbook" component={CategoryHandbook} />
                                    <Route path="/system/manage-statistical" component={ManageStatistical} />
                                </>
                            )}

                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userRole: state.user.userInfo.roleId
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
