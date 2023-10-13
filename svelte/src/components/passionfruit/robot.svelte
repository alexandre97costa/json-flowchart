<script>
    import JsonPath from "jsonpath";
    import { flowchart, maxStart } from "../../stores";
    import Line from "../line.svelte";

    export let id;
    let robot;
    let connection;
    let next_robot_ids = [];

    $: {
        console.log(id);

        // from the id, retrieve YOUR information from robots
        robot = JsonPath.query(
            $flowchart,
            '$.plan.robots[?(@.id=="' + id + '")]'
        )[0];
        console.log(robot);

        // from the id, retrieve YOUR information from connections
        connection = JsonPath.query(
            $flowchart,
            '$.plan.connections[?(@[0]=="' + id + '")]'
        )[0];
        console.log(connection);

        // from your connection[2], find which robots have your start as end. (only need id)
        next_robot_ids = JsonPath.query(
            $flowchart,
            "$.plan.connections[?(@[1]==" + connection[2] + ")][0]"
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
