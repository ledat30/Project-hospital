import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategoryDoctor.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getAllDoctors } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { debounce } from 'lodash';

class CategoryDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: []
        }
    }
    async componentDidMount() {
        let doctors = await getAllDoctors();
        if (doctors && doctors.errCode === 0 && this.state.dataDoctor.length === 0) {
            this.setState({
                dataDoctor: doctors.data ? doctors.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-doctor-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataDoctor: result.results
                })
            } else {
                this.setState({
                    dataDoctor: []
                })
            }
        } else {
            let doctors = await getAllDoctors();
            if (doctors && doctors.errCode === 0) {
                this.setState({
                    dataDoctor: doctors.data ? doctors.data : []
                })
            }
        }
    }, 300)

    render() {
        let { dataDoctor } = this.state;
        let { language } = this.props;
        return (
            <div className='container-doctor'>
                <HeaderHome />
                <div className='search-doctors'>
                    <input type='search' id="search" placeholder="Search..."
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </div>
                <div className='body-doctor'>
                    <div className='title-doctor'>
                        <FormattedMessage id={'patient.doctors.title'} />
                    </div>
                    <div className='all-doctor'>
                        {dataDoctor && dataDoctor.length > 0 && dataDoctor.map((item, index) => {
                            let nameVi = item.positionData ? `${item.positionData.valueVi}, ${item.fullName}` : item.fullName;
                            let nameEn = item.positionData ? `${item.positionData.valueEn}, ${item.fullName}` : item.fullName;
                            return (
                                <div className='doctors' key={index}
                                    onClick={() => this.handleViewDetailDoctor(item)}>
                                    <div className='left-img-doctors'
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className='right-nd-doctors'>
                                        <div className='text'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        <div className='text'><FormattedMessage id={'patient.doctors.sdt'} /> {item.phonenumber}</div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDoctor);
