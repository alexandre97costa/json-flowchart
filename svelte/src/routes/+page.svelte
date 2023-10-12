<script>
    import blank from "$lib/blank.png";
    import Example_2 from "../../../examples/example2.json";
    import Example_Empty from "../../../examples/example_empty.json";

    import Node from "../components/node.svelte";
    import RecurseNode from "../components/recurse_node.svelte";
    import JsonPreview from "../components/json_preview.svelte";
    import { Validator } from "jsonschema";
    var v = new Validator();
    // console.log(v.validate(4, {"type": "number"}));

    let isDark = false;
    let hasFile = false;

    let files;
    let json;
    let nodes = [];

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            json = JSON.parse(e.target.result);
            nodes = json.nodes;
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

<div class={"container-fluid min-vh-100 " + (isDark ? "bg-dark" : "bg-white")}>
    <!-- Header -->
    <div class="row row-cols-1 row-cols-md-2 gy-2 align-items-center">
        <div class="col">
            <div
                class={"display-4 py-3 text-center text-md-start " +
                    (isDark ? "text-light" : "text-dark")}
            >
                Json <i class="bi bi-arrow-right fs-1 text-primary" /> Flowchart
            </div>
        </div>
        <div class="col">
            <label for="input" class="form-label text-secondary">
                Upload a valid JSON to generate a flowchart
            </label>
            <!-- <div class="input-group"> -->
            <input
                class={"form-control border " +
                    (isDark
                        ? "bg-black text-light border-secondary"
                        : "bg-white text-dark")}
                type="file"
                id="input"
                bind:files
            />
        </div>
    </div>

    <!-- <hr class="mt-3 mb-4 text-secondary d-none d-md-block" /> -->

    <!-- Content -->

    <div class="row gx-4 mt-5 justify-content-center">
        {#if hasFile}
            <div class="col-11">
                <!-- Flowchart -->
                <div
                    class="px-3 py-5 border rounded bg-white d-flex justify-content-start"
                    style="max-width: 100%; overflow-x: auto;"
                >
                    <RecurseNode {nodes} start={true} />
                </div>

                <JsonPreview {isDark} {json} />
            </div>
        {:else}
            <div class="col-4 text-center">
                <img src={blank} alt="" class="img-fluid w-50" />
                <p class="fs-5 text-secondary my-3">Waiting for a file...</p>
                <div class="row row-cols-2 g-3">
                    <div class="col">
                        <button
                            class="btn btn-outline-dark w-100"
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
                            class="btn btn-outline-dark w-100"
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

<!-- Dark Mode -->
<div class="fixed-bottom bottom-0 start-0 p-2">
    <div class="dropdown" data-bs-theme="dark">
        <button
            class="btn dropdown-toggle border"
            class:btn-dark={isDark}
            class:border-secondary={isDark}
            class:btn-light={!isDark}
            type="button"
            id="dropdownMenuButtonLight"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Select a color mode"
        >
            {#if isDark}
                <i class="bi bi-moon-stars-fill me-2" />
            {:else}
                <i class="bi bi-brightness-high-fill me-2" />
            {/if}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
            <li>
                <button
                    class="dropdown-item d-flex justify-content-between gap-3"
                    class:active={!isDark}
                    on:click={() => {
                        isDark = false;
                    }}
                >
                    <i class="bi bi-brightness-high-fill" />
                    <span class="flex-fill text-start">Light</span>
                    {#if !isDark}
                        <i class="bi bi-check" />
                    {/if}
                </button>
            </li>
            <li>
                <button
                    class="dropdown-item d-flex justify-content-between gap-3"
                    class:active={isDark}
                    on:click={() => {
                        isDark = true;
                    }}
                >
                    <i class="bi bi-moon-stars-fill" />
                    <span class="flex-fill text-start">Dark</span>
                    {#if isDark}
                        <i class="bi bi-check" />
                    {/if}
                </button>
            </li>
        </ul>
    </div>
</div>
