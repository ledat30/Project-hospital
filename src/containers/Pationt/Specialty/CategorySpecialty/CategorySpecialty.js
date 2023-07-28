import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategorySpecialty.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getSpecialty } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { debounce } from 'lodash';

class CategorySpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        }

    }


    async componentDidMount() {
        let specialties = await getSpecialty();
        if (specialties && specialties.errCode === 0 && this.state.dataSpecialty.length === 0) {
            this.setState({
                dataSpecialty: specialties.data ? specialties.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-specialty-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    dataSpecialty: result.results
                })
            } else {
                this.setState({
                    dataSpecialty: []
                })
            }
        } else {
            let specialties = await getSpecialty();
            if (specialties && specialties.errCode === 0) {
                this.setState({
                    dataSpecialty: specialties.data ? specialties.data : []
                })
            }
        }
    }, 300)

    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className='container-specialty'>
                <HeaderHome />
                <div className='search-specialty'>
                    <input type='' id="search"
                        onChange={(e) => this.handleInputChange(e)}
                        placeholder="Search..." />
                </div>


                <div className='body-specialty'>
                    <div className='title-specialty'>
                        <FormattedMessage id={'patient.specialy.title'} />
                    </div>
                    <div className='all-specialty'>
                        {dataSpecialty && dataSpecialty.length > 0 ? dataSpecialty.map((item, index) => {
                            return (
                                <div className='specialty' key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div className='left-img-specialty'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    >
                                    </div>
                                    <div className='right-nd-specialty'>
                                        <div>{item.name}</div>
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
            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(CategorySpecialty);
