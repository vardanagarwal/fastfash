import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

// Create Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create rate limiter instance (3 requests per hour per IP)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
})

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data;
}

export async function POST(request: Request) {
  try {
    // Get IP address
    const headersList = headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || 'anonymous'
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many signups. Please try again later.',
          reset: reset
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      )
    }

    const body = await request.json()
    
    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
    
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return NextResponse.json(
        { error: 'Failed human verification. Please try again.' },
        { status: 400 }
      );
    }

    const signup = await prisma.signup.create({
      data: {
        name: body.name,
        contact: body.contact,
      },
    })
    
    return NextResponse.json(signup)
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Error creating signup' },
      { status: 500 }
    )
  }
}