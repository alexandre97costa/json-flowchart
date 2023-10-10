<script>
    export let isCondition = false;
</script>

<div class="line-container">
    <div class="line" />
</div>

<style>
    .line-container:not(.condition) {
        height: 45px;
        width: 50px;
        position: relative;
        /* background-color: rgba(255, 192, 203, 0.7); */
    }
    .line {
        position: absolute;
        height: 0;
        width: 100%;
        top: 50%;
        border-bottom: 2px solid gray;
        border-bottom-width: 2px;
        border-bottom-color: gray;
    }
</style>