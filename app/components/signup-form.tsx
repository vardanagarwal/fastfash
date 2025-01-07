'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as pixel from '@/lib/fpixel'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setEmailError('')

    // Email validation
    if (!validateEmail(contact)) {
      setEmailError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

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
    pixel.signup({ name, contact })
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white px-6 py-4 rounded-lg shadow-lg font-['Tan_Harmoni']" role="alert">
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
        className="border-0 border-b-2 border-black bg-transparent text-amber-50 placeholder:text-gray-400/50 focus:ring-0 focus:border-amber-50 focus:opacity-100 font-['Tan_Harmoni'] [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-amber-50 [&:-webkit-autofill_selected]:bg-transparent"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Input
          id="contact"
          name="contact"
          type="email"
          autoComplete="email"
          required
          disabled={isLoading}
          className="border-0 border-b-2 border-black bg-transparent text-amber-50 placeholder:text-gray-400/50 focus:ring-0 focus:border-amber-50 focus:opacity-100 font-['Tan_Harmoni'] [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-amber-50 [&:-webkit-autofill_selected]:bg-transparent"
          placeholder="Email"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value)
            setEmailError('')  // Clear error when user types
          }}
        />
        {emailError && (
          <div className="text-red-400 text-sm mt-1">
            {emailError}
          </div>
        )}
      </div>
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-amber-100 opacity-20 hover:bg-amber-100 hover:opacity-50 text-black transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 shadow-lg font-['Tan_Harmoni']"
      >
        {isLoading ? 'Joining...' : 'Join the Fast Lane'}
      </Button>
    </form>
  )
}