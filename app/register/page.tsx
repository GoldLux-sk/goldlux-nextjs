"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

type Inputs = {
  email: string;
  password: string;
  passwordRetry: string;
};

export default function Register() {
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<[boolean, boolean]>([false, false]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.passwordRetry !== data.password) {
      setError("Heslá sa nezhodujú.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/users`,
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

    console.log(res);

    if (res.errors) {
      setError(res.errors[0].data[0].message);
    }
    if (res.doc) {
      toast.success("Registrácia prebehla úspešne. Môžete sa prihlásiť.", {
        duration: 1999,
      });
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col items-center justify-center"
    >
      <Toaster />
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl font-medium mb-10">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col mb-10">
            <div>
              <h2 className="text-4xl text-black">
                Registrácia v aplikácií GOLDLUX
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
                  required
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
                      type={showPass[0] ? "text" : "password"}
                    />
                    {showPass[0] ? (
                      <svg
                        onClick={() => setShowPass([showPass[1], false])}
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
                        onClick={() => setShowPass([showPass[1], true])}
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
                <div className="col-span-full mt-5">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    Znova heslo
                  </label>
                  <div className="flex relative">
                    <input
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="******"
                      {...register("passwordRetry", { required: true })}
                      autoComplete="on"
                      type={showPass[1] ? "text" : "password"}
                    />
                    {showPass[1] ? (
                      <svg
                        onClick={() => setShowPass([showPass[0], false])}
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
                        onClick={() => setShowPass([showPass[0], true])}
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

                {errors && (
                  <p role="alert" className="text-red-500 mt-10 text-center">
                    {errors.password
                      ? "Heslo je povinné."
                      : errors.passwordRetry && "Zopakujte prosim heslo."}
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-red-500 mt-10 text-center">
                    {error}
                  </p>
                )}

                <div className="col-span-full mt-5">
                  <button
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    type="submit"
                  >
                    Zaregistrovať sa
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/login"
            className="underline underline-offset-2 text-black text-center font-normal"
          >
            Ak už máte účet, prihláste sa{" "}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
