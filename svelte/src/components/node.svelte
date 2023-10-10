<script>
    export let details = {};
    import Status from "../components/status.svelte";
</script>

{#if details.type == "robot"}
    <div
        class="node bg-white border px-3 py-1 rounded d-flex align-items-center gap-3"
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
{:else if details.type == "end"}
    <!-- Desenha um end -->
    <div
        class="node bg-white border px-3 py-2 rounded d-flex flex-column align-items-start gap-1"
    >
        <span class="fw-semibold fs-5 lh-1 text-dark" class:py-1={!details.timestamp}>End</span>
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
        <span class="fw-semibold fs-5 lh-1 text-dark" class:py-1={!details.timestamp}>Start</span>
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
        cursor: pointer;
    }

    .node .timestamp {
        font-size: 0.8rem;
    }

    .node .environment {
        font-size: 0.75rem;
    }
</style>
