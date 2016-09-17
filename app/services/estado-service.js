import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

/**
 * Esta clase permite interactuar con el backend para modificar los estados
 */
export default Ember.Service.extend({

  getAllEstados: function () {
    return this._estadoResource().getAll();
  },

  // PRIVATE
  resourceLocator: Ember.inject.service("resource-locator"),
  _estadoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/estados', resourceLocator: this.get('resourceLocator')});
  },

});