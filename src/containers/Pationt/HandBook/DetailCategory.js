import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailCategoryById, getAllHandBook } from '../../../services/userService';
import _, { debounce } from 'lodash';
import { LANGUAGES } from '../../../utils';
import './DetailCategory.scss';
import { withRouter } from 'react-router';

class DetailCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailCategory: {},
            handbook: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailCategoryById({
                id: id
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let handbook = [];
                if (data && !_.isEmpty(res.data)) {
                    handbook = data.handBook;
                    if (handbook && handbook.length > 0) {
                        handbook = handbook.map(item => {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary');
                            return item;
                        })
                    }
                }
                this.setState({
                    dataDetailCategory: res.data,
                    handbook: handbook
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    returnToBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }

    handleViewDetailHandbook = (handBooks) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handBooks.id}`)
        }
    }

    handleInputChange = debounce(async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/search-handbook-web?q=${key}`)
            result = await result.json()
            if (result.errCode === 0) {
                this.setState({
                    handbook: result.results
                })
            } else {
                this.setState({
                    handbook: []
                })
            }
        } else {
            let id = this.props.match.params.id;
            let res = await getDetailCategoryById({ id: id });
            if (res && res.errCode === 0) {
                let data = res.data;
                let handbook = [];
                if (data && !_.isEmpty(res.data)) {
                    handbook = data.handBook;
                    if (handbook && handbook.length > 0) {
                        handbook = handbook.map(item => {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary');
                            return item;
                        })
                    }
                }
                this.setState({
                    dataDetailCategory: res.data,
                    handbook: handbook
                })
            }
        }
    }, 300)
    render() {
        let { dataDetailCategory, handbook } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-category-container'>
                <HeaderHome />
                <div className='body'>
                    <div className='category'>
                        <div className='top-detail-category'>
                            <div className='back' onClick={() => this.returnToBlog()}>
                                <i className="fas fa-reply"></i> <u><FormattedMessage id={'patient.detail-category.back'} /></u>
                            </div>
                            <div className="container-5">
                                <input type="search" id="search" placeholder="Search..."
                                    onChange={(e) => this.handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className='category-handbook'>
                            {dataDetailCategory && !_.isEmpty(dataDetailCategory)
                                &&
                                <div className='name-category'><FormattedMessage id={'patient.detail-category.category'} />{language === LANGUAGES.VI ? dataDetailCategory.nameVI : dataDetailCategory.nameEN}</div>
                            }
                        </div>
                        <div className='all-blogs'>
                            {handbook && handbook.length > 0 && handbook.map((item, index) => {
                                return (
                                    <div className='blogs' key={index}
                                        onClick={() => this.handleViewDetailHandbook(item)}
                                    >
                                        <div className='img-blogs'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        >
                                        </div>
                                        <div className='nd-blogs'>
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCategory));
