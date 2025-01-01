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

interface LaunchCountdownProps {
  setBackgroundImage: (url: string) => void;
}

export default function LaunchCountdown({ setBackgroundImage }: LaunchCountdownProps) {
  const [launchData, setLaunchData] = useState<LaunchData | null>(null)
  const [countdown, setCountdown] = useState<{ days: string, hours: string, minutes: string, seconds: string }>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
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

        setCountdown(prevCountdown => {
          const newCountdown = {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
          }

          Object.keys(newCountdown).forEach(unit => {
            if (unit in newCountdown && newCountdown[unit as keyof typeof newCountdown] !== prevCountdown[unit as keyof typeof prevCountdown]) {
              const prevDigits = prevCountdown[unit as keyof typeof prevCountdown].split('');
              const newDigits = newCountdown[unit as keyof typeof newCountdown].split('');
              newDigits.forEach((digit, index) => {
                if (digit !== prevDigits[index]) {
                  const element = document.querySelector(`.countdown-number-${unit}-${index}`);
                  if (element) {
                    element.classList.remove('fadeInDown', 'fadeInStay', 'fadeInOut');
                    void (element as HTMLElement).offsetWidth; // Trigger reflow
                    if (unit === 'seconds' && index === 1) {
                      element.classList.add('fadeInOut');
                    } else if (unit === 'seconds' && index === 0) {
                      element.classList.add('fadeInStay');
                    } else if (unit === 'minutes' && index === 1) {
                      element.classList.add('fadeInOut');
                    } else if (unit === 'minutes' && index === 0) {
                      element.classList.add('fadeInStay');
                    } else if (unit === 'hours' && index === 1) {
                      element.classList.add('fadeInOut');
                    } else if (unit === 'hours' && index === 0) {
                      element.classList.add('fadeInStay');
                    } else {
                      element.classList.add('fadeInDown');
                    }
                  }
                }
              });
            }
          });

          return newCountdown;
        });

        if (distance < 0) {
          clearInterval(timer)
          setCountdown({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
          })
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [launchData])

  useEffect(() => {
    if (launchData?.launch_service_provider?.logo_url) {
      setBackgroundImage(launchData.launch_service_provider.logo_url);
    }
  }, [launchData, setBackgroundImage]);

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
            {countdown.days !== '00' && (
              <>
                <div className="relative text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-container">
                  {countdown.days.split('').map((digit, index) => (
                    <span key={index} className={`countdown-number countdown-number-days-${index}`}>{digit}</span>
                  ))}
                </div>
                <div className="text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-number">
                  :
                </div>
              </>
            )}
            <div className="relative text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-container">
              {countdown.hours.split('').map((digit, index) => (
                <span key={index} className={`countdown-number countdown-number-hours-${index}`}>{digit}</span>
              ))}
            </div>
            <div className="text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-number">
              :
            </div>
            <div className="relative text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-container">
              {countdown.minutes.split('').map((digit, index) => (
                <span key={index} className={`countdown-number countdown-number-minutes-${index}`}>{digit}</span>
              ))}
            </div>
            <div className="text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-number">
              :
            </div>
            <div className="relative text-4xl font-bold font-mono bg-slate-900 p-2 rounded tracking-wide countdown-container">
              {countdown.seconds.split('').map((digit, index) => (
                <span key={index} className={`countdown-number countdown-number-seconds-${index}`}>{digit}</span>
              ))}
            </div>
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

        {launchData.vidURLs?.length > 0 && (
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
      <style jsx>{`
        .countdown-container {
          position: relative;
          overflow: hidden;
        }

        .countdown-number {
          display: inline-block;
          text-align: center;
        }

        .fadeInDown {
          animation: fadeInDown 1s ease-in-out;
        }

        .fadeInStay {
          animation: fadeInStay 1s ease-in-out;
        }

        .fadeInOut {
          animation: fadeInOut 1s ease-in-out;
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }

        @keyframes fadeInStay {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-100%);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  )
}

