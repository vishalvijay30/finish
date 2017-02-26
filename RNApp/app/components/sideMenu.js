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

                <View style={{flexDirection:'column', flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#008080"}}>
                  <Image source={{uri: this.props.picURL}} style={{height:100, width:100, borderRadius: 25}}/>
                  <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:20, textAlign:"center", backgroundColor:'transparent'}}>{this.props.data.profile.name}</Text>
                  <Text style={{color:"white", fontFamily:"Permanent Marker", fontSize:40, textAlign:"center", backgroundColor:'transparent'}}>GET UP{"\n"} AND DO!</Text>
                  <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}}>
                    <Icon name="md-log-out" size={30} color="white" style={{paddingTop:10}}></Icon>
                    <TouchableOpacity onPress={() => this.props.logout()}><Text style={{color:"white", fontFamily:"Permanent Marker", paddingLeft:10, fontSize:30, textAlign:"center", backgroundColor:'transparent'}}>Logout</Text></TouchableOpacity>
                  </View>
                </View>
            );
        }
    }
}
