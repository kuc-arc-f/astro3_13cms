import LibConfig from './LibConfig';
import LibCookie from './LibCookie';

//
const Layout = {
  /**
   * admin check
   * @param
   *
   * @return
   *  true: admin
   */  
  validContainPath: function (pathname: string, searchTerm: string) {
    let ret = false;
    let idxFirst = 0;
    idxFirst = pathname.indexOf(searchTerm);
    if(idxFirst >= 0) {
        return true;
    }
    return ret;
  },
  /**
   *
   * @param
   *
   * @return
   * 
   */  
  checkAuthInfo: function (): void
  {
    const key = LibConfig.COOKIE_KEY_AUTH;
console.log("key=", key);
    const auth = LibCookie.get_cookie(key);
    if(typeof auth === "undefined" || auth === null)
    {
      location.href = '/login';
    }
    console.log(key, auth);      
  },  
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
//console.log("#Layout.startProc");
    const parsedUrl = new URL(window.location.href);
    const validAdmin = this.validContainPath(parsedUrl.pathname, "/admin");
console.log("validAdmin=", validAdmin);
    if(validAdmin) {
      console.log("pathname=", parsedUrl.pathname);
      this.checkAuthInfo();
    }
    const validPost = this.validContainPath(parsedUrl.pathname, "/posts/");
//console.log("validPost=", validPost);
    if(validPost) { return; }
    if(
      !(parsedUrl.pathname === '/login' ||
       parsedUrl.pathname === '/user/create' ||
       parsedUrl.pathname === '/'
    ))
    {
      this.checkAuthInfo();
    }
    return;
  }
}
Layout.startProc();

export default Layout;
