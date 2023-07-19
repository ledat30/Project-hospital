import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllHandBook } from '../../../services/userService';
import { withRouter } from 'react-router';

class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandBook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandBook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandBook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandBook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }

    }
    render() {
        let { dataHandBook } = this.state;
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={'homepage.handbook'} /></span>
                        <button className='btn-section'><FormattedMessage id={'homepage.see-hb'} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandBook && dataHandBook.length > 0 &&
                                dataHandBook.map((item, index) => {
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
