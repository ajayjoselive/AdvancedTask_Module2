import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Form } from 'semantic-ui-react'

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const visaStatus = props.visaStatus ?
            Object.assign({}, props.visaStatus)
            : "";

        const visaExpiryDate = props.visaExpiryDate ?
            Object.assign({}, props.visaExpiryDate)
            : "";

        this.state = {
            newvisaStatus: visaStatus,
            newvisaExpiryDate: visaExpiryDate,
            showEditSection: false,
            visaOptions: [
                {
                    key: 'citizen',
                    text: 'Citizen',
                    value: 'citizen',
                },
                {
                    key: 'permanent resident',
                    text: 'Permanent Resident',
                    value: 'permanent resident',
                },
                {
                    key: 'work visa',
                    text: 'Work Visa',
                    value: 'work visa',
                },
                {
                    key: 'student visa',
                    text: 'Student Visa',
                    value: 'student visa',
                }

            ]
        }

        this.changevalue = this.changevalue.bind(this);
        this.checkValidation = this.checkValidation.bind(this)
        this.savevisaStatus = this.savevisaStatus.bind(this)
        this.savevisaStatuswithDate = this.savevisaStatuswithDate.bind(this)
    }

    changevalue(value) {



        this.state = {
            visaStatus: value
        }



        if (value === 'work visa' || value === 'student visa') {

            this.setState({
                IsEnabled: true,
            })

            this.setState({
                showEditSection: true,
            })

        }
        else {

            this.setState({
                showEditSection: true,

            })
        }


    }
    checkValidation() {

        if ((this.state.visaStatus === "" || this.state.visaStatus === null)) {
            TalentUtil.notification.show("Please select visaStatus .", "error", null, null)
            return false
        } else if (this.state.visaStatus === 'work visa' || this.state.visaStatus === 'student visa') {
            if (this.state.visaExpiryDate === "dd/mm/yyyy" || this.state.visaExpiryDate === undefined) {
                TalentUtil.notification.show("Please select Visa Expiry Date .", "error", null, null)
                return false
            } else {
                return true
            }
        }

        else {
            return true
        }
    }
    savevisaStatus() {
        if (this.checkValidation()) {

            this.props.saveProfileData({ visaStatus: this.props.visaStatus, visaExpiryDate: this.props.visaExpiryDate });
            this.props.updateProfileData({ visaStatus: this.props.visaStatus, visaExpiryDate: this.props.visaExpiryDate });
        }

    }

    savevisaStatuswithDate() {
        if (this.checkValidation()) {

            if (this.state.visaStatus === 'work visa' || this.state.visaStatus === 'student visa') {
                this.props.saveProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: this.state.visaExpiryDate });
                this.props.updateProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: this.state.visaExpiryDate });
            }
            else {
                this.props.saveProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: '' });
                this.props.updateProfileData({ visaStatus: this.state.visaStatus, visaExpiryDate: '' });
            }
        }
    }

    renderDisplay() {

        let current_datetime = new Date(this.props.visaExpiryDate);
        let formatted_date = current_datetime.getFullYear() + "-" + ("0" + (current_datetime.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime.getDate()).slice(-2)
        //  let formatted_start = current_datetime_start.getFullYear() + "-" + ("0" + (current_datetime_start.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime_start.getDate()).slice(-2)

        let val = this.props.visaStatus;

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>
                            <Form.Group>
                                {<Form.Select
                                    fluid
                                    label="Visa Type"
                                    selection
                                    placeholder="Select your Visa type"
                                    options={this.state.visaOptions}
                                    width={6}
                                    value={val}
                                    onChange={(e, { value }) => {
                                        this.setState({ visaStatus: value }, this.changevalue(value))
                                    }}
                                />}
                                {(this.props.visaStatus === 'work visa' || this.props.visaStatus === 'student visa') ?
                                    <Form.Input label='Visa Expiry Date' width={6} placeholder='Date' type='date'
                                        value={formatted_date}
                                    />
                                    :
                                    null}
                            </Form.Group>
                        </div>

                    </React.Fragment>
                    <button type="button" className="ui floated teal button" onClick={this.savevisaStatus}>Save</button>
                </div>
            </div>

        )
    }

    renderEdit() {

        return (

            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                        <div>
                            <Form.Group>
                                <Form.Select
                                    fluid
                                    label="Visa Type"
                                    selection
                                    value={this.state.visaStatus}
                                    options={this.state.visaOptions}
                                    width={6}
                                    onChange={(e, { value }) => {
                                        this.setState({ visaStatus: value })
                                    }}
                                />
                                {(this.state.visaStatus === 'work visa' || this.state.visaStatus === 'student visa') ?
                                    <Form.Input label='Visa Expiry Date' width={6} placeholder='Date' type='date'
                                        onChange={(e, { value }) => {

                                            this.setState({ visaExpiryDate: value })
                                        }}
                                    /> :
                                    null}

                            </Form.Group>
                        </div>
                    </React.Fragment>
                    <button type="button" className="ui teal button" onClick={this.savevisaStatuswithDate}>Save</button>
                </div>
            </div>

        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }


}