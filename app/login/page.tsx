import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LogOutButton from "@/components/common/LogOutButton"
export default function Home() {

  async function handleSubmit(data: FormData) {
    "use server"

    const email = data.get("email")
    const password = data.get("password")


    const res = await fetch("https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())

    console.log(res)

    if (res.errors) {
      return console.log(res.errors[0].message)
    }

    if (res.token) {
      // @ts-ignore
      cookies().set("payload-token", res.token, { httpOnly: true })
      redirect("/orders")
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex items-center justify-center mt-[6vh]">
        <h1 className="text-lg font-semibold opacity-50">Prihlasovanie</h1>
      </div>

      <div className="mt-[12vh]">
        <h1 className="text-2xl font-semibold">Vitajte v appke GoldLux!</h1>
      </div>

      <div className="mt-[8vh] flex flex-col gap-5 w-2/3">
        <form action={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-light">Email</label>
            <input type="email" name="email" required placeholder="Sem napíšte váš email" className="border-2 border-black rounded-2xl h-12 px-3" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-light">Heslo</label>
            <input type="password" name="password" placeholder="Sem napíšte vaše heslo" className="border-2 border-black rounded-2xl h-12 px-3" />

          </div>
          <input type="submit" value="Prihlásiť sa" className="px-5 h-10 border-2 items-center flex font-medium mt-[20vh] rounded-xl" />
        </form>
      </div>

      <Link href="/register" className="mt-[10vh] underline opacity-50"><u>Alebo, ak ste nový užívateľ, zaregistrujte sa</u></Link>
    </div>
  )
}
