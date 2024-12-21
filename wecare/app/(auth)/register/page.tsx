import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselPlugin } from "@/components/CarouselPlugin";

export default function Register() {
  return (
    <div className="flex h-screen max-h-screen text-black bg-white">
      {" "}
      <section className="remove-scrollbar container ">
        {" "}
        <div className="sub-container max-w-[660px] flex-1 flex-col py-10">
          {" "}
          <div className="flex flex-row gap-8 justify-center">
            {" "}
            <Image
              src="/assets/icons/logo.png"
              alt="patient"
              height={1000}
              width={1000}
              className="mb-12 h-16 w-fit"
              priority
            />
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>{" "}
              <p className="text-black">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Sign in{" "}
                </Link>
              </p>{" "}
            </div>
          </div>
          <RegisterForm />{" "}
          <p className="copyright py-12">
            &#169; 2024 We.Care All rights reserved.
          </p>
        </div>
      </section>
      {/* <div className="side-img max-w-[500px]">
        <CarouselPlugin />
      </div> */}
      <Image
        src="/assets/imgs/d1.jpg"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[550px]"
        priority
      />{" "}
    </div>
  );
}
