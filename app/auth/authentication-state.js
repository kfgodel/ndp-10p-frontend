import Ember from "ember";

export default Ember.Object.extend({
  init: function () {
    this.setProperties({authenticated: false, message: '...'});
  },
  markAsAuthenticated(){
    this.set('authenticated', true);
    this.changeStateMessageTo('OK!');
  },
  changeStateMessageTo(newMessage){
    this.set('message', newMessage);
  },
  markAsNotAuthenticated(){
    this.set('authenticated', false);
    this.changeStateMessageTo('...');
  },
  isAuthenticated(){
    return this.get('authenticated');
  },
});