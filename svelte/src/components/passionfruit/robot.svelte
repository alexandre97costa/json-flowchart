<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../../stores";
    import Line from "../line.svelte";

    export let id = "";
    export let type = "robot";
    let robot;
    let connection;
    let next_robot_ids = [];

    $: {
        if (id && type == "robot") {
            // from the id, retrieve YOUR information from robots
            robot = JsonPath.query(
                $flowchart,
                '$.plan.robots[?(@.id=="' + id + '")]'
            )[0];

            // from the id, retrieve YOUR information from connections
            connection = JsonPath.query(
                $flowchart,
                '$.plan.connections[?(@.id=="' + id + '")]'
            )[0];

            // from your connection.end, find which robots have THEIR start as YOUR end. (only need id)
            next_robot_ids = JsonPath.query(
                $flowchart,
                "$.plan.connections[?(@.start==" + connection.end + ")].id"
            );
        }
    }
</script>

<!-- * Render this robot * -->
{#if type == "start"}
    <div class="robot start p-2 fs-5 border rounded" style="min-width: max-content;">Start</div>
{:else if type == "end"}
    <div class="robot end p-2 fs-5 border rounded" style="min-width: max-content;">End</div>
{:else}
    <div class="robot p-2 fs-5 border rounded" style="min-width: max-content;">
        {robot.name}
    </div>
{/if}

<!-- * Render next robots * -->
{#if type == "robot"}
    {#if next_robot_ids.length == 1}
        <Line />
        <svelte:self id={next_robot_ids[0]} />
    {:else if next_robot_ids.length > 1}
        <Line isCondition />
        <div class="grid-2">
            {#each next_robot_ids as id}
                <div class="d-flex">
                    <svelte:self {id} />
                </div>
            {/each}
        </div>
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
