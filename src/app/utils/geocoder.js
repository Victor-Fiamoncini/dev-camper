import geocoder from 'node-geocoder'

const { GEOCODER_API_KEY, GEOCODER_PROVIDER } = process.env

export default geocoder({
	provider: GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: GEOCODER_API_KEY,
	formatter: null,
})
