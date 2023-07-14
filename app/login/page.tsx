"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from 'lucide-react';

type Inputs = {
  email: string,
  password: string
}

export default function Home() {
  const [error, setError] = useState<string>("")
  const [showPass, setShowPass] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    }).then(res => res.json())

    console.log(res)

    if (res.errors) {
      setError("Nesprávne prihlasovacie údaje.")
    }
    if (res.message === 'Auth Passed') {
      router.push("/orders")
    }
  }


  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-lg font-semibold opacity-50">Prihlasovanie</h1>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-semibold">Vitajte v appke GoldLux!</h1>
      </div>

      <div className="mt-20 flex flex-col gap-5 w-3/4 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="name" className="font-light">Email</label>
          <input {...register("email", { required: true })} type="email" name="email" placeholder="email@text.com" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          <label htmlFor="password" className="font-light">Heslo</label>
          <input {...register("password", { required: true })} type={showPass ? 'text' : 'password'} name="password" placeholder="Heslo" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          {showPass ?
            <EyeOff onClick={() => setShowPass(false)} className="w-6 h-6 -mb-6 relative left-[calc(100%-38px)] bottom-[2.7rem]" /> :
            <Eye onClick={() => setShowPass(true)} className="w-6 h-6 -mb-6 relative left-[calc(100%-38px)] bottom-[2.7rem]" />
          }

          {(errors.password?.type === 'required' || errors.email?.type === 'required') && (
            <p role="alert" className="mt-10 text-center text-red-500">Najprv, vyplnte políčka, touto cestou sa budete vedieť prihlásiť do aplikácie.</p>
          )}
          {error && <p role="alert" className="mt-10 text-center text-red-500">{error}</p>}

          <input type="submit" value="Prihlásiť sa" className="px-5 h-11 w-full mt-16 border-2 transition-colors duration-300 hover:border-black cursor-pointer font-medium rounded-2xl" />
        </form>
      </div>

      <Link href="/register" className="mt-20 underline opacity-50">Alebo, ak ste nový užívateľ, zaregistrujte sa </Link>
    </div>
  )
}