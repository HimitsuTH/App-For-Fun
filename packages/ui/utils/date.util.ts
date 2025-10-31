import dayjs from 'libs/helpers/dayjs.helper'

export const dateToText = (date: string | Date, lang: string, option?: {
  mode?: 'full' | 'only-date' | 'ab-date',
  format?: string
}) => {
  if (!date || !dayjs(date).isValid()) return '-'
  if (option?.format) return dayjs(date).format(option.format)
  if (option?.mode === 'full') return dayjs(date).format('DD-MM-YYYY HH:mm:ss') 
  if (option?.mode === 'ab-date') return dayjs(date).format('DD-MM-YYYY')

  return `${`${dayjs.tz(date).locale(lang || 'en').format('DD-MM-')}${lang === 'th' ? dayjs.tz(date).locale(lang || 'en').year() + 543 : dayjs.tz(date).locale(lang || 'en').year()} ${dayjs.tz(date).locale(lang || 'en').format('HH:mm:ss')}`}`
}
