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
            arrHandBook: [],
            dataDetailCategory: {},
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
                let arrHandBook = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.Handbooks;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrHandBook.push(item.categoryId)
                        })
                    }
                }
                this.setState({
                    dataDetailCategory: res.data,
                    arrHandBook: arrHandBook
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
        let { dataDetailCategory, arrHandBook } = this.state;
        console.log('check data detail category', this.state)
        return (
            <div className='detail-category-container'>
                <HeaderHome />
                <div className='body'>
                    <div className='category'>
                        <div className='top-detail-category'>
                            <div className='back' onClick={() => this.returnToBlog()}>
                                <i className="fas fa-reply"></i> <u>Quay lại</u>
                            </div>
                            <div className="container-5">
                                <input type="search" id="search" placeholder="Search..." />
                                <button className="icon"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className='all-blogs'>
                            {arrHandBook && arrHandBook.length > 0 &&
                                arrHandBook.map((item, index) => {
                                    return (
                                        <div className='blogs' key={index}>
                                            <div className='img-blogs'
                                                style={{
                                                    backgroundImage: `url(${item.image})`
                                                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCategory);
