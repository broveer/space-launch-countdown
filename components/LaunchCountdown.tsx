'use client'

import { useState, useEffect } from 'react'
// import Image from 'next/image'

interface LaunchData {
  name: string;
  net: string;
  launch_service_provider: {
    name: string;
    url: string;
    logo_url: string;
  };
  mission?: {
    name: string;
    description: string;
  };
  rocket: {
    url: string;
  };
  pad: {
    name: string;
    description: string;
  };
  vidURLs: {
    url: string;
    description: string;
    source: string;
  }[];
}

interface AgencyData {
  name: string;
  abbrev: string;
  description: string;
}

interface RocketData {
  name: string;
  description: string;
}

export default function LaunchCountdown() {
  const [launchData, setLaunchData] = useState<LaunchData | null>(null)
  const [countdown, setCountdown] = useState<string>('')
  const [agencyData, setAgencyData] = useState<AgencyData | null>(null);
  const [rocketData, setRocketData] = useState<RocketData | null>(null);

  useEffect(() => {
    fetchLaunchData()
  }, [])

  useEffect(() => {
    if (launchData) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const launchTime = new Date(launchData.net).getTime()
        const distance = launchTime - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)

        if (distance < 0) {
          clearInterval(timer)
          setCountdown('Launch has occurred!')
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [launchData])

  async function fetchLaunchData() {
    try {
      const response = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1');
      const data = await response.json();
      setLaunchData(data.results[0]);

      if (data.results[0].launch_service_provider?.url) {
        const agencyResponse = await fetch(data.results[0].launch_service_provider.url);
        const agencyData = await agencyResponse.json();
        setAgencyData(agencyData);
      }

      if (data.results[0].rocket?.url) {
        const rocketResponse = await fetch(data.results[0].rocket.url);
        const rocketData = await rocketResponse.json();
        setRocketData(rocketData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (!launchData) {
    return <div>Loading...</div>
  }


  return (
    <div className="text-center space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{launchData.name}</h2>
            <img src={`${launchData.launch_service_provider.logo_url}`} alt="" />
            <p className="text-xl">
              by {agencyData && `${agencyData.abbrev}`}
            </p>
            <span className='uppercase text-slate-400'>{agencyData?.name}</span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm mb-2">T minus</span>
          <div className="flex space-x-2">
            {countdown.split('').map((char, index) => (
              <div
                key={index}
                className="w-10 h-14 flex items-center justify-center bg-gray-700 border border-gray-600 text-2xl font-bold"
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-row gap-8 sm:flex-nowrap flex-wrap'>
        {agencyData && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{agencyData.abbrev}</h3>
            <h4 className="text-sm uppercase text-slate-400 font-bold mb-2">{agencyData.name}</h4>
            <p className='font-mona'>{agencyData.description}</p>
          </div>
        )}

        {rocketData && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Rocket: {rocketData.name}</h3>
            <p className='font-mona'>{rocketData.description}</p>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{launchData.pad.name}</h3>
          <p>{launchData.pad.description}</p>
        </div>
      </div>

      {launchData.vidURLs && launchData.vidURLs.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Launch Video</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={launchData.vidURLs[0].url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="mt-4">{launchData.vidURLs[0].description}</p>
        </div>
      )}
    </div>
  )
}

