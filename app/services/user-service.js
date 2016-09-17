import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";
import ResourceLocatorInjected from "ateam-ember-authenticator/mixins/resource-locator-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los usuarios
 */
export default Ember.Service.extend(ResourceLocatorInjected, {

  getAllUsers: function () {
    return this._userResource().getAll();
  },
  createUser: function () {
    return this._userResource().create();
  },
  getUser: function (userId) {
    return this._userResource().getSingle(userId);
  },
  updateUser: function (user) {
    return this._userResource().update(user);
  },
  removeUser: function (user) {
    return this._userResource().remove(user);
  },
  // PRIVATE
  _userResource: function () {
    return EmberResource.create({resourceName: 'users', resourceLocator: this.resourceLocator()});
  },

});