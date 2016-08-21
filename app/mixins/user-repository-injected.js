import Ember from "ember";
import RepositoryInjected from "./repository-injected";
import NavigatorInjected from "../mixins/navigator-injected";

/**
 * This Mixin adds behavior and injection to access the user repository
 */
export default Ember.Mixin.create(RepositoryInjected, NavigatorInjected, {
  repo(){
    return this.repositories().users();
  },
});
