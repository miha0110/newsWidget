import React from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import './wethear.css';



export class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleDisplay: true,
    };
  }

 
    
    
  
  // add '0' to set time display
  addZero(num){
    if(num < 10) {
      return "0"+num
    } else {
      return num;
    }
  }
  // after click on tile
  toggleDisplay = () => {
    this.setState({singleDisplay: !this.state.singleDisplay})
  }

    render() {
      const date = new Date(this.props.currTime)
       let time = date.getHours() + ":" + date.getMinutes()
     let weather;
      if(this.props.weather !== ''){
        weather = this.props.weather[0];
      }

      if(this.state.singleDisplay){
        return (
          <div className="weather" onClick={this.toggleDisplay}>
            <h3>Weather</h3>
            
            <Grid id="weatherGrid" container>
              <Grid item xs={4}>
                <h1>{weather.degrees} C</h1>
                <h3>{this.props.location}</h3>
              </Grid>
  
              <Grid item xs={8}>
              <img id="singleDisplay" src={require('../../assets/' + weather.weather + '.svg')} alt={weather.weather}/>
              </Grid>
            
            </Grid>
            
             
           <div className="tileFooter">
            <Divider /> 
            <span >Last updated: {time}</span> 
           </div>
                 
          </div>
          
        );
      }
      else{
        return (
          <div className="weather" onClick={this.toggleDisplay}>
            <h3>Weather</h3>
            
            <Grid id="multiWeatherGrid" container spacing={24}>
              { this.props.weather.map(entity => 
                  <Grid className="gridItem" item xs>
                    <h4>{entity.day.substring(0,3)}</h4>
                    <img id="weeklyDisplayImg" src={require('../../assets/' + entity.weather + '.svg')} alt={entity.weather}/>
                    <h2>{entity.degrees}C</h2>
                  </Grid>
                )
              }
             
            </Grid>
            
          <h4>
            {this.props.location}
          </h4>
             
           <div className="tileFooter">
            <Divider /> 
            <span >Last updated: {this.state.lastUpdate}</span> 
           </div>
                 
          </div>
          
        );
      }
      
    }
  }
  