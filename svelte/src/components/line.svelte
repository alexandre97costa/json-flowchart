<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let isCondition = false;
    let hasDraggable = false;

    function add() {
        dispatch("add");
    }

    // when a draggable is on top of this node
    function dragover(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        hasDraggable = true;
    }

    // when a draggable leaves this node
    function dragleave(e) {
        e.preventDefault();
        hasDraggable = false;
    }

    // when a draggable is dropped on this node
    function drop(e) {
        e.preventDefault();
        setTimeout(() => {
            hasDraggable = false;
        }, 100);

        dispatch("drop", JSON.parse(e.dataTransfer.getData("text/plain")));
    }
</script>

<div
    class={"line-container " + (isCondition ? "height-2" : "height-1")}
    role="treegrid"
    tabindex="0"
    on:dragover={(e) => dragover(e)}
    on:dragleave={(e) => dragleave(e)}
    on:drop={(e) => drop(e)}
>
    <div class="line" />
    {#if !isCondition}
        <button
            class="add invisible position-absolute w-100 h-100 d-flex justify-content-center align-items-center border border-0 bg-transparent"
            on:click={(e) => add()}
        >
            <i
                class="bi bi-plus-circle fs-3 bg-light-subtle lh-1 rounded-circle text-primary"
            />
        </button>
    {/if}

    {#if isCondition}
        <div class="line failure" />
        <!-- diamond -->
        <i class="condition bi bi-diamond-fill text-primary fs-2" />
    {/if}
    {#if hasDraggable}
        <div
            class={"drag position-absolute w-100 h-100 d-flex justify-content-center pe-none " +
                (isCondition ? "align-items-end mt-2" : "align-items-center")}
        >
            <i
                class="bi bi-arrow-down-short fs-3 bg-white lh-1 p-1 text-white border border-3 rounded"
            />
        </div>
    {/if}
</div>

<style>
    .line-container {
        width: 80px;
        min-width: max-content;
        position: relative;
        /* background-color: rgba(255, 192, 203, 0.7); */
    }

    .line-container:hover .add {
        visibility: visible !important;
        cursor: pointer;
    }

    .line-container .drag i {
        border-style: dashed !important;
    }

    .height-1 {
        height: 45px;
    }
    .height-2 {
        height: 100px;
    }

    .line:not(.failure) {
        position: absolute;
        height: 0;
        width: 100%;
        top: 22.5px;
        border-bottom: 2px solid var(--bs-border-color);
        border-bottom-width: 2px;
        border-bottom-color: var(--bs-border-color);
    }

    .line.failure {
        position: absolute;
        width: 50%;
        height: calc(45px + 1.5rem + 2px);

        top: 22.5px;
        left: 50%;

        border-bottom-left-radius: 1rem;
        border-left: 2px solid var(--bs-border-color);
        border-bottom: 2px solid var(--bs-border-color);
    }

    .line-container .condition {
        position: absolute;
        z-index: 1;
        top: -2px;
        left: calc(50% + 0.5px);
        transform: translate(-50%);
    }
</style>
