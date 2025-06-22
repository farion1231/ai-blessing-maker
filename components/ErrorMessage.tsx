interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div 
      className="bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-6 relative shadow-lg"
      role="alert"
      aria-live="assertive"
    >
      <div className="absolute top-2 left-2 text-xl" aria-hidden="true">❌</div>
      <div className="ml-8 font-semibold">{message}</div>
    </div>
  )
}