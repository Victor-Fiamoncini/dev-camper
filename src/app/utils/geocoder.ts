import NodeGeocoder from 'node-geocoder'

export default NodeGeocoder({
	// @ts-ignore: Unreachable code error
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null,
})
