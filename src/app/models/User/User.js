import { model, Schema } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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
			enum: ['guest', 'publisher', 'admin'],
			default: 'guest',
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

UserSchema.methods.getSignedJwtToken = function () {
	const { JWT_AUTH_SECRET, JWT_EXPIRE_TIME } = process.env

	return sign({ id: this._id }, JWT_AUTH_SECRET, { expiresIn: JWT_EXPIRE_TIME })
}

UserSchema.methods.matchPassword = async function (password) {
	return await compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
	this.password = await hash(this.password, await genSalt(10))

	return next()
})

export default model('User', UserSchema)
