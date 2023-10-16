<script>
    import { isDark, flowchart, isvalid_flowchart, schema_errors } from "../stores";
</script>

<div class="accordion mt-5" id="accordionExample">
    <div class={"accordion-item border " + ($isDark ? "border-secondary" : "")}>
        <h2 class="accordion-header" id="headingOne">
            <button
                class={"accordion-button bg-light-subtle"}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
            >
                {$isvalid_flowchart ? "JSON Preview" : "The uploaded JSON contains schema errors:"}
            </button>
        </h2>
        <div
            id="collapseOne"
            class="accordion-collapse collapse"
            class:show={!$isvalid_flowchart}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
        >
            <div class={"accordion-body " + ($isvalid_flowchart ? "bg-light-subtle":"bg-danger-subtle")}>
                <div class="row">
                    {#if $isvalid_flowchart}
                        
                    <div class="col-6">
                        <p class="fs-4 fw-bold">Robots</p>
                        {#each $flowchart.plan.robots as robot}
                        <pre>{JSON.stringify(robot, null, 4)}</pre>
                        {/each}
                    </div>
                    <div class="col-6">
                        <p class="fs-4 fw-bold">Connections</p>
                        {#each $flowchart.plan.connections as connection}
                        <pre>{JSON.stringify(connection)}</pre>
                        {/each}
                    </div>
                    {:else}
                        {#each $schema_errors as schema_error}
                            <div>
                                <i class="text-danger bi bi-exclamation-diamond me-2"></i>
                                <span>{schema_error.stack.replace("instance.","")}</span>
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
