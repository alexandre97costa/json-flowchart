<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../../stores";
    import Robot from "./robot.svelte";

    let first_robot_id = "";

    $: {
        let minStart = Math.min(
            ...JsonPath.query($flowchart, "$.plan.connections[*].start")
        );
        
        first_robot_id = JsonPath.query(
            $flowchart,
            "$.plan.connections[?(@.start==" + minStart + ")].id"
        )[0];
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
