<script lang="ts">
	import type { PageData } from './../$types';
	import Header from '../Header.svelte';
	import { AppLayout } from 'svelte-ux';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser) {
			debugger;
			if (!data.user) {
				goto('/auth/login');
			}
			goto(redirectTo ?? '/auth/login');
		}
	}
</script>

<AppLayout classes={{ root: 'bg-slate-200 ' }} areas="'header header' 'aside main'">
	<nav slot="nav" class="h-full bg-slate-50">aab</nav>

	<Header />

	<main class="m-10">
		<slot />
	</main>
</AppLayout>
