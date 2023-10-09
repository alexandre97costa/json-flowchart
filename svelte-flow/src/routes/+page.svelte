<script>
    import blank from "$lib/blank.png"
    let isDark = false;
    let hasFile = false;
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
            <div class="input-group">
                <input
                    class={"form-control border " +
                        (isDark
                            ? "bg-black text-light border-secondary"
                            : "bg-white text-dark")}
                    type="file"
                    id="input"
                />
                <button
                    class="btn btn-primary"
                    on:click={() => {
                        hasFile = !hasFile;
                    }}
                >
                    Create
                    <i class="bi bi-rocket-takeoff-fill ms-2" />
                </button>
            </div>
        </div>
    </div>

    <hr class="mt-3 mb-4 text-secondary d-none d-md-block" />

    <!-- Content -->

    <div class="row gx-4 mt-4 justify-content-center">
        {#if hasFile}
            <div class="col">
                <div
                    class={"p-3 border border rounded " +
                        (isDark
                            ? "bg-black text-light border-secondary"
                            : "bg-light text-dark")}
                >
                    A
                </div>
            </div>
        {:else}
            <div class="col-3 text-center">
                <p class="fs-5 text-secondary ">Waiting for a file...</p>
                <img src={blank} alt="" class="img-fluid">
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
                <a
                    href="#"
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
                </a>
            </li>
            <li>
                <a
                    href="#"
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
                </a>
            </li>
        </ul>
    </div>
</div>
