import Ember from "ember";
import ServerInteraction from "ateam-ember-resource/rest/server-interaction";
import AuthenticationState from "../auth/authentication-state";

export default Ember.Service.extend({
  authenticationState: AuthenticationState.create(),
  actionAfterAuthentication: null,


  authenticateIfNeededAndThen(actionAfterAuthentication){
    if (this._state().isAuthenticated()) {
      // No need to authenticate
      return;
    }
    this._afterAuthentication(actionAfterAuthentication);
    // By sending the user to engage screen we start the recovery process
    this._navigator().goToSessionRecoveryScreen();
  },

  startSessionRecovery(){
    this._ensureCurrentSession();
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
    this._afterAuthentication(action);
    this._beginAuthentication();
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

  _ensureCurrentSession(){
    new ServerInteraction(this._session().getCurrentSession())
      .whenSucceeded(Ember.run.bind(this, this._onSessionRecovered))
      .whenUnauthorized(Ember.run.bind(this, this._onSessionMissing))
      .whenFailed(Ember.run.bind(this, this._onSessionError));
  },
  _onSessionRecovered(){
    this._completeAuthentication();
  },
  _onSessionMissing(){
    this._beginAuthentication();
  },
  _onSessionError(response){
    // Display the error. Probably nothing else to do on our side. Server down?
    this._state().changeStateMessageTo(`${response.status} - ${response.statusText}`);
  },
  _onUserLoggedIn(){
    this._completeAuthentication();
  },
  _onUserLoggedOut(){
    this._beginAuthentication();
  },
  _onFailedLogout(response){
    console.log("Error logging out");
    console.log(response);
  },
  _beginAuthentication(){
    this._state().markAsNotAuthenticated();
    this._navigator().goToLoginScreen();
  },
  _completeAuthentication(){
    this._state().markAsAuthenticated();
    var pendingAction = this._getActionAfterAuthentication();
    pendingAction();
  },
  _getActionAfterAuthentication(){
    var pendingAction = this.get('actionAfterAuthentication');
    this.set('actionAfterAuthentication', null);
    if (pendingAction == null) {
      pendingAction = ()=> {
        this._navigator().goToInitialScreen();
      }
    }
    return pendingAction;
  },
  _afterAuthentication(actionAfterAuthentication){
    this.set('actionAfterAuthentication', actionAfterAuthentication);
  },


});
