import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AllCategory.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllCategoryHandbook, getAllHandBook } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class AllCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataCategory: [],
            dataHandbook: []
        }
    }

    async componentDidMount() {
        let res = await getAllCategoryHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataCategory: res.data ? res.data : []
            })
        }

        let handbooks = await getAllHandBook();
        if (handbooks && handbooks.errCode === 0) {
            this.setState({
                dataHandbook: handbooks.data ? handbooks.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleViewDetailCategory = (category) => {
        if (this.props.history) {
            this.props.history.push(`/deatil-category/${category.id}`)
        }
    }

    handleViewDetailHandbook = (handBook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handBook.id}`)
        }
    }

    render() {
        let { dataCategory } = this.state;
        let { dataHandbook } = this.state;
        let { language } = this.props;
        return (
            <div className='all-categort-container'>
                <HeaderHome />
                <div className='all-categort-body'>
                    <div className='main'>
                        <div className='ct-left'>
                            <div className='title-ct'><FormattedMessage id={'patient.handbook.title_handbook'} /></div>
                            <div className='all-ct'>
                                {dataCategory && dataCategory.length > 0 && dataCategory.map((item, index) => {
                                    return (
                                        <div className='ct' key={index}
                                            onClick={() => this.handleViewDetailCategory(item)} >
                                            <div className='text-ct'>{language === LANGUAGES.VI ? item.nameVI : item.nameEN} </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div className='ct-right'>
                            <div className="container-4">
                                <input type="search" id="search" placeholder="Search..." />
                                <button className="icon"><i className="fa fa-search"></i></button>
                            </div>
                            <div className='all-blog'>
                                {dataHandbook && dataHandbook.length > 0 && dataHandbook.map((item, index) => {
                                    return (
                                        <div className='blog' key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className='img-blog'
                                                style={{ backgroundImage: `url(${item.image})` }}>
                                            </div>
                                            <div className='nd-blog'>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
