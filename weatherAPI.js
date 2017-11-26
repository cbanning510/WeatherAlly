const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=5f26d9547233fa86f1b037a16320c7d4';

export const fetchWeather = (lat, lon) => {
	const url = rootUrl+'&lat='+lat+'&lon='+lon+"&units=imperial";
	console.log(url);

	return fetch(url)
		.then(res => res.json() )
		.then(json => ({
			temp: json.main.temp,
			weather: json.weather[0].main
		}))

}