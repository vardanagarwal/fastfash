'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact }),
      })
      
      if (!response.ok) {
        throw new Error('Signup failed. Please try again.')
      }
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white px-6 py-4 rounded-lg shadow-lg" role="alert">
        <strong className="text-xl font-bold block mb-2">You&apos;re in the fast lane, {name}! 🚀</strong>
        <p className="text-lg">We&apos;ll ping you when we launch. Get ready for fashion at warp speed!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {error && (
        <div className="bg-red-500 bg-opacity-20 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={isLoading}
          className="rounded-lg border-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white placeholder-yellow-300 placeholder-opacity-75 focus:ring-2 focus:ring-yellow-300"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="contact"
          name="contact"
          type="text"
          autoComplete="email tel"
          required
          disabled={isLoading}
          className="rounded-lg border-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white placeholder-yellow-300 placeholder-opacity-75 focus:ring-2 focus:ring-yellow-300"
          placeholder="Your email or phone number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-purple-800 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 shadow-lg"
      >
        {isLoading ? 'Joining...' : 'Join the Fast Lane'}
      </Button>
    </form>
  )
}
