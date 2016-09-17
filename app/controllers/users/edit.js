import Ember from "ember";
import UserServiceInjected from "../../mixins/user-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";

export default Ember.Controller.extend(UserServiceInjected, MessagerInjected, AuthenticatorInjected, {
  actions: {
    save: function () {
      this.promiseWaitingFor(this.userService().updateUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserUpdated))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    },
    remove: function () {
      this.promiseWaitingFor(this.userService().removeUser(this.user()))
        .whenSucceeded(Ember.run.bind(this, this.onUserRemoved))
        .whenInterruptedAndReauthenticated(Ember.run.bind(this, this.onReauthenticated));
    }
  },

  // PRIVATE
  usersController: Ember.inject.controller('users'),
  user: function () {
    return this.get('model');
  },
  onUserUpdated: function (updatedUser) {
    this.user().setProperties(updatedUser);
    this.transitionToRoute('users');
  },
  onUserRemoved: function () {
    this.messager().publish({type: 'userRemoved', removedUser: this.user()});
    //this.get('usersController').onUserRemoved(this.user());
    this.navigator().navigateToUsers();
  },
  onReauthenticated(){
    this.navigator().navigateToUsersEdit(this.user());
  }
});
