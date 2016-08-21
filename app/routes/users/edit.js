import Ember from "ember";
import AuthenticatedRoute from "../../mixins/authenticated-route";
import UserRepositoryInjected from "../../mixins/user-repository-injected";

export default Ember.Route.extend(AuthenticatedRoute, UserRepositoryInjected, {
  model: function (params) {
    var userId = params.user_id;

    return this.promiseWaitingFor(this.repo().getUser(userId))
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToUsersEdit(userId);
      });
  },
  // PRIVATE
});
