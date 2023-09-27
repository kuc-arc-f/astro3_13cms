import LibConfig from '../LibConfig';
import Session from './ServerSession';
import ServerKV from './ServerKV';
//
const Auth = {
  /**
   * : cookie vallidate
   * @param key: any
   *
   * @return
   */ 
  validate: async function(Astro: any):Promise<void>
  {
    try {
      const key = LibConfig.COOKIE_KEY_AUTH;
//console.log(key);
      if (Astro.cookies.has(key) === false) {
          console.log("key = false, redirect Start");
          return Astro.redirect('/login');
      }
    } catch (e) {
      console.error(e);
    }
  },
  /**
   *
   * @param key: any
   *
   * @return
   */
  sessionValidate: async function(Astro: any):Promise<any>
  {
    try {
      let ret = false;
      const sessionId = Session.getSessionId(Astro);
console.log("sessionId=", sessionId);
      if(!sessionId) {
        return ret;
      }
      const obj = await  Session.get(LibConfig.SESSION_KEY_USER, sessionId);
      console.log(obj);
      if(!obj.id) {
        console.error('Error , nothing obj.id');
//          return Astro.redirect('/login');
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  }, 
  /**
   *
   * @param key: any
   *
   * @return
   */
  kvValidate: async function(Astro: any):Promise<any>
  {
    try {
      let ret = false;
      const sessionId = Session.getSessionId(Astro);
console.log("sessionId=", sessionId);
      if(!sessionId) {
        return ret;
      }
      const obj = await  ServerKV.get(LibConfig.SESSION_KEY_USER, sessionId);
//console.log(obj);
      if(!obj.id) {
        console.error('Error , nothing obj.id');
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  },  
}
export default Auth;
