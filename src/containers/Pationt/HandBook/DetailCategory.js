import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailCategoryById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import './DetailCategory.scss';

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
                    let arr = data.handBook;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            handbook.push(item.categoryId)
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
    render() {
        let { dataDetailCategory, handbook } = this.state;
        console.log('check data detail category', this.state)
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
                                <input type="search" id="search" placeholder="Search..." />
                                <button className="icon"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className='category-handbook'>
                            {dataDetailCategory && !_.isEmpty(dataDetailCategory)
                                &&
                                <div className='name-category'><FormattedMessage id={'patient.detail-category.category'} />{language === LANGUAGES.VI ? dataDetailCategory.nameVI : dataDetailCategory.nameEN}</div>
                            }
                        </div>
                        <div className='all-blogs'>
                            {handbook && handbook.language > 0 && handbook.map((item, index) => {
                                return (
                                    <div className='blogs' >
                                        <div className='img-blogs'

                                        >
                                        </div>
                                        <div className='nd-blogs'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategory);
