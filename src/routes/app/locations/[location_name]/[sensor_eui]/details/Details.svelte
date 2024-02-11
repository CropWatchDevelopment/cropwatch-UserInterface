<script lang="ts">
	import { subSeconds } from 'date-fns';
	import RadarChart from '$lib/components/charts/highcharts/highcharts-radarchart/RadarChart.svelte';
	import CWStatCard from '$lib/components/stat-card/CWStatCard.svelte';
	import LineChart from '$lib/components/charts/highcharts/lineChart/LineChart.svelte';
	import { Card, Duration, Header } from 'svelte-ux';

</script>

<div class="grid grid-cols-2 mt-10 gap-4 mb-2">
	<CWStatCard title="Temperature" />
	<CWStatCard title="Moisture" />
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