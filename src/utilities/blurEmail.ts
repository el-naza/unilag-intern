export default function blurEmail(email: string): string {
  const [name, domain] = email.split('@')
  if (!domain) return email // Invalid email case

  const namePart =
    name.length > 2
      ? name[0] + '*'.repeat(name.length - 2) + name.slice(-1)
      : '*'.repeat(name.length)
  const [domainName, extension] = domain.split('.')

  const blurredDomain = domainName[0] + '*'.repeat(domainName.length - 1)

  return `${namePart}@${blurredDomain}.${extension}`
}
