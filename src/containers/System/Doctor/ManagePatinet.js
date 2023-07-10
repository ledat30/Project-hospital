import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatinet.scss';
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatinet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnchangeDetaPicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {

        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý lịch khám
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-2 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker onChange={this.handleOnchangeDetaPicker}
                            className="form-control"
                            value={this.state.currentDate}
                        // minDate={yesterday}
                        />
                    </div>
                    <div className='col-12'>
                        <table id="customers">
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatinet);
