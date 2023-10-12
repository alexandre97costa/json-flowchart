<script>
    import RecurseNode from "./recurse_node.svelte";
    import { grabbed_node } from "../stores";

    export let nodes = [];

    // os nodes são responsáveis por editarem o store "grabbed_node";
    // o flowchart apanha logo a info atualizada, mas não faz nada com esse update;

    // 1. os nodes e lines têm um on:drop, que manda um dispatch com info de onde aconteceu o drop
    // 2. esse drop navega até aos recurse_node, e eventualmente até ao flowchart
    // 3. o flowchart então pega no grabbed node e insere-o no seu nodes
    // 4. por reactividade, os recurse_nodes são todos atualizados, refrescando o flowchart por completo

    // nota: talvez seja appropriado o objeto json ser guardado num store tb,
    // para que o JsonPreview tb tenha acesso à nova info.
</script>

<div
    class="px-3 py-5 border rounded bg-white d-flex justify-content-start"
    style="max-width: 100%; overflow-x: auto;"
>
    <RecurseNode {nodes} start={true} />
</div>
