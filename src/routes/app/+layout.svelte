<script>
	import { AppLayout, ListItem } from 'svelte-ux';
	import Header from '$lib/components/core/header/Header.svelte';
	import { mdiDevices, mdiMap } from '@mdi/js';
	import Sidebar from '$lib/components/core/Sidebar.svelte';
</script>

<AppLayout classes={{ root: 'bg-gray-100 ' }} areas="'header header' 'aside main'">
	<nav slot="nav" class="h-full bg-gray-200">
		<Sidebar />
	</nav>

	<Header/>

	<main class="mt-10 ml-5">
		<slot />
	</main>
</AppLayout>
