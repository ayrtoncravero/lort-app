export function normalizeErrorMessage(message: string | string[] | undefined): string {
  if (Array.isArray(message)) return message.join(' ')
  return message ?? 'Something went wrong.'
}
