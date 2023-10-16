<script>
    import { flowchart, isvalid_flowchart, schema_errors } from "../stores";
    import { Schema_Flowchart, Schema_Robot, Schema_Connection } from "$lib";
    import { Validator } from "jsonschema";

    let v = new Validator();
    v.addSchema(Schema_Robot, "/Robot");
    v.addSchema(Schema_Connection, "/Connection");

    let files;

    $: {
        if (!!$flowchart) {
            let validation = v.validate($flowchart, Schema_Flowchart);
            if (!!validation.errors.length) {
                $schema_errors = validation.errors;
            } else {
                $schema_errors = [];
                $isvalid_flowchart = validation.valid;
            }
        }
    }

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            let validation = v.validate(
                JSON.parse(e.target.result),
                Schema_Flowchart
            );

            if (!!validation.errors.length) {
                $schema_errors = validation.errors;
            } else {
                $flowchart = JSON.parse(e.target.result);
                $schema_errors = new Array();
            }
            $isvalid_flowchart = validation.valid;
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
    <div class="input-group">
        <input
            class="form-control border bg-opacity-25"
            type="file"
            id="input"
            bind:files
        />
        {#if files}
            {#if $isvalid_flowchart}
                <i
                    title="This file is valid"
                    role="button"
                    class="fs-5 input-group-text bi bi-check-lg text-success bg-success-subtle"
                />
            {:else}
                <i
                    title="This file is not valid"
                    role="button"
                    class="fs-5 input-group-text bi bi-exclamation-lg text-danger bg-danger-subtle"
                />
            {/if}
        {/if}
    </div>
</div>
