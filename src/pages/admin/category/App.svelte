<script lang="ts">
//import PaginateBox from "./PaginateBox.svelte";
import CrudIndex from "./CrudIndex";
import LibCommon from "../../../lib/LibCommon";
export let siteId;
let items = [], itemsTodos = [], completeType = 0;
let itemPage = 1, itemsAll = [], perPage: number = 10;
//
console.log("siteId=", siteId);

const startProc= async function() {
    items = await CrudIndex.getList(Number(siteId));
console.log(items);
}
startProc();
</script>

<div class="mb-4">
    <div class="row">
      <div class="col-md-6">
        <h1>Category</h1>
      </div>
      <div class="col-md-6 text-end">
        <a href={`/admin/category/create/${siteId}`} class="btn btn-primary">Create</a>
      </div>
    </div>
    <hr class="my-1" />	
    {#each items as item}
    <div>
        <a href={``} ><h3>{item.name}</h3>
        </a>    
        <span>
            {LibCommon.converDateString(item.createdAt)},
            ID : {item.id}
            <a href={`/admin/category/edit?id=${item.id}&siteId=${siteId}`} class="btn btn-sm btn-outline-primary mx-2">Edit
            </a>            
        </span>
        <hr class="my-2" />
    </div>
    {/each}
</div>

<style>
</style>

<!--
<a href={`/todo/edit/${item.id}`} class="btn btn-sm btn-outline-primary mx-2">Edit
</a>			
-->