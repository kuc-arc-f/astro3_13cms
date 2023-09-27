<script lang="ts">
import ModalComplete from '../../../../components/ModalComplete.svelte';
import CrudCreate from '../CrudCreate';
import CategoryCrudIndex from '../../category/CrudIndex';
//
export let siteId; 
let messageModal = "", categoryItems = [];
console.log("siteId=", siteId);
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
        categoryItems = await CategoryCrudIndex.getList(siteId);  
console.log(categoryItems);      
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
        const result = await CrudCreate.addItem(Number(siteId));
console.log("result=", result);
        if(result === true) {
            messageModal = "Success, save";
            MicroModal.show('modal-1');
        } else {
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
    <a href={`/admin/posts/${siteId}`} class="btn">[ Back ]
    </a>		
    <h1>Create</h1>
    <p>siteId : {siteId}</p>
    <hr class="my-1" />
    <div class="col-sm-6">Category
    <select id="category" name="category" class="form-control">
        <option value="0">Select please</option>
        {#each categoryItems as item}
            <option value={item.id}>{item.name}</option>
        {/each}
    </select>
    
    </div>
    <hr class="my-1" />

    <div class="col-sm-6">
        <label for="title">Title</label>
        <input type="text" id="title" name="title"
        class="form-control" required>		
    </div>
    <hr class="my-1" />
    <div class="col-md-12 form-group">
        <label for="content">Content :</label>
        <textarea id="content" name="content" required class="form-control"
        rows="10" placeholder="markdown input, please"></textarea>
    </div>	
    <hr class="my-1" />
    <button on:click={save} class="btn btn-primary my-2">Save</button>
    <hr />
    <ModalComplete bind:message={messageModal} okFunction={okFunction} />	
</div>

<style>
</style>

<!--
<p>save-Area</p>
-->