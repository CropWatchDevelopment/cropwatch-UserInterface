
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return {
            weatherJSON: await getWeatherAPIData(),
    };
}

async function getWeatherAPIData() {
    const weatherRequest = await fetch(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=32.1359004857804&lon=131.39106608149575'
    );
    const weatherJSON = weatherRequest.json();
    return weatherJSON;
}