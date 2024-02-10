<script lang="ts">
	import { mdiDotsVertical } from "@mdi/js";
import { subSeconds } from "date-fns";
	import { Avatar, Button, Card, Duration, Header } from "svelte-ux";

    export let title: string = 'New Card';
    export let counterStartTime: Date = new Date();
    export let value: number = 0.00;
    export let notation: string = '';

</script>

<Card class="p-2">
    <Header slot="header" class="gap-0">
        <div slot="title" class="text-nowrap">{title}</div>
        <div slot="avatar">
            <!-- <Avatar class="bg-accent-500 text-white font-bold">A</Avatar> -->
        </div>
        <div slot="subheading">
            Last Update <Duration start={subSeconds(counterStartTime, 0)} totalUnits={1} /> ago
        </div>
        <div slot="actions">
            <Button icon={mdiDotsVertical} />
        </div>
    </Header>
    <div slot="contents" class="mb-2">
        <h1 class="text-5xl text-gray-700">{value}{notation}</h1>
    </div>
</Card>