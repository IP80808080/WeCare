"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Component() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex flex-1 items-center justify-end bg-gradient-to-br from-[#0FA3B1] to-[#86B029] text-black p-14">
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/assets/imgs/d4.jpg"
            alt="Background"
            className="object-cover w-full h-full"
            width={1250}
            height={1250}
            priority
          />
        </div>
        <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8 space-y-2">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl text-black font-bold">Forgot Password</h1>
              <p className="text-black">
                Enter your phone number or email to receive a one-time password.
              </p>
            </div>
            <div className="space-y-4">
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid grid-cols-2 gap-4 bg-[#B5E2FA] text-black">
                  <TabsTrigger value="phone">Phone Number</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="phone">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <PhoneInput
                      defaultCountry="IN"
                      className="input-phone text-black"
                      placeholder="Enter your number"
                      international
                      withCountryCallingCode
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="email">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#0FA3B1] text-white hover:bg-[#0fa3b1cd]">
                    Continue
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] text-black bg-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-center">
                      Enter One-Time Password
                    </DialogTitle>
                    <DialogDescription className="text-black">
                      We&#39;ve sent a one-time password to your selected
                      option. Please enter it below to reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center">
                    <InputOTP maxLength={6} pattern="^[0-9]+$">
                      <InputOTPGroup className="flex space-x-2 justify-center">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <DialogFooter className="sm:justify-evenly">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-[#0FA3B1] text-white hover:bg-[#0fa3b1cd]"
                    >
                      Continue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="relative flex justify-center text-md uppercase">
              <span className="text-black">Or</span>
            </div>
            <Link href="/login" className="hover:underline text-black">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
