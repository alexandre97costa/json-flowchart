<script>
    import { isDark, flowchart } from "../stores";
    import { Schema_Flowchart, Schema_Robot, Schema_Connection } from "$lib";
    import { Validator } from "jsonschema";

    let v = new Validator();
    v.addSchema(Schema_Robot, "/Robot");
    v.addSchema(Schema_Connection, "/Connection");

    let files;
    let valid = null;

    $: {
        if (!!$flowchart) {
            let validation = v.validate($flowchart, Schema_Flowchart);
            
            console.log(validation);
            valid = validation.valid;
        }
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
        readFile(files[0]);
    }
</script>

<div class="col">
    <input
        class={"form-control border bg-opacity-10 " +
            ($isDark ? "text-light border-secondary " : "text-dark ") +
            (files ? (valid ? "bg-success " : "bg-danger ") : "bg-white")}
        type="file"
        id="input"
        bind:files
    />
</div>
