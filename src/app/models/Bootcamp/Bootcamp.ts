import { model, Schema } from 'mongoose'
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

export default model<IBootcamp>('Bootcamp', BootcampSchama)
