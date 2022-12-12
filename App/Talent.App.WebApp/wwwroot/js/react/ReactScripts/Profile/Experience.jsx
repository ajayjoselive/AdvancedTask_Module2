/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';

import { Table, Form, Input, Select, Button, Icon, Dropdown, Option } from 'semantic-ui-react';
import moment from 'moment'

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            currentlyEditing: false,
            langname: "",
            langlevel: "",
            experience: [],
            experienc: [],
            val: "",
            data: {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            updateData: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            name: "",
            level: ""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.check = this.check.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addExperience = this.addExperience.bind(this);
        this.addExperiences = this.addExperiences.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this);
        this.deleteExperiences = this.deleteExperiences.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.updateExperiences = this.updateExperiences.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.checkValidation = this.checkValidation.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: Talent_Url + 'profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {

                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }

    updateWithoutSave(newValues) {

        let newExperience = Object.assign([], this.state.experience, newValues)
        this.setState({
            experience: newExperience
        })

    }

    openEdit() {

        this.setState({
            showEditSection: true,
            updateData: { id: null }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })

    }

    addExperience() {

        this.setState({
            experienc: this.state.data
        }, this.addExperiences);

    }

    deleteExperience(lang) {

        this.setState({
            experienc: lang,
            experience: []
        }, this.deleteExperiences)
    }

    checkValidation() {

        if ((this.state.experienc.company === "" || this.state.experienc.company === null) && (this.state.experienc.position === "" || this.state.experienc.position === null) && (this.state.experienc.responsibilities === "" || this.state.experienc.responsibilities === null)) {
            TalentUtil.notification.show("Please enter company,position and responsibilities.", "error", null, null)
            return false
        }
        else if ((this.state.experienc.company === "" || this.state.experienc.company === null)) {
            TalentUtil.notification.show("Please enter company.", "error", null, null)
            return false
        }
        else if ((this.state.experienc.position === "" || this.state.experienc.position === null)) {
            TalentUtil.notification.show("Please enter position.", "error", null, null)
            return false
        } else if ((this.state.experienc.start === "" || this.state.experienc.start === undefined)) {
            TalentUtil.notification.show("Please enter valid start date.", "error", null, null)
            return false
        } else if ((this.state.experienc.end === "" || this.state.experienc.end === undefined)) {
            TalentUtil.notification.show("Please enter a valid end date.", "error", null, null)
            return false
        } else if ((this.state.experienc.responsibilities === "" || this.state.experienc.responsibilities === null)) {
            TalentUtil.notification.show("Please enter responsibilities.", "error", null, null)
            return false
        } else {
            return true
        }
    }
    addExperiences() {
        if (this.checkValidation()) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: Talent_Url + 'profile/profile/addExperience',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.experienc),
                success: function (res) {

                    if (res.success == true) {
                        TalentUtil.notification.show("Experience Added sucessfully", "success", null, null)
                        this.loadData()
                    } else {
                        TalentUtil.notification.show("Experience did not Added successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {

                }
            })
        }


    }

    deleteExperiences() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: Talent_Url + 'profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experienc),
            success: function (res) {

                if (res.success == true) {
                    TalentUtil.notification.show("Experience Deleted sucessfully", "success", null, null)

                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not deleted successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {

            }
        })
    }

    updateExperience() {

        this.setState({
            experienc: this.state.updateData
        }, this.updateExperiences)
    }

    updateExperiences() {

        if (this.checkValidation()) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: Talent_Url + 'profile/profile/UpdateExperience',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.experienc),
                success: function (res) {

                    if (res.success == true) {
                        TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)

                        this.loadData()
                    } else {
                        TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {

                }
            })
            this.cancel()
        }

    }

    check(lang) {

        this.setState({
            currentlyEditing: true,
            updateData: {
                id: lang.id,
                company: lang.company,
                position: lang.position,
                responsibilities: lang.responsibilities,
                start: lang.start,
                end: lang.end
            }
        })

    }

    cancel() {
        this.setState({
            currentlyEditing: false,
        })

    }

    handleChange() {

        if (this.state.updateData.id != null) {
            const updateData = Object.assign({}, this.state.updateData);
            updateData[event.target.name] = event.target.value;
            this.setState({ updateData }, () => console.log(this.state.updateData))
        }
        else {
            const data = Object.assign({}, this.state.data);
            data[event.target.name] = event.target.value;
            this.setState({ data }, () => console.log(this.state.data))
        }


    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        return (

            <div className='ui sixteen wide column'>
                <React.Fragment>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Company'
                                name="company"
                                onChange={this.handleChange}
                            />

                            <Form.Field control={Input}
                                placeholder='Add Position'
                                name="position"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                type="date"
                                placeholder='Start Date'
                                name="start"
                                onChange={this.handleChange}
                            />

                            <Form.Field control={Input}
                                type="date" placeholder='End Date'
                                name="end"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Responsibilities'
                                name="responsibilities"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Field>
                            <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Form.Field>
                    </Form>
                    <br />
                </React.Fragment>

                <React.Fragment>
                    {this.renderDisplay()}
                </React.Fragment>
            </div>
        )
    }

    renderDisplay() {

        const { experience } = this.state;

        let current_datetime_start = new Date(this.state.updateData.start);
        let formatted_start = current_datetime_start.getFullYear() + "-" + ("0" + (current_datetime_start.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime_start.getDate()).slice(-2)

        let current_datetime_end = new Date(this.state.updateData.end);
        let formatted_end = current_datetime_end.getFullYear() + "-" + ("0" + (current_datetime_end.getMonth() + 1)).slice(-2) + "-" + ("0" + current_datetime_end.getDate()).slice(-2)

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <button type="button" className="ui floated teal button" onClick={this.openEdit}>+ Add New</button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {experience.map((name) => (
                                    <Table.Row key={name.id}>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Company'
                                                            name="company"
                                                            value={this.state.updateData.company}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.company}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <div>
                                                    <Table.Cell>
                                                        <Form>
                                                            <Form.Field control={Input}
                                                                placeholder='Add Position'
                                                                name="position"
                                                                value={this.state.updateData.position}
                                                                onChange={this.handleChange}
                                                            />
                                                        </Form>
                                                    </Table.Cell>

                                                </div>

                                            )
                                                : (
                                                    <Table.Cell>{name.position}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Responsibilities'
                                                            name="responsibilities"
                                                            value={this.state.updateData.responsibilities}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.responsibilities}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            type="date"
                                                            placeholder='Start Date'
                                                            name="start"
                                                            value={formatted_start}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{moment(name.start).format('Do MMMM YYYY')}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            type="date"
                                                            placeholder='End Date'
                                                            name="end"
                                                            value={formatted_end}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{moment(name.end).format('Do MMMM YYYY')}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <Table.Cell>
                                                    <button type="button" className="ui teal button" onClick={this.updateExperience.bind(this)}>Update</button>
                                                    <button type="button" className="ui button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                </Table.Cell>
                                            )
                                                : (
                                                    <Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='pencil' onClick={this.check.bind(this, name)} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='delete' onClick={this.deleteExperience.bind(this, name)} />
                                                        </Table.Cell>
                                                    </Table.Cell>
                                                )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}