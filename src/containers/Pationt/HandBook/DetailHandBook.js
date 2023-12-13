import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailHandBook.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailHandBookById, getAllCategoryHandbook, getAllHandBook } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class DetailHandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandBook: {},
            dataCategory: [],
            dataHandBook: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandBookById({
                id: id
            });

            this.setState({
                dataDetailHandBook: res.data
            })
        }

        let res = await getAllCategoryHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataCategory: res.data ? res.data : []
            })
        }

        let handbook = await getAllHandBook();
        if (handbook && handbook.errCode === 0) {
            this.setState({
                dataHandBook: handbook.data ? handbook.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let id = this.props.match.params.id;
            let res = await getDetailHandBookById({
                id: id
            });

            this.setState({
                dataDetailHandBook: res.data
            })
        }
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandBookById({
                id: id
            });

            this.setState({
                dataDetailHandBook: res.data
            })
        }
    }

    returnToBlog = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }

    handleViewDetailCategory = (category) => {
        if (this.props.history) {
            this.props.history.push(`/deatil-category/${category.id}`)
        }
    }
    render() {
        let { dataDetailHandBook, dataCategory } = this.state;
        let randomHandBooks = _.sampleSize(this.state.dataHandBook, 4);
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-deatilhandbook-body'>
                    <div className='description-specialty'>
                        <div className='back' onClick={() => this.returnToBlog()}>
                            <i className="fas fa-reply"></i> <u><FormattedMessage id={'patient.detail-category.back'} /></u>
                        </div>
                        {dataDetailHandBook && !_.isEmpty(dataDetailHandBook)
                            &&
                            <>
                                <div className='date'>
                                    <p className='date1'><FormattedMessage id={'patient.handbook.date'} />{dataDetailHandBook.createdAt ? new Date(dataDetailHandBook.createdAt).toLocaleDateString() : null}</p>
                                    <p><FormattedMessage id={'patient.handbook.date1'} />{dataDetailHandBook.updatedAt ? new Date(dataDetailHandBook.updatedAt).toLocaleDateString() : null}</p>
                                </div>
                                <div className='title-HB'>{language === LANGUAGES.VI ? dataDetailHandBook.title : dataDetailHandBook.title_en}
                                </div>
                                <div className='view'>
                                    <b ><FormattedMessage id={'patient.handbook.view1'} />:    {dataDetailHandBook.count} <FormattedMessage id={'patient.handbook.view2'} /></b>
                                </div>
                                <div dangerouslySetInnerHTML={language === LANGUAGES.VI ?
                                    { __html: dataDetailHandBook.contentHTMLVi }
                                    :
                                    { __html: dataDetailHandBook.contentHTMLEn }}>
                                </div>
                            </>

                        }

                    </div>

                    <div className='container-tag'>
                        <div className='title-tag'><FormattedMessage id={'patient.handbook.category'} /></div>
                        <div className='containers'>
                            {dataCategory && dataCategory.length > 0 && dataCategory.map((item, index) => {
                                return (
                                    <div className='tag_category' key={index}
                                        onClick={() => this.handleViewDetailCategory(item)}>
                                        # {language === LANGUAGES.VI ? item.nameVI : item.nameEN}</div>
                                )
                            })}
                        </div>
                    </div>


                    <div className='container-related-blogs'>
                        <div className='title-related-blogs'>
                            <FormattedMessage id={'patient.handbook.blog'} />
                        </div>
                        <div className='main'>
                            {randomHandBooks && randomHandBooks.length > 0 && randomHandBooks.map((item, index) => {
                                return (
                                    <Link to={`/detail-handbook/${item.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        <div className='containe' key={index}>
                                            <div className='image-random'
                                                style={{ backgroundImage: `url(${item.image})` }}>
                                            </div>
                                            <div className='title-random'> {language === LANGUAGES.VI ? item.title : item.title_en} </div>
                                        </div>
                                    </Link>
                                )
                            })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailHandBook));
