<script>
    export let nodes = [];
    export let start = false;
    import Node from "./node.svelte";
    import Line from "./line.svelte";
</script>

<div class="d-flex align-items-start" style="min-width: max-content;">
    {#if start}
        <Node details={{"type":"start"}} />
        <Line />
    {/if}
    {#each nodes as node, index}
        {#if node.condition}
            <Node details={node.details} />
            <Line isCondition={true}/>
            <div class="d-flex flex-column gap-4">
                <svelte:self nodes={node.condition.success_path.nodes} />
                <svelte:self nodes={node.condition.failure_path.nodes} />
            </div>
        {:else}
            <Node details={node.details} />
            <Line />
            <!-- Adds an end node automatically -->
            {#if nodes.length - 1 == index}
                <Node details={{"type":"end"}} />
            {/if}
        {/if}
    {/each}
</div>
