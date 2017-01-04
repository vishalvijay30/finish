import { Meteor } from 'meteor/meteor';
import '/imports/api/habits';

import FacebookOAuthInit from '../imports/api/facebook-oauth'

Meteor.startup(() => {
  FacebookOAuthInit();
});

