import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


import { News } from "./tiles/news/news";
import { Weather } from "./tiles/weather/weather";
import { Finance } from "./tiles/finance/finance";
import { Sports } from "./tiles/sports/sports";
import { Subscribe } from "./tiles/subscribe/subscribe";
import './App.css';

const NEWS_UPDATE_TIMER = 600000; //10 minutes
const WEATHER_UPDATE_TIMER = 14400000; //4 hours
const FINANCE_UPDATE_TIMER = 300000; //5 minutes
const SPORTS_UPDATE_TIMER = 1000; //1 second

const URL = 'http://localhost:5000/api/'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: '',
      weather: '',
      location: '',
      finance: '',
      sports: '',
      subscribed: false,
      currTime: ''
    };
  }

  componentDidMount(){
    this.checkToken();
    this.getNews();
    this.getWeather();
    this.getFinance();
    this.getSports();
  }  

  // if user already subscribed(by token existence) 
  checkToken = () => {
    if(localStorage.getItem('token') !== null){
      this.setState({subscribed: true})
    }
  }

  getNews = () =>  {
    fetch(URL + 'news')
    .then(response => response.json())
    .then(data => {
        let latestNews = data.news.reduce((prev, current) => (prev.y > current.y) ? prev : current);
        this.setState({news: latestNews});  
        console.log(data.message)
    });

    setTimeout(()=>{this.getNews()}, NEWS_UPDATE_TIMER)
  }; 

  getWeather = () =>  {
    fetch(URL + 'weather')
    .then(response => response.json())
    .then(data => {
        let sortedData = data.weather.sort((a, b) => {
          return a.id > b.id ? 1:0;
        })
        this.setState({weather: sortedData, location: data.location, currTime: new Date().getTime()});  
        console.log(data.message)
    });

    setTimeout(()=>{this.getWeather()}, WEATHER_UPDATE_TIMER)
  }; 

  getFinance = () =>  {
    fetch(URL + 'finance')
    .then(response => response.json())
    .then(data => {
        
        this.setState({finance: data.finance}); 
        console.log(data.message) 
    });

     setTimeout(()=>{this.getFinance()}, FINANCE_UPDATE_TIMER)
  };

  getSports = () =>  {
    fetch(URL + 'sports')
    .then(response => response.json())
    .then(data => {
        this.setState({sports: data.sports});  
        console.log(data.message)
    });

    setTimeout(()=>{this.getSports()}, SPORTS_UPDATE_TIMER)
  };

  //subscribe legal email
  subscribeEmail = email => {
    fetch(URL + 'subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({'email': email})
    })
    .then(response => response.json())
    .then(data => {
      
      console.log(data.message)
      localStorage.setItem('token', data.token);
      
    })
  }

  //is all display data loaded from server
  isLoading(){
    if(this.state.news === '' || this.state.weather === '' || this.state.finance === '' || this.state.sports === ''){
      return true;
    }
    else{
      return false;
    }
  }

  render() {
    if(this.isLoading()){
      //loading spinner
      return(
        <div id="loadingSpinner">
          <CircularProgress disableShrink />;
        </div>
      ) 
       
        
    }
    return (
      //tile display
      <div className="app">
        <div className="container">
          <Grid container spacing={24}>
            <Grid item xs={4} className="tile colored topLeft">
              <News latestNews={this.state.news}/>
            </Grid>
            <Grid item xs={8} className="tile colored topRight">
              <Weather weather={this.state.weather} location={this.state.location} currTime={this.state.currTime}/>
            </Grid>
            <Grid item xs={4} className="tile bottomLeft">
              <Finance finance={this.state.finance} />
            </Grid>
            <Grid  item xs={4} className="tile colored centerBottom">
              <Sports sports={this.state.sports} />
            </Grid>
            <Grid  item xs={4} className="tile bottomRight">
              <Subscribe onEmailSubmit={this.subscribeEmail} subscribed={this.state.subscribed}/>
            </Grid>
          </Grid>
        </div>     
      </div> 
    );
  }
}

export default App;
