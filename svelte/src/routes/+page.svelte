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
    import { Validator } from "jsonschema";
    // var v = new Validator();
    // console.log(v.validate(4, {"type": "number"}));


    let hasFile = false;
    let files;

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
