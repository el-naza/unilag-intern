import { format } from 'date-fns'

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return format(date, 'h:mm a')
}

export default formatTime
