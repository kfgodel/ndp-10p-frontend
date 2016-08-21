import Ember from "ember";
import ServerInteraction from "ateam-ember-resource/rest/server-interaction";
import NavigatorInjected from "../mixins/navigator-injected";
import AuthenticationState from "../auth/authentication-state";

export default Ember.Service.extend(NavigatorInjected, {
  authenticationState: AuthenticationState.create(),
  actionAfterAuthentication: null,
  ifNotAuthenticated(action){
    if (this.state().isUnauthenticated()) {
      action();
    }
  },
  afterAuthentication(actionAfterAuthentication){
    this.set('actionAfterAuthentication', actionAfterAuthentication);
  },
  authenticate(){
    this.engageServerSession();
    return this.state();
  },
  login(credentials){
    var loginUrl = this.locator().loginUrl();
    return Ember.$.post(loginUrl, {
      j_username: credentials.login,
      j_password: credentials.password
    })
      .then(Ember.run.bind(this, this.onUserLoggedIn));
  },
  logout(){
    Ember.$.post("/j_logout", {})
      .then(
        Ember.run.bind(this, this.onUserLoggedOut),
        Ember.run.bind(this, this.onFailedLogout)
      );
  },
  reauthenticateAndThen(action){
    this.state().markAsNotAuthenticated();
    this.afterAuthentication(action);
    this.makeUserLogin();
  },

  // PRIVATE
  state(){
    return this.get('authenticationState');
  },
  resourceLocator: Ember.inject.service('resource-locator'),
  locator(){
    return this.get('resourceLocator');
  },
  engageServerSession(){
    var sessionUrl = this.locator().resourceUrl('session');
    new ServerInteraction(
      Ember.$.ajax({
        method: 'GET',
        url: sessionUrl,
      })
    ).whenSucceeded(Ember.run.bind(this, this.onSessionAvailable))
      .whenUnauthorized(Ember.run.bind(this, this.onSessionMissing))
      .whenFailed(Ember.run.bind(this, this.onRequestError));
  },
  onSessionAvailable(){
    this.state().markAsAuthenticated();
    var pendingAction = this.postAuthenticationAction();
    pendingAction();
  },
  postAuthenticationAction(){
    var pendingAction = this.get('actionAfterAuthentication');
    this.set('actionAfterAuthentication', null);
    if (pendingAction == null) {
      pendingAction = this.defaultPostAuthenticationAction();
    }
    return pendingAction;
  },
  onSessionMissing(){
    this.makeUserLogin();
  },
  onRequestError(response){
    // Display the error. Probably nothing else to do on our side. Server down?
    this.state().changeStateMessageTo(`${response.status} - ${response.statusText}`);
  },
  makeUserLogin(){
    this.navigator().navigateToLogin();
  },
  defaultPostAuthenticationAction(){
    return ()=> {
      this.navigator().navigateToIndex();
    };
  },
  onUserLoggedIn(){
    this.onSessionAvailable();
  },
  onUserLoggedOut(){
    this.state().markAsNotAuthenticated();
    this.makeUserLogin();
  },
  onFailedLogout(response){
    console.log("Error logging out");
    console.log(response);
  },
});
