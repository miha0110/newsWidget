import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './subscribe.css';

export class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({email: event.target.value});
  }

  handleSubmit = () => {
    this.props.onEmailSubmit(this.state.email)
  }

    render() {
      if(this.props.subscribed){
        //display this only if user already subscribed
        return (
          <div >
             <h3 id="subscribed">Thank you for subscribing!</h3>
          </div>      
        );
      }
      //display this if user did not subscribe yet
        return (
        <div className="subscribe">
          <h3>Subscribe for updates</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.email} 
              onChange={this.handleChange}
              className="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />

          <Button variant="contained" type="submit" className="button"  color="primary" >
            Send
          </Button>
          </form>
        </div>
      );
    }
  }
  