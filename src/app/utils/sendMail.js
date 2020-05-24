import transport from '../config/nodemailer'

export default async ({ to, subject, text }) => {
	const { FROM_NAME, FROM_EMAIL } = process.env

	const info = await transport.sendMail({
		from: `${FROM_NAME} <${FROM_EMAIL}>`,
		to,
		subject,
		text,
	})

	console.log('Message sent: %s', info.messageId)
}
