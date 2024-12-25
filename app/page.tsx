import SignupForm from './components/signup-form'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <header className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center text-white tracking-tight">
            Fast<span className="text-yellow-300">Fash</span>
          </h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-5xl font-extrabold text-white leading-tight">
              Fashion at <span className="text-yellow-300">Light Speed</span>
            </h2>
            <p className="mt-4 text-xl text-white">
              Trending styles delivered in just <span className="font-bold bg-white text-purple-600 px-2 py-1 rounded">10 minutes</span>
            </p>
          </div>
          <SignupForm />
        </div>
      </main>

      <footer className="py-4">
        <div className="container mx-auto px-4 text-center text-sm text-white opacity-75">
          © 2025 FastFash. Stay stylish, stay fast.
        </div>
      </footer>
    </div>
  )
}


