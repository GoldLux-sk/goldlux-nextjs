import payload from 'payload'
import './globals.css'
import { Roboto } from 'next/font/google'

export const metadata = {
  title: 'Goldlux',
  description: 'Goldlux, the new way of cleaning',
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // await payload.init({
  //   secret: process.env.PAYLOAD_SECRET || 'payload-is-awesome',
  //   mongoURL: process.env.PAYLOAD_MONGO_URL || 'mongodb://127.0.0.1/goldlux-payloadcms',
  //   local: true,
  // })

  return (
    <html lang="en" className={roboto.className}>
      <body id="root" >{children}</body>
    </html>
  )
}
