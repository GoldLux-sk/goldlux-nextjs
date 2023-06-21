import { redirect } from "next/navigation"
import Link from "next/link";

export default function Inputs() {

  async function Register(data: FormData) {
    'use server'

    const email = data.get("email")
    const password = data.get("password")
    const passwordRetry = data.get("passwordRetry")

    if (password !== passwordRetry) {
      return console.log("Passwords do not match")
    }

    const res = await fetch("https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())

    console.log(res)

    redirect("/")
  }

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-lg font-semibold opacity-50">Registrovanie</h1>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl font-semibold">Vitajte v appke GoldLux!</h1>
      </div>

      <div className="mt-20 flex flex-col gap-5 w-3/4 max-w-2xl">
        <form action={Register} className="flex flex-col">
          <label htmlFor="name" className="font-light">Email</label>
          <input type="email" name="email" required placeholder="email@text.com" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          <label htmlFor="password" className="font-light">Heslo</label>
          <input type="password" name="password" placeholder="Heslo" className="border-2 border-black rounded-2xl h-12 px-3 mb-2" />
          <label htmlFor="passwordRetry" className="font-light">Zopakujte Vaše Heslo</label>
          <input type="password" name="passwordRetry" placeholder="Znova heslo" className="border-2 border-black rounded-2xl h-12 px-3" />
          <div className="mt-12 flex justify-center">
            <input type="submit" value="Zaregistrovať sa" className="px-5 h-11 w-44 border-2 transition-colors duration-300 hover:border-black cursor-pointer font-medium rounded-2xl" />
          </div>
        </form>
      </div>

      <Link href="/login" className="mt-20 underline opacity-50">Ak už máte účet, prihláste sa</Link>
    </div>
  )
}
