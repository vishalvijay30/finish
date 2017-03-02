import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {Dimensions, ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';

export default class Menu extends Component {
    render(){
        //console.log(this.props);
        if (!this.props.picURL || !this.props.data){
            return (<View />);
        } else {
            return(

                <View style={{flexDirection:'column', flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#666865"}}>
                  <Image source={{uri: this.props.picURL}} style={{height:200, width:200, borderRadius: 100}}/>
                  <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:20, textAlign:"center", backgroundColor:'transparent'}}>{this.props.data.profile.name}</Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text style={{color:"white", fontFamily:"Rock Salt", fontSize:30, textAlign:"center", backgroundColor:'transparent'}}>FINISH</Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}}>
                    <Icon name="md-log-out" size={20} color="white" style={{paddingTop:10}}></Icon>
                    <TouchableOpacity onPress={() => this.props.logout()}><Text style={{color:"white", fontFamily:"Impact", paddingLeft:10, fontSize:25, textAlign:"center", backgroundColor:'transparent'}}>Logout</Text></TouchableOpacity>
                  </View>
                </View>
            );
        }
    }
}
