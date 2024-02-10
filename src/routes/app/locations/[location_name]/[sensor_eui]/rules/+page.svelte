<script lang="ts">
	import { page } from '$app/stores';
	import { Svelvet, Node, Anchor, Edge, Controls } from 'svelvet';

    
</script>

<h1 class="text-4xl font-semibold text-slate-700 mb-4">Sensor Rules</h1>
<Svelvet width={500} height={500} theme="dark" zoom={0.5} minimap>
	<Node label="Demo Node" TD />
    <Node id={'if'} label={'IF'} inputs={1} outputs={2} TD />
	<Node id={$page.params.sensor_eui} label={$page.params.sensor_eui} inputs={0} outputs={1} />
	<Controls slot="controls" horizontal />
</Svelvet>
