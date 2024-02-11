<script lang="ts">
	import highcharts from '$lib/components/charts/highcharts/highcharts-action';

	export let seriesData: number[] = [];

	let config = {
		chart: {
			height: 200,
		},
		title: {
			text: '',
			align: 'left'
		},

		yAxis: {
			title: {
				text: ''
			}
		},

		xAxis: {
			accessibility: {
				rangeDescription: 'Range: 2010 to 2020'
			}
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				// pointStart: 2010
			}
		},

		series: [
			{
				name: '',
				data: [...seriesData]
			}
		],

		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 800,
						maxHeight: 100
					},
					chartOptions: {}
				}
			]
		}
	};
</script>

<div class="container" use:highcharts={config} />


<style>
    .highcharts-legend {
        display: none;
    }
</style>