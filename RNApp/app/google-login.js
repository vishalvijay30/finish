import React, { AsyncStorage } from 'react-native';
import Meteor from 'react-native-meteor';

import { GoogleSignin } from 'react-native-google-signin';

const USER_TOKEN_KEY = 'reactnativemeteor_usertoken';

export const loginWithGoogle = () => {
    GoogleSignin.signIn()
        .then((user) =>  {
            console.log(user);
            meteorGoogleLogin(user)
            })
        .catch((err) => console.log(err))
        .done();
};

export const meteorGoogleLogin = (user) => {
    const Data = Meteor.getData();
    if(user){
        Meteor.call('login', { google : user }, (err, result) => {
                if(!err) {
                    AsyncStorage.setItem(USER_TOKEN_KEY, result.token);
                    Data._tokenIdSaved = result.token;
                    Meteor._userIdSaved = result.id;
            }
        })
    }
}