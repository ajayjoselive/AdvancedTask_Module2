import React, { Component } from 'react';
import { Button, Table, Modal, Header, Form, Segment, Message, Icon } from 'semantic-ui-react'

class DeleteLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            langname: this.props.deletelanguage.langname,
            langlevel: this.props.deletelanguage.langlevel,
        };
    }

    //handleClose = () => this.setState({
    //    modalOpen: false
    //}, () => this.props.loadCustomer());

    //handleOpen = () => this.setState({ modalOpen: true });

    DeleteLanguage() {

        let a = {
            langname: this.state.langname,
            langlevel: this.state.langlevel
        };
        
        console.log("Deleted values:" + a.langname + "-" + a.langlevel);
    }

    render() {
        return (
            <Icon link name='delete' onClick={this.DeleteLanguage.bind(this)} />
        );
    }
}

export default DeleteLanguage;