<script>
    export let status = "aaa";
</script>

{#if status == "success"}
    <i class="fs-5 text-primary bi bi-circle" />
{:else if status == "executing"}
    <i class="fs-5 text-primary bi bi-circle-fill" />
{/if}

<style>
</style>
