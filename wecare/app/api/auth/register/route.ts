import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Role, Gender, Specialization } from "@/types/user.types";
import jwt from "jsonwebtoken";

const baseUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().transform((str) => new Date(str)),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  gender: z.nativeEnum(Gender),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.nativeEnum(Role),
});

const patientSchema = baseUserSchema.extend({
  emergencyContactNumber: z
    .string()
    .min(10, "Emergency contact number must be at least 10 characters"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
});

const doctorSchema = baseUserSchema.extend({
  specialization: z.nativeEnum(Specialization),
  medicalLicenseNumber: z.string().min(1, "Medical license number is required"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be a positive number"),
  qualifications: z.string().min(1, "Qualifications are required"),
  governmentIssuedIdDocument: z
    .string()
    .min(1, "Government issued ID document is required"),
});

const registrationSchema = z.discriminatedUnion("role", [
  patientSchema.extend({ role: z.literal(Role.PATIENT) }),
  doctorSchema.extend({ role: z.literal(Role.DOCTOR) }),
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    const existingEmail = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingEmail) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }

    const existingPhoneNumber = await db.user.findFirst({
      where: { phoneNumber: validatedData.phoneNumber },
    });
    if (existingPhoneNumber) {
      return new Response(
        JSON.stringify({ message: "Phone number already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await db.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        dateOfBirth: validatedData.dateOfBirth,
        phoneNumber: validatedData.phoneNumber,
        gender: validatedData.gender,
        email: validatedData.email,
        address: validatedData.address,
        password: hashedPassword,
        role: validatedData.role,
      },
    });

    if (validatedData.role === Role.PATIENT) {
      await db.patient.create({
        data: {
          userId: user.id,
          emergencyContactNumber: validatedData.emergencyContactNumber,
          emergencyContactName: validatedData.emergencyContactName,
          allergies: validatedData.allergies,
          currentMedications: validatedData.currentMedications,
        },
      });
    } else {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialization: validatedData.specialization,
          medicalLicenseNumber: validatedData.medicalLicenseNumber,
          yearsOfExperience: validatedData.yearsOfExperience,
          qualifications: validatedData.qualifications,
          governmentIssuedIdDocument: validatedData.governmentIssuedIdDocument,
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.NEXT_PUBLIC_JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Set the token in a cookie
    const response = NextResponse.json(
      {
        message: "User registered successfully",
        userId: user.id,
        role: user.role,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day in seconds
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
