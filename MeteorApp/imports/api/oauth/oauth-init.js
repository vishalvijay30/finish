import { ServiceConfiguration } from 'meteor/service-configuration';
import registerFacebookHandler from './loginHandlers/facebook-oauth';
import registerGoogleHandler from './loginHandlers/google-oauth';

const facebookSettings = Meteor.settings.oauth.facebook;
const googleSettings = Meteor.settings.oauth.google;

const init = () => {
  if (!facebookSettings && !googleSettings) return;
  if (facebookSettings){
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });
    ServiceConfiguration.configurations.upsert(
      { service: "facebook" },
      {
        $set: {
          appId: facebookSettings.appId,
          secret: facebookSettings.secret
        }
      }
    );
  }
  if (googleSettings){
    ServiceConfiguration.configurations.remove({
      service: 'google'
    });
    ServiceConfiguration.configurations.upsert(
      { service: "google" },
      {
        $set: {
          clientId: googleSettings.client_id,
          secret: googleSettings.client_secret,
          validClientIds: googleSettings.validClientIds
        }
      }
    );
  }
  registerFacebookHandler();
  registerGoogleHandler();
}

export default init;