import Ember from "ember";
import UserRepository from "../repositories/users";
import ProyectoRepository from "../repositories/proyectos";

export default Ember.Service.extend({
  users(){
    return UserRepository.create({resourceLocator: this.locator()});
  },
  proyectos(){
    return ProyectoRepository.create({resourceLocator: this.locator()});
  },
  // PRIVATE
  resourceLocator: Ember.inject.service('resource-locator'),
  locator(){
    return this.get('resourceLocator');
  }
});
