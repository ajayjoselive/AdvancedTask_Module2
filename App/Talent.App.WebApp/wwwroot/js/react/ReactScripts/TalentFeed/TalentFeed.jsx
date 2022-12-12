import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Visibility } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails:{location:{city:'',country:''}}
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
        this.handleLoad=this.handleLoad.bind(this)

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
        this.loadEmployerData();
        this.loadTalentData();

    }
    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.init()
    };
    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: Talent_Url + 'profile/profile/getEmployerProfile',
           //url: 'http://localhost:60290/profile/profile/getEmployerProfile',
         
          
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
               let companyDetails = null;
                if (res.employer) {
                    companyDetails = res.employer.companyContact
                    console.log("companyDetails", companyDetails)
                    this.setState({ companyDetails: res.employer.companyContact });
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
     
    }

    loadTalentData() {
        var cookies = Cookies.get('talentAuthToken');       
        $.ajax({
            url: Talent_Url + 'profile/profile/getTalent',
          
            //url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: {
                position: this.state.loadPosition,
                number:this.state.loadNumber
            },
            success: function (res) {
                console.log("talentData", res.data)
                this.setState(state => ({
                    feedData: [...state.feedData, ...res.data]
                }));
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }
    handleLoad() {
        this.setState(
            state => ({ loadPosition: state.loadPosition + 5 }),
            () => this.loadTalentData()
        );
    }
   
    render() {
        const feedData = this.state.feedData;
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid container">
                <div className="four wide column">
                <CompanyProfile companyContact={this.state.companyDetails}/>
                </div>
                <div className="eight wide column">
                {feedData ?
                    <Visibility onBottomVisible={this.handleLoad} once={false}>
                        {feedData.map((data, i) => (
                            <TalentCard key={data.id} feedData={data} index={i + 1} />
                        ))}
                        {feedData.length >= 1 ? <Loader active inline="centered" /> : ""}
                    </Visibility>
                    : <div className="center aligned description">  There are no talents found for your recruitment company</div>}
                <p id="load-more-loading">
                    <img src="/images/rolling.gif" alt="Loading…" />
                </p>
            </div>
               
                
                <div className="four wide column">
                    <div className="ui card">
                        <FollowingSuggestion />
                    </div>
                </div>
                </div>
            </BodyWrapper>
        )
    }
}

/* {feedData?
                <div className="eight wide column">
                    {feedData.map((data, i) => (
                        <TalentCard key={data.id} feedData={data} index={i + 1} />
                    ))}
                    </div>
                :
                <div className="center aligned description">
                There are no talents found for your recruitment company
                </div>} */