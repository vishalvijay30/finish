import { ServiceConfiguration } from 'meteor/service-configuration';
import registerFacebookHandler from './loginHandlers/facebook-oauth';
import registerGoogleHandler from './loginHandlers/google-ouath';

const facebookSettings = Meteor.settings.oauth.facebook;
const googleSettings = Meteor.settings.oauth.google;

const init = () => {
  if (!settings) return;
  ServiceConfiguration.configurations.remove({
    service: 'google'
  });
  ServiceConfiguration.configurations.remove({
      service: 'facebook'
  });
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        appId: settings.appId,
        secret: settings.secret
      }
    }
  );
  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        clientId: settings.client_id,
        secret: settings.client_secret,
        validClientIds: Meteor.settings.google.validClientIds
      }
    }
  );
  registerFacebookHandler();
  registerGoogleHandler();
}