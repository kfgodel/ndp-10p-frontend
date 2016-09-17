import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";
import ResourceLocatorInjected from "ateam-ember-authenticator/mixins/resource-locator-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los elementos
 */
export default Ember.Service.extend(ResourceLocatorInjected, {

  getAllElementos: function () {
    return this._elementoResource().getAll();
  },

  // PRIVATE
  _elementoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/elementos', resourceLocator: this.resourceLocator()});
  },

});