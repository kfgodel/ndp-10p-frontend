import Ember from "ember";
import RepositoryInjected from "./repository-injected";

/**
 * This Mixin adds behavior and injection to access the user repository
 */
export default Ember.Mixin.create(RepositoryInjected, {
  repo(){
    return this.repositories().proyectos();
  },
});
