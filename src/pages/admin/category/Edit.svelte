<script lang="ts">
import ModalComplete from '../../../components/ModalComplete.svelte';
import CrudEdit from './CrudEdit';
import Crud from './Crud';
//
//export let id: number = 0;
let id: number = 0, siteId = 0;
let item = {title: "", content: ""};
let messageModal = "";
//
//console.log("id=", id);
/**
 *
 * @param
 *
 * @return
 */ 
const initProc = async function () {
    try{
        //modal
        MicroModal.init({
            disableScroll: true,
            awaitOpenAnimation: true,
            awaitCloseAnimation: true
        });        
        const params = Crud.getQueryString();
console.log(params);
        item = await CrudEdit.get(Number(params.id));
        id = params.id;
        siteId = params.siteId;
console.log(item);
    } catch (e) {
        console.error(e);
    }
}
initProc();
/**
 *
 * @param
 *
 * @return
 */ 
const save = async function () {
    try{
console.log("#test1");
        const result = await CrudEdit.update(Number(id));
console.log("result=", result);
        if(result === true) {
            messageModal = "Success, save";
            MicroModal.show('modal-1');
        } else {
        }
    } catch (e) {
    console.error(e);
    alert("error, test1");
    }
}
/**
 *
 * @param
 *
 * @return
 */
const deleteFunc = async function () {
    try{
console.log("#test1");
        const result = await CrudEdit.delete(Number(id));
console.log("result=", result);
        if(result === true) {
            messageModal = "Success, delete";
            MicroModal.show('modal-1');
        }
    } catch (e) {
    console.error(e);
    }
}
//
const okFunction = function () {
    window.location.href = `/admin/category/${siteId}`;
}
</script>

<div class="mb-4">
	<a href={`/admin/category/${siteId}`} class="btn btn-outline-primary">Back
	</a>		
	<h1>Edit</h1>    
    ID: {id}
    <hr class="my-1" />
	<div class="col-sm-6">
		<label>Name:</label>
        <input type="text" name="name" id="name" class="form-control"
		 value= {item.name}  />		
	</div>
	<hr class="my-1" />
    <button on:click={save} class="btn btn-primary my-0">Save</button>
    <hr class="my-1" />
    <button on:click={deleteFunc} class="btn btn-danger my-0">Delete</button>
    <hr class="my-4" />
    <ModalComplete bind:message={messageModal} okFunction={okFunction} />	
</div>

<style>
</style>

<!--
<p>save-Area</p>
-->