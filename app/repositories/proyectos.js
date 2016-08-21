import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

export default Ember.Object.extend({
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

  getAllEstados: function () {
    return this._estadoResource().getAll();
  },
  getAllElementos: function () {
    return this._elementoResource().getAll();
  },


  // PRIVATE
  _proyectoResource: function () {
    return EmberResource.create({resourceName: 'proyectos', resourceLocator: this.get('resourceLocator')});
  },
  _estadoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/estados', resourceLocator: this.get('resourceLocator')});
  },
  _elementoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/elementos', resourceLocator: this.get('resourceLocator')});
  },
});
