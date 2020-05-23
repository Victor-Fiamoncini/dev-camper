import { model, Schema } from 'mongoose'
import slugify from 'slugify'

const schema = new Schema(
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

// schema.plugin(mongoosePagination)

schema.pre('save', async function (next) {
	this.slug = slugify(this.title, { lower: true })

	return next()
})

schema.statics.getAverageCost = async function (id) {
	return await this.aggregate([
		{
			$match: { bootcamp: id },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: {
					$avg: '$tuition',
				},
			},
		},
	])
}

// schema.post('save', function () {
// this.constructor.getAverageCost(this.bootcamp)
// })

// schema.pre('remove', function () {
// this.getAverageCost(this.bootcamp)
// })

export default model('Course', schema)
