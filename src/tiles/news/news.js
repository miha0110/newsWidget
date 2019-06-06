import React from 'react';
import Modal from 'react-modal';
import './news.css';

export class News extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  // add '0' to set time display
  addZero(num){
    if(num < 10) {
      return "0"+num
    } else {
      return num;
    }
  }

    render() {
      let date = new Date(this.props.latestNews.date);
      let time = this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes());
      return (
        <div>
          <div onClick={this.openModal}>
            <h3>News update</h3>
            <h5>Breaking news! {time}</h5>
            <h6>{this.props.latestNews.title}</h6>
            <p>{this.props.latestNews.content.substring(0,150)}...</p>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="Modal"
          >
          <div id="inModalContainer">
            <h2>{this.props.latestNews.title}</h2>           
            <p>{this.props.latestNews.content}</p>
          </div>         
          </Modal>
        </div>
        
      );
    }
  }
  