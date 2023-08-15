import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import Select from 'react-select';
import TableManagerDoctor from './TableManagerDoctor';
import HomeFooter from '../../HomePage/HomeFooter';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentMarkdown_en: '',
            contentHTML: '',
            contentHTML_en: '',
            selectedDoctor: '',
            description: '',
            description_en: '',
            listDoctors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            nameClinic_en: '',
            addressClinic: '',
            addressClinic_en: '',
            note: '',
            note_en: '',
            clinicId: '',
            specialtyId: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getAllRequiredDoctorInfor()
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.fullName}`;
                    let labelEn = `${item.fullName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `;
                    let labelEn = `${item.valueEn} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.name}`;
                    let labelEn = `${item.name_en}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.name}`;
                    let labelEn = `${item.name_en}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resCLinic } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resCLinic, 'CLINIC')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince, resSpecialty, resCLinic } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resCLinic, 'CLINIC')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            contentMarkdown_en: text,
            contentHTML_en: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentHTML_en: this.state.contentHTML_en,
            contentMarkdown_en: this.state.contentMarkdown_en,
            contentMarkdown: this.state.contentMarkdown,
            description_en: this.state.description_en,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            nameClinic_en: this.state.nameClinic_en,
            addressClinic: this.state.addressClinic,
            addressClinic_en: this.state.addressClinic_en,
            note: this.state.note,
            note_en: this.state.note_en,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        })
        this.setState({
            doctorId: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false,
            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedPayment: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            contentMarkdown_en: '',
            contentHTML_en: '',
            note_en: '',
            nameClinic_en: '',
            addressClinic_en: '',
            description_en: ''
        })
        this.props.history.push('/system/manage-doctor');
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listProvince, listPrice, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Doctor_infor) {
            let markdown = res.data.Doctor_infor;

            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '',
                specialtyId = '', clinicId = '', provinceId = '', selectedPayment = '', selectedPrice = '', nameClinic_en = '', addressClinic_en = '', note_en = '',
                selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if (res.data.Doctor_infor) {
                addressClinic = res.data.Doctor_infor.addressClinic;
                addressClinic_en = res.data.Doctor_infor.addressClinic_en;
                nameClinic = res.data.Doctor_infor.nameClinic;
                nameClinic_en = res.data.Doctor_infor.nameClinic_en;
                note = res.data.Doctor_infor.note;
                note_en = res.data.Doctor_infor.note_en;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;
                specialtyId = res.data.Doctor_infor.specialtyId;
                clinicId = res.data.Doctor_infor.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })

            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                description_en: markdown.description_en,
                contentHTML_en: markdown.contentHTML_en,
                contentMarkdown_en: markdown.contentMarkdown_en,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                addressClinic_en: addressClinic_en,
                nameClinic_en: nameClinic_en,
                note_en: note_en,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                contentHTML_en: '',
                contentMarkdown_en: '',
                note_en: '',
                nameClinic_en: '',
                addressClinic_en: '',
                description_en: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeTextEn = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='doctor-title'><FormattedMessage id={'admin.manage-doctor.title'} /></div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.choose'} /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.choose'} />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.specialty'} /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.specialty'} />}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.clinic'} /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.clinic'} />}
                                name='selectedClinic'
                            />
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.price'} /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.price'} />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.payment'} /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.payment'} />}
                                name='selectedPayment'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.province'} /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id={'admin.manage-doctor.province'} />}
                                name='selectedProvince'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.name_clinic'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.name_clinic1'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeTextEn(event, 'nameClinic_en')}
                                value={this.state.nameClinic_en}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.address_clinic'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                                value={this.state.addressClinic} />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.address_clinic1'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeTextEn(event, 'addressClinic_en')}
                                value={this.state.addressClinic_en} />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.note'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'note')}
                                value={this.state.note} />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id={'admin.manage-doctor.note1'} /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeTextEn(event, 'note_en')}
                                value={this.state.note_en} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 intro '>
                            <label><FormattedMessage id={'admin.manage-doctor.Introduction_information'} /></label>
                            <textarea className='form-control' rows={4}//rows={4}
                                onChange={(event) => this.handleOnchangeText(event, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 intro '>
                            <label><FormattedMessage id={'admin.manage-doctor.Introduction_information1'} /></label>
                            <textarea className='form-control' rows={4}//rows={4}
                                onChange={(event) => this.handleOnchangeTextEn(event, 'description_en')}
                                value={this.state.description_en}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <label><FormattedMessage id={'admin.manage-doctor.content'} /></label>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />

                    </div>
                    <div className='manage-doctor-editor'>
                        <label><FormattedMessage id={'admin.manage-doctor.content1'} /></label>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChangeEn}
                            value={this.state.contentMarkdown_en} />

                    </div>
                    <button onClick={() => this.handleSaveContentMarkdown()}
                        className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                        {hasOldData === true ?
                            <span><FormattedMessage id={'admin.manage-doctor.save_information'} />
                            </span> : <span><FormattedMessage id={'admin.manage-doctor.Create_information'} /></span>
                        }
                    </button>
                </div >
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
