import LibConfig from '../../lib/LibConfig';
import LibCookie from '../../lib/LibCookie';
import Session from '../../lib/Session';
//
const Login = {
  /**
   *
   * @param
   *
   * @return
   */   
  login : async function() : Promise<any>
  {
    try{
      let ret = false;
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      let values = {
        "name": "a1",
        "email": email?.value,
        "password": password?.value,
        "api_key": import.meta.env.PUBLIC_API_KEY,
        path: "/users/get",
    }
    const body: any = JSON.stringify(values);      
//console.log(values);
    const res = await fetch("/api/user/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: body
    });
    if (res.status !== 200) {
      throw new Error(await res.text());
    }
    const json = await res.json()
console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
        const key = LibConfig.COOKIE_KEY_AUTH;  
        await LibCookie.set_cookie(key, json.data.id);
        //SESSION_KEY_USER
        const sessionKey = LibConfig.SESSION_KEY_USER; 
        let resulte = await Session.put(sessionKey, JSON.stringify(json.data)); 
console.log(resulte);
        if(resulte ) {
          location.href = '/admin';
        }
      } else {
        alert("Error, login");
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , login');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc: function(): void 
  {
    try{
      console.log("#startProc: Login");
      //btn
      const button: any = document.querySelector('#btn_login');
      button.addEventListener('click', () => {
        this.login();
      });    
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Login.startProc();

export default Login;
