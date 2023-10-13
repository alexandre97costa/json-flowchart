<script>
    import { isDark, flowchart } from "../stores";

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
        readFile(files[0]);
    }
</script>

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
