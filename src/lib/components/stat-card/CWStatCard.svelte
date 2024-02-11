<script lang="ts">
	import { mdiDotsVertical, mdiWater } from '@mdi/js';
	import { subSeconds } from 'date-fns';
	import { Avatar, Button, Card, Collapse, Duration, ExpansionPanel, Header, Icon } from 'svelte-ux';

	export let title: string = 'New Card';
	export let counterStartTime: Date = new Date();
	export let value: number = 0.0;
	export let notation: string = '';
</script>

<Card>
	<Header slot="header" class="gap-0">
		<div slot="title" class="text-nowrap text-xl font-medium">{title}</div>
		<div slot="avatar">
			<Avatar class="bg-accent-500 text-white font-bold mr-4">
				<Icon data={mdiWater} />
			</Avatar>
		</div>
		<div slot="subheading" class="text-sm text-gray-500">
			Last Update <Duration start={subSeconds(counterStartTime, 0)} totalUnits={1} /> ago
		</div>
		<div slot="actions">
			<Button icon={mdiDotsVertical} />
		</div>
	</Header>
	<div slot="contents" class="mb-2">
        
        <Collapse>
            <div slot="trigger" class="flex-1 px-3 py-3 border-t">
                <h1 class="text-5xl text-gray-700">23.5°c</h1>
            </div>
            <div class="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod
              culpa et, dolores omnis, ipsum in perspiciatis porro ut nihil molestiae
              molestias tenetur delectus velit! Inventore laborum rerum at id?
            </div>
          </Collapse>
	</div>
	<!-- <div slot="actions">
		
	</div> -->
</Card>
