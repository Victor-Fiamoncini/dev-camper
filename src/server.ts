import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '..', '.env') })

import App from './App'

const { _app } = new App()
const { PORT } = process.env

_app.listen(PORT, () => console.log(`Server running at ${PORT} 👾`))
