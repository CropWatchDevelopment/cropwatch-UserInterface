<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import {
		mdiArrowLeft,
		mdiChevronLeft,
		mdiChevronRight,
		mdiCloudPercent,
		mdiLandFields,
		mdiMoleculeCo2,
		mdiTestTube,
		mdiThermometer,
		mdiWateringCanOutline,
		mdiWavesArrowUp,
		mdiWeatherSunny
	} from '@mdi/js';
	import { Button, Card, Icon, ListItem, ProgressCircle } from 'svelte-ux';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import CWTable from '$lib/components/table/CWTable.svelte';
	import L from 'leaflet';
	import './cloud.css';
	import Sunny from '$lib/components/weatherIcons/Sunny.svelte';
	import WeatherChart from '$lib/components/charts/highcharts/weatherChart/WeatherChart.svelte';
	import type { PageData } from '../$types';

	let bounds: L.LatLngBoundsExpression | undefined = undefined;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;

	let sensorList = [{ ID: 0, Type: 'Soil Sensor', SensorName: 'CW-SS-TMEPNPK', Status: true }];
	
	export let data;

	let rows = [
		{
			name: 'Item 1',
			description: 'Description 1',
			action: { type: 'button', text: '', click: () => goto(`/app/locations/${$page.params.location_name}/id`) }
		},
		{
			name: 'Item 2',
			description: 'Description 2',
			action: { type: 'button', text: '', click: () => alert('Clicked Item 2') }
		}
	];
</script>

<h1 class="text-2xl font-bold border-b border-b-gray-300 mb-4">
	<Button
		icon={mdiChevronLeft}
		on:click={() => goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')))}
	/>
	{$page.params.location_name} Green House
</h1>

<div class="relative mb-4 overflow-hidden">
	{#await data.weatherJSON}
		<ProgressCircle />
	{:then weather} 
	<WeatherChart WeatherJSON={weather} />
	{:catch error}
		<pre>No Weather source currently available!</pre>
	{/await}
</div>

<div class="mb-4">
	<h2 class="font-bold mb-4">Indoor Center</h2>
	<div class="grid grid-cols-2 gap-4">
		<Card title="Above Ground">
			<div>
				<ol>
					<ListItem>
						<div slot="title">
							<Icon data={mdiThermometer} /> Air Temp
						</div>
						<div slot="actions">
							<Button icon={mdiChevronRight} class="p-2 text-black/50" />
						</div>
					</ListItem>
					<ListItem title="Title">
						<div slot="title">
							<Icon data={mdiCloudPercent} /> Humidity
						</div>
						<div slot="actions">
							<Button icon={mdiChevronRight} class="p-2 text-black/50" />
						</div>
					</ListItem>
					<ListItem title="Title">
						<div slot="title">
							<Icon data={mdiMoleculeCo2} /> CO₂
						</div>
						<div slot="actions">
							<Button icon={mdiChevronRight} class="p-2 text-black/50" />
						</div>
					</ListItem>
					<ListItem title="Title">
						<div slot="title">
							<Icon data={mdiWavesArrowUp} /> VPD
						</div>
						<div slot="actions">
							<Button icon={mdiChevronRight} class="p-2 text-black/50" />
						</div>
					</ListItem>
				</ol>
			</div>
		</Card>

		<Card title="Below Ground" class="justify-start mb-4">
			<ol>
				<ListItem title="Title">
					<div slot="title">
						<Icon data={mdiThermometer} /> Soil Temp
					</div>
					<div slot="actions">
						<Button icon={mdiChevronRight} class="p-2 text-black/50" />
					</div>
				</ListItem>
				<ListItem title="Title">
					<div slot="title">
						<Icon data={mdiTestTube} /> pH
					</div>
					<div slot="actions">
						<Button icon={mdiChevronRight} class="p-2 text-black/50" />
					</div>
				</ListItem>
				<ListItem title="Title">
					<div slot="title">
						<Icon data={mdiWateringCanOutline} /> Soil Moisture
					</div>
					<div slot="actions">
						<Button icon={mdiChevronRight} class="p-2 text-black/50" />
					</div>
				</ListItem>
			</ol>
		</Card>
	</div>
</div>

<div class="mt-4">
	<h2 class="font-bold mb-4">Map</h2>
	<div class="grid w-full min-h-96">
		<Leaflet {view} {zoom} disableZoom={true}></Leaflet>
	</div>
</div>

<div class="mt-6">
	<h2 class="font-bold mb-4">Sensor List</h2>
	<CWTable rows={rows}></CWTable>
</div>
