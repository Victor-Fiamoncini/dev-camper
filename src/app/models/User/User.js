import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ['user', 'publisher', 'admin'],
			default: 'user',
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			select: false,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordExpire: {
			type: Date,
		},
	},
	{
		timestamps: true,
		collection: 'users',
	}
)

export default model('User', UserSchema)
