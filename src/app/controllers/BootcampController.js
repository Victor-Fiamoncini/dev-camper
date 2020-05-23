import BaseController from './BaseController'
import BootcampDAO from '../models/Bootcamp/BootcampDAO'
import Bootcamp from '../models/Bootcamp/Bootcamp'

import geocoder from '../utils/geocoder'

class BootcampController extends BaseController {
	constructor(dao) {
		super(dao)
	}

	async index(req, res) {
		const { page = 1, perPage = 5 } = req.query

		const bootcamps = await this.dao.index(Number(page), Number(perPage))

		return res.status(200).json(bootcamps)
	}

	async show(req, res) {
		const bootcamp = await this.dao.show(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	async store(req, res) {
		const bootcampDto = new Bootcamp(req.body)
		const bootcamp = await this.dao.store(bootcampDto)

		return res.status(201).json(bootcamp)
	}

	async update(req, res) {
		if (req.file) {
			const { filename } = req.file
			const { APP_URL, FILE_URL_PREFIX } = process.env

			req.body.photo = filename
			req.body.photoUrl = `${APP_URL}/${FILE_URL_PREFIX}/${filename}`
		}

		const bootcamp = await this.dao.update(req.params.bootcampId, req.body)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	async destroy(req, res) {
		const bootcamp = await this.dao.destroy(req.params.bootcampId)

		if (!bootcamp) {
			return res.status(400).json({ error: 'Bootcamp not found' })
		}

		return res.status(200).json(bootcamp)
	}

	async getBootcampsByRadius(req, res) {
		const { zipcode, distance } = req.params

		const [location] = await geocoder.geocode(zipcode)
		const lat = location.latitude
		const lng = location.longitude

		const radius = Number(distance) / 3963

		const bootcamps = await this.dao.getBootcampsByRadius(lat, lng, radius)

		if (bootcamps.length === 0) {
			return res.status(400).json({ error: 'No bootcamps found' })
		}

		return res.status(200).json(bootcamps)
	}
}

export default new BootcampController(new BootcampDAO(Bootcamp))
