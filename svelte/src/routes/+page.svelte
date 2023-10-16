<script>
    // Files
    import { passionfruit } from "$lib";
    import { isDark, flowchart } from "../stores";

    // Components
    import JsonPreview from "../components/json_preview.svelte";
    import ThemePicker from "../components/theme_picker.svelte";
    import FileInput from "../components/file_input.svelte";
    import Flow from "../components/passionfruit/flow.svelte";
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
        <FileInput />
    </div>

    <!-- Content -->
    <div class="row gx-4 mt-5 justify-content-center">
        {#if $flowchart}
            <div class="col-11">
                <!-- <Flowchart /> -->
                <Flow />
                <JsonPreview />
            </div>
        {:else}
            <div class="col-12 col-md-3 d-flex flex-column align-items-stretch">
                <p class="fs-5 text-secondary my-3 text-center">
                    Waiting for a file...
                </p>
                <button
                    class={"btn w-100 " +
                        ($isDark ? "btn-outline-warning" : "btn-warning")}
                    on:click={(e) => {
                        $flowchart = passionfruit;
                    }}
                >
                    <span class="font-monospace fw-bold"> passionfruit </span>
                </button>
            </div>
        {/if}
    </div>
</div>

<ThemePicker />
