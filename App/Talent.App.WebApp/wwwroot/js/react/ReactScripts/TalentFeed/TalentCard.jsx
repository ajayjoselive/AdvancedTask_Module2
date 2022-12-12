import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Embed } from 'semantic-ui-react'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx'


export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showdefaultCard:false
        }

        this.profileClick=this.profileClick.bind(this);
       
    };
    profileClick(){
        this.setState({ showdefaultCard:true})
    }

    render() {
        
        return (
            <React.Fragment>
            {this.state.showdefaultCard?<TalentCardDetail feedData={this.props.feedData}/>:
            <div className="ui raised link job card">
                <div className="content">
                <div className="header">
                <div className="left floated">
                <h4>{this.props.feedData.name}</h4>
                </div>
                <div className="right floated">
                <Icon name="star"/>
                </div>
                </div>
                </div>
                <div className="video">
                    <ReactPlayer
                   
                    url={this.props.feedData.videoUrl?this.props.feedData.videoUrl:Embed}
                    width="100%"
                    height="100%"
                    controls={true}>
                    </ReactPlayer>
                   
                </div>
                <div className="content">
                <span style={{paddingLeft:"60px",paddingRight:"100px"}} onClick={this.profileClick}><Icon name="user" /></span>
                <span style={{paddingRight:"100px"}}><Icon name="file pdf outline"/></span>
                <span style={{paddingRight:"100px"}}><Icon name="linkedin"/></span>
                <span><Icon name="github"/></span>
                </div>
                
                <div className="extra content">
                    <div className="left floated">
                    <button className="ui primary basic button">{this.props.feedData.skills.name?this.props.feedData.skills.name:"C#"}</button>
                    </div>
                </div>
            </div>}
            </React.Fragment>
        );
       
    }
}

