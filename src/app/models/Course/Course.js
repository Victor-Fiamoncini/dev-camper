import { model, Schema } from 'mongoose'
import mongoosePagination from 'mongoose-paginate-v2'
import slugify from 'slugify'

import Bootcamp from '../Bootcamp/Bootcamp'

const CourseSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			maxlength: 255,
			required: true,
		},
		slug: {
			type: String,
			lowercase: true,
		},
		description: {
			type: String,
			maxlength: 500,
			required: true,
		},
		weeks: {
			type: String,
			required: true,
		},
		tuition: {
			type: Number,
			required: true,
		},
		minimumSkill: {
			type: String,
			required: true,
			enum: ['beginner', 'intermediate', 'advanced'],
		},
		scholarshipAvailable: {
			type: Boolean,
			default: false,
		},
		bootcamp: {
			type: Schema.Types.ObjectId,
			ref: 'Bootcamp',
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'courses',
	}
)

CourseSchema.plugin(mongoosePagination)

CourseSchema.statics.getAverageCost = async function (bootcampId) {
	try {
		const [data] = await this.aggregate([
			{
				$match: { bootcamp: bootcampId },
			},
			{
				$group: {
					_id: '$bootcamp',
					averageCost: { $avg: '$tuition' },
				},
			},
		])

		await Bootcamp.findByIdAndUpdate(bootcampId, {
			averageCost: Math.floor(data.averageCost),
		})
	} catch (err) {
		console.log(err)
	}
}

CourseSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true })

	return next()
})

CourseSchema.post('save', async function () {
	await this.constructor.getAverageCost(this.bootcamp)
})

CourseSchema.pre('remove', async function () {
	await this.constructor.getAverageCost(this.bootcamp)
})

export default model('Course', CourseSchema)
