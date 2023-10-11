<script>
    export let isCondition = false;
</script>

<div
    class={"line-container " + (isCondition ? "height-2" : "height-1")}
    role="treegrid"
    tabindex="0"
>
    <div class="line" />
    {#if !isCondition}
        <div
            class="add position-absolute w-100 h-100 d-flex justify-content-center align-items-center opacity-0"
        >
            <i
                class="bi bi-plus-circle fs-3 bg-white lh-1 rounded-circle text-secondary"
            />
        </div>
    {/if}

    {#if isCondition}
        <div class="line failure" />
        <!-- diamond -->
        <i class="condition bi bi-diamond-fill text-primary fs-2" />
    {/if}
</div>

<style>
    .line-container {
        width: 80px;
        position: relative;
        /* background-color: rgba(255, 192, 203, 0.7); */
    }

    .line-container:hover .add {
        transition: 100ms;
        opacity: 1 !important;
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
        border-bottom: 2px solid gray;
        border-bottom-width: 2px;
        border-bottom-color: gray;
    }

    .line.failure {
        position: absolute;
        width: 50%;
        height: calc(45px + 1.5rem + 2px);

        top: 22.5px;
        left: 50%;

        border-bottom-left-radius: 1rem;
        border-left: 2px solid gray;
        border-bottom: 2px solid gray;
    }

    .line-container .condition {
        position: absolute;
        z-index: 1;
        top: -2px;
        left: calc(50% + 0.5px);
        transform: translate(-50%);
    }
</style>
