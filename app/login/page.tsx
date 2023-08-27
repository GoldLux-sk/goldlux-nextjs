"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/users/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    ).then((res) => res.json());

    if (res.errors) {
      setLoading(false);
      setError("Nesprávne prihlasovacie údaje.");
    }
    if (res.message === "Auth Passed") {
      router.push("/orders");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen overflow-hidden w-full flex flex-col items-center justify-center"
    >
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl font-medium mb-10">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col mb-10">
            <div>
              <h2 className="text-4xl text-black">
                Vitajte v aplikácií GOLDLUX
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 space-y-6">
              <div className="col-span-full mt-5">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm font-normal"
                  placeholder="email@email.com"
                  {...register("email", { required: true })}
                  autoComplete="on"
                  type="email"
                />
                <div className="col-span-full mt-5">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    Heslo
                  </label>
                  <div className="flex relative">
                    <input
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="******"
                      {...register("password", { required: true })}
                      autoComplete="on"
                      type={showPass ? "text" : "password"}
                    />
                    {showPass ? (
                      <svg
                        onClick={() => setShowPass(false)}
                        className="absolute right-3 top-3 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setShowPass(true)}
                        className="absolute right-3 top-3 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>
                </div>

                {(errors.password?.type === "required" ||
                  errors.email?.type === "required") && (
                    <p role="alert" className="mt-10 text-center text-red-500">
                      Najprv, vyplnte políčka, touto cestou sa budete vedieť
                      prihlásiť do aplikácie.
                    </p>
                  )}
                {error && (
                  <p role="alert" className="mt-10 text-center text-red-500">
                    {error}
                  </p>
                )}

                <div className="col-span-full mt-5">
                  <button
                    className="items-center justify-center w-full h-12 px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    type="submit"
                  >
                    {loading ? <Loader2 className="h-6 animate-spin text-white w-full" /> : "Prihlásiť sa"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/register"
            className="underline underline-offset-2 text-black text-center font-normal"
          >
            Ak ste nový užívateľ, zaregistrujte sa{" "}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
