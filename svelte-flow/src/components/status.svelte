<script>
    export let status = "aaa";
</script>

{#if status == "success"}
    <i class="fs-4 text-success bi bi-circle-fill" />
{:else if status == "executing"}
    <i class="fs-4 text-primary bi bi-circle-fill" />
{/if}

<style>
</style>
