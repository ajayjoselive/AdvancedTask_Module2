import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form } from 'semantic-ui-react'

export class Address extends Component {
    constructor(props) {
        super(props)

        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: "",
                country: "",
                city: "",
                region: ""
            }



        this.state = {
            showEditSection: false,
            newaddressData: addressData
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveaddressData = this.saveaddressData.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.checkValidation = this.checkValidation.bind(this)

    }


    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newaddressData: addressData
        })

    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newaddressData)
        data[event.target.name] = event.target.value
        this.setState({
            newaddressData: data
        })

    }
    checkValidation() {
        if ((this.state.newaddressData.number === "" || this.state.newaddressData.number === null) && (this.state.newaddressData.street === "" || this.state.newaddressData.street === null) && (this.state.newaddressData.suburb === "" || this.state.newaddressData.suburb === null) && (this.state.newaddressData.country === "" || this.state.newaddressData.country === null) && (this.state.newaddressData.city === "" || this.state.newaddressData.city === null) && (this.state.newaddressData.postCode === "" || this.state.newaddressData.postCode === null)) {
            TalentUtil.notification.show("Please enter a valid door no,street,suburb details,country,city and postcode.", "error", null, null)
            return false
        }
        else if ((this.state.newaddressData.number === "" || this.state.newaddressData.number === null)) {
            TalentUtil.notification.show("Please enter a valid door no.", "error", null, null)
            return false
        }
        else if ((this.state.newaddressData.street === "" || this.state.newaddressData.street === null)) {
            TalentUtil.notification.show("Please enter a valid street details.", "error", null, null)
            return false
        } else if ((this.state.newaddressData.suburb === "" || this.state.newaddressData.suburb === null)) {
            TalentUtil.notification.show("Please enter a valid suburb.", "error", null, null)
            return false
        } else if ((this.state.newaddressData.country === "" || this.state.newaddressData.country === null)) {
            TalentUtil.notification.show("Please select country.", "error", null, null)
            return false
        } else if ((this.state.newaddressData.city === "" || this.state.newaddressData.city === null)) {
            TalentUtil.notification.show("Please select city.", "error", null, null)
            return false
        } else if ((this.state.newaddressData.postCode === "" || this.state.newaddressData.postCode === null)) {
            TalentUtil.notification.show("Please enter valid postcode.", "error", null, null)
            return false
        } else {
            return true
        }
    }
    saveaddressData() {

        if (this.checkValidation()) {
            const data = Object.assign({}, this.state.newaddressData)
            this.props.updateProfileData({ address: data })
            this.props.saveProfileData({ address: data })
            this.closeEdit()
        }

    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }


    renderEdit() {

        const { country, region } = this.state;

        let countriesOptions = [];
        let citiesOptions = [];

        const selectedCountry = this.state.newaddressData.country;
        const selectedCity = this.state.newaddressData.city;
        countriesOptions = Object.keys(Countries).map((y, yindex) => <option key={yindex} value={y}>{y}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map((x, xindex) => <option key={xindex} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>

        }

        return (
            <div className='ui sixteen wide column'>
                <React.Fragment>
                    <div>
                        <Form.Group widths='equal'>
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.newaddressData.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your Door no"
                                errorMessage="Please enter a valid door no"
                            />
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newaddressData.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your street"
                                errorMessage="Please enter a valid street details"
                            />
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newaddressData.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter Suburb details"
                                errorMessage="Please enter a valid suburb details"
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <div className="field">
                                <label>Country</label>
                                <select className="ui right labeled dropdown"

                                    placeholder=""
                                    value={selectedCountry}
                                    onChange={this.handleChange}
                                    name="country" width={4}>

                                    <option value="">Select a country</option>
                                    {countriesOptions}
                                </select>
                            </div>

                            <div className="field"> <label> City</label>
                                <select
                                    className="ui right labeled dropdown"
                                    placeholder="City"
                                    value={selectedCity}
                                    onChange={this.handleChange}
                                    name="city" width={8}>
                                    <option value="0"> Select a town or city</option>
                                    {popCities}
                                </select>
                            </div>
                            <div>
                                <ChildSingleInput
                                    inputType="text"
                                    label="PostCode"
                                    name="postCode"
                                    value={this.state.newaddressData.postCode}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Enter postcode"
                                    errorMessage="Please enter a valid postcode details"
                                />
                            </div>

                        </Form.Group>
                        <button type="button" className="ui teal button" onClick={this.saveaddressData}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>
                </React.Fragment>
            </div>
        )
    }

    renderDisplay() {

        let fullAddress = this.props.addressData ? `${this.props.addressData.number} ${this.props.addressData.street} ${this.props.addressData.suburb}  ${this.props.addressData.postCode}` : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {fullAddress} </p>
                        <p>City:{this.props.addressData.city}</p>
                        <p>Country:{this.props.addressData.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const nationalityData = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : ""

        this.state = {
            showEditSection: false,
            newnationalityData: nationalityData
        }

        this.saveNationality = this.saveNationality.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newnationalityData)
        data[event.target.name] = event.target.value
        this.setState({
            newnationalityData: data,
            showEditSection: true
        })

    }

    saveNationality() {
        const data = Object.assign({}, this.state.newnationalityData)

        this.props.saveProfileData({ nationality: this.state.newnationalityData.country })
        this.setState({
            showEditSection: false
        })

    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {

        let nationalityOptions = [];
        const selectednation = this.props.nationalityData;
        nationalityOptions = Object.keys(Countries).map((z, zindex) => <option key={zindex} value={z}>{z}</option>);

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>
                            <Form.Group widths='equal'>
                                <div className="field">

                                    <select className="ui right labeled dropdown"
                                        placeholder=""
                                        value={selectednation}
                                        onChange={this.handleChange}
                                        name="country" width={4}>
                                        <option value="">Select your Nationality</option>
                                        {nationalityOptions}
                                    </select>
                                </div>

                            </Form.Group>

                        </div>

                    </React.Fragment>
                    <button type="button" className="ui teal button" onClick={this.saveNationality}>Save</button>
                </div>
            </div>

        );

    }

    renderEdit() {

        let nationalityOptions = [];
        const selectednation = this.state.newnationalityData.country;
        nationalityOptions = Object.keys(Countries).map((z, zindex) => <option key={zindex} value={z}>{z}</option>);

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>

                            <Form.Group widths='equal'>
                                <div className="field">

                                    <select className="ui right labeled dropdown"

                                        placeholder=""
                                        value={selectednation}
                                        onChange={this.handleChange}
                                        name="country" width={4}>
                                        <option value="">Select your Nationality</option>
                                        {nationalityOptions}
                                    </select>
                                </div>

                            </Form.Group>
                        </Form>

                    </React.Fragment>
                    <button type="button" className="ui teal button" onClick={this.saveNationality}>Save</button>
                </div>
            </div>

        );

    }
}