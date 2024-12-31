'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import LaunchCountdownSmall from '@/components/LaunchCountdownSmall'

interface Launch {
  id: string
  name: string
  net: string
  launch_service_provider?: {
    url: string
    name: string;
    logo_url: string;
  }
}

async function fetchAgencyLogo(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.logo_url || null
  } catch (error) {
    console.error('Error fetching agency logo:', error)
    return null
  }
}

export default function LaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([])
  const [agencyFilter, setAgencyFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')

  useEffect(() => {
    fetchLaunches()
  }, [])

  useEffect(() => {
    filterLaunches()
  }, [launches, agencyFilter, monthFilter])

  async function fetchLaunches() {
    try {
      const response = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=20')
      const data = await response.json()
      const launchesWithLogos = await Promise.all(
        data.results.map(async (launch: Launch) => {
          if (launch.launch_service_provider?.url) {
            const logo_url = await fetchAgencyLogo(launch.launch_service_provider.url)
            return {
              ...launch,
              launch_service_provider: {
                ...launch.launch_service_provider,
                logo_url,
              },
            }
          }
          return launch
        })
      )
      setLaunches(launchesWithLogos)
    } catch (error) {
      console.error('Error fetching launches:', error)
    }
  }

  function filterLaunches() {
    let filtered = launches

    if (agencyFilter) {
      filtered = filtered.filter(launch =>
        launch.launch_service_provider?.name.toLowerCase().includes(agencyFilter.toLowerCase())
      )
    }

    if (monthFilter) {
      filtered = filtered.filter(launch => new Date(launch.net).getMonth() === parseInt(monthFilter) - 1)
    }

    setFilteredLaunches(filtered)
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <div className="min-h-screen p-8 font-hubot mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Upcoming Launches</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by agency"
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          className="px-2 py-1 border rounded text-black"
        />
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-2 py-1 border rounded text-black"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLaunches.map((launch) => (
          <div key={launch.id} className="border p-4 bg-gray-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">{launch.name}</h2>
                <p className="text-sm text-gray-300">{launch.launch_service_provider?.name || 'Unknown Agency'}</p>
              </div>
              {launch.launch_service_provider?.logo_url && (
                <img
                  src={launch.launch_service_provider.logo_url}
                  alt={launch.launch_service_provider.name}
                  className={`w-16 h-16 mr-4 object-contain rounded-full border-l-purple-300 p-1 ${['Rocket Lab', 'Russian Federal Space Agency (ROSCOSMOS)', 'China Aerospace Science and Technology Corporation'].includes(launch.launch_service_provider.name) ? 'bg-gray-900' : 'bg-zinc-200'
                    }`}
                />
              )}
            </div>
            <p className="mb-2">Date: {formatDate(launch.net)}</p>
            <LaunchCountdownSmall targetDate={launch.net} />
          </div>
        ))}
      </div>
      <Link href="/" className="mt-8 inline-block px-4 py-2 bg-[#ef271b] text-white rounded hover:bg-[#ef271bDD] transition-colors">
        Back to Home
      </Link>
      {/* <h2 className="text-2xl font-bold mt-8">Subscribe to my newsletter</h2>
      <p className='font-mona text-gray-300 text-lg'>Stay up-to-date with all of my latest projects by subscribing to my newsletter.</p>
      <iframe
        src="https://broveer.kit.com/04ad9d1ead"
        className="mt-8 w-full h-96 border rounded bg-zinc-300"
        title="Newsletter subscription form"
      ></iframe> */}
    </div>
  )
}

