import Ember from "ember";
import ServerInteraction from "ateam-ember-resource/rest/server-interaction";
import AuthenticationState from "../auth/authentication-state";

export default Ember.Service.extend({
  authenticationState: AuthenticationState.create(),
  actionAfterAuthentication: null,

  ifNotAuthenticated(action){
    if (this._state().isUnauthenticated()) {
      action();
    }
  },
  afterAuthentication(actionAfterAuthentication){
    this.set('actionAfterAuthentication', actionAfterAuthentication);
  },
  startSessionRecovery(){
    this._engageServerSession();
    return this._state();
  },
  login(credentials){
    return this._session()
      .beginSession(credentials)
      .then(Ember.run.bind(this, this._onUserLoggedIn));
  },
  logout(){
    this._session()
      .endSession()
      .then(
        Ember.run.bind(this, this._onUserLoggedOut),
        Ember.run.bind(this, this._onFailedLogout)
      );
  },
  reauthenticateAndThen(action){
    this._state().markAsNotAuthenticated();
    this.afterAuthentication(action);
    this._navigator().goToLoginScreen();
  },

  // PRIVATE
  _state(){
    return this.get('authenticationState');
  },
  _sessionRequester: Ember.inject.service('backend-session-requester'),
  _session(){
    return this.get('_sessionRequester');
  },
  _authenticationNavigator: Ember.inject.service('authentication-navigator'),
  _navigator(){
    return this.get('_authenticationNavigator');
  },

  _engageServerSession(){
    new ServerInteraction(this._session().recoverSession())
      .whenSucceeded(Ember.run.bind(this, this._onSessionAvailable))
      .whenUnauthorized(Ember.run.bind(this, this._onSessionMissing))
      .whenFailed(Ember.run.bind(this, this._onRequestError));
  },
  _onSessionAvailable(){
    this._state().markAsAuthenticated();
    var pendingAction = this._getActionAfterAuthentication();
    pendingAction();
  },
  _getActionAfterAuthentication(){
    var pendingAction = this.get('actionAfterAuthentication');
    this.set('actionAfterAuthentication', null);
    if (pendingAction == null) {
      pendingAction = this._navigator().getDefaultActionAfterLogin();
    }
    return pendingAction;
  },
  _onSessionMissing(){
    this._navigator().goToLoginScreen();
  },
  _onRequestError(response){
    // Display the error. Probably nothing else to do on our side. Server down?
    this._state().changeStateMessageTo(`${response.status} - ${response.statusText}`);
  },
  _onUserLoggedIn(){
    this._onSessionAvailable();
  },
  _onUserLoggedOut(){
    this._state().markAsNotAuthenticated();
    this._navigator().goToLoginScreen();
  },
  _onFailedLogout(response){
    console.log("Error logging out");
    console.log(response);
  },
});
