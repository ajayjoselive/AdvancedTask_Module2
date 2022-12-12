/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon, Link } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            newlinkedAccounts: linkedAccounts
        }



        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.checkValidation = this.checkValidation.bind(this)

    }

    openEdit() {

        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newlinkedAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {

        const data = Object.assign({}, this.state.newlinkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newlinkedAccounts: data
        })
    }
    checkValidation() {
        if ((this.state.newlinkedAccounts.linkedIn === "" || this.state.newlinkedAccounts.linkedIn === null) && (this.state.newlinkedAccounts.github === "" || this.state.newlinkedAccounts.github === null)) {
            TalentUtil.notification.show("Please enter linkedIn and github.", "error", null, null)
            return false
        }
        else if ((this.state.newlinkedAccounts.linkedIn === "" || this.state.newlinkedAccounts.linkedIn === null)) {
            TalentUtil.notification.show("Please enter linkedIn.", "error", null, null)
            return false
        }
        else if ((this.state.newlinkedAccounts.github === "" || this.state.newlinkedAccounts.github === null)) {
            TalentUtil.notification.show("Please enter github.", "error", null, null)
            return false
        } else {
            return true
        }
    }
    saveContact() {
        if (this.checkValidation()) {
            const data = Object.assign({}, this.state.newlinkedAccounts)


            this.props.updateProfileData({ linkedAccounts: data })
            this.props.saveProfileData({ linkedAccounts: data })

            this.closeEdit()
        }
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newlinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn URL"
                    errorMessage="Please enter a valid LinkedIn URL"
                />

                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newlinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub URL"
                    errorMessage="Please enter a valid GitHub URL"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Button color='linkedin' type="link" href={this.props.linkedAccounts.linkedIn}>
                            <Icon name='linkedin' /> LinkedIn
                        </Button>
                        <Button color='black' type="link" href={this.props.linkedAccounts.github}>
                            <Icon name='github' /> GitHub
                        </Button>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}