"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Bell,
  Shield,
  Sliders,
  Wifi,
  Volume2,
  Lock,
  Eye,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

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

export default function SettingsPage({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("preferences");
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [networkPreference, setNetworkPreference] = useState("auto");
  const [videoQuality, setVideoQuality] = useState(720);
  const [notificationSound, setNotificationSound] = useState("default");
  const [showNotifications, setShowNotifications] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const glowVariants = {
    idle: { opacity: 0.5, scale: 1 },
    hover: { opacity: 1, scale: 1.05, transition: { duration: 0.3 } },
  };

  const tabs = [
    {
      value: "preferences",
      icon: <Sliders className="w-5 h-5" />,
      label: "Preferences",
    },
    {
      value: "notifications",
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
    },
    {
      value: "security",
      icon: <Shield className="w-5 h-5" />,
      label: "Security",
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <motion.div
        className="relative flex-1 items-center justify-center bg-gradient-to-br from-white via-[#B5E2FA] to-[#0FA3B1] p-4 lg:pt-20 pt-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ShootingStarBackground />
        <motion.div
          className="max-w-6xl mx-auto bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
          variants={itemVariants}
        >
          <div className="p-6 lg:pl-14 lg:pr-14 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
              Settings
            </h1>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-8 "
            >
              <TabsList className="grid grid-cols-3 gap-2 bg-gray-700 p-1 rounded-xl">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`flex items-center justify-center space-x-2  px-4 rounded-lg transition-all duration-200 ${
                      activeTab === tab.value
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-600"
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="preferences" className="space-y-6">
                    <motion.div
                      variants={glowVariants}
                      whileHover="hover"
                      className="space-y-4 bg-gray-700 p-6 rounded-xl"
                    >
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Call Settings
                      </h2>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="video-preference"
                          className="text-white flex items-center"
                        >
                          <Video className="w-5 h-5 mr-2" />
                          Enable Video by Default
                        </Label>
                        <Switch
                          id="video-preference"
                          checked={isVideoEnabled}
                          onCheckedChange={setIsVideoEnabled}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="audio-preference"
                          className="text-white flex items-center"
                        >
                          <Volume2 className="w-5 h-5 mr-2" />
                          Enable Audio by Default
                        </Label>
                        <Switch
                          id="audio-preference"
                          checked={isAudioEnabled}
                          onCheckedChange={setIsAudioEnabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="network-preference"
                          className="text-white flex items-center"
                        >
                          <Wifi className="w-5 h-5 mr-2" />
                          Network Preference
                        </Label>
                        <Select
                          value={networkPreference}
                          onValueChange={setNetworkPreference}
                        >
                          <SelectTrigger
                            id="network-preference"
                            className="w-full bg-gray-600 text-white border-gray-500"
                          >
                            <SelectValue placeholder="Select network preference" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 text-white border-gray-600">
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="high">High Quality</SelectItem>
                            <SelectItem value="low">Low Bandwidth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="video-quality"
                          className="text-white flex items-center justify-between"
                        >
                          <span className="flex items-center">
                            <Video className="w-5 h-5 mr-2" />
                            Video Quality
                          </span>
                          <span>{videoQuality}p</span>
                        </Label>
                        <Slider
                          id="video-quality"
                          min={360}
                          max={1080}
                          step={360}
                          value={[videoQuality]}
                          onValueChange={(value) => setVideoQuality(value[0])}
                          className="w-full"
                        />
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="notifications" className="space-y-6">
                    <motion.div
                      variants={glowVariants}
                      whileHover="hover"
                      className="space-y-4 bg-gray-700 p-6 rounded-xl"
                    >
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Notification Preferences
                      </h2>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="show-notifications"
                          className="text-white flex items-center"
                        >
                          <Bell className="w-5 h-5 mr-2" />
                          Show Notifications
                        </Label>
                        <Switch
                          id="show-notifications"
                          checked={showNotifications}
                          onCheckedChange={setShowNotifications}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="notification-sound"
                          className="text-white flex items-center"
                        >
                          <Volume2 className="w-5 h-5 mr-2" />
                          Notification Sound
                        </Label>
                        <Select
                          value={notificationSound}
                          onValueChange={setNotificationSound}
                        >
                          <SelectTrigger
                            id="notification-sound"
                            className="w-full bg-gray-600 text-white border-gray-500"
                          >
                            <SelectValue placeholder="Select notification sound" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 text-white border-gray-600">
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="chime">Chime</SelectItem>
                            <SelectItem value="bell">Bell</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="security" className="space-y-6">
                    <motion.div
                      variants={glowVariants}
                      whileHover="hover"
                      className="space-y-4 bg-gray-700 p-6 rounded-xl"
                    >
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Security Settings
                      </h2>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="two-factor-auth"
                          className="text-white flex items-center"
                        >
                          <Lock className="w-5 h-5 mr-2" />
                          Two-Factor Authentication
                        </Label>
                        <Switch id="two-factor-auth" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="end-to-end-encryption"
                          className="text-white flex items-center"
                        >
                          <Shield className="w-5 h-5 mr-2" />
                          End-to-End Encryption
                        </Label>
                        <Switch id="end-to-end-encryption" defaultChecked />
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-black/30 text-white"
                        variant="outline"
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Login History
                      </Button>
                      <Button
                        className="w-full bg-blue-600 hover:bg-black/30 text-white"
                        variant="outline"
                      >
                        <Shield className="mr-2 h-4 w-4" /> Manage Blocked Users
                      </Button>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
          <motion.div
            className="flex flex-col sm:flex-row justify-center pl-4 pr-4 pb-3"
            variants={itemVariants}
          >
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-white/80 hover:text-black"
            >
              <Link href={`/admin-dashboard/${userId}`}>Back to Dashboard</Link>
            </Button>
          </motion.div>
          <motion.div
            className="p-4 bg-gray-900 flex justify-center items-center"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-400">© 2024 WeCare Platform</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
