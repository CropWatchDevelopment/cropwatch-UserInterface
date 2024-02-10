<script>
	import { AppLayout, ListItem } from 'svelte-ux';
	import Header from '$lib/components/core/header/Header.svelte';
	import { mdiDevices, mdiMap } from '@mdi/js';
</script>

<AppLayout classes={{ root: 'bg-gray-50 ' }} areas="'header header' 'aside main'">
	<nav slot="nav" class="h-full bg-gray-200">
		<ol>
			<ListItem title="Locations" icon={mdiMap} />
			<ListItem title="Devices" icon={mdiDevices} />
		</ol>
	</nav>

	<Header/>

	<main class="mt-10 ml-5">
		<slot />
	</main>
</AppLayout>
