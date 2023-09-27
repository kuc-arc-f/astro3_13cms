<script lang="ts">
import { onMount } from 'svelte';
import ModalComplete from '../../../components/ModalComplete.svelte';
import CrudEdit from './CrudEdit';
import Crud from './Crud';
import CategoryCrudIndex from '../category/CrudIndex';
//
//export let id: number = 0;
let id: number = 0, siteId = 0;
let item = {title: "", content: ""}, categoryItems = [];
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
        item = await CrudEdit.get(Number(params.id));
        id = params.id;
        siteId = params.siteId;
console.log(item);
        categoryItems = await CategoryCrudIndex.getList(siteId);  
        //console.log(categoryItems);   
        const category = (<HTMLInputElement>document.querySelector("#category"));
        if(category) {
            setTimeout(() => {
                category.value = String(item.categoryId);
            }, 500);            
        }

    } catch (e) {
        console.error(e);
    }
}
//
onMount(async () => {
    await initProc();
});
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
    window.location.href = `/admin/posts/${siteId}`;
}
</script>

<div class="mb-4">
	<a href={`/admin/posts/${siteId}`} class="btn btn-outline-primary">Back
	</a>		
	<h1>Edit</h1>    
    ID: {id}
    <hr class="my-1" />
    <div class="col-sm-6">Category
        <select id="category" name="category" class="form-control">
            <option value="0">Select please</option>
            {#each categoryItems as item}
                <option value={item.id}>{item.name}</option>
            {/each}
        </select>
    </div>    
	<div class="col-sm-6">
		<label>Name:</label>
        <input type="text" name="title" id="title" class="form-control"
		 value= {item.title}  />		
	</div>
	<hr class="my-1" />
	<div class="col-md-12 form-group">
		<label for="content">Content :</label>
		<textarea id="content" name="content" required class="form-control"
		rows="10" placeholder="markdown input, please">{item.content}</textarea>
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