<script lang="ts">
import ModalComplete from '../../../../components/ModalComplete.svelte';
import CrudCreate from '../CrudCreate';
import LibAuth from '../../../../lib/LibAuth'
import HttpCommon from '../../../../lib/HttpCommon';
//
let messageModal = "";
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
        const result = await CrudCreate.addItem();
console.log("result=", result);
        if(result === true) {
            messageModal = "Success, save todo";
            MicroModal.show('modal-1');
        } else {
        }
    } catch (e) {
    console.error(e);
    alert("error, test1");
    }
}
//
/**
 * addPost
 * @param
 *
 * @return
 */ 
const addPost = async function () {
	try{
//console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
		const title = document.querySelector<HTMLInputElement>('#title');
		const item = {
			name: title?.value,
			content : "",
			userId:  LibAuth.getUserId(),
		}
//console.log(item);
		const json = await HttpCommon.server_post(item, '/sites/create');
console.log(json);
		if(json.ret === 'OK') {
			messageModal = "Success, Save";
			MicroModal.show('modal-1');
//			goto(`/todo`);
		}
	} catch (e) {
      console.error(e);
      alert("error, add");
    }
}
//
const okFunction = function () {
//    alert("okFunction");
    location.href = `/admin/sites/`;
}
</script>
<!-- MarkUp -->
<div class="container my-2">
	<a href={`/admin/sites/`} class="btn">[ Back ]
	</a>		
	<h1>Site Create</h1>
	<hr />
	<div class="col-sm-6">
		<label for="title">Name:</label>
		<input type="text" id="title" name="title"
		class="form-control" required>		
	</div>
	<hr className="mt-2 mb-2" />
	<button on:click={addPost} class="btn btn-primary my-2">Create</button>
	<hr />
	<ModalComplete bind:message={messageModal} okFunction={okFunction} />
</div>
<style>
</style>

<!--
<p>save-Area</p>
-->