import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import TalentCard from '../TalentFeed/TalentCard.jsx'
import TalentDetail from '../TalentFeed/TalentDetail.jsx'
import {Icon} from 'semantic-ui-react'

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={showprofileCard:false}
    this.videoClick=this.videoClick.bind(this);
    }
    videoClick(){
    this.setState({showprofileCard:true})
    }
    render() {
        return(
            <React.Fragment>
            {this.state.showprofileCard?<TalentCard feedData={this.props.feedData}/>:
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
            <div className="content">
                
                <div className="ui grid container">
                <div className="eight wide column">
               
                <img 
                src={this.props.feedData.photoId?this.props.feedData.photoId:"http://semantic-ui.com/images/avatar2/large/matthew.png"} 
                alt ="image not found" style={{width:"200px", height:"200px"}}></img>
                </div>
                <div className="eight wide column">
                <h4>Talent snapshot</h4>
                <span>CURRENT EMPLOYER</span>
                <p>{this.props.feedData.currentEmployment?this.props.feedData.currentEmployment:"XYZ"}</p>
                <span>VISA STATUS</span>
                <p>{this.props.feedData.visa?this.props.feedData.visa:"Citizen"}</p>
                <span>POSITION</span>
                <p>{this.props.feedData.level?this.props.feedData.level:"Software Developer"}</p>
                </div>
                
                </div>
            </div>
            <div className="content">
            <span style={{paddingLeft:"60px",paddingRight:"100px"}}><Icon name="video" onClick={this.videoClick}/></span>
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