import React, { Component, PropTypes } from 'react';

import {Dimensions, ScrollView, View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Image } from 'react-native';

export default class Menu extends Component {
    render(){
        //console.log(this.props);
        if (!this.props.picURL){
            return (<View />);
        } else {
            return(
 
                <View style={{flexDirection:'column', flex:1, alignItems:'center', justifyContent:'center'}}>
                   <Image source={{uri: this.props.picURL}} style={{height:200, width:200}}/>

                   <TouchableOpacity onPress={() => this.props.logout()}><Text>Logout</Text></TouchableOpacity>

                </View>
            );
        }
    }
}