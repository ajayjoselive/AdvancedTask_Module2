import React from 'react';
import {Icon, Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {  
        var data=this.props.companyContact 
        return (
            <div className="ui card">
                <div className="content">
                <div className="center aligned header">
                <img src="https://react.semantic-ui.com/images/wireframe/square-image.png" className="ui avatar image"/>
                </div><br/>
                <div className="center aligned header">{data.name}</div>
                <div className="center aligned description">
                <Icon name="map marker alternate"/>
                <span className="meta">{data.location.city} {data.location.country}</span>
                </div><br/>
                <div className="center aligned description">
                <p>We currently do not have specific skills that we desire.</p>
                </div>
                </div>
                <div className="extra content">
                    <i className="phone icon"/>:{data.phone}<br/>
                    <i className="envelope icon"/>:{data.email}
                </div>
            </div>
        )   
        
    }
}