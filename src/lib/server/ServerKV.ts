//import LibCookie from './LibCookie';
import LibConfig from '../LibConfig';
import HttpKv from '../HttpKv';
//
const ServerKV = {
  /* put, get, delete */
 
  /**
  * 
  * @param
  *
  * @return
  */ 
  get: async function(key: string, sessionId: string): Promise<any>
  {
    try {
      let ret = {};
//console.log("sid=", sid);      
      const item = {
//        key: key,
        key: sessionId + ":" + key,
      }
      const json = await HttpKv.post(item, '/get');
//console.log(json);
      if (json.ret !== LibConfig.OK_CODE) {
        console.error("Error, json.ret <> OK");
        return ret;
      }
      ret = JSON.parse(json.data);
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  getSessionId: function(Astro: any): string
  {
    try {
      let ret = "";
//console.log("sid=", sid);
      const key = LibConfig.COOKIE_KEY_SESSION;
      if (Astro.cookies.has(key) === false) {
        console.error("Error, cookies.has = false");
        return ret;
//        return Astro.redirect('/errors/500');
//        throw new Error("Error, cookies.has = false");
      } else {
        const cookie = Astro.cookies.get(key);
        const seeeionValue = cookie.value;
        console.log("seeeionValue=", seeeionValue);
        ret = seeeionValue;
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  },
 
}
export default ServerKV;
