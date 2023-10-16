<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../../stores";
    import Line from "../line.svelte";

    export let id;
    let robot;
    let connection;
    let next_robot_ids = [];

    $: {
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
</script>

<div class="p-2 fs-5 border rounded">
    {robot.name}
</div>

{#if next_robot_ids.length == 1}
    <Line />
    {#each next_robot_ids as id}
        <svelte:self {id} />
    {/each}
{:else if next_robot_ids.length > 1}
    <Line isCondition={true} />
    <div class="d-flex flex-column gap-4">
        {#each next_robot_ids as id}
            <div class="d-flex">
                <svelte:self {id} />
            </div>
        {/each}
    </div>
{/if}
