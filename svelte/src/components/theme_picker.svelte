<script>
    import { isDark } from "../stores";
</script>

<div class="fixed-bottom bottom-0 start-0 p-2">
    <div class="dropdown" data-bs-theme="dark">
        <button
            class="btn dropdown-toggle border"
            class:btn-dark={$isDark}
            class:border-secondary={$isDark}
            class:btn-light={!$isDark}
            type="button"
            id="dropdownMenuButtonLight"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Select a color mode"
        >
            {#if $isDark}
                <i class="bi bi-moon-stars-fill me-2" />
            {:else}
                <i class="bi bi-brightness-high-fill me-2" />
            {/if}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonLight">
            <li>
                <button
                    class="dropdown-item d-flex justify-content-between gap-3"
                    class:active={!$isDark}
                    on:click={() => {
                        $isDark = false;
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
                    class:active={$isDark}
                    on:click={() => {
                        $isDark = true;
                    }}
                >
                    <i class="bi bi-moon-stars-fill" />
                    <span class="flex-fill text-start">Dark</span>
                    {#if $isDark}
                        <i class="bi bi-check" />
                    {/if}
                </button>
            </li>
        </ul>
    </div>
</div>
