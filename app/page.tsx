'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  useEffect(() => { setTimeout(() => router.push('/login'), 1000) });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="GoldLux Logo"
        width={260}
        height={55}
        priority
      />
    </main>
  )
}
