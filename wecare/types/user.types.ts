export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum Specialization {
  CARDIOLOGY = "CARDIOLOGY",
  DERMATOLOGY = "DERMATOLOGY",
  NEUROLOGY = "NEUROLOGY",
  PEDIATRICS = "PEDIATRICS",
  SURGERY = "SURGERY",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;
  email: string;
  address: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  emergencyContactNumber: string;
  emergencyContactName: string;
  allergies?: string;
  currentMedications?: string;
}

export interface Doctor extends User {
  specialization: Specialization;
  medicalLicenseNumber: string;
  yearsOfExperience: number;
  qualifications: string;
  governmentIssuedIdDocument: FormData | undefined;
  isApproved: boolean;
  approvedAt?: Date;
}

export interface BaseRegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: Gender;
  email: string;
  address: string;
  password: string;
  role: Role;
}

export interface PatientRegistrationData extends BaseRegistrationData {
  emergencyContactNumber: string;
  emergencyContactName: string;
  allergies?: string;
  currentMedications?: string;
}

export interface DoctorRegistrationData extends BaseRegistrationData {
  specialization: Specialization;
  medicalLicenseNumber: string;
  yearsOfExperience: number;
  qualifications: string;
  governmentIssuedIdDocument: FormData | undefined;
}

export type RegistrationData = PatientRegistrationData | DoctorRegistrationData;
