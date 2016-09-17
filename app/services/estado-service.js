import Ember from "ember";
import EmberResource from "ateam-ember-resource/rest/ember-resource";
import ResourceLocatorInjected from "ateam-ember-authenticator/mixins/resource-locator-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los estados
 */
export default Ember.Service.extend(ResourceLocatorInjected, {

  getAllEstados: function () {
    return this._estadoResource().getAll();
  },

  // PRIVATE
  _estadoResource: function () {
    return EmberResource.create({resourceName: 'proyectos/estados', resourceLocator: this.resourceLocator()});
  },

});