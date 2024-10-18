export default function isCustomError(error: unknown): error is {
  response: any
  status?: number
} {
  return typeof error === 'object' && error !== null && 'status' in error
}
