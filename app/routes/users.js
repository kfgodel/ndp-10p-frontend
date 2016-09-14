import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import UserRepositoryInjected from "../mixins/user-repository-injected";


export default Ember.Route.extend(AuthenticatedRoute, UserRepositoryInjected, {
  model: function () {
    return this.promiseWaitingFor(this.repo().getAllUsers())
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToUsers();
      });
  },
  // PRIVATE
});
