<script lang="ts">
	import { subSeconds } from 'date-fns';
	import CwBadge from '$lib/components/badge/CWBadge.svelte';
	import RadarChart from '$lib/components/charts/highcharts/highcharts-radarchart/RadarChart.svelte';
	import CWStatCard from '$lib/components/stat-card/CWStatCard.svelte';
	import { Avatar, Badge, Button, Card, Duration, Header, Tabs } from 'svelte-ux';
	import LineChart from '$lib/components/charts/highcharts/lineChart/LineChart.svelte';
	import { mdiArrowLeft } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let userAvailableTabs = [
		{ label: 'Dashboard', value: 1 },
		{ label: 'History', value: 2 },
		{ label: 'Settings', value: 3 },
		{ label: 'Notifications', value: 4 },
		{ label: 'Permissions', value: 5 }
	];
	let currentTab: number = 1;
</script>

<h1 class="text-4xl font-semibold text-slate-700 mb-4">
	<Button icon={mdiArrowLeft} on:click={() => goto(`/app/locations/${$page.params.location_name}`)} />
	CW-SS-THEPNPK
</h1>

<div class="grid grid-cols-3 grid-flow-row my-4">
	<div class="flex flex-col">
		<p class="mb-1 text-gray-600">Serial Number</p>
		<p class="text-sm">3234313765327904</p>
	</div>

	<div class="flex flex-col">
		<p class="mb-1 text-gray-600">Last Update</p>
		<p class="text-sm">{new Date().toLocaleTimeString()}</p>
	</div>

	<div class="flex flex-col">
		<p class="mb-1 text-gray-600">Tags</p>
		<div>
			<CwBadge text="test" twTextColor="text-blue-800" twBgColor="bg-blue-100" />
		</div>
	</div>
</div>

<Tabs options={userAvailableTabs} bind:value={currentTab}>
	<!-- <svelte:fragment slot="content" let:value>
		Page {value}
	</svelte:fragment> -->
</Tabs>

<div class="grid grid-cols-2 mt-10 gap-4 mb-2">
	<CWStatCard title="Current Temperature" />
	<CWStatCard title="Current Moisture" />
</div>

<div class="grid grid-cols-2 gap-2 mb-2">
	<Card>
		<Header title={'Soil Temperature'} slot="header" class="gap-0">
			<div slot="subheading">
				Last Update <Duration start={subSeconds(new Date(), 0)} totalUnits={1} /> ago
			</div>
		</Header>
		<LineChart />
	</Card>
	<Card>
		<Header title={'Soil Moisture'} slot="header" class="gap-0">
			<div slot="subheading">
				Last Update <Duration start={subSeconds(new Date(), 0)} totalUnits={1} /> ago
			</div>
		</Header>
		<div class="flex flex-row">
			<LineChart />
		</div>
	</Card>
</div>

<div class="grid grid-cols-3 mt-2 gap-4 mb-2">
	<CWStatCard title="Soil N" />
	<CWStatCard title="Soil P" />
	<CWStatCard title="Soil K" />
</div>

<div class="grid grid-cols-2 mt-2 gap-4 mb-2">
	<CWStatCard title="Soil pH" />
	<CWStatCard title="Soil EC" />
</div>

<Card>
	<Header title={'Soil Temperature'} slot="header" class="gap-0">
		<div slot="subheading">
			Last Update <Duration start={subSeconds(new Date(), 0)} totalUnits={1} /> ago
		</div>
	</Header>
	<RadarChart N={10} P={33} K={50} EC={150} PH={5.7} />
</Card>
