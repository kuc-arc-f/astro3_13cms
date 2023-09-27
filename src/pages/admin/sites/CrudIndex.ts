//import LibCrud from '../../lib/LibCrud';
import LibConfig from '../../../lib/LibConfig';
import HttpCommon from '../../../lib/HttpCommon';
import LibCookie from '../../../lib/LibCookie';
import LibPagenate from '../../../lib/LibPagenate';
//
const CrudIndex = {
  /**
   *
   * @param page: page number
   * @param perPage: 1 page count
   *
   * @return
   */      
  getPageList : async function(itemsAll: any, page: number, perPage: number) : Promise<any>
  {
    try{
      let items: any = [];
//console.log("page=", page);
//console.log("offset=", offset);
      const pinfo = LibPagenate.getPageStart(page, perPage);
console.log(pinfo);
      items = itemsAll.slice(pinfo.start, pinfo.end);
      return items;
    } catch (e) {
      console.error(e);
    }
  },  
  /**
  * getList
  * @param
  *
  * @return
  */
  getList :async function (): Promise<any>
  {
    try{
      const key = LibConfig.COOKIE_KEY_AUTH;
      const auth = LibCookie.get_cookie(key);
      if(!auth) {
        throw new Error('Error , addItem cookie nothing.');
      }
      const postItem = {
        userId: Number(auth),
      }
//console.log(postItem);
      const json = await HttpCommon.server_post(postItem, "/sites/get_list");
console.log(json);      
      let items: any[] = [];
      items = json.data;
console.log(items);
      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error, getList");
    } 
  },  
  /**
  *
  * @param
  *
  * @return
  */  
  search :async function (): Promise<any>
  {
    try{
      const key = LibConfig.COOKIE_KEY_AUTH;
      const auth = LibCookie.get_cookie(key);
      if(!auth) {
        throw new Error('Error , addItem cookie nothing.');
      }
      // inputタグから値を取得し、オブジェクトにセットする
      const seachKey = (<HTMLInputElement>document.querySelector("#searchKey")).value;
      const postItem = {
        userId: auth,
        seachKey: seachKey,
      }
console.log(postItem); 
      const json = await HttpCommon.server_post(postItem, "/todos/search");
console.log(json);      
      let items: any[] = [];
      items = json.data;
console.log(items);
      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error, search");
    } 
  }, 
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //
      const button: any = document.querySelector('#status_complete');
      button.addEventListener('click', async () => {
        console.log("#status_complete");
//        const result = await this.addItem();
//        console.log("result=", result);
      });      
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
