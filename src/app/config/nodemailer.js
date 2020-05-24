import { createTransport } from 'nodemailer'

const { SMTP_EMAIL, SMTP_HOST, SMTP_PASS, SMTP_PORT } = process.env

export default createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASS,
	},
})
