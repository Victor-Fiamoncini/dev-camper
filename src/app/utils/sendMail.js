import transport from '../config/nodemailer'

export default async ({ to, subject, text }) => {
	const { FROM_NAME, FROM_EMAIL } = process.env

	return await transport.sendMail({
		from: `${FROM_NAME} <${FROM_EMAIL}>`,
		to,
		subject,
		text,
	})
}
