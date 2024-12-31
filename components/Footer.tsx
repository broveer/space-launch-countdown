import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-8 mt-8">
            <div className="container mx-auto max-w-2xl">
                <h1 className='font-hubot my-1 text-2xl font-bold'>I am Broveer</h1>
                <p className="mb-4 font-mona text-lg">
                    This website was created by me to provide information about upcoming space launches.
                    <br></br>I am passionate about space exploration and technology.
                    <br></br>Feel free to check out my other projects.
                    <br></br>This website is <strong>open source</strong>, feel free to contribute on <Link href="https://github.com/broveer/space-launch-countdown" className="text-blue-400 hover:underline">GitHub</Link>.
                </p>
                <div className="mt-8">
                    <h3 className="text-lg font-mona font-semibold mb-2 text-gray-300">Check this out</h3>
                    <div className="flex font-hubot font-semibold space-x-4">
                        <Link href="https://broveer.xyz" className="font-hubot hover:underline">
                            Main Website
                        </Link>
                        <a href="https://github.com/broveer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                            GitHub
                        </a>
                        <a href="https://bsky.app/profile/broveer.bsky.social" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                            Bluesky
                        </a>
                        <a href="https://twitter.com/realbroveer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#EF271B]">
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
