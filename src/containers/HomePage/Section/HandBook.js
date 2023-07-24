import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';

class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandBook: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topHandbookRedux !== this.props.topHandbookRedux) {
            this.setState({
                dataHandBook: this.props.topHandbookRedux
            })
        }
    }

    async componentDidMount() {
        this.props.loadTopHandBooks();
    }

    handleViewDetailHandBook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }

    }
    returnToblog = () => {
        if (this.props.history) {
            this.props.history.push(`/all-category`)
        }
    }
    render() {
        let allHandBook = this.state.dataHandBook;
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={'homepage.handbook'} /></span>
                        <button className='btn-section' onClick={() => this.returnToblog()}><FormattedMessage id={'homepage.see-hb'} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {allHandBook && allHandBook.length > 0 &&
                                allHandBook.map((item, index) => {
                                    return (
                                        <div className='section-customize hb-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailHandBook(item)}
                                        >
                                            <div className='bg-image section-handbook'
                                                style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='handbook-title'>{item.title}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topHandbookRedux: state.admin.topHandbook,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopHandBooks: () => dispatch(actions.fetchTopHandbook())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
