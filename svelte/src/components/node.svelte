<script>
    import Status from "../components/status.svelte";
    import { grabbed_node_id, drop_location } from "../stores";
    import { createEventDispatcher, onDestroy } from "svelte";
    const dispatch = createEventDispatcher();

    export let details = {};

    let isBeingDragged = false;
    let hasDraggable = false;

    // todo: learn svelte stores
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#dealing_with_our_app_state

    let img = new Image();
    img.src = "https://ohiofi.com/assets/nyan.gif";
    // img.src = "https://picsum.photos/100/100";

    // when you start dragging this node
    function dragstart(e) {
        // dragged image
        let clone = e.target.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.top = "-1000px";
        clone.classList.add("border-primary");
        document.body.appendChild(clone);
        e.dataTransfer.setDragImage(clone, 0, 0);
        e.dataTransfer.effectAllowed = "move";

        // svelte info
        isBeingDragged = true;
        $grabbed_node_id = details.id;

    }

    function dragend(e) {
        isBeingDragged = false;
    }

    // when a draggable is on top of this node
    function dragover(e) {
        e.dataTransfer.dropEffect = "move";
        hasDraggable = true;
    }

    function dragenter(e) {
        
    }

    // when a draggable leaves this node
    function dragleave(e) {
        hasDraggable = false;
    }

    // when a draggable is dropped on this node
    function drop(e) {
        hasDraggable = false;
        $drop_location = { id: details.id, type: "node" };
        dispatch("dropped");
    }
</script>

{#if details.type == "robot"}
    <div class="position-relative" class:no-drop={isBeingDragged}>
        <div
            id={details?.id}
            class="node robot bg-white border border-2 px-3 py-2 rounded d-flex align-items-center gap-3"
            draggable="true"
            on:dragstart={(e) => dragstart(e)}
            on:dragend={(e) => dragend(e)}
            on:dragenter={(e) => dragenter(e)}
            on:dragover|preventDefault={(e) => dragover(e)}
            on:dragleave|preventDefault={(e) => dragleave(e)}
            on:drop|preventDefault={(e) => drop(e)}
            role="treeitem"
            aria-selected="false"
            tabindex="0"
        >
            <!-- <Status status={details.status} /> -->
            <span class="fw-semibold fs-5 text-dark flex-fill"
                >{details.acronym}</span
            >
            <span
                class="environment text-uppercase text-success border border-success rounded px-1"
                >{details.environment
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}</span
            >
        </div>

        <div
            class="position-absolute pe-none top-0 start-0 w-100 h-100 bg-white rounded border border-3"
            class:d-none={!hasDraggable}
            style:border-style|important="dashed"
        >
            <div
                class="d-flex w-100 h-100 justify-content-center align-items-center"
            >
                <i class="bi bi-arrow-left-right fs-4 text-secondary" />
            </div>
        </div>

        <div
            class="position-absolute pe-none top-0 start-0 w-100 h-100 bg-light rounded border border-2"
            class:d-none={!isBeingDragged}
        >
            <div
                class="d-flex w-100 h-100 justify-content-center align-items-center"
            >
                <!-- <i class="bi bi-arrow-left-right fs-4 text-secondary"></i> -->
            </div>
        </div>
    </div>
{:else if details.type == "end"}
    <!-- Desenha um end -->
    <div
        class="node end bg-white border px-3 py-2 rounded d-flex flex-column align-items-start gap-1"
    >
        <span
            class="fw-semibold fs-5 lh-1 text-dark"
            class:py-1={!details.timestamp}>End</span
        >
        {#if details.timestamp}
            <span class="timestamp lh-1 text-secondary">
                {details.timestamp}
            </span>
        {/if}
    </div>
{:else}
    <!-- Desenha um start -->
    <div
        class="node start bg-white border px-3 py-2 rounded d-flex flex-column align-items-start gap-1"
    >
        <span
            class="fw-semibold fs-5 lh-1 text-dark"
            class:py-1={!details.timestamp}>Start</span
        >
        {#if details.timestamp}
            <span class="timestamp lh-1 text-secondary">
                {details.timestamp}
            </span>
        {/if}
    </div>
{/if}

<style>
    .node {
        min-width: 180px;
        max-width: 200px;
    }

    .node.robot:hover {
        border-color: var(--bs-primary) !important;
        cursor: grab;
    }

    .node .timestamp {
        font-size: 0.8rem;
    }

    .node .environment {
        font-size: 0.75rem;
    }
</style>
