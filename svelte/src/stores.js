import { writable } from "svelte/store";

export const isDark = writable(false);

export const grabbed_node = writable("");
export const drop_location = writable("");