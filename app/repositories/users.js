import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

export default Ember.Object.extend({
  getAllUsers: function () {
    return this._proyectoResource().getAll();
  },
  createUser: function () {
    return this._proyectoResource().create();
  },
  getUser: function (userId) {
    return this._proyectoResource().getSingle(userId);
  },
  updateUser: function (user) {
    return this._proyectoResource().update(user);
  },
  removeUser: function (user) {
    return this._proyectoResource().remove(user);
  },
  // PRIVATE
  _proyectoResource: function () {
    return EmberResource.create({resourceName: 'users', resourceLocator: this.get('resourceLocator')});
  },
});
