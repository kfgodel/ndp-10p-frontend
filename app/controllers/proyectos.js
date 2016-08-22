import Ember from "ember";
import ProyectoRepoInjected from "../mixins/proyecto-repository-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";

export default Ember.Controller.extend(ProyectoRepoInjected, MessagerInjected, {

  init(){
    this._super(...arguments);
    this._limpiarFormulario();
    this._cargarProyectos();
  },

  _limpiarFormulario(){
    this.set('proyecto', Ember.Object.create({
      nombreDescriptivo: null,
      elemento: null,
      estado: null,
      id: null
    }));
  },

  actions: {
    crearProyecto(){
      var nuevoProyecto = this.get('proyecto');
      this.repo().createProyecto(nuevoProyecto).then(proyectoGuardado => {
        this._limpiarFormulario();
        this._cargarProyectos();
        this._notificarCambiosAProyectos();
      });
    },
    borrarProyecto(proyecto){
      this.repo().removeProyecto(proyecto).then(()=> {
        this._cargarProyectos();
        this._notificarCambiosAProyectos();
      });
    }
  },

  _cargarProyectos(){
    this.repo().getAllProyectos().then(proyectos => {
      this.set('proyectos', proyectos);
    });
  },

  _notificarCambiosAProyectos(){
    this.messager().publish({type: 'proyectosCambiados'});
  }

});