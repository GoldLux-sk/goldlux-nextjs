"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

type Inputs = {
  email: string,
  password: string
  passwordRetry: string
}

export default function Register() {
  const [error, setError] = useState<string>("")
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    if (data.passwordRetry !== data.password) {
      setError("Heslá sa nezhodujú.")
      return
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/users`, {
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
      setError(res.errors[0].data[0].message)
    }
    if (res.doc) {
      toast.success("Registrácia prebehla úspešne. Môžete sa prihlásiť.", {
        duration: 1999,
      })
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Toaster />
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-lg font-semibold opacity-50">Registrovanie</h1>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-semibold">Vitajte v appke GoldLux!</h1>
      </div>

      <div className="mt-20 flex flex-col gap-5 w-3/4 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="name" className="font-light">Email</label>
          <input {...register("email", { required: true })} type="email" name="email" required placeholder="email@text.com" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          <label htmlFor="password" className="font-light">Heslo</label>
          <input {...register("password", { required: true })} type="password" name="password" placeholder="Heslo" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          <label htmlFor="passwordRetry" className="font-light">Zopakujte Vaše Heslo</label>
          <input {...register("passwordRetry", { required: true })} type="password" name="passwordRetry" placeholder="Znova heslo" className="border-2 border-black rounded-2xl h-12 px-3" />

          {errors && <p role="alert" className="text-red-500 mt-10 text-center">{errors.password && "Heslo je povinné."}</p>}
          {errors && <p role="alert" className="text-red-500 mt-10 text-center">{errors.passwordRetry && "Zopakujte prosim heslo."}</p>}
          {error && <p role="alert" className="text-red-500 mt-10 text-center">{error}</p>}
          <input type="submit" value="Zaregistrovať sa" className="px-2 h-11 w-full border-2 transition-colors duration-300 hover:border-black cursor-pointer font-medium rounded-2xl" />
        </form>
      </div>

      <Link href="/login" className="mt-20 underline opacity-50">Ak už máte účet, prihláste sa</Link>
    </div>
  )
}
