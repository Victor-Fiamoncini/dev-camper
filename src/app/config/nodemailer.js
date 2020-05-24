import { resolve } from 'path'
import { createTransport } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

const { SMTP_EMAIL, SMTP_HOST, SMTP_PASS, SMTP_PORT } = process.env

const transport = createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASS,
	},
})

transport.use(
	'compile',
	hbs({
		viewEngine: {
			extName: '.hbs',
			partialsDir: resolve('./src/app/resources/templates'),
			layoutsDir: resolve('./src/app/resources/mail'),
			defaultLayout: 'forgot_password.hbs',
		},
		viewPath: resolve('./src/app/resources'),
		extName: '.hbs',
	})
)

export default transport
