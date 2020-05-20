import { model, PaginateModel, Schema } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'
import slugify from 'slugify'
import geocoder from '../../utils/geocoder'

import IBootcamp from './Types'

const BootcampSchama = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 255,
		},
		slug: {
			type: String,
			lowercase: true,
		},
		description: {
			type: String,
			required: true,
			maxlength: 500,
		},
		website: {
			type: String,
			lowercase: true,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
		},
		address: {
			type: String,
			required: true,
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
			},
			coordinates: {
				type: [Number],
				index: '2dsphere',
			},
			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},
		careers: {
			type: [String],
			required: true,
			enum: [
				'Web Development',
				'Mobile Development',
				'UI/UX',
				'Data Science',
				'Marketing',
				'Business',
				'Other',
			],
		},
		averageRating: {
			type: Number,
			min: 1,
			max: 10,
		},
		averageCost: {
			type: Number,
		},
		photo: {
			type: String,
			default: 'default-photo.jpg',
		},
		housing: {
			type: Boolean,
			default: false,
		},
		jobAssistance: {
			type: Boolean,
			default: false,
		},
		jobGuarantee: {
			type: Boolean,
			default: false,
		},
		acceptGi: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		collection: 'bootcamps',
	}
)

BootcampSchama.plugin(mongoosePagination)

BootcampSchama.pre('save', async function (this: IBootcamp, next) {
	this.slug = slugify(this.name, { lower: true })

	const [location] = await geocoder.geocode(this.address)

	this.location = {
		type: 'Point',
		coordinates: [location.longitude, location.latitude],
		formattedAddress: location.formattedAddress,
		street: location.streetName,
		city: location.city,
		state: location.stateCode,
		zipcode: location.zipcode,
		country: location.countryCode,
	}

	this.address = undefined!

	return next()
})

const bootcamps: PaginateModel<IBootcamp> = model('Bootcamp', BootcampSchama)

export default bootcamps
