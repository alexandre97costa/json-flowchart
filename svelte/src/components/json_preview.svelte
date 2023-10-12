<script>
    import { isDark, flowchart } from "../stores";
    export let json;
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
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
        >
            <div
                class={"accordion-body " + ($isDark ? "bg-black" : "bg-light")}
            >
                <pre
                    class={$isDark
                        ? "bg-black text-success border-secondary"
                        : "bg-light text-secondary"}>{JSON.stringify(
                        $flowchart,
                        null,
                        4
                    )} 
        </pre>
            </div>
        </div>
    </div>
</div>
