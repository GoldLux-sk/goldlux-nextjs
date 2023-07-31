'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion';


export default function Home() {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  });

  return (
    <motion.main
      ref={ref}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="min-h-screen flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="GoldLux Logo"
        width={260}
        height={55}
        priority
      />
    </motion.main>
  )
}
