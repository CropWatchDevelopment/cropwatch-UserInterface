<script lang="ts">
	import { mdiChevronRight, mdiMapMarker, mdiPlus } from '@mdi/js';
	import { Button, ListItem, Icon, Card } from 'svelte-ux';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import L from 'leaflet';
	import { goto } from '$app/navigation';

	let bounds: L.LatLngBoundsExpression | undefined = undefined;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;
</script>

<div class="grid grid-rows-12 h-full">
	<h1 class="row-span-1 text-2xl font-bold">All Locations</h1>
	<div class="grid row-span-11 grid-cols-7 gap-4 h-full">
		<div id="map" class="grid grid-flow-row col-span-5">
			<Leaflet {view} {zoom}></Leaflet>
		</div>
		<Card id="list" class="grid-flow-row col-span-2 justify-start" title="Location List">
			<ol>
				<ListItem title="Location Name">
					<div slot="subheading">
						<Icon data={mdiMapMarker} /> Saito
					</div>
					<div slot="actions">
						<Button icon={mdiChevronRight} class="p-2 text-black/50" on:click={() => goto('locations/saito')} />
					</div>
				</ListItem>
			</ol>
		</Card>
	</div>
</div>
