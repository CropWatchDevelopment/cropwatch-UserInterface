<script lang="ts">
	import { subSeconds } from 'date-fns';
	import RadarChart from '$lib/components/charts/highcharts/highcharts-radarchart/RadarChart.svelte';
	import CWStatCard from '$lib/components/stat-card/CWStatCard.svelte';
	import LineChart from '$lib/components/charts/highcharts/lineChart/LineChart.svelte';
	import { Card, Duration, Header } from 'svelte-ux';

</script>

<div class="grid grid-cols-2 mt-10 gap-4 mb-2">
	<CWStatCard title="Temperature" value={20.00} optimal={24.33} notation="°c" />
	<CWStatCard title="Moisture" value={28} optimal={25} notation="%"  />
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
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

<div class="grid grid-cols-1 md:grid-cols-3 mt-2 gap-4 mb-2">
	<CWStatCard title="Soil N" value={28} optimal={25} notation="mg/kg"   />
	<CWStatCard title="Soil P" value={28} optimal={25} notation="mg/kg"   />
	<CWStatCard title="Soil K" value={28} optimal={25} notation="mg/kg"   />
</div>

<div class="grid grid-cols-2 mt-2 gap-4 mb-2">
	<CWStatCard title="Soil pH" value={5.6} optimal={5.6} notation="pH"   />
	<CWStatCard title="Soil EC" value={1300} optimal={1300} notation="µs/cm"   />
</div>

<Card>
	<Header title={'Soil Temperature'} slot="header" class="gap-0">
		<div slot="subheading">
			Last Update <Duration start={subSeconds(new Date(), 0)} totalUnits={1} /> ago
		</div>
	</Header>
	<RadarChart N={10} P={33} K={50} EC={150} PH={5.7} />
</Card>