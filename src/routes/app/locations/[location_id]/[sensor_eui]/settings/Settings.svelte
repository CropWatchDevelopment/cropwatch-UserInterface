<script lang="ts">
	import { mdiFloppy, mdiSpeaker, mdiTimer } from '@mdi/js';
	import { Button, NumberStepper, SelectField } from 'svelte-ux';

	let frequency: number = 10;
</script>

<h1 class="text-lg font-bold">Sensor Settings</h1>

<div class="flex flex-col gap-2">
	<h1>Send Frequency</h1>
	<NumberStepper min={10} max={1440} bind:value={frequency} />
</div>

<div class="grid grid-flow-row grid-cols-3 gap-2 mt-4">
	<div>
		<h1>Nitrogen Calibration</h1>
		<NumberStepper min={10} max={1440} bind:value={frequency} />
	</div>

	<div>
		<h1>Phosphorus Calibration</h1>
		<NumberStepper min={10} max={1440} bind:value={frequency} />
	</div>

	<div>
		<h1>Potassium Calibration</h1>
		<NumberStepper min={10} max={1440} bind:value={frequency} />
	</div>

</div>

<div class="my-4">
    <h1>Send ID Signal to device (only some models support this feature)</h1>
    <Button variant="fill-light" color={'accent'} icon={mdiSpeaker}>Send</Button>
</div>
<Button variant="fill-light" color={'accent'} icon={mdiFloppy}>Save</Button>
