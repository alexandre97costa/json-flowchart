<script>
    import Node from "./node.svelte";
    import Line from "./line.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let nodes = [];
    export let start = false;

    function handleDropped() {
        dispatch("dropped")
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
            <Node details={node.details} on:dropped={(e) => {handleDropped()}}/>
            <Line isCondition={true} />
            <div class="d-flex flex-column gap-4">
                <svelte:self nodes={node.condition.success_path.nodes} on:dropped={(e) => {handleDropped()}}/>
                <svelte:self nodes={node.condition.failure_path.nodes} on:dropped={(e) => {handleDropped()}}/>
            </div>
        {:else}
            <Node details={node.details} on:dropped={(e) => {handleDropped()}} />
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
            {#if nodes.length - 1 == i}
                <Node details={{ type: "end" }} />
            {/if}
        {/if}
    {/each}
    <!-- Adds an end node if its an empty list -->
    {#if nodes.length == 0}
        <Node details={{ type: "end" }} />
    {/if}
</div>
