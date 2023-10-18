<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../stores";
    import { robot_schema } from "$lib";
    import Robot from "./robot.svelte";
    import Line from "./line.svelte";

    import { Validator } from "jsonschema";
    let v = new Validator();

    $: {
    }

    const plan = {
        add: (robot) => {
            let valid_robot = v.validate(robot, robot_schema).valid;

            if (valid_robot) $flowchart.plan.robots.push(robot);

            $flowchart = $flowchart;
        },
        delete: (id) => {
            let robot = plan.get_robot(id);

            let new_robots = $flowchart.plan.robots.filter((p_robot) => {
                return JSON.stringify(p_robot) != JSON.stringify(robot);
            });

            $flowchart.plan.robots = new_robots;
            $flowchart.plan.connections = new_connections;

            $flowchart = $flowchart;
        },
        swap: (id1, id2) => {
            console.log(id1, id2);
        },
        move: (id) => {
            console.log(id);
        },

        get_robot: (id) => {
            return JsonPath.query(
                $flowchart,
                '$.plan.robots[?(@.id=="' + id + '")]'
            )[0];
        },
    };
</script>

{#if first_robot_id}
    <div
        class="px-3 py-5 border border-primary rounded d-flex justify-content-start align-items-start"
        style="overflow-x: auto;"
    >
        <div class="d-flex align-items-start">
            <Robot type="start" />
            <Line />
            <Robot id={first_robot_id} />
        </div>
    </div>

    <!-- Buttons -->
    <div class="d-flex gap-3 my-3">
        <!-- Add -->
        <button
            class="btn btn-outline-primary d-flex align-items-center gap-3 fw-bold font-monospace"
            on:click={() => {
                let robot = {
                    id: "R7",
                    name: "🍑 Peach",
                    acronym: "R7",
                };
                plan.add(robot);
            }}
        >
            <span class="badge bg-primary">
                <i class="bi bi-plus-lg fs-4" />
            </span>
            <span> add robot </span>
        </button>
        <!-- Delete -->
        <button
            class="btn btn-outline-primary d-flex align-items-center gap-3 fw-bold font-monospace"
            on:click={() => {
                plan.delete("R5");
            }}
        >
            <span class="badge bg-primary">
                <i class="bi bi-trash3 fs-4" />
            </span>
            <span> delete robot </span>
        </button>
        <!-- Swap -->
        <button
            class="btn btn-outline-primary d-flex align-items-center gap-3 fw-bold font-monospace"
            on:click={() => {
                plan.swap("R2", "R3");
            }}
        >
            <span class="badge bg-primary">
                <i class="bi bi-shuffle fs-4" />
            </span>
            <span> swap robots </span>
        </button>
        <!-- Move -->
        <button
            class="btn btn-outline-primary d-flex align-items-center gap-3 fw-bold font-monospace"
            on:click={() => {
                plan.move("R4");
            }}
        >
            <span class="badge bg-primary">
                <i class="bi bi-arrows-move fs-4" />
            </span>
            <span> move robot </span>
        </button>
    </div>
{/if}
