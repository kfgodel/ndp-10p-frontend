import Ember from "ember";

/**
 * This type represents the application navigator that knows how to navigate to different sections of the applications
 * requiring the needed arguments in each case.
 *   This class abstracts ember routes and adds semantic specific to this app
 */
export default Ember.Service.extend({

  navigateToEngageSession(){
    this.navigateTo('engaging-session');
  },
  navigateToLogin(){
    this.navigateTo('login');
  },
  navigateToIndex(){
    this.navigateTo('index');
  },

  navigateToProyectos(){
    this.navigateTo('proyectos');
  },

  // PRIVATE
  _transitionerService: Ember.inject.service('transitioner'), // Router made as a service
  transitioner(){
    return this.get('_transitionerService');
  },
  navigateTo(routeName, models, queryParams){
    this.transitioner().transitionTo(routeName, models, queryParams);
  }
});