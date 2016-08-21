import Ember from "ember";
import ProyectoRepoInjected from "../mixins/proyecto-repository-injected";

export default Ember.Component.extend(ProyectoRepoInjected, {
  init(){
    this._super(...arguments);
    this.repo().getAllElementos().then((elementos) => {
      this.set('elementosDisponibles', elementos);
    })
  }
});
