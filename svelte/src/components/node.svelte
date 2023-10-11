<script>
    export let details = {};
    import Status from "../components/status.svelte";

    let isBeingDragged = false;
    let hasDraggable = false;

    let img = new Image();
    img.src = "https://picsum.photos/200/300";

    // when you start dragging this node
    function dragstart(e) {
        // e.dataTransfer.setDragImage(img, 0, 0);
        // e.preventDefault();
        e.dataTransfer.effectAllowed = "move";
        isBeingDragged = true;
    }

    function dragend(e) {
        // e.preventDefault();
        isBeingDragged = false;
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
        hasDraggable = false;
    }
</script>

{#if details.type == "robot"}
    <div class="position-relative">
        <div
            class="node bg-white border border-secondary px-3 py-2 rounded d-flex align-items-center gap-3"
            class:grabbing={isBeingDragged}
            draggable="true"
            on:dragstart={(e) => dragstart(e)}
            on:dragend={(e) => dragend(e)}
            on:dragover={(e) => dragover(e)}
            on:dragleave={(e) => dragleave(e)}
            on:drop={(e) => drop(e)}
            role="textbox"
            tabindex="0"
        >
            <Status status={details.status} />
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
            class="position-absolute pe-none top-0 start-0 w-100 h-100 bg-light rounded border border-3 border-secondary"
            class:d-none={!hasDraggable}
            style="border-style: dashed !important;"
        >
            <!-- <div class="d-flex w-100 h-100 justify-content-center align-items-center">
                <i class="bi bi-arrow-left-right fs-3"></i>
            </div> -->
        </div>
    </div>
{:else if details.type == "end"}
    <!-- Desenha um end -->
    <div
        class="node bg-white border px-3 py-2 rounded d-flex flex-column align-items-start gap-1"
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
        class="node bg-white border px-3 py-2 rounded d-flex flex-column align-items-start gap-1"
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
    }

    .node:hover {
        border-color: var(--bs-primary) !important;
        cursor: grab;
    }
    .grabbing {
        cursor: grabbing !important;
    }

    .node .timestamp {
        font-size: 0.8rem;
    }

    .node .environment {
        font-size: 0.75rem;
    }
</style>
