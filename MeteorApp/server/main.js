import { Meteor } from 'meteor/meteor';
import '/imports/api/habits';

import FacebookOAuthInit from './social-config'

Meteor.startup(() => {
  FacebookOAuthInit();
});

