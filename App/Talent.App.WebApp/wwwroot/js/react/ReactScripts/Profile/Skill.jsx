/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';

import { Table, Form, Input, Select, Button, Icon, Dropdown, Option } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            currentlyEditing: false,
            langname: "",
            langlevel: "",
            skills: [],
            skill: [],
            val: "",
            data: {
                name: "",
                level: ""
            },
            updateData: {
                id: " ",
                name: "",
                level: ""
            },
            name: "",
            level: ""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)

        this.check = this.check.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addSkill = this.addSkill.bind(this);
        this.addSkills = this.addSkills.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this);
        this.deleteSkills = this.deleteSkills.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
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
            url: Talent_Url + 'profile/profile/getSkill',
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

        let newSkill = Object.assign([], this.state.skills, newValues)
        this.setState({
            skills: newSkill
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

    addSkill() {

        this.setState({
            skill: this.state.data
        }, this.addSkills);

    }

    deleteSkill(lang) {

        this.setState({
            skill: lang,
            skills: []
        }, this.deleteSkills)
    }

    checkValidation() {
        if ((this.state.skill.name === "" || this.state.skill.name === null) && (this.state.skill.level === "" || this.state.skill.level === null)) {
            TalentUtil.notification.show("Please enter skill and level.", "error", null, null)
            return false
        }
        else if ((this.state.skill.name === "" || this.state.skill.name === null)) {
            TalentUtil.notification.show("Please enter skill.", "error", null, null)
            return false
        }
        else if ((this.state.skill.level === "" || this.state.skill.level === null)) {
            TalentUtil.notification.show("Please enter level.", "error", null, null)
            return false
        } else {
            return true
        }
    }

    addSkills() {
        if (this.checkValidation()) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: Talent_Url + 'profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.skill),
                success: function (res) {

                    if (res.success == true) {
                        TalentUtil.notification.show("Language Added sucessfully", "success", null, null)
                        this.loadData()
                    } else {
                        TalentUtil.notification.show("Language did not Added successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {

                }
            })
        }


    }

    deleteSkills() {


        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: Talent_Url + 'profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {

                if (res.success == true) {
                    TalentUtil.notification.show("Language Deleted sucessfully", "success", null, null)

                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not deleted successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {

            }
        })
    }

    updateSkill() {

        this.setState({
            skill: this.state.updateData
        }, this.updateSkills)
    }

    updateSkills() {
        if (this.checkValidation()) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: Talent_Url + 'profile/profile/UpdateSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.skill),
                success: function (res) {

                    if (res.success == true) {
                        TalentUtil.notification.show("Language updated sucessfully", "success", null, null)

                        this.loadData()
                    } else {
                        TalentUtil.notification.show("Language did not update successfully", "error", null, null)
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
                name: lang.name,
                level: lang.level
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
                                placeholder='Add Skill'
                                name="name"
                                onChange={this.handleChange}
                            />

                            <Form.Field>
                                <select className="ui right labeled dropdown"
                                    placeholder="Skill Level"
                                    onChange={this.handleChange}
                                    name="level"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                            </Form.Field>
                        </Form.Group>

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

        const { skills } = this.state;


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <button type="button" className="ui floated teal button" onClick={this.openEdit}>+ Add New</button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {skills.map((name) => (
                                    <Table.Row key={name.id}>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Skill'
                                                            name="name"
                                                            value={this.state.updateData.name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.name}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <div>
                                                    <Table.Cell>
                                                        <Form>
                                                            <select className="ui right labeled dropdown"
                                                                placeholder="Language Level"
                                                                onChange={this.handleChange}
                                                                name="level"
                                                                value={this.state.updateData.level}
                                                            >
                                                                <option value="">Select Level</option>
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Intermediate">Intermediate</option>
                                                                <option value="Expert">Expert</option>
                                                            </select>
                                                        </Form>
                                                    </Table.Cell>

                                                </div>

                                            )
                                                : (
                                                    <Table.Cell>{name.level}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <Table.Cell>
                                                    <button type="button" className="btn btnupdate" onClick={this.updateSkill}>Update</button>
                                                    <button type="button" className="btn btncancel" onClick={this.cancel}>Cancel</button>
                                                </Table.Cell>
                                            )
                                                : (
                                                    <Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='pencil' onClick={this.check.bind(this, name)} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='delete' onClick={this.deleteSkill.bind(this, name)} />
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
