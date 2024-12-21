"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUploader from "@/utils/FileUploader";
import { Eye, EyeOff } from "lucide-react";
import {
  Role,
  Gender,
  Specialization,
  BaseRegistrationData,
  Doctor,
  DoctorRegistrationData,
  PatientRegistrationData,
} from "@/types/user.types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/auth";
interface Props {}

const PURL = process.env.NEXT_PUBLIC_AUTHROUTE;

const baseFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string(),
  phoneNumber: z.string().min(8, "Phone number must be at least 10 characters"),
  gender: z.nativeEnum(Gender),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be less than 30 character"),
  role: z.nativeEnum(Role),
});

const patientFormSchema = baseFormSchema.extend({
  emergencyContactNumber: z
    .string()
    .min(10, "Emergency contact number must be at least 10 characters"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
});

const doctorFormSchema = baseFormSchema.extend({
  specialization: z.nativeEnum(Specialization),
  medicalLicenseNumber: z.string().min(1, "Medical license number is required"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be a positive number"),
  qualifications: z.string().min(1, "Qualifications are required"),
  governmentIssuedIdDocument: z
    .array(z.custom<File>())
    .optional()
    .nullable()
    .default(null),
});

const formSchema = z.discriminatedUnion("role", [
  patientFormSchema.extend({ role: z.literal(Role.PATIENT) }),
  doctorFormSchema.extend({ role: z.literal(Role.DOCTOR) }),
]);

type FormValues = z.infer<typeof formSchema>;

function RegisterForm({}: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [role, setRole] = useState(Role.PATIENT);
  const [carouselApi, setCarouselApi] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleFileChange = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  interface FormValues {
    role: Role;
    governmentIssuedIdDocument?: FileList;
    [key: string]: any;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: Role.PATIENT,
      gender: Gender.OTHER,
      governmentIssuedIdDocument: undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "role") {
        setRole(value.role as Role);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Form data being sent:", data);

      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.log("Backend error details:", errorDetails); // Log the exact error details from the backend
        throw new Error("Registration failed");
      }

      const result = await response.json();
      console.log("User registered successfully:", result);

      // 2. Handle file upload for doctors
      // if (data.role === Role.DOCTOR && data.governmentIssuedIdDocument?.[0]) {
      //   const file = data.governmentIssuedIdDocument[0];
      //   const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      //   const fileName = `documents/${result.id}/${uuidv4()}.${fileExt}`;
      //   console.log("File to be uploaded:", file);

      //   // Upload to Supabase storage
      //   const { error: uploadError } = await supabase.storage
      //     .from("uploads")
      //     .upload(fileName, file, {
      //       cacheControl: "3600",
      //       contentType: file.type, // Set proper content type
      //       upsert: false,
      //     });

      //   if (uploadError) {
      //     throw new Error(`File upload failed: ${uploadError.message}`);
      //   }

      //   // Get the public URL
      //   const {
      //     data: { publicUrl },
      //   } = supabase.storage.from("uploads").getPublicUrl(fileName);

      //   console.log("Public URL of uploaded document:", publicUrl);

      //   // Update the doctor record with the document URL
      //   const updateResponse = await fetch(
      //     `http://localhost:3000/api/auth/update-document`,
      //     {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         userId: result.id,
      //         governmentIssuedIdDocument: publicUrl,
      //       }),
      //     }
      //   );

      //   if (!updateResponse.ok) {
      //     // If update fails, delete the uploaded file
      //     const errorDetails = await updateResponse.json();
      //     console.log("Document update error details:", errorDetails); // Log the exact error details
      //     await supabase.storage.from("uploads").remove([fileName]);
      //     throw new Error("Failed to update document information");
      //   }
      // }
      console.log("Registration successful:", result);
      redirectToDashboard(result.role, result.id);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToDashboard = (role: string, userId: string) => {
    switch (role) {
      case "PATIENT":
        router.push(`/dashboard`);
        break;
      case "DOCTOR":
        router.push(`/pending-approval`);
        break;
      case "ADMIN":
        router.push(`/admin-dashboard`);
        break;
      default:
        router.push("/login");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center rounded-md text-black bg-[#B5E2FA] placeholder:text-black">
                    <Image
                      src="/assets/icons/calendar.svg"
                      height={24}
                      width={24}
                      alt="calendar"
                      className="ml-2 text-black"
                    />
                    <Controller
                      name="dateOfBirth"
                      control={form.control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) =>
                            field.onChange(date ? date.toISOString() : null)
                          }
                          dateFormat="dd/MM/yyyy"
                          showTimeSelect={false}
                          wrapperClassName="date-picker w-full"
                          className="rounded p-2 w-full"
                          placeholderText="Select a date"
                        />
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Controller
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <PhoneInput
                        defaultCountry="IN"
                        className="input-phone"
                        placeholder="Enter your number"
                        international
                        withCountryCallingCode
                        {...field}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <div className="radio-buttons-container">
                  <div className="radio-button">
                    <input
                      {...field}
                      type="radio"
                      id="male"
                      value={Gender.MALE}
                      checked={field.value === Gender.MALE}
                      className="radio-button__input"
                    />
                    <label htmlFor="male" className="radio-button__label">
                      <span className="radio-button__custom"></span>
                      Male
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      {...field}
                      type="radio"
                      id="female"
                      value={Gender.FEMALE}
                      checked={field.value === Gender.FEMALE}
                      className="radio-button__input"
                    />
                    <label htmlFor="female" className="radio-button__label">
                      <span className="radio-button__custom"></span>
                      Female
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      {...field}
                      type="radio"
                      id="other"
                      value={Gender.OTHER}
                      checked={field.value === Gender.OTHER}
                      className="radio-button__input"
                    />
                    <label htmlFor="other" className="radio-button__label">
                      <span className="radio-button__custom"></span>
                      Others
                    </label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="m@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-midnight-800"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4 text-black" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-black" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setRole(value as Role);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Role.PATIENT}>Patient</SelectItem>
                  <SelectItem value={Role.DOCTOR}>Doctor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {role === Role.PATIENT && (
          <>
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="IN"
                      className="input-phone"
                      placeholder="Emergency Contact Phone"
                      international
                      withCountryCallingCode
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {role === Role.DOCTOR && (
          <>
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Specialization.CARDIOLOGY}>
                        Cardiology
                      </SelectItem>
                      <SelectItem value={Specialization.DERMATOLOGY}>
                        Dermatology
                      </SelectItem>
                      <SelectItem value={Specialization.NEUROLOGY}>
                        Neurology
                      </SelectItem>
                      <SelectItem value={Specialization.PEDIATRICS}>
                        Pediatrics
                      </SelectItem>
                      <SelectItem value={Specialization.SURGERY}>
                        Surgery
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical License Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="items-top flex gap-2">
          <Checkbox id="privacy-policy" required />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="privacy-policy"
              className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the Privacy Policy
            </label>
            <p className="text-sm text-black">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#0FA3B1] text-white hover:bg-[#0fa3b1cd]"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
