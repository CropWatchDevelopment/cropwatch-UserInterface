import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals: { supabase, getSession } }) {
    const session = await getSession();
    if (!session) throw redirect(304, '/auth/login');
    const user_id = session?.user.id;
    const location = await checkLocationOwner(supabase, +params.location_id, user_id);
    if (!location) throw redirect(304, '/auth/login');


    return {
        location,
        sensors: await loadAllSensors(supabase, +params.location_id),
        weatherJSON: await getWeatherAPIData(),
    };
}

async function checkLocationOwner(supabase: SupabaseClient, id: number, user_id: string) {
    const { data, error } = await supabase
        .from('cw_locations')
        .select('*, cw_location_owners(*)')
        .eq('cw_location_owners.user_id', user_id)
        .eq('location_id', id)
        .single();

    if (error) {
        throw redirect(304, '/auth/login');
    }
    return data;
}

async function loadAllSensors(supabase: SupabaseClient, location_id: number) {
    const {data, error} = await supabase
        .from('cw_device_locations').select('*, cw_devices(*)').eq('location_id', location_id);
    console.log('sensors', data, error)
    return data;
}

async function getWeatherAPIData() {
    const weatherRequest = await fetch(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=32.1359004857804&lon=131.39106608149575'
    );
    const weatherJSON = weatherRequest.json();
    return weatherJSON;
}