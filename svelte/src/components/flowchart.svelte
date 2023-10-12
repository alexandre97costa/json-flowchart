<script>
    import JsonPath from "jsonpath";
    import { grabbed_node_id, drop_location, flowchart } from "../stores";
    import RecurseNode from "./recurse_node.svelte";

    $: {
        if ($grabbed_node_id)
            console.log("Drag started in node: " + $grabbed_node_id);
    }
    $: {
        if ($drop_location) console.log("Dropped on node: ", $drop_location.id);
    }

    // os nodes são responsáveis por editarem o store "grabbed_node_id";
    // o flowchart apanha logo a info atualizada, mas não faz nada com esse update;

    // 1. os nodes e lines têm um on:drop, que edita o store "drop_location"
    // 3. quando o drop_location muda, o flowchart então pega no grabbed node e insere-o no seu nodes
    // 4. por reactividade, os recurse_nodes são todos atualizados, refrescando o flowchart por completo

    function handleDropped() {
        if ($drop_location.type == "node") {
            swapNodes($grabbed_node_id, $drop_location.id);
        }
    }

    function getNodeById(node_id) {
        // find node path by id
        // todo
        let node_path = JsonPath.paths($flowchart, "$..details")
            .map((path) => {
                return path.reduce((accumulator, current, index) => {
                    return index == 0
                        ? (accumulator = current)
                        : (accumulator += "['" + current + "']");
                });
            })
            .find((path) => JsonPath.query($flowchart, path)[0].id == node_id);

        // get obj by path
        return JsonPath.query($flowchart, node_path)[0];
    }

    function getNodeLocation(node_obj) {
        let node_string = JSON.stringify(node_obj);
        let index = JSON.stringify($flowchart).indexOf(node_string);

        return {
            start: index,
            end: index + node_string.length,
        };
    }

    function swapNodes(node1_id, node2_id) {
        let node1 = getNodeById(node1_id);
        let node1_location = getNodeLocation(node1);
        let node2 = getNodeById(node2_id);
        let node2_location = getNodeLocation(node2);

        let first_node, last_node, first_location, last_location;

        if (node1_location.start < node2_location.start) {
            first_node = node1;
            last_node = node2;
            first_location = node1_location;
            last_location = node2_location;
        } else {
            first_node = node2;
            last_node = node1;
            first_location = node2_location;
            last_location = node1_location;
        }

        let flowchart_string = JSON.stringify($flowchart);

        // there are 3 segments in this flowchart, 2 slices need to happen

        // segment 1 ---- node ---- segment 2 ---- node ---- segment 3

        // we need to slice this string in 3 strings, and add the nodes in reverse order

        let segment1 = flowchart_string.slice(0, first_location.start);
        let segment2 = flowchart_string.slice(
            first_location.end,
            last_location.start
        );
        let segment3 = flowchart_string.slice(last_location.end);

        flowchart_string =
            segment1 +
            JSON.stringify(last_node) +
            segment2 +
            JSON.stringify(first_node) +
            segment3;

        $flowchart = JSON.parse(flowchart_string);
    }
</script>

<div
    class="px-3 py-5 border rounded bg-white d-flex justify-content-start"
    style="max-width: 100%; overflow-x: auto;"
>
    <RecurseNode
        nodes={$flowchart.nodes}
        start={true}
        on:dropped={(e) => {
            handleDropped();
        }}
    />
</div>