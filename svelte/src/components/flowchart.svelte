<script>
    import RecurseNode from "./recurse_node.svelte";
    export let nodes = []
</script>

<div
    class="px-3 py-5 border rounded bg-white d-flex justify-content-start"
    style="max-width: 100%; overflow-x: auto;"
>
    <RecurseNode {nodes} start={true} />
</div>
