<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../../stores";
    import Robot from "./robot.svelte";

    let first_robot_id = "";

    $: {
        // get min start
        let minStart = Math.min(
            ...JsonPath.query($flowchart, "$.plan.connections[*][1]")
        );
        first_robot_id = JsonPath.query(
            $flowchart,
            "$.plan.connections[?(@[1]==" + minStart + ")][0]"
        )[0];

        // $flowchart.plan.connections.forEach(connection => {
        //     // Json path para saber que robot tem o start == 99
        //     // $.plan.connections[?(@[1]==99)][0]
        //     // output: [ "R4", "R5" ]

        //     // Biggest start: Math.max -> $.plan.connections[*][1]
        // });
    }
</script>

{#if first_robot_id}
    <div
        class="px-3 py-5 border border-primary rounded bg-white d-flex justify-content-center align-items-start"
        style="max-width: 100%; overflow-x: auto;"
    >
        <Robot id={first_robot_id} />
    </div>
{/if}
