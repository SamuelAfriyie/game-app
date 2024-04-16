"use client"

import { z } from "zod"

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(10),
})

export const RegisterSchema = z.object({
  firstName: z.string().min(1).max(10),
  lastName: z.string().min(1).max(10),
  email: z.string().email(),
  phone: z.string().min(1).max(10),
  eduLevel: z.string().min(1).max(10),
  password: z.string().min(1).max(10),
  confirmPassword: z.string().min(1).max(10),
})

