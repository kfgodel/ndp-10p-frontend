import Ember from "ember";

export default Ember.Service.extend({
  contextUrl(){
    return this.get('context');
  },
  resourceUrl(resourceName){
    var resourceUrl = this.inside(this.contextUrl(), resourceName);
    return resourceUrl;
  },
  entityUrl: function (resourceName, instanceId) {
    var resourceUrl = this.resourceUrl(resourceName);
    var entityUrl = this.inside(resourceUrl, instanceId);
    return entityUrl;
  },
  loginUrl(){
    return "/j_security_check";
  },
  logoutUrl(){
    return "/j_logout";
  },

  // PRIVATE
  context: '/api/v1',
  inside(parent, child){
    return `${parent}/${child}`;
  }

});
