<script>
    // Files
    import blank from "$lib/blank.png";
    import Example_2 from "../../../examples/example2.json";
    import Example_Empty from "../../../examples/example_empty.json";
    import { isDark, flowchart } from "../stores";

    // Components
    import Flowchart from "../components/flowchart.svelte";
    import JsonPreview from "../components/json_preview.svelte";
    import ThemePicker from "../components/theme_picker.svelte";

    // Modules
    import JsonPath from "jsonpath";
    import { Validator } from "jsonschema";
    // var v = new Validator();
    // console.log(v.validate(4, {"type": "number"}));


    let hasFile = false;
    let files;
    let json = {};

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
        let segment2 = flowchart_string.slice(first_location.end, last_location.start);
        let segment3 = flowchart_string.slice(last_location.end);

        flowchart_string = segment1 + JSON.stringify(last_node) + segment2 + JSON.stringify(first_node) + segment3;

        $flowchart = JSON.parse(flowchart_string)
        
    }

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            $flowchart = JSON.parse(e.target.result);
        });
        reader.readAsText(file);
    }

    $: if (files) {
        // 'files' is of type 'FileList', not an Array
        // https://developer.mozilla.org/en-US/docs/Web/API/FileList
        hasFile = true;
        readFile(files[0]);
    }
</script>

<div class={"container-fluid min-vh-100 " + ($isDark ? "bg-dark" : "bg-white")}>
    <!-- Header -->
    <div class="row row-cols-1 row-cols-md-2 gy-2 align-items-center">
        <div class="col">
            <div
                class={"display-4 py-3 text-center text-md-start " +
                    ($isDark ? "text-light" : "text-dark")}
            >
                Json <i class="bi bi-arrow-right fs-1 text-primary" /> Flowchart
            </div>
        </div>
        <div class="col">
            <label for="input" class="form-label text-secondary">
                Upload a valid JSON to generate a flowchart
            </label>
            <input
                class={"form-control border " +
                    ($isDark
                        ? "bg-black text-light border-secondary"
                        : "bg-white text-dark")}
                type="file"
                id="input"
                bind:files
            />
        </div>
    </div>

    <!-- Content -->

    <div class="row gx-4 mt-5 justify-content-center">
        {#if hasFile}
            <div class="col-11 d-flex flex-column align-items-center gap-3">
                <Flowchart/>
                <button class="btn btn-danger fs-4 px-3 d-flex gap-2  justify-content-center" on:click={e => {swapNodes("R1", "R3")}}>
                    <i class="bi bi-1-square"></i>
                    <i class="bi bi-arrow-left-right"></i>
                    <i class="bi bi-3-square"></i>
                </button>
                <JsonPreview/>
            </div>
        {:else}
            <div class="col-4 text-center">
                <img src={blank} alt="" class="img-fluid w-50" />
                <p class="fs-5 text-secondary my-3">Waiting for a file...</p>
                <div class="row row-cols-2 g-3">
                    <div class="col">
                        <button
                            class={"btn w-100 " + ($isDark ? "btn-outline-light" : "btn-outline-dark")}
                            on:click={(e) => {
                                hasFile = true;
                                let blob = new Blob(
                                    [JSON.stringify(Example_2)],
                                    { type: "application/json" }
                                );
                                readFile(blob);
                            }}
                        >
                            <!-- <i class="bi bi-file-earmark-arrow-up me-2"></i> -->
                            <span>example2</span>
                        </button>
                    </div>
                    <div class="col">
                        <button
                            class={"btn w-100 " + ($isDark ? "btn-outline-light" : "btn-outline-dark")}
                            on:click={(e) => {
                                hasFile = true;
                                let blob = new Blob(
                                    [JSON.stringify(Example_Empty)],
                                    { type: "application/json" }
                                );
                                readFile(blob);
                            }}
                        >
                            <span>example_empty</span>
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<ThemePicker/>
