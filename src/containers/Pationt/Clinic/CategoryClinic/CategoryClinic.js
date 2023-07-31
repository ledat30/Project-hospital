import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategoryClinic.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getClinic } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { debounce } from 'lodash';

class CategoryClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let clinic = await getClinic();
        if (clinic && clinic.errCode === 0 && this.state.dataClinic.length === 0) {
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

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-clinic-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataClinic: result.results
                })
            } else {
                this.setState({
                    dataClinic: []
                })
            }
        } else {
            let clinic = await getClinic();
            if (clinic && clinic.errCode === 0) {
                this.setState({
                    dataClinic: clinic.data ? clinic.data : []
                })
            }
        }
    }, 300)

    render() {
        let { dataClinic } = this.state;
        let { language } = this.props;
        return (
            <div className='container-specialty'>
                <HeaderHome />
                <div className='search-specialty'>
                    <input type='search' id="search" placeholder="Search..."
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </div>
                <div className='body-specialty'>
                    <div className='title-specialty'>
                        <FormattedMessage id={'patient.clinic.title'} />
                    </div>
                    <div className='all-specialty'>
                        {dataClinic && dataClinic.length > 0 ? dataClinic.map((item, index) => {
                            return (
                                <div className='specialty' key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div className='left-img-clinic'
                                        style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'contain ', backgroundColor: 'white' }}
                                    >
                                    </div>
                                    <div className='right-nd-specialty'>
                                        <div style={{ padding: "7px 0" }}>
                                            {
                                                language === LANGUAGES.VI ? item.name : item.name_en
                                            }
                                        </div>
                                        <div><FormattedMessage id={'patient.clinic.address'} />  {
                                            language === LANGUAGES.VI ? item.address : item.address_en
                                        }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            :
                            (
                                <li><FormattedMessage id={'patient.detail-category.tb'} /></li>
                            )
                        }
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
