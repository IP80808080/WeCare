import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { LuTwitter } from "react-icons/lu";

export default function Login() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
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
        <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
          <div className="space-y-4 ">
            <div className="flex justify-center">
              <Image
                src="/assets/icons/logo.png"
                alt="Background"
                className="object-cover w-12 h-12"
                width={1028}
                height={1028}
                priority
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight">Sign-In</h2>
              <p className="text-black">
                Enter Credientials below to access your account.
              </p>
            </div>
            <LoginForm />
            <div className="space-y-2  text-center">
              <p className="text-black">
                don&#39;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-midnight-700" />
              </div>
            </div>

            {/* <div className="flex space-x-4">
              <Button className="w-full bg-midnight-800 hover:bg-midnight-700 text-midnight-50">
                <FcGoogle className="mr-2 h-12 w-12 " />
              </Button>
              <Button className="w-full bg-midnight-800 hover:bg-midnight-700 text-midnight-50">
                <LuTwitter className="mr-2 h-12 w-12" />
              </Button>
            </div> */}
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
