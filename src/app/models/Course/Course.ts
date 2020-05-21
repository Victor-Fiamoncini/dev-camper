import { model, PaginateModel, Schema } from 'mongoose'
import { mongoosePagination } from 'ts-mongoose-pagination'
import slugify from 'slugify'

import ICourseDTO from './Types'

const CoursesSchama = new Schema(
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

CoursesSchama.plugin(mongoosePagination)

CoursesSchama.pre('save', async function (this: ICourseDTO, next) {
	this.slug = slugify(this.title, { lower: true })

	return next()
})

const courses: PaginateModel<ICourseDTO> = model('Course', CoursesSchama)

export default courses
