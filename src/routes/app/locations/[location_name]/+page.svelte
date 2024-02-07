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
	import { Button, Card, Icon, ListItem } from 'svelte-ux';
	import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
	import CWTable from '$lib/components/table/CWTable.svelte';
	import L from 'leaflet';
    import cloud from '$lib/images/cloud.png';
	import './cloud.css';
	import Sunny from '$lib/components/weatherIcons/Sunny.svelte';

	let bounds: L.LatLngBoundsExpression | undefined = undefined;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;

	let sensorList = [{ ID: 0, Type: 'Soil Sensor', SensorName: 'CW-SS-TMEPNPK', Status: true }];
</script>

<h1 class="text-2xl font-bold border-b border-b-gray-300 mb-4">
	<Button
		icon={mdiChevronLeft}
		on:click={() => goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')))}
	/>
	{$page.params.location_name} Green House
</h1>

<div class="relative mb-4 overflow-hidden">
    <img src={cloud} class="absolute opacity-50 z-10" style="left: 60%; top: -115%"  alt="cloud1" />
    <img src={cloud} class="absolute opacity-50 z-10 rotate-45" style="top: 70%; left: -80px" alt="cloud1" />
    <div class="rounded-3xl bg-blue-500/50 p-10 text-white">
		<div>
			<!-- <p class="text-white text-sm">Outside Weather</p> -->
			<p class="text-white text-sm mb-5">{new Date().toLocaleTimeString()}</p>
			<div class="grid grid-flow-row grid-cols-12 mt-1">
				<div class="col-span-2 mb-5">
					<!-- <div id="cloud" /> -->
					<Sunny cloud1={true} cloud2={true} />
				</div>
				<div class="col-span-3">
					<p class="text-5xl ml-2"><b>18°C</b></p>
				</div>
				<div class="col-span-4">
					<p class="text-lg mb-2"><b>Partly Sunny</b></p>
					<p>Lite Breeze</p>
				</div>
			</div>
			<p class="my-5">There will be mostly sunny skies. The high will be 21.</p>
			<div class="grid grid-flow-row gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mt-3">
				<div class="z-20">
					<p class="text-base">Air Temp</p>
					<p class="text-2xl"><b>18°C</b></p>
				</div>

				<div>
					<p class="text-base">Humidity</p>
					<p class="text-2xl"><b>87%</b></p>
				</div>
				<div>
					<p class="text-base">Pressure</p>
					<p class="text-2xl"><b>5hPa</b></p>
				</div>
				<div>
					<p class="text-base">Wind</p>
					<p class="text-2xl"><b>0.4m/s NW</b></p>
				</div>
				<div>
					<p class="text-base">LUX/UV</p>
					<p class="text-2xl"><b>1500/3</b></p>
				</div>
				<div>
					<p class="text-base">Rainfall</p>
					<p class="text-2xl"><b>5mm/h</b></p>
				</div>
			</div>
		</div>
	</div>
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
	<CWTable data={sensorList}></CWTable>
</div>
