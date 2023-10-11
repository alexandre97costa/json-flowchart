<script>
    import Node from "./node.svelte";
    import Line from "./line.svelte";
    export let nodes = [];
    export let start = false;

    let nodeDragDetails = {}

    function nodeDragStart(e) {
        console.log(e.detail);
        nodeDragDetails = e.detail;
    }

    function nodeDropped() {

    }
</script>

<div class="d-flex align-items-start" style="min-width: max-content;">
    {#if start}
        <Node details={{ type: "start" }} />
        <Line
            on:drop={(e) => {
                console.log(
                    e.detail.acronym +
                        " has been dropped on the line after Start"
                );
            }}
        />
    {/if}
    {#each nodes as node, i}
        {#if node.condition}
            <Node details={node.details} />
            <Line isCondition={true} />
            <div class="d-flex flex-column gap-4">
                <svelte:self nodes={node.condition.success_path.nodes} />
                <svelte:self nodes={node.condition.failure_path.nodes} />
            </div>
        {:else}
            <Node details={node.details} />
            <Line
                on:drop={(e) => {
                    console.log(
                        e.detail.acronym +
                            " has been dropped on the line after " +
                            node.details.acronym
                    );
                }}
            />
            <!-- Adds an end node automatically, if one is not present -->
            {#if nodes.length -1 == i}
                <Node details={{ type: "end" }} />
            {/if}
        {/if}
    {/each}
    <!-- Adds an end node if its an empty list -->
    {#if nodes.length == 0}
        <Node details={{ type: "end" }} />
    {/if}
</div>
