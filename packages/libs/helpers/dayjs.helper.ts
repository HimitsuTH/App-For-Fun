import dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat) // จะใช้ agument ตัวที่ 2 ได้ เช่น dayjs('30012022', 'DDMMYYYY')
dayjs.tz.setDefault('Asia/Bangkok')

export default dayjs