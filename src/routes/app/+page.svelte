<script lang="ts">
	import { mdiChevronRight, mdiMapMarker, mdiPlus } from '@mdi/js';
	import { Button, ListItem, Icon, Card } from 'svelte-ux';
    import Leaflet from '$lib/components/leaflet/Leaflet.svelte';
    import L from 'leaflet';

    let bounds: L.LatLngBoundsExpression | undefined = undefined;
	let view: L.LatLngExpression | undefined = [32.14088948246444, 131.3853159103882];
	let zoom: number | undefined = 20;
</script>

<h1>abc</h1>
<div class="grid grid-cols-7 gap-4 h-full">
    <div id="map" class="grid grid-flow-row col-span-5">
        <Leaflet view={view} zoom={zoom}>

        </Leaflet>
    </div>
    <Card id="list" class="grid grid-col col-span-2" title="Location List">
        <ol>
            <ListItem title="Location Name">
                <div slot="subheading">
                    <Icon data={mdiMapMarker} /> Saito
                </div>
                <div slot="actions">
                  <Button icon={mdiChevronRight} class="p-2 text-black/50" />
                </div>
              </ListItem>
              
        </ol>
    </Card>
</div>
