const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  // Extract time components
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const period = hours >= 12 ? 'pm' : 'am'

  // Convert to 12-hour format
  hours = hours % 12 || 12

  // Extract date components
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Format ordinal suffix for day
  const ordinalSuffix = (n: number) =>
    ['th', 'st', 'nd', 'rd'][n % 10 > 3 || Math.floor((n % 100) / 10) === 1 ? 0 : n % 10]

  return `${hours}:${minutes}${period}, ${day}${ordinalSuffix(day)} ${month} ${year}`
}

export default formatDate
