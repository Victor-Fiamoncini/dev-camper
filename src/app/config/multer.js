import { resolve } from 'path'
import { randomBytes } from 'crypto'
import multer from 'multer'

const pathToUploads = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')
const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

export default {
	dest: pathToUploads,
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, pathToUploads)
		},
		filename: (req, file, callback) => {
			randomBytes(16, (err, buf) => {
				if (err) {
					callback(err, '')
				}

				const filename = `${buf.toString('hex')}-${file.originalname}`
				callback(null, filename)
			})
		},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, callback) => {
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type'))
		}
	},
}
