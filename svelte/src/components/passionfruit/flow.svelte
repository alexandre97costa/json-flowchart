<script>
    import JsonPath from "jsonpath";
    import { flowchart } from "../../stores";
    import { Schema_Robot, Schema_Connection } from "$lib";
    import Robot from "./robot.svelte";
    import Line from "../line.svelte";

    import { Validator } from "jsonschema";
    let v = new Validator();

    let first_robot_id = "";

    $: {
        let minimum_start = Math.min(
            ...JsonPath.query($flowchart, "$.plan.connections[*].start")
        );

        first_robot_id = JsonPath.query(
            $flowchart,
            "$.plan.connections[?(@.start==" + minimum_start + ")].id"
        )[0];
    }

    const plan = {
        add: (robot, connection) => {
            let valid_robot = v.validate(robot, Schema_Robot).valid;
            let valid_connection = v.validate(
                connection,
                Schema_Connection
            ).valid;

            console.table($flowchart.plan.connections);

            if (valid_robot) $flowchart.plan.robots.push(robot);

            if (valid_connection) {
                let new_connections = Array.from(
                    $flowchart.plan.connections,
                    (p_connection) => {
                        if (p_connection.start >= connection.start)
                            p_connection.start++;

                        if (p_connection.end >= connection.end)
                            p_connection.end++;

                        return p_connection;
                    }
                );

                new_connections.push(connection);
                console.table(new_connections);

                $flowchart.plan.connections = new_connections;
            }

            $flowchart = $flowchart;
            console.log($flowchart);
        },
        delete: (id) => {
            let robot = plan.get_robot(id);
            let connection = plan.get_connection(id);
            
            let new_robots = $flowchart.plan.robots.filter((p_robot) => {
                return JSON.stringify(p_robot) != JSON.stringify(robot);
            });

            let new_connections = $flowchart.plan.connections.filter((p_connection) => {
                return JSON.stringify(p_connection) != JSON.stringify(connection);
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
        get_connection: (id) => {
            return JsonPath.query(
                $flowchart,
                '$.plan.connections[?(@.id=="' + id + '")]'
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
                let connection = {
                    id: "R7",
                    start: 2,
                    end: 3,
                };
                plan.add(robot, connection);
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
