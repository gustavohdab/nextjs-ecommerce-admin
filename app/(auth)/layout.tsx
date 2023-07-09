export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}