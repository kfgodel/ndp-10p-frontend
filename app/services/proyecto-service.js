import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";
import ResourceLocatorInjected from "ateam-ember-authenticator/mixins/resource-locator-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los proyectos
 */
export default Ember.Service.extend(ResourceLocatorInjected, {

  getAllProyectos: function () {
    return this._proyectoResource().getAll();
  },
  createProyecto: function (proyecto) {
    return this._proyectoResource().create(proyecto);
  },
  getProyecto: function (userId) {
    return this._proyectoResource().getSingle(userId);
  },
  updateProyecto: function (proyecto) {
    return this._proyectoResource().update(proyecto);
  },
  removeProyecto: function (user) {
    return this._proyectoResource().remove(user);
  },

  // PRIVATE
  _proyectoResource: function () {
    return EmberResource.create({resourceName: 'proyectos', resourceLocator: this.resourceLocator()});
  },

});