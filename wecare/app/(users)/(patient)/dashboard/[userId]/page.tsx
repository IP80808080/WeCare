"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  LogOut,
  Activity,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Role } from "@/types/user.types";
import { useAuth } from "@/hooks/authhook";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logout";
import { MdOutlineRateReview } from "react-icons/md";
import Link from "next/link";
import AppointmentBooking from "@/components/AppointmentBooking";
import Chatting from "@/components/Chatting";
import SendComplaint from "@/components/SendComplaint";
import HealthMetrix from "@/components/HealthMetrix";
import Image from "next/image";

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

export default function PatientDashboard({
  params,
}: {
  params: { userId: string };
}) {
  const [activeTab, setActiveTab] = useState("Appointments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(Role.PATIENT);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { userId } = params;
  const router = useRouter();
  const { user, loading } = useAuth();

  const sidebarItems = [
    { icon: Calendar, label: "Appointments", value: "Appointments" },
    { icon: MessageSquare, label: "Chat", value: "Chat" },
    { icon: PlusCircle, label: "Book Appointment", value: "Book Appointment" },
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-white via-[#B5E2FA] to-[#0FA3B1] text-gray-100">
      <ShootingStarBackground />
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white/60 bg-opacity-50">
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
                <Link href={`/dashboard/profile/${userId}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                <Link href={`/dashboard/settings/${userId}`}>Settings</Link>
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

      <div className="flex flex-1 overflow-hidden ">
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
                      variant={activeTab === item.value ? "secondary" : "ghost"}
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
            className="text-3xl lg:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gray-700"
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
              {activeTab === "Appointments" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <motion.div variants={cardVariants}>
                    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Upcoming Appointment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">Dr. Jane Smith</p>
                        <p className="text-gray-200">Tomorrow, 2:00 PM</p>
                        <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                          Join Video Call
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <Card className="bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Recent Messages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">Dr. John Doe</p>
                        <p className="text-gray-200">
                          How are you feeling today?
                        </p>
                        <Button className="mt-4 bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto">
                          View Chat
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <Card className="bg-gradient-to-br from-pink-600 to-red-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>Health Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold">
                          Blood Pressure: 120/80
                        </p>
                        <p className="text-gray-200">Heart Rate: 72 bpm</p>
                        <Button className="mt-4 bg-white text-pink-600 hover:bg-gray-100 w-full sm:w-auto">
                          View All Metrics
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}

              {activeTab === "Book Appointment" && <AppointmentBooking />}
              {activeTab === "Chat" && <Chatting />}
              {activeTab === "Health Metrics" && <HealthMetrix />}
              {activeTab === "Complaints" && <SendComplaint />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
