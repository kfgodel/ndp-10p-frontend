import Ember from "ember";
import NavigatorInjected from "../mixins/navigator-injected";

/**
 * This class knows how to navigate the app screens so the authenticator can make the user authenticate
 */
export default Ember.Service.extend(NavigatorInjected, {

  goToLoginScreen(){
    this.navigator().navigateToLogin();
  },
  getDefaultActionAfterLogin(){
    return ()=> {
      this.navigator().navigateToIndex();
    }
  },
});
