import Ember from "ember";
import AuthenticatorInjected from "ateam-ember-authenticator/mixins/authenticator-injected";
import Application from "../concepts/application";

export default Ember.Component.extend(AuthenticatorInjected, {
  tagName: 'nav',
  classNames: ['navbar', 'navbar-default', 'navbar-fixed-top'],
  application: Application.create(),
  actions: {
    logout: function () {
      this.authenticator().logout();
    }
  }
});
