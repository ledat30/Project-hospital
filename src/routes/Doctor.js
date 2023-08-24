import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManagePatinet from '../containers/System/Doctor/ManagePatinet';
import TableManageSchedule from '../containers/System/Doctor/TableManageSchedule';
import ManageScheduleDoctor from '../containers/System/Doctor/ManageScheduleDoctor';


class Doctor extends Component {
    render() {

        return (
            <>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={TableManageSchedule} />
                            <Route path="/doctor/create-schedule" component={ManageScheduleDoctor} />
                            <Route path="/doctor/manage-patient" component={ManagePatinet} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
