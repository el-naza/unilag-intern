export const normalizeGender = (gender: string): 'MALE' | 'FEMALE' => {
  console.log('=========gender=====')
  console.log(gender)
  console.log('=========gender=====')

  const genderMap = new Map<string, 'MALE' | 'FEMALE'>([
    ['male', 'MALE'],
    ['m', 'MALE'],
    ['female', 'FEMALE'],
    ['f', 'FEMALE'],
  ])

  return genderMap.get(gender?.toLowerCase()) ?? 'MALE' // Default to "MALE" if not found
}

export const normalizeInternshipType = (type: string): 'SIWES' | 'TEACHING PRACTICE' => {
  const internshipMap = new Map<string, 'SIWES' | 'TEACHING PRACTICE'>([
    ['siwes', 'SIWES'],
    ['s', 'SIWES'],
    ['teaching practice', 'TEACHING PRACTICE'],
    ['t', 'TEACHING PRACTICE'],
  ])

  return internshipMap.get(type?.toLowerCase()) ?? 'SIWES' // Default to "SIWES" if not found
}
