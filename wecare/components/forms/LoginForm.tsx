"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Loader from "@/loader";

interface Props {}

enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      const { userId, role, token } = result;
      // console.log("Login successful:", result);
      sessionStorage.setItem("token", token);

      // Store the token in local storage
      localStorage.setItem("token", token);

      redirectToDashboard(result.role, result.id);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const redirectToDashboard = (role: string, userId: string) => {
    switch (role) {
      case "PATIENT":
        router.push(`/dashboard`);
        break;
      case "DOCTOR":
        router.push(`/doctor-dashboard`);
        break;
      case "ADMIN":
        router.push(`/admin-dashboard`);
        break;
      default:
        router.push("/login");
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-black hover:underline"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
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
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="h-4 w-4  text-black" />
                      ) : (
                        <EyeOff className="h-4 w-4  text-black" />
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
          <Button
            type="submit"
            className="w-full bg-[#0FA3B1] text-white hover:bg-[#0fa3b1cd]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
