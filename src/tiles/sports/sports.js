import React from 'react';
import Grid from '@material-ui/core/Grid';
import './sports.css';

export class Sports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render() {
      return (
        <div className="sports">
          <h3>Sports</h3>
          <Grid container id="scores">
            <Grid item sm></Grid>
            <Grid item sm></Grid>
            <Grid item sm>
              <img 
              className="groupLogo" 
              src={require('../../assets/' + this.props.sports.groupName + '.svg')} 
              alt={this.props.sports.groupName}/>             
              </Grid>
            <Grid item sm className="score">
              {this.props.sports.groupScore}
            </Grid>
            <Grid item xs={1} className="score">
              <span>:</span>
            </Grid>          
            <Grid item sm className="score">
              {this.props.sports.groupScore2}
            </Grid>
            <Grid item sm>
            <img 
            className="groupLogo" 
            src={require('../../assets/' + this.props.sports.groupName2 + '.svg')} 
            alt={this.props.sports.groupName2}/>             
            </Grid>
            <Grid item sm></Grid>
            <Grid item sm></Grid>
          </Grid>
        </div>
      );
    }
  }
  