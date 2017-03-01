import { Meteor } from 'meteor/meteor';
import '/imports/api/habits/habits';

import OAuthInit from '../imports/api/oauth/oauth-init'

Meteor.startup(() => {
  OAuthInit();
});
