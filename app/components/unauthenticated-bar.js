import Ember from "ember";
import Application from "../concepts/application";

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-default', 'navbar-fixed-top'],
  application: Application.create(),
});
