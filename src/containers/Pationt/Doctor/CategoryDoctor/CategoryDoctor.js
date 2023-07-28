import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategoryDoctor.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getAllDoctors } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';

class CategoryDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: []
        }
    }
    async componentDidMount() {
        let doctors = await getAllDoctors();
        if (doctors && doctors.errCode === 0) {
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

    render() {
        let { dataDoctor } = this.state;
        console.log('check doctor', dataDoctor)
        let { language } = this.props;
        return (
            <div className='container-doctor'>
                <HeaderHome />
                <div className='search-doctors'>
                    <input type='search' id="search" placeholder="Search..." />
                    <button className='btn-search'>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className='body-doctor'>
                    <div className='title-doctor'>
                        <FormattedMessage id={'patient.doctors.title'} />
                    </div>
                    <div className='all-doctor'>
                        {dataDoctor && dataDoctor.length > 0 && dataDoctor.map((item, index) => {
                            let nameVi = `${item.positionData.valueVi},${item.fullName}`;
                            let nameEn = `${item.positionData.valueEn},${item.fullName}`;
                            return (
                                <div className='doctors' key={index}
                                    onClick={() => this.handleViewDetailDoctor(item)}>
                                    <div className='left-img-doctors'
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className='right-nd-doctors'>
                                        <div className='text'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        <div className='text'>{item.Doctor_infor.nameClinic}</div>
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
