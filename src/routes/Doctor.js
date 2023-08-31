import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManagePatinet from '../containers/System/Doctor/ManagePatinet';
import TableManageSchedule from '../containers/System/Doctor/TableManageSchedule';
import ManageScheduleDoctor from '../containers/System/Doctor/ManageScheduleDoctor';
import ProfileDoctor from '../containers/System/Doctor/Profile/ProfileDoctor';

class Doctor extends Component {
    render() {
        const { userRole } = this.props;
        const isUserDoctor = userRole === 2;
        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {isUserDoctor && (
                                <>
                                    <Route path="/doctor/manage-schedule" component={TableManageSchedule} />
                                    <Route path="/doctor/create-schedule" component={ManageScheduleDoctor} />
                                    <Route path="/doctor/manage-patient" component={ManagePatinet} />
                                    <Route path="/doctor/manage-profile" component={ProfileDoctor} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
