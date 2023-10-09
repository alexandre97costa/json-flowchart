<script>
    export let robotName = "AAA"
    export let type = "start"
</script>

<style>
    .node {
        max-width: 200px;
    }

    .node:hover {
        border-color: var(--bs-primary) !important;
        cursor: pointer;
    }
</style>

<div class="node bg-white border px-3 py-1 rounded d-flex align-items-center gap-3">
    <i class="fs-4 text-danger bi bi-wrench-adjustable-circle-fill"></i>
    <span class="fw-semibold fs-5 text-dark">{robotName}</span>
    
</div>