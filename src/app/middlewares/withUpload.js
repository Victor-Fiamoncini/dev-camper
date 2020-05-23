import multer from 'multer'
import multerConfig from '../config/multer'

export default {
	single: (requestFieldName) => multer(multerConfig).single(requestFieldName),
}
