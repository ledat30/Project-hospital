import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageStatistical.scss';
import HomeFooter from '../../HomePage/HomeFooter';
import { LANGUAGES } from '../../../utils';

class ManageStatistical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAppointments: null,
            totalCompletedAppointments: null,
            totalCancelledAppointments: null,
            totalScheduleConfirmed: null,
            totalUser: null,
            totalAdmin: null,
            totalDoctor: null,
            totalPatient: null,
            handbooks: [],
            doctor: [],
            bookingTotal: {
                totalsByDate: []
            }
        };
    }

    async componentDidMount() {
        await this.fetchData();
        await this.fetchDataUser();
        await this.fetchHandbooks();
        await this.fetchDoctor();
        await this.fetchDataBookingTotal();

        var myCanvas = document.getElementById("myCanvas");
        myCanvas.width = 300;
        myCanvas.height = 300;
        myCanvas.getContext("2d");
        var myVinyls = {
            "Đã khám": this.state.totalCompletedAppointments,
            "Đã huỷ": this.state.totalCancelledAppointments,
        };
        var Piechart = function (options) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;
            this.draw = function () {
                var total_value = 0;
                var color_index = 0;
                for (var categ in this.options.data) {
                    var val = this.options.data[categ];
                    total_value += val;
                }
                var start_angle = 0;
                for (categ in this.options.data) {
                    val = this.options.data[categ];
                    var slice_angle = 2 * Math.PI * val / total_value;
                    this.drawPieSlice(
                        this.ctx,
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        Math.min(this.canvas.width / 2, this.canvas.height / 2),
                        start_angle,
                        start_angle + slice_angle,
                        this.colors[color_index % this.colors.length]
                    );
                    start_angle += slice_angle;
                    color_index++;
                }
                if (this.options.doughnutHoleSize) {
                    this.drawPieSlice(
                        this.ctx,
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
                        0,
                        2 * Math.PI,
                        "#ff0000"
                    );
                }
                start_angle = 0;
                for (categ in this.options.data) {
                    val = this.options.data[categ];
                    slice_angle = 2 * Math.PI * val / total_value;
                    var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
                    var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                    var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
                    if (this.options.doughnutHoleSize) {
                        var offset = (pieRadius * this.options.doughnutHoleSize) / 2;
                        labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                        labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
                    }
                    var labelText = Math.round(100 * val / total_value);
                    this.ctx.fillStyle = "white";
                    this.ctx.font = "bold 20px Arial";
                    this.ctx.fillText(labelText + "%", labelX, labelY);
                    start_angle += slice_angle;
                }
                if (this.options.legend) {
                    color_index = 0;
                    var legendHTML = "";
                    for (categ in this.options.data) {
                        legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + categ + "</div>";
                    }
                    this.options.legend.innerHTML = legendHTML;
                }
            };
            this.drawPieSlice = function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fill();
            };
        };
        var myPiechart = new Piechart(
            {
                canvas: myCanvas,
                data: myVinyls,
                colors: ["#fde23e", "#f16e23"],
                doughnutHoleSize: 0.5
            }
        );
        myPiechart.draw();
        var myLegend = document.getElementById("myLegend");
        var myDougnutChart = new Piechart(
            {
                canvas: myCanvas,
                data: myVinyls,
                colors: ["#fde23e", "#f16e23"],
                legend: myLegend
            }
        );
        myDougnutChart.draw();
    }

    fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/total-appointments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Request failed with status code ' + response.status);
            }
            const data = await response.json();
            this.setState({
                totalAppointments: data.totalAppointments,
                totalCompletedAppointments: data.totalCompletedAppointments,
                totalCancelledAppointments: data.totalCancelledAppointments,
                totalScheduleConfirmed: data.totalScheduleConfirmed
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchDataUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/total-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Request failed with status code ' + response.status);
            }
            const data = await response.json();
            this.setState({
                totalUser: data.totalAll,
                totalAdmin: data.totalAdmin,
                totalDoctor: data.totalDoctor,
                totalPatient: data.totalPatinet
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchHandbooks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/topView-handbook', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            this.setState({
                handbooks: data,
            })
        } catch (error) {
            console.error(error);
        }
    };

    fetchDoctor = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/topView-doctor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            this.setState({
                doctor: data,
            })
        } catch (error) {
            console.error(error);
        }
    };

    fetchDataBookingTotal = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/booking-total', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            this.setState({
                bookingTotal: data,
            })
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {
            totalAppointments, totalCompletedAppointments, totalCancelledAppointments, totalScheduleConfirmed, totalAdmin, totalUser, totalDoctor, totalPatient, handbooks, doctor, bookingTotal } = this.state;
        console.log('check booking total', bookingTotal)
        let { language } = this.props;
        return (
            <>
                <div className='manage-statistical-container'>
                    <div className='ms-title'>
                        <FormattedMessage id={'statistical.title'} />
                    </div>
                    <div>
                        <table id='TableManagerStatistical'>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id={'statistical.total'} /></th>
                                    <th><FormattedMessage id={'statistical.cf'} /></th>
                                    <th><FormattedMessage id={'statistical.confirm'} /></th>
                                    <th><FormattedMessage id={'statistical.cancel'} /></th>
                                </tr>
                                <tr>
                                    <td>{totalAppointments}</td>
                                    <td>{totalScheduleConfirmed}</td>
                                    <td>{totalCompletedAppointments}</td>
                                    <td>{totalCancelledAppointments}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='title_table'>
                            <FormattedMessage id={'statistical.table1'} />
                        </div>
                    </div>

                    {/* chart */}
                    <div className='contaiern'>
                        <div className='left_chart'>
                            <div className='tron'>
                                <canvas id="myCanvas"></canvas>
                                <div className='text-tron'>
                                    <div id="myLegend"></div>
                                </div>
                            </div>
                            <div className='title_bieudo'>
                                <FormattedMessage id={'statistical.table2'} />
                            </div>
                        </div>
                        <div className='right_chart'>
                            <div className='right-left'>
                                <div className='title_hb'>
                                    <FormattedMessage id={'statistical.bv'} />
                                </div>
                                <div className='content_view'>
                                    {handbooks && handbooks.length > 0 && handbooks.map((item, index) => {
                                        return (
                                            <div className='contents' key={index}>
                                                {language === LANGUAGES.VI ? item.title : item.title_en} <br /> " <FormattedMessage id={'patient.handbook.view1'} />{item.count} <FormattedMessage id={'patient.handbook.view2'} /> "
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                            <div className='right-right'>
                                <div className='title_dt'>
                                    <FormattedMessage id={'statistical.bs'} />
                                </div>
                                <div className='content_view'>
                                    {doctor && doctor.length > 0 && doctor.map((item, index) => {
                                        return (
                                            <div className='contents' key={index}>
                                                {item.fullName} : {item.Doctor_infor.count} <FormattedMessage id={'patient.handbook.view1'} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='title_table'>
                            <FormattedMessage id={'statistical.table3'} />
                        </div>
                        <table id='TableManagerStatistical'>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id={'statistical.all'} /></th>
                                    <th><FormattedMessage id={'statistical.admin'} /></th>
                                    <th><FormattedMessage id={'statistical.doctor'} /></th>
                                    <th><FormattedMessage id={'statistical.patient'} /></th>
                                </tr>
                                <tr>
                                    <td>{totalUser}</td>
                                    <td>{totalAdmin}</td>
                                    <td>{totalDoctor}</td>
                                    <td>{totalPatient}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='boder'></div>
                    <div>
                        <div className='title_table_'>
                            <FormattedMessage id={'statistical.table4'} />
                        </div>
                        <input type='' className='search-doctor-box' placeholder='Search...' />
                        <table id='TableManagerStatistical'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th><FormattedMessage id={'statistical.date'} /></th>
                                    <th><FormattedMessage id={'statistical.doanhthu'} /></th>
                                    <th><FormattedMessage id={'statistical.detail'} /></th>
                                </tr>
                                {bookingTotal && bookingTotal.totalsByDate.length > 0 && bookingTotal.totalsByDate.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.date}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <button className='btn detail'>
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='chart_doanhthu'>
                        <div className="circle">
                            {bookingTotal.totalsByDate.formattedOverallTotal}
                        </div>
                        <div className='title_table'>
                            <FormattedMessage id={'statistical.total2'} />
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
// live_968991148_B7JMGRNmgrunCLmcuLv9bQkrqbsVux
export default connect(mapStateToProps)(ManageStatistical);