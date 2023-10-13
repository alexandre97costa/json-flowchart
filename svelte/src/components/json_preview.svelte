<script>
    import { isDark, flowchart } from "../stores";
</script>

<div class="accordion mt-5" id="accordionExample">
    <div class={"accordion-item border " + ($isDark ? "border-secondary" : "")}>
        <h2 class="accordion-header" id="headingOne">
            <button
                class={"accordion-button "}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
            >
                JSON Preview
            </button>
        </h2>
        <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
        >
            <div
                class={"accordion-body " + ($isDark ? "bg-black" : "bg-light")}
            >
                <div class="row">
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
                    <div class="col-12">
                        <p class="fs-4 fw-bold">Plan</p>
                        <pre>{JSON.stringify(
                                $flowchart,
                                null,
                                4
                            )}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
