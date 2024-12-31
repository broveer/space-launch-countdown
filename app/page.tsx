'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LaunchCountdown from '@/components/LaunchCountdown'

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState<string>('https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/gslv2520mk2520iii_image_20190604000938.jpg')

  useEffect(() => {
    console.log('Background Image URL:', backgroundImage)
  }, [backgroundImage])

  return (
    <main
      className="min-h-screen p-8 md:p-24 mx-auto max-w-6xl font-hubot bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0.9)), url(${backgroundImage})`,
      }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-[#4b5563BB] p-2 rounded-[8px]">Next Space Launch</h1>
      <LaunchCountdown setBackgroundImage={setBackgroundImage} />
      <div className="text-center mt-8">
        <Link href="/launches" className="px-4 py-2 bg-[#ef271b] text-white rounded hover:bg-[#ef271bDD] transition-colors">
          View All Launches
        </Link>
      </div>
    </main>
  )
}

