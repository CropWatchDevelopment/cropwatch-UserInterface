<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import {
		mdiArrowLeft,
		mdiChevronLeft,
		mdiChevronRight,
		mdiCloud,
		mdiCloudPercent,
		mdiDotsVertical,
		mdiLandFields,
		mdiMap,
		mdiMapMarker,
		mdiMarker,
		mdiMoleculeCo2,
		mdiTestTube,
		mdiThermometer,
		mdiWater,
		mdiWateringCanOutline,
		mdiWavesArrowUp,
		mdiWeatherSunny
	} from '@mdi/js';
	import {
		Avatar,
		Button,
		Card,
		Duration,
		Header,
		Icon,
		ListItem,
		ProgressCircle
	} from 'svelte-ux';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import CWTable from '$lib/components/table/CWTable.svelte';
	import L from 'leaflet';
	import './cloud.css';
	import Sunny from '$lib/components/weatherIcons/Sunny.svelte';
	import WeatherChart from '$lib/components/charts/highcharts/weatherChart/WeatherChart.svelte';
	import type { PageData } from '../$types';
	import { subSeconds } from 'date-fns';
	import CWStatCard from '$lib/components/stat-card/CWStatCard.svelte';

	let bounds: L.LatLngBoundsExpression | undefined = undefined;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;
	let mapWidth: number = 100;
	let mapHeight: number = 100;

	let sensorList = [{ ID: 0, Type: 'Soil Sensor', SensorName: 'CW-SS-TMEPNPK', Status: true }];

	export let data;

	let rows = [
		{
			name: 'Item 1',
			description: 'Description 1',
			action: {
				type: 'button',
				text: '',
				click: () => goto(`/app/locations/${$page.params.location_name}/id`)
			}
		},
		{
			name: 'Item 2',
			description: 'Description 2',
			action: { type: 'button', text: '', click: () => alert('Clicked Item 2') }
		}
	];
</script>

<h1 class="text-4xl font-semibold text-slate-700 mb-4">
	<Button
		icon={mdiChevronLeft}
		size="lg"
		on:click={() => goto(`/app/locations/${$page.params.location_name}`)}
	/>
	{$page.params.location_name} Green House
</h1>

<div class="relative grid grid-cols-1 md:grid-cols-2 my-2 gap-4">
	<CWStatCard title="Outside Temperature" value={14.7} optimal={20} notation="°c" icon={mdiThermometer} />
	<CWStatCard title="Humidity" value={60} optimal={34} notation="%" icon={mdiCloud} />
</div>

<Card class="my-2">
	<Header slot="header" class="gap-0">
		<div slot="title" class="text-nowrap text-xl font-medium">Overview Map</div>
		<div slot="avatar">
			<Avatar class="bg-accent-500 text-white font-bold mr-4">
				<Icon data={mdiWeatherSunny} />
			</Avatar>
		</div>
		<div slot="actions">
			<Button icon={mdiDotsVertical} />
		</div>
	</Header>
	<div slot="contents">
		<div class="relative mb-4 overflow-hidden">
			{#await data.weatherJSON}
				<ProgressCircle />
			{:then weather}
				<WeatherChart WeatherJSON={weather} />
			{:catch error}
				<pre>No Weather source currently available!</pre>
			{/await}
		</div>
	</div>
</Card>

<Card>
	<Header slot="header" class="gap-0">
		<div slot="title" class="text-nowrap text-xl font-medium">Overview Map</div>
		<div slot="avatar">
			<Avatar class="bg-accent-500 text-white font-bold mr-4">
				<Icon data={mdiMapMarker} />
			</Avatar>
		</div>
		<div slot="actions">
			<Button icon={mdiDotsVertical} />
		</div>
	</Header>
	<div class="w-full min-h-96" slot="contents" bind:offsetHeight={mapHeight} bind:offsetWidth={mapWidth}>
		<Leaflet {view} {zoom} disableZoom={true} width={mapWidth} height={mapHeight}></Leaflet>
	</div>
</Card>
