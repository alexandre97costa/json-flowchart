<script>
    // Files
    import { pineapple } from "$lib";
    import {
        isDark,
        flowchart,
        isvalid_flowchart,
        schema_errors,
    } from "../stores";

    // Components
    import JsonPreview from "../components/json_preview.svelte";
    import ThemePicker from "../components/theme_picker.svelte";
    import FileInput from "../components/file_input.svelte";
    import Flow from "../components/passionfruit/flow.svelte";
</script>

<div class={"container-fluid min-vh-100 pb-5 "}>
    <!-- Header -->
    <div class="row row-cols-1 row-cols-md-2 gy-2 align-items-center">
        <div class="col">
            <div class={"display-4 py-3 text-center text-md-start "}>
                Json <i class="bi bi-arrow-right fs-1 text-primary" /> Flowchart
            </div>
        </div>
        <FileInput />
    </div>

    <!-- Content -->
    <div class="row gx-4 mt-5 justify-content-center">
        {#if $isvalid_flowchart}
            <div class="col-11">
                <Flow />
                <JsonPreview />
            </div>
        {:else if $schema_errors.length}
            <div class="col-11">
                <JsonPreview />
            </div>
        {:else}
            <div class="col-12 col-md-5 d-flex flex-column align-items-stretch">
                <p
                    class="display-5 text-secondary text-opacity-50 text-center py-5"
                >
                    Waiting for a file...
                </p>
                <p class="text-start">Use a preset file:</p>
                <button
                    class="btn btn-outline-warning w-100 d-flex align-items-center justify-content-between"
                    class:text-dark={!$isDark}
                    on:click={(e) => {
                        $flowchart = pineapple;
                    }}
                >
                    <span class="font-monospace fw-bold">pineapple</span>
                    <span class="font-monospace fw-bold">🍍</span>
                    <!-- <span class="badge text-bg-dark">v2</span> -->
                </button>
            </div>
        {/if}
    </div>
</div>

<ThemePicker />
