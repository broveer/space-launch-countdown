import Link from 'next/link'
import LaunchCountdown from '@/components/LaunchCountdown'

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 mx-auto max-w-6xl font-hubot">
      <h1 className="text-4xl font-bold mb-8 text-center">Next Space Launch</h1>
      <LaunchCountdown />
      <div className="text-center mt-8">
        <Link href="/launches" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          View All Launches
        </Link>
      </div>
    </main>
  )
}

