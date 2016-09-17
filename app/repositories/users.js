import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

export default Ember.Object.extend({
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
  resourceLocator: Ember.inject.service("resource-locator"),
  _userResource: function () {
    return EmberResource.create({resourceName: 'users', resourceLocator: this.get('resourceLocator')});
  },
});
