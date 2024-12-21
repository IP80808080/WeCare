"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Phone,
  Video,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { images } from "@/lib/constants";
import Link from "next/link";
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-x-2">
            <Image
              src="/assets/icons/logo.png"
              alt="Background"
              className="object-cover w-12 h-12"
              width={1028}
              height={1028}
              priority
            />
            <h1 className="text-2xl font-bold">WeCare</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/login"
                  className="hover:text-white transition-colors"
                >
                  Login
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#services"
                  className="hover:text-blue-300 transition-colors"
                >
                  Services
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#footer"
                  className="hover:text-blue-300 transition-colors"
                >
                  About
                </a>
              </motion.li>
            </ul>
          </nav>
        </div>
      </motion.header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              Get Started with We.Care Today
            </h2>
            <p className="text-xl text-gray-300">
              Connect with healthcare professionals from the comfort of your
              home.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/register">
                <Button className="text-black font-bold">
                  Start Your Journey <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full max-w-xl mx-auto"
            >
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video">
                      <Image
                        src={src}
                        alt={`Telemedicine image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-600/20 rounded-lg pointer-events-none"
            ></motion.div>
          </motion.div>
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mt-16"
          id="services"
        >
          <motion.h3
            variants={fadeIn}
            className="text-2xl font-semibold text-center mb-8 text-white"
          >
            Our Services
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: "Audio Calls", color: "text-blue-400" },
              {
                icon: Video,
                title: "Video Consultations",
                color: "text-indigo-400",
              },
              {
                icon: MessageCircle,
                title: "Secure Messaging",
                color: "text-purple-400",
              },
              {
                icon: Calendar,
                title: "Easy Scheduling",
                color: "text-green-400",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="transition-all duration-300 hover:shadow-lg bg-gray-800 border-gray-700 overflow-hidden group">
                  <CardContent className="flex flex-col items-center p-6 text-center relative">
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      initial={false}
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <feature.icon
                        className={`h-12 w-12 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                      />
                    </motion.div>
                    <h4 className="mt-4 font-semibold text-white">
                      {feature.title}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-white">
                See How It Works
              </h3>
              <h2 className="text-gray-300 ">
                Watch our quick tutorial to learn how easy it is to get started
                with TeleMed Connect.
                <p className="text-left">
                  It&#39;s a technologies to provide and support healthcare when
                  distance separates the participants. It involves the exchange
                  of medical information from one site to another through
                  electronic communication, enabling real-time, two-way
                  interaction.
                </p>
              </h2>
            </div>
            <motion.div
              className="md:w-1/2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="lg:h-80 rounded-lg overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/Y7g0A-TPMi4"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Ready to Get Started?
          </h3>
          <p className="text-gray-300 mb-6">
            Join Newsletter where thousands of patients who trust TeleMed
            Connect for their healthcare needs.
          </p>
          <motion.form
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            />
            <Link href="/register">
              <Button type="submit" className="text-black font-bold">
                Sign Up Now
              </Button>
            </Link>
          </motion.form>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 text-white py-12"
        id="footer"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">TeleMed Connect</h4>
              <p className="text-gray-400">
                Revolutionizing healthcare through technology.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    Services
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </motion.li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </motion.li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Connect With Us</h5>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400"
          >
            <p>&copy; 2024 We.Care All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
