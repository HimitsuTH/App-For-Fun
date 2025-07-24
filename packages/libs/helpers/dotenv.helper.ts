import * as dotenv from 'dotenv'
import path from 'path'
const envPath = path.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env')
const envLocal = path.resolve(process.cwd(), '..', '..', 'packages', 'libs', '.env.local')
dotenv.config({ path: envPath })
dotenv.config({ path: envLocal })

export default dotenv