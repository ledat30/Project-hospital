import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailPolicy.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailPolicyById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailPolicy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailPolicy: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailPolicyById({
                id: id
            });
            this.setState({
                dataDetailPolicy: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }


    render() {
        let { dataDetailPolicy } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-sepcialty-body'>
                    <div className='description-specialty'>
                        {dataDetailPolicy && !_.isEmpty(dataDetailPolicy)
                            &&
                            <>
                                <div className='title-policy'>{language === LANGUAGES.VI ? dataDetailPolicy.nameVI : dataDetailPolicy.nameEN}</div>
                                <div dangerouslySetInnerHTML={language === LANGUAGES.VI ?
                                    { __html: dataDetailPolicy.contentHTMLVi }
                                    :
                                    { __html: dataDetailPolicy.contentHTMLEn }}>
                                </div>
                            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailPolicy);
