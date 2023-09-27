<script lang="ts">
//import PaginateBox from "./PaginateBox.svelte";
import CrudIndex from "./CrudIndex";
//import CrudShow from "./CrudShow";
import LibCommon from "../../../lib/LibCommon";
let items = [], itemsTodos = [], completeType = 0;
let itemPage = 1, itemsAll = [], perPage: number = 10;
//

const startProc= async function() {
    items = await CrudIndex.getList();
//    const d = await CrudShow.get(7);
//console.log(d);
}
startProc();
</script>

<div class="mb-4">
    <div class="row">
      <div class="col-md-6">
        <h1>Sites</h1>
      </div>
      <div class="col-md-6 text-end">
        <a href={`/admin/sites/create/`} class="btn btn-primary">Create</a>
      </div>
    </div>
    <hr class="my-1" />	
    {#each items as item}
    <div>
        <a href={`/admin/posts/${item.id}`} ><h3>{item.name}</h3>
        </a>    
        <span>
            {LibCommon.converDateString(item.createdAt)},
            ID : {item.id}
            <a href={`/admin/category/${item.id}`} class="btn btn-sm btn-outline-primary mx-2">Category
            </a>			
        </span>
        <hr class="my-2" />
    </div>
    {/each}
</div>

<style>
</style>

<!--
<h3>{item.title}</h3>
-->