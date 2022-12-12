import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message, Icon, Input } from 'semantic-ui-react'

class UpdateLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            langname: this.props.updatelanguage.langname,
            langlevel: this.props.updatelanguage.langlevel,
            showEditSection: false,
        };

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
    }

    //handleClose = () => this.setState({
    //    modalOpen: false
    //}, () => this.props.loadCustomer());

    //handleOpen = () => this.setState({ modalOpen: true });

    openEdit() {
        //const languageData = Object.assign({}, this.props.languageData)
        this.setState({
            showEditSection: true
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    UpdateLanguage() {

        let a = {
            langname: this.state.langname,
            langlevel: this.state.langlevel
        };

        console.log("Updated values:" + a.langname + "-" + a.langlevel);
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        const languageLevel = [
            "Basic",
            "Conversational",
            "Fluent",
            "Native/Bilingual",
        ]

        const languageOptions = languageLevel.map(lang => ({
            key: lang,
            text: lang,
            value: lang,

        }));
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} placeholder='Add Language' value={this.state.langname}
                        onChange={e => this.setState({ langname: e.target.value })} />

                    <Form.Select
                        fluid

                        search
                        selection
                        value={this.state.langlevel}
                        options={languageOptions}
                        placeholder="Language Level"
                        onChange={(e, { value }) => {
                            this.setState({ langlevel: value })
                        }}
                    />
                    <button type="button" className="ui teal button" onClick={this.UpdateLanguage.bind(this)}>Update</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </Form.Group>
                </Form>
            );
    }

    renderDisplay() {
        return (
            <Icon link name='pencil' onClick={this.openEdit} />
        );
    }
}

export default UpdateLanguage;