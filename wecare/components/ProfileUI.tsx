"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  Briefcase,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as ParsedUrlQuery;

  const adminProfile = await db.user.findUnique({
    where: { id: userId as string },
  });

  if (!adminProfile) {
    return { notFound: true };
  }

  return { props: { adminProfile } };
};

type Props = {
  adminProfile: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: string;
    email: string;
    address: string;
  };
};

const ShootingStarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars = Array(100)
      .fill()
      .map(() => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
  );
};

const ProfileUI = ({ userId }: { userId: string }) => {
  const [avatar, setAvatar] = useState(
    "/assets/icons/placeholder.png?height=100&width=100"
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B5E2FA] via-[#B5E2FA] to-[#0FA3B1] p-4 sm:p-6 md:p-8 text-gray-100">
      <ShootingStarBackground />
      <motion.div
        className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#B5E2FA]"
            variants={itemVariants}
          >
            Edit Your Medical Profile
          </motion.h1>

          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={itemVariants}
          >
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 ">
              <AvatarImage src={avatar} alt="Profile picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <Button className="cursor-pointer inline-flex items-center px-4 py-2 ">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="firstname" className="text-gray-300">
                First Name
              </Label>
              <Input
                id="firstname"
                placeholder="John"
                className="rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="lastname" className="text-gray-300">
                Last Name
              </Label>
              <Input
                id="lastname"
                placeholder="Doe"
                className="rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
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
            </motion.div>
            <motion.div
              className="space-y-2 sm:col-span-2"
              variants={itemVariants}
            >
              <Label htmlFor="bio" className="text-gray-300">
                Medical History
              </Label>
              <Textarea
                id="bio"
                placeholder="Brief overview of your medical history"
                className="rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="job" className="text-gray-300">
                Emergency Contact Name
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 " />
                <Input
                  id="job"
                  placeholder="Teacher"
                  className="pl-10 rounded-md text-black bg-[#B5E2FA] placeholder:text-black/50 border border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="location" className="text-gray-300">
                Address
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 " />
                <Input
                  id="location"
                  placeholder="New York, USA"
                  className="pl-10 rounded-md border text-black bg-[#B5E2FA] placeholder:text-black/50 border-[#B5E2FA] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="birthdate" className="text-gray-300">
                Date of Birth
              </Label>
              <div className="flex justify-center items-center rounded-md bg-[#B5E2FA]">
                <Image
                  src="/assets/icons/calendar.svg"
                  height={24}
                  width={24}
                  alt="calendar"
                  className="ml-2 text-black"
                />
                <DatePicker
                  selected={null}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                  wrapperClassName="date-picker w-full"
                  className="rounded p-2 w-full text-black bg-[#B5E2FA] placeholder:text-black"
                  placeholderText="Select a date"
                />
              </div>
            </motion.div>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="website" className="text-gray-300">
                Contact
              </Label>
              <div className="relative">
                <PhoneInput
                  defaultCountry="IN"
                  className="input-phone text-black"
                  placeholder="Enter your number"
                  international
                  withCountryCallingCode
                  onChange={function (value?: Value): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Button variant="outline">
              <Link href={`/admin-dashboard/${userId}`}>Cancel</Link>
            </Button>
            <Button className="bg-[#0FA3B1] text-[#B5E2FA] hover:bg-[#0fa3b1cd]">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileUI;
