import SignupForm from './components/signup-form'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/fashion-bg.jpg" // You'll need to add this image to your public folder
          alt="Fashion Background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" /> 
      </div>

      <header className="py-6 relative">
        <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-tight">
          Fast<span className="text-purple-700">Fash</span>
        </h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 relative">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
          <h2 className="mt-6 text-5xl font-extrabold text-white leading-tight">
            Fashion at <span className="text-purple-700">Light Speed</span>
          </h2>
          <p className="mt-4 text-xl text-white">
            Trending styles delivered in just <span className="font-bold bg-purple-700 bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-lg border border-fuchsia-400/30">29 minutes</span>
          </p>
          </div>
          <SignupForm />
        </div>
      </main>

      <footer className="py-4 relative">
        <div className="container mx-auto px-4 text-center text-sm text-white opacity-75">
          © 2025 FastFash. Stay stylish, stay fast.
        </div>
      </footer>
    </div>
  )
}