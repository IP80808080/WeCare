"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Clock, Menu, LogOut, User, Settings, Activity } from "lucide-react";
import { useAuth } from "@/hooks/authhook";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Role } from "@/types/user.types";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { GiMaterialsScience } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import Link from "next/link";
import { db } from "@/lib/db";
import UpdateUI from "@/components/UpdateUI";
import PendingApproval from "@/components/PendingApproval";
import Analysis from "@/components/Analysis";
import HealthMetrix from "@/components/HealthMetrix";
import Complaint from "@/components/Complaint";
import useDocApproval from "@/hooks/docApprove";
import Image from "next/image";
import PendingPatient from "@/components/PendingPatient";
import PatientChatting from "@/components/PatientChatting";

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-6 rounded-lg shadow-lg ${gradient}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <Icon className="w-12 h-12 text-white opacity-75" />
    </div>
  </motion.div>
);

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

export default function DoctorDashboard({
  params,
}: {
  params: { userId: string };
}) {
  useAuth();
  useDocApproval();
  const [activeTab, setActiveTab] = useState("Doctor Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(Role.PATIENT);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { userId } = params;

  const sidebarItems = [
    { icon: RiAdminLine, label: "Doctor Dashboard", value: "Doctor Dashboard" },
    { icon: GrUpdate, label: "Chatting", value: "Chatting" },
    { icon: GiMaterialsScience, label: "Analysis", value: "Analysis" },
    { icon: Activity, label: "Health Metrics", value: "Health Metrics" },
    { icon: MdOutlineRateReview, label: "Complaints", value: "Complaints" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });

      if (response.ok) {
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        sessionStorage.removeItem("token");

        localStorage.removeItem("token");

        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-[#B5E2FA] to-[#0FA3B1] text-gray-100 overflow-hidden">
      <ShootingStarBackground />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex justify-between items-center  p-4 bg-white/60 bg-opacity-50">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Image
              src="/assets/icons/Fulllogo.png"
              alt="wecare"
              className="w-44"
              width={251}
              height={400}
              priority
            />
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 text-gray-100 border-gray-800"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="hover:bg-gray-800">
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/doctor-dashboard/profile/${userId}`}>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4" />
                  <Link href={`/doctor-dashboard/settings/${userId}`}>
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              className="text-black hover:text-white"
              onClick={() => {
                setIsLoggingOut(true);
                handleLogout();
              }}
            >
              {isLoggingOut ? (
                "Logging out..."
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </>
              )}
            </Button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || !isSidebarOpen) && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  isSidebarOpen ? "block" : "hidden"
                } lg:block w-64 bg-white text-black bg-opacity-50 backdrop-blur-lg p-4 overflow-y-auto`}
              >
                <nav>
                  {sidebarItems.map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Button
                        variant={
                          activeTab === item.value ? "secondary" : "ghost"
                        }
                        className="w-full justify-start mb-2 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                        onClick={() => {
                          setActiveTab(item.value);
                          setIsSidebarOpen(false);
                        }}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-8 overflow-auto">
            <motion.h2
              className="text-2xl lg:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {activeTab === "Doctor Dashboard" && (
                  <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
                    >
                      <StatCard
                        title="Total Doctors"
                        value="1,234"
                        icon={FaUserDoctor}
                        gradient="bg-gradient-to-br from-purple-600 to-blue-500"
                      />
                      <StatCard
                        title="Total Patients"
                        value="5,678"
                        icon={MdOutlineSick}
                        gradient="bg-gradient-to-br from-pink-600 to-orange-500"
                      />
                      <StatCard
                        title="Pending Approvals"
                        value="42"
                        icon={Clock}
                        gradient="bg-gradient-to-br from-green-600 to-teal-500"
                      />
                    </motion.div>

                    <PendingPatient />
                  </div>
                )}
                {activeTab === "Chatting" && (
                  <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 relative z-10">
                    <PatientChatting />
                  </div>
                )}
                {activeTab === "Analysis" && (
                  <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 relative z-10">
                    <Analysis />
                  </div>
                )}
                {activeTab === "Health Metrics" && (
                  <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 relative z-10">
                    <HealthMetrix />
                  </div>
                )}
                {activeTab === "Complaints" && (
                  <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 relative z-10">
                    <Complaint />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
