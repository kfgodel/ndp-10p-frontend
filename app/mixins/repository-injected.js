import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";

/**
 * This Mixin adds behavior and injection to access repositories.
 * An authenticator is needed to handle repository requests authentication
 */
export default Ember.Mixin.create(AuthenticatorInjected, {
  repositories(){
    return this.get('_repositoryLocator');
  },
  // PRIVATE
  _repositoryLocator: Ember.inject.service('repository-locator'),
});
