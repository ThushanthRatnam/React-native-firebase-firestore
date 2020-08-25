import React, { Component } from "react";
import { Text, View,Button, StatusBar,Image,StyleSheet} from "react-native";
import firestore from "@react-native-firebase/firestore";



export default class App extends Component {
  state = {
    user : {
      name:""
    }
  }
  constructor(props){
    super(props);
    this.getUser();
    this.subscriber = firestore().collection("users").doc('yxN17JyZNOgG6r0NiXrW'
      ).onSnapshot(doc => {
        this.setState({
          user:{
            name:doc.data().name 
          }
        })
      })

      firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users:', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log('UserID:', documentSnapshot.id,documentSnapshot.data());
        });
      });
  }
  getUser = async () => {
    const userDocument=await firestore().collection("users").doc('yxN17JyZNOgG6r0NiXrW'
      ).get()
      console.log(userDocument)
  }
render(){
  return(
    <View style={styles.container}>
      <StatusBar
      backgroundColor="#aaf255"
      barStyle="light-content"/>
      <Text style={styles.title}>AgroPro</Text>
      <Text style={styles.alert}>Alert!</Text>
      <Text style={styles.note}>{this.state.user.name}</Text>
    </View>
  )}
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#aaf255'
  },
  title:{
    textAlign:'center',
    fontSize:50,
    marginBottom:"75%",
    paddingTop:10,
    fontFamily: "Cochin",
    fontWeight:'bold'
    //flex:1
  },
  note:{
    color:"#212121",
    fontSize:25,
    //marginVertical:250,
    borderRadius:10,
    borderColor:'white'
  },
  alert:{
    fontSize:25,
    color:'#D50000',
    
  },
  /*imge:{
    height:50,
    width:50,
    <Image style={styles.imge} source={require('./leaf.jpg')}/>

  }*/

});

