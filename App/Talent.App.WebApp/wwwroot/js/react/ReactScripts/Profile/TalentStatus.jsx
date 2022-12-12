import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const status = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: null
            }

        this.state = {
            newstatus: status
        }


        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {

        const data = Object.assign({}, this.state.newstatus)
        data[event.target.name] = event.target.value
        this.setState({
            newstatus: data
        })
    }

    check() {

        const data = Object.assign({}, this.state.newstatus)
        this.props.saveProfileData({ jobSeekingStatus: data });
        this.props.updateProfileData({ jobSeekingStatus: data });
    }

    render() {

        let value1 = this.props.status ? this.props.status.status === 'Actively looking for a job' ? true : false : false

        let value2 = this.props.status ? this.props.status.status === 'Not looking for a job at the moment' ? true : false : false

        let value3 = this.props.status ? this.props.status.status === 'Currently employed but open to offers' ? true : false : false

        let value4 = this.props.status ? this.props.status.status === 'Will be available on later date' ? true : false : false

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>
                            <Form.Field>

                                <input type='radio' label='Actively looking for a job' id='jobStatus-1' name='status' value='Actively looking for a job'
                                    checked={(this.state.newstatus.status === 'Actively looking for a job') || (value1)}
                                    onChange={this.handleChange}
                                />
                                {'  '} Actively looking for a job
                            </Form.Field>
                            <Form.Field>

                                <input type='radio' label='Not looking for a job at the moment' id='jobStatus-2' name='status' value='Not looking for a job at the moment'
                                    checked={(this.state.newstatus.status === 'Not looking for a job at the moment') || (value2)}
                                    onChange={this.handleChange}
                                />
                                {'  '} Not looking for a job at the moment
                            </Form.Field>
                            <Form.Field>

                                <input type='radio' label='Currently employed but open to offers' id='jobStatus-3' name='status' value='Currently employed but open to offers'
                                    checked={(this.state.newstatus.status === 'Currently employed but open to offers') || (value3)}
                                    onChange={this.handleChange}
                                />
                                {'  '} Currently employed but open to offers
                            </Form.Field>
                            <Form.Field>

                                <input type='radio' label='Will be available on later date' id='jobStatus-4' name='status' value='Will be available on later date'
                                    checked={(this.state.newstatus.status === 'Will be available on later date') || (value4)}
                                    onChange={this.handleChange}
                                />
                                {'  '} Will be available on later date
                            </Form.Field>

                            <button type="button" className="ui teal button" onClick={this.check.bind(this)}> Save </button>
                        </div>
                    </React.Fragment>
                </div>
            </div>

        );

    }
}