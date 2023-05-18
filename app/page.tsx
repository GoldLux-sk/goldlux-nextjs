import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"


export default function Home() {

  const onSubmit = async (data: FormData) => {
    "use server"

    const password = data.get("password")
    const email = data.get("email")

    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const resData = await res.json()

    // @ts-ignore
    cookies().set("payload-token", resData.token, { secure: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 24 * 7) })
    console.log(resData)
    redirect("/orders")

  }


  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-lg font-semibold opacity-50">Prihlasovanie</h1>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-semibold">Vitajte v appke GoldLux!</h1>
      </div>

      <div className="mt-20 flex flex-col gap-5 w-2/3">
        <form action={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-light">Email</label>
            <input type="email" name="email" placeholder="email@text.com" className="border-2 border-black rounded-2xl h-12 px-3" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-light">Heslo</label>
            <input type="password" name="password" placeholder="Heslo" className="border-2 border-black rounded-2xl h-12 px-3" />
          </div>
          <input type="submit" className="px-5 h-10 border-2 items-center flex font-medium mt-5 rounded-xl" />
        </form>
      </div>

      <Link href="/register" className="mt-20 underline text-blue-600">Registracia</Link>
    </div>
  )
}
