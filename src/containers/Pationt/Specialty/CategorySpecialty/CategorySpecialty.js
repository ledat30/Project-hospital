import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './CategorySpecialty.scss';
import HomeFooter from '../../../HomePage/HomeFooter';
import HeaderHome from '../../../HomePage/HeaderHome';
import { getSpecialty } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { searchUsers } from '../../../../services/userService';
//
import axios from 'axios';

class CategorySpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            query: '',
            results: [],
        }

    }


    async componentDidMount() {
        let specialties = await getSpecialty();
        if (specialties && specialties.errCode === 0) {
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


    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = async () => {
        const { query } = this.state;
        const results = await searchUsers(query);
        this.setState({ results });
    };


    render() {
        let { dataSpecialty, query, results } = this.state;
        console.log('check rs', results)
        return (
            <div className='container-specialty'>
                <HeaderHome />
                <div className='search-specialty'>
                    <input type='' id="search"
                        value={query}
                        onChange={(e) => this.handleInputChange(e)}
                        placeholder="Search..." />
                    <button className='btn-search' onClick={this.handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                    <ul>
                        {results && results.length > 0 ? (
                            results.map((product, i) => <li key={i}>{product.name}</li>)
                        ) : (
                            <li>Không tìm thấy kết quả phù hợp</li>
                        )}
                    </ul>
                </div>
                {/* <div className='body-search'>
                    <div className='title-search'>
                        <FormattedMessage id={'patient.specialy.tiitle1'} />
                    </div>
                    <div className='all-search'>
                        {searchResults && searchResults.length > 0 ? (
                            searchResults.map((item, index) => {
                                return (
                                    <div className='search1' key={index}>
                                        <div className='left-img-search'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        >
                                        </div>
                                        <div className='right-nd-search'>
                                            <div>{item.name}</div>
                                        </div>
                                    </div>
                                )
                            }
                            ))
                            :
                            (
                                <li>Không tìm thấy kết quả phù hợp</li>
                            )
                        }
                    </div>
                </div> */}


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
                                <li>Không tìm thấy kết quả phù hợp</li>
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
