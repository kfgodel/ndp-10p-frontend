import Ember from "ember";
import ProyectoRepoInjected from "../mixins/proyecto-repository-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";

export default Ember.Component.extend(ProyectoRepoInjected, MessagerInjected, {
  init(){
    this._super(...arguments);
    this._actualizarElementosDisponibles();
    this.messager().subscribe({type: 'proyectosCambiados'}, ()=> {
      this._actualizarElementosDisponibles();
    });
  },
  willDestroy(){
    this.messager().unsubscribe({type: 'proyectosCambiados'});
    return this._super();
  },

  _actualizarElementosDisponibles: function () {
    this.repo().getAllElementos().then((elementos) => {
      this.set('elementosDisponibles', elementos);
    });
  },

});
