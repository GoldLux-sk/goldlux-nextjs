import { redirect } from "next/navigation"

export default function Inputs() {

    async function Register(data: FormData) {
        'use server'

        const email = data.get("email")
        const password = data.get("password")
        const passwordRetry = data.get("passwordRetry")

        if (password !== passwordRetry) {
            return console.log("Passwords do not match")
        }

        const res = await fetch("http://localhost:3000/api/users", {
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
        <div className="mt-20 flex flex-col gap-5 w-2/3">
            <form action={Register}>
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-light">Email</label>
                    <input type="email" name="email" required placeholder="email@text.com" className="border-2 border-black rounded-2xl h-12 px-3" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-light">Heslo</label>
                    <input type="password" name="password" placeholder="Heslo" className="border-2 border-black rounded-2xl h-12 px-3" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passwordRetry" className="font-light">Zopakujte Vase Heslo</label>
                    <input type="password" name="passwordRetry" placeholder="Znova heslo" className="border-2 border-black rounded-2xl h-12 px-3" />
                </div>
                <input type="submit" className="px-5 h-10 border-2 items-center flex font-medium mt-5 rounded-xl" />
            </form>
        </div>
    )
}
