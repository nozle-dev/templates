// Standard API response utilities

import { NextResponse } from 'next/server'

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function errorResponse(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        ...details,
      },
    },
    { status }
  )
}

export function notFoundResponse(resource: string = 'Resource') {
  return errorResponse(`${resource} not found`, 404)
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, 401)
}

export function forbiddenResponse(message: string = 'Forbidden') {
  return errorResponse(message, 403)
}

export function validationError(errors: Record<string, string>) {
  return errorResponse('Validation failed', 422, { errors })
}
