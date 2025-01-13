import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

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