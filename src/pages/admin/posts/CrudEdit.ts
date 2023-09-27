import Crud from './Crud';
import LibConfig from '../../../lib/LibConfig';
import HttpCommon from '../../../lib/HttpCommon';
//
const CrudEdit = {
  /**
   *
   * @param key: any
   *
   * @return
   */    
  get: async function(id: number) : Promise<any>
  {
    try {
      let ret = {}
      const postItem = {
        id: id,
      }		
      const json = await HttpCommon.server_post(postItem, "/posts/get");
      console.log(json);
      ret = json.data; 
      return ret; 
    } catch (e) {
      console.error(e);
    }
  },  
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let ret = false;
      const item = {
        id: id
      }
//console.log(item);
      const json = await HttpCommon.server_post(item, '/posts/delete');
//console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      }      
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
  update : async function(id: number) : Promise<any>
  {
    try{
      let ret = false;
      let values = Crud.getInputValues();  
      values.id = Number(id);
//      values.categoryId = 0;
console.log(values);
      const json = await HttpCommon.server_post(values, '/posts/update');
      console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , update');
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
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudEdit.startProc();

export default CrudEdit;
