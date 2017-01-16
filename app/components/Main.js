import React from 'react';
import Nav from 'Nav';
import axios from 'axios';
import Notification from 'Notification';
import {connect} from 'react-redux';

class Main extends React.Component{
  render(){
    var {notification} = this.props;
    var xhtml = notification != null? <Notification txt={notification}/>: null;
    return (
      <div>
        <Nav/>
        {xhtml}
        {this.props.children}
      </div>
    )
  }
  componentDidMount(){
    var {dispatch} = this.props;
    axios.get('/getInfo')
    .then(res => {
      if(res.data != 'CHUA_DANG_NHAP'){
        dispatch({type: 'LOG_IN', username: res.data});
      }
    })
    .catch(err => console.log('LOI'))
  }
}

module.exports = connect(function(state){
  return {notification: state.notification}
})(Main);
