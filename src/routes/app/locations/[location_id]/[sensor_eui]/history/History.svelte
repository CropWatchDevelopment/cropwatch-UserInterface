<script lang="ts">
	import { sensorDataState } from '$lib/stores/CW-SS-TMEPNPK';
	import { mdiCalendarRange, mdiDotsVertical, mdiDownload, mdiHistory } from '@mdi/js';
	import { Avatar, Button, Card, DateRangeField, Header, Icon, ListItem, Menu, MenuItem, PeriodType, Toggle } from 'svelte-ux';
	import type { DateRange } from 'svelte-ux/utils/dateRange';

	let selectedDateRange: DateRange = {
		from: new Date(),
		to: new Date(),
		periodType: PeriodType.Day
	};
    $: data = $sensorDataState;
</script>

<h2>History list</h2>

<Card>
	<Header title="Title" subheading="Subheading" slot="header">
		<div slot="actions">
			<Toggle let:on={open} let:toggle>
				<Button icon={mdiDotsVertical} on:click={toggle}>
					<Menu {open} on:close={toggle}>
						<MenuItem icon={mdiDownload}>Download CSV</MenuItem>
					</Menu>
				</Button>
			</Toggle>
		</div>
		<div slot="avatar">
			<Avatar class="bg-accent-500 text-white font-bold">
				<Icon data={mdiHistory} />
			</Avatar>
		</div>
	</Header>
	<div slot="contents">
		<DateRangeField bind:value={selectedDateRange} stepper icon={mdiCalendarRange} />

        <ol>
            {#each data as uplink}
                <ListItem title={uplink.soil_temperatureC} subheading="Subheading" />
            {/each}
        </ol>
	</div>
</Card>
