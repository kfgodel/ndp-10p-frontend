import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";

/**
 * Esta clase permite interactuar con el backend para modificar los elementos
 */
export default Ember.Service.extend({

  getAllElementos: function () {
    return this._elementoResource().getAll();
  },

  // PRIVATE
  resourceLocator: Ember.inject.service("resource-locator"),
  _elementoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/elementos', resourceLocator: this.get('resourceLocator')});
  },

});