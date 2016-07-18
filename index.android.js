/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  BackAndroid,
  AsyncStorage,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

import firebase from 'firebase'
// Initialize Firebase
var _firebase = require("firebase/app")
//require("firebase/auth")
var _database = require("firebase/database")
var OrderIds = []
var i = 0
const firebaseConfig = {
  apiKey: "AIzaSyDA2O-uRbNipOS3iKo5qRAg3Xd46u67Bg0",
  authDomain: "samplesserver.firebaseapp.com",
  databaseURL: "https://samplesserver.firebaseio.com",
  storageBucket: "samplesserver.appspot.com"
};


class firebase3TestApp extends Component {
  
constructor(){
super()
this.state = {
  name : "",
  email : "",
  password : "",
  password_confirmation : "",
  errors:[],
  
  
}
}

getCurrentUser(){
  var User =  firebase.auth().currentUser
  if(User){
    var name = User.email
    console.log(name)
  }
}

async getOrdersByUser(){

  // Note :  try to get all orders as ListView
  var userID = "John"
  // find all the Orders placed by this user
  var i = 0
  
  await firebase.database().ref('Orders').orderByChild("userID").equalTo(userID).on("child_added",(snap)=>{
    //console.log(i)
    OrderIds[i] = snap.key
    //console.log(snap.key)
    //console.log(OrderIds[i])
    
    i = i+1

  })


console.log(OrderIds)
//console.log(OrderIds[1])
 

}


getUserDetailsByOrderID(){
  var OrderID = "09072016100"
  
  firebase.database().ref('Orders/'+OrderID+'/userID').on('value',(snap)=>{
  
  /*
  this.setState({
    name :snap.val()
  })
 
  */
  var userID = snap.val()
  //alert(userID)
  // Since we have userID now , find other information about the user

  firebase.database().ref('users/'+userID).on('value',(snap)=>{

    var _Object = snap.val()
    var  customerName = _Object.username
    var  customerEmail = _Object.email
    var  customerAdd_1 = _Object.add_1
    var  customerAdd_2 = _Object.add_2
    var  customerPIN = _Object.pin
    
    alert("Customer Name"+customerName+"customerEmail"+customerEmail+"customerAdd_1"+customerAdd_1+"customerAdd_2"+customerAdd_2+"customerPIN"+customerPIN)
    


    //console.log(_Object.add_1)
    //console.log(_Object)


  })
  

  
})



}


placeOrder(){

  var itemSKU = "A001"
  var Qty = 1
  var userID = this.state.name
  var OrderDate = "09072015"
  var OrderID = OrderDate+"100"
  var OrderStatus = "Placed"

  firebase.database().ref('Orders/'+OrderID).set({
  OrderID : OrderID,
  itemSKU : itemSKU,
  userID  : userID,
  OrderDate : OrderDate,
  OrderStatus : OrderStatus
  })


}


getUserEmail(){
var  userID = "Jacob"
firebase.database().ref('users/'+userID+'/email').on('value',(snap)=>{
  console.log(snap.val())
})
}

letUserRegister(email,password,displayName){
let _email = email
let _password = password

firebase.auth().createUserWithEmailAndPassword(_email, _password).catch(function(error) {
// Handle Errors here.
//var errorCode = error.code;
//var errorMessage = error.message;
// ...
});
}

onRegisterPress(){
let userID = this.state.name
let username = this.state.name
let email = this.state.email
firebase.database().ref('users/'+userID).set({
username : username,
email : email
})
}


UpdateAddress(){
let add_1 = "Karnataka"
let add_2 = "Bangalore"
let pin = "560068"

let userID = this.state.name
firebase.database().ref('users/'+userID).update({
add_1 : add_1,
add_2 : add_2,
pin : pin
})
}


componentWillMount(){
  firebase.initializeApp(firebaseConfig)
  // Registering  User

  this.letUserRegister("email@email.com","password")
 

}
  
  render() {
    return (
      <View style={styles.container}>
      
      
      <TextInput 
      style={styles.input} 
      placeholder="Email" 
      onChangeText = {(text) => this.setState({email:text})} 
      value={this.state.email}
      />
      
      <TextInput 
      style={styles.input} 
      placeholder="Name" 
      onChangeText = {(text) => this.setState({name:text})} 
      value={this.state.name}
      />

      <TextInput 
      style={styles.input} 
      placeholder="Password" 
      secureTextEntry = {true}
      onChangeText = {(text) => this.setState({password:text})} 
      value={this.state.password}
      />

      <TextInput 
      style={styles.input} 
      placeholder="Confirm Password" 
      secureTextEntry = {true}
      onChangeText = {(text) => this.setState({password_confirmation:text})} 
      value={this.state.password_confirmation}
      />
      
      <TouchableHighlight 
      style={styles.Button}
      onPress = {this.onRegisterPress.bind(this)}

      >
      <Text style={styles.ButtonText}>Register</Text>
      </TouchableHighlight>


      <TouchableHighlight 
      style={styles.Button}
      onPress = {this.UpdateAddress.bind(this)}

      >
      <Text style={styles.ButtonText}>Update Address</Text>
      </TouchableHighlight>
      
      <TouchableHighlight 
      style={styles.Button}
      onPress = {this.placeOrder.bind(this)}

      >
      <Text style={styles.ButtonText}>Place Order</Text>
      </TouchableHighlight>

       <TouchableHighlight 
      style={styles.Button}
      onPress = {this.getOrdersByUser.bind(this)}

      >
      <Text style={styles.ButtonText}>Find Orders</Text>
      </TouchableHighlight>
      
       <TouchableHighlight 
      style={styles.Button}
      onPress = {this.getCurrentUser.bind(this)}

      >
      <Text style={styles.ButtonText}>TestButton ( Current User )</Text>
      </TouchableHighlight>
      
      
      
      
      </View>
      
    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input :{
      alignItems : 'center',
      alignSelf : 'center',
      width : window.width*0.7,
      borderColor : 'red'
  },
  inputWrapper : {
      borderColor : 'red',
      borderWidth : 1

  },
  Button : {
  flexDirection : 'column',
  alignItems : 'center',
  width: window.width * 0.7, 
  backgroundColor : '#039BE5', 
  height : 45,
  borderColor : '#039BE5',
  borderWidth : 3,
  borderRadius : 0.5,
  justifyContent : 'center',
  marginBottom :10 
  
  },
  SkipButton:{
    backgroundColor : '#37474F',
    borderColor : '#37474F'
  },

  ButtonText:{
    fontSize : 16,
    fontWeight : 'bold',
    color : 'white'
  }
 
});

AppRegistry.registerComponent('firebase3TestApp', () => firebase3TestApp);
