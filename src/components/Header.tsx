'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const mainNavLinks = [
	{ name: 'Auto', href: '/auto', description: 'Get a quote for your car' },
	{ name: 'Home', href: '/home', description: 'Protect your home and belongings' },
	{ name: 'Life', href: '/life', description: "Secure your family's future" },
	{ name: 'Health', href: '/health', description: 'Find the right health coverage' },
];

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	// Check if the current path matches the nav link
	const isActive = (path: string) => {
		return pathname === path || pathname.startsWith(`${path}/`);
	};

	return (
		<header className="bg-primary-50/95 backdrop-blur-md sticky top-0 z-40 shadow-md">
			<nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Link href="/" aria-label="QuoteLinker Homepage">
                            <Logo />
                        </Link>
					</div>
                    {/* Desktop Menu Links */}
					<div className="hidden md:flex flex-grow items-center justify-start ml-6 lg:ml-8">
						<div className="flex space-x-8">
							{mainNavLinks.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`text-base font-medium transition-colors duration-150 ${
										isActive(item.href) 
											? 'text-accent-500' 
											: 'text-secondary-700 hover:text-accent-500'
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>
                        <div className="ml-auto flex items-center space-x-6 lg:space-x-8">
                            <Link href="/learn" className="text-base font-medium text-secondary-700 hover:text-accent-500">Learn</Link>
                            <Link href="/agents" className="text-base font-medium text-secondary-700 hover:text-accent-500">Agents</Link>
                        </div>
					</div>
					
					<div className="flex items-center">
						<div className="hidden md:flex items-center">
							<Link href="/get-quote" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent-500 hover:bg-accent-600">
								Get a Quote
							</Link>
						</div>
						{/* Mobile menu button */}
						<div className="-mr-2 flex items-center md:hidden">
							<button
								type="button"
								className="bg-primary-50 rounded-md p-2 inline-flex items-center justify-center text-secondary-400 hover:text-secondary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-500"
								onClick={() => {
									try {
										setIsMobileMenuOpen(prevState => !prevState);
									} catch(err) {
										console.error('Error toggling mobile menu:', err);
										// If there's an error, force it to a specific state
										setIsMobileMenuOpen(false);
									}
								}}
								aria-expanded={isMobileMenuOpen}
								aria-label="Toggle navigation menu"
							>
								<span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
								{isMobileMenuOpen ? (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				
				{/* Mobile menu panel */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-gray-200 absolute left-0 right-0 bg-white shadow-lg z-50">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{mainNavLinks.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`block px-3 py-2 rounded-md text-base font-medium text-center transition-colors ${
										isActive(item.href)
											? 'text-accent-500 bg-gray-50'
											: 'text-gray-700 hover:text-accent-500 hover:bg-gray-50'
									}`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
							<Link 
								href="/learn" 
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50 text-center transition-colors" 
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Learn
							</Link>
							<Link 
								href="/agents" 
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50 text-center transition-colors" 
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Agents
							</Link>
						</div>
						<Link
							href="/get-quote"
							className="block w-full px-5 py-3 text-center font-medium text-white bg-accent-500 hover:bg-accent-600"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Get a Quote
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Header;