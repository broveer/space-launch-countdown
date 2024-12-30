'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string;
}

export default function LaunchCountdownSmall({ targetDate }: CountdownProps) {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const launchTime = new Date(targetDate).getTime()
      const distance = launchTime - now

      if (distance < 0) {
        setCountdown('Launched')
        clearInterval(timer)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="font-mono text-yellow-300 text-lg font-bold">
      {countdown}
    </div>
  )
}

