import Ember from "ember";
import AuthenticatorInjected from "./authenticator-injected";
import NavigatorInjected from "./navigator-injected";

/**
 * This Mixin adds a pre-transition step to authenticate the user if not authenticated yet.<br>
 *   This prevents accessing to routes where requests will fail if not authenticated.
 *   However, this doesn't help recovering the session if lost, once in.
 */
export default Ember.Mixin.create(AuthenticatorInjected, NavigatorInjected, {
  beforeModel: function (transition) {
    this.authenticator().ifNotAuthenticated(()=> {
      this.navigator().navigateToEngageSession();
      this.authenticator().afterAuthentication(function () {
        transition.retry();
      });
    });
  },
});
