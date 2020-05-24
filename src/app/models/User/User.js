import { model, Schema } from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { createHash, randomBytes } from 'crypto'

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

	return sign({ id: this._id }, JWT_AUTH_SECRET, {
		expiresIn: Number(JWT_EXPIRE_TIME),
	})
}

UserSchema.methods.matchPassword = async function (password) {
	return await compare(password, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = randomBytes(16).toString('hex')

	this.resetPasswordToken = createHash('sha256')
		.update(resetToken)
		.digest('hex')

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

	return resetToken
}

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password, await genSalt(10))
	}

	return next()
})

UserSchema.pre('findOneAndUpdate', async function (next) {
	const fields = this.getUpdate()

	fields.password = await hash(fields.password, await genSalt(10))

	return next()
})

export default model('User', UserSchema)
