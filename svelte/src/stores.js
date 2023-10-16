import { writable } from "svelte/store";

export const isDark = writable(false);

export const grabbed_node_id = writable("");
export const drop_location = writable();
export const flowchart = writable();
export const isvalid_flowchart = writable(undefined);

export const schema_errors = writable([]);