import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategoryClinic.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getClinic } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';

class CategoryClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let clinic = await getClinic();
        if (clinic && clinic.errCode === 0) {
            this.setState({
                dataClinic: clinic.data ? clinic.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let { dataClinic } = this.state;
        console.log('check data clinic', dataClinic)
        return (
            <div className='container-specialty'>
                <HeaderHome />
                <div className='search-specialty'>
                    <input type='search' id="search" placeholder="Search..." />
                </div>
                <div className='body-specialty'>
                    <div className='title-specialty'>
                        <FormattedMessage id={'patient.clinic.title'} />
                    </div>
                    <div className='all-specialty'>
                        {dataClinic && dataClinic.length > 0 && dataClinic.map((item, index) => {
                            return (
                                <div className='specialty' key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div className='left-img-clinic'
                                        style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'contain ', backgroundColor: 'white' }}
                                    >
                                    </div>
                                    <div className='right-nd-specialty'>
                                        <div style={{ padding: "7px 0" }}>{item.name}</div>
                                        <div><FormattedMessage id={'patient.clinic.address'} />  {item.address}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryClinic);
