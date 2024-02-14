<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import {
		mdiChevronLeft,
		mdiDotsVertical,
		mdiEye,
		mdiMapMarker,
		mdiPlus,
		mdiWeatherSunny
	} from '@mdi/js';
	import {
		Avatar,
		Button,
		Card,
		Header,
		Icon,
		Menu,
		MenuItem,
		ProgressCircle,
		Toggle
	} from 'svelte-ux';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import L from 'leaflet';
	import './cloud.css';
	import WeatherChart from '$lib/components/charts/highcharts/weatherChart/WeatherChart.svelte';
	import Marker from '$lib/components/leaflet/Marker.svelte';
	import WeatherWidget from '$lib/components/weatherWidget/WeatherWidget.svelte';
	
	export let data;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;
	let mapWidth: number = 100;
	let mapHeight: number = 100;
	let mapPopupOpen: boolean = false;

	$: console.log(data);
</script>

<h1 class="text-4xl font-semibold text-slate-700 mb-4">
	<Button icon={mdiChevronLeft} size="lg" on:click={() => goto(`/app/locations`)} />
	{#await data.location}
		<ProgressCircle />
	{:then location}
		{location.name}
	{/await}
</h1>

<!-- <WeatherWidget /> -->

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
			<Toggle let:on={open} let:toggle>
				<Button icon={mdiDotsVertical} on:click={toggle}>
					<Menu {open} on:close={toggle}>
						<MenuItem icon={mdiPlus}>Add Device</MenuItem>
					</Menu>
				</Button>
			</Toggle>
		</div>
	</Header>

	<div
		class="w-full min-h-96"
		slot="contents"
		bind:offsetHeight={mapHeight}
		bind:offsetWidth={mapWidth}
	>
		<Leaflet {view} {zoom} disableZoom={true} width={mapWidth} height={mapHeight}>
			{#await data.sensors}
				<ProgressCircle />
			{:then sensors}
				{#each sensors as sensor}
					<Marker
						latLng={[sensor.cw_devices.lat, sensor.cw_devices.long]}
						width={40}
						height={40}
						bind:popupOpen={mapPopupOpen}
					>
						<Icon data={mdiMapMarker} classes={{ root: 'text-red-900' }} />
						<div slot="popup">
							<Card>
								<Header slot="header" class="gap-0">
									<div slot="title" class="text-nowrap text-xl font-medium">
										{sensor.cw_devices.name}
									</div>
									<div slot="avatar">
										<Avatar class="bg-accent-500 text-white font-bold mr-4">SS</Avatar>
									</div>
								</Header>
								<div slot="contents" class="grid grid-cols-2"></div>
								<div slot="actions">
									<Button variant="fill" on:click={() => (mapPopupOpen = false)}>Close</Button>
									<Button
										variant="fill-light"
										color="blue"
										icon={mdiEye}
										on:click={() =>
											goto(`/app/locations/${$page.params.location_name}/${sensor.dev_eui}`)}
										>View Details</Button
									>
								</div>
							</Card>
						</div>
					</Marker>
				{/each}
			{/await}
		</Leaflet>
	</div>
</Card>
