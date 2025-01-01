import { Link } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="flex font-mona font-medium space-x-6 sm:order-2">
                        <a
                            href="https://github.com/broveer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#EF271B]"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://bsky.app/profile/broveer.bsky.social"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#EF271B]"
                        >
                            Bluesky
                        </a>
                        <a
                            href="https://twitter.com/realbroveer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-[#EF271B]"
                        >
                            Twitter
                        </a>
                    </div>
                    <div className="other-projects text-center sm:order-3">
                        <h3 className="mt-4 text-md font-hubot font-semibold text-white">
                            Other Projects
                        </h3>
                        <ul>
                            <li><a href="https://broveer.xyz" target="_blank" rel="noopener noreferrer" className="text-[#ffc300] hover:text-[#EF271B] font-hubot">The Broveer Blog</a></li>
                        </ul>
                    </div>
                    <div className="sm:order-1 text-center sm:text-left">
                        <h2 className="text-lg font-hubot font-semibold text-white">
                            Broveer's Spacecraft Launch Countdown
                        </h2>
                        <p className="mt-2 font-mona font-medium text-sm text-gray-300">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Launch details sourced from <a href="https://thespacedevs.com" className="text-blue-400 hover:underline">thespacedevs.com</a>
                        </p>
                    </div>
                </div>
                <div className="about-website mt-4 text-center">
                    <p className="mb-4 font-mona text-base text-gray-300">
                        This website was created by me to provide information about upcoming space launches.
                        <br></br>I am passionate about space exploration and technology.
                        <br></br>This website is <strong>open source</strong>, feel free to contribute on <a href="https://github.com/broveer/space-launch-countdown" className="text-blue-400 hover:underline">GitHub</a>.
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
