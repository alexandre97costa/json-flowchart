<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../stores";
    import Line from "./line.svelte";

    export let robot = {};
    export let type = "robot";

    let isCondition = !!robot?.branches ?? false;
    let next_robots = [];

    $: {
        if (type == "robot") {
            // find next robots info
            // all robots with my ID as ParentID
            next_robots = JsonPath.query(
                $flowchart,
                '$.plan.robots[?(@.parentID=="' + robot.id + '")]'
            );
        }
    }
</script>

<!-- * Render this robot * -->
{#if type == "start"}
    <div
        class="robot start p-2 fs-5 border rounded"
        style="min-width: max-content;"
    >
        Start
    </div>
{:else if type == "end"}
    <div
        class="robot end p-2 fs-5 border rounded"
        style="min-width: max-content;"
    >
        End
    </div>
{:else}
    <div class="robot p-2 fs-5 border rounded" style="min-width: max-content;">
        {robot.name}
    </div>
{/if}

<!-- * Render next robots * -->
{#if type == "robot"}
    {#if next_robots.length > 1}
        <Line {isCondition} />
        <div class="grid-2">
            {#each next_robots as next_robot}
                <div class="d-flex">
                    <svelte:self robot={next_robot} />
                </div>
            {/each}
        </div>
    {:else if next_robots.length == 1}
        <Line {isCondition} />
        <svelte:self robot={next_robots[0]} />
    {:else}
        <Line />
        <svelte:self type="end" />
    {/if}
{/if}

<style>
    .robot {
        max-width: 200px;
    }
    .grid-2 {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        row-gap: 1.5rem;
    }
</style>
