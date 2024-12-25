import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const signup = await prisma.signup.create({
      data: {
        name: body.name,
        contact: body.contact,
      },
    })
    return NextResponse.json(signup)
  } catch (err) {
    return NextResponse.json(
      { error: 'Error creating signup' },
      { status: 500 }
    )
  }
}
