import Ember from "ember";
import ProyectoRepoInjected from "../mixins/proyecto-repository-injected";

export default Ember.Controller.extend(ProyectoRepoInjected, {

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
      });
    },
    borrarProyecto(proyecto){
      this.repo().removeProyecto(proyecto).then(()=> {
        this._cargarProyectos();
      });
    }
  },

  _cargarProyectos(){
    this.repo().getAllProyectos().then(proyectos => {
      this.set('proyectos', proyectos);
    });
  }

});