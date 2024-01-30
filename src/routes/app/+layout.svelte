<script>
	import Header from "../Header.svelte";
    import { AppLayout } from 'svelte-ux';
</script>

<AppLayout classes={{root: "bg-slate-200 "}} areas="'header header' 'aside main'">
    <nav slot="nav" class="h-full bg-slate-50">
      aab
    </nav>
  
    <Header />
  
    <main class="m-10">
      <slot />
    </main>
  </AppLayout>