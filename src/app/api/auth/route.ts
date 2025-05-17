import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Сначала получаем значение из env
const rawJwtSecret = process.env.JWT_SECRET;

// Проверяем его наличие
if (!rawJwtSecret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

// Теперь можно безопасно использовать
const JWT_SECRET = rawJwtSecret;

function validate(email: string | null, password: string | null) {
  if (!email || !password) {
    return { error: true, message: "Email and password are required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  if (!isEmailValid) {
    return { error: true, message: "Please enter a valid email address" };
  }

  if (!isPasswordValid) {
    return { error: true, message: "Password must be at least 6 characters long" };
  }

  const expiresIn = 24 * 60 * 60; // 24 часа
  const token = jwt.sign({ email, password}, JWT_SECRET, { expiresIn });
  const expiresAt = Math.floor(Date.now() + expiresIn * 1000);

  return { error: false, token, email, password, expiresAt };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
      return NextResponse.json(
        { error: true, message: validatedInfo.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        token: validatedInfo.token,
        email: validatedInfo.email,
        password: validatedInfo.password,
        expiresAt: validatedInfo.expiresAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}