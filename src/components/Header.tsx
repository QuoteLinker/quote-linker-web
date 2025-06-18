'use client';

import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Logo from './Logo';

const insuranceProducts = [
	{ name: 'Auto Insurance', href: '/get-quote?type=auto', description: 'Get a quote for your car' },
	{ name: 'Home Insurance', href: '/get-quote?type=home', description: 'Protect your home and belongings' },
	{ name: 'Life Insurance', href: '/get-quote?type=life', description: "Secure your family's future" },
	{ name: 'Health Insurance', href: '/get-quote?type=health', description: 'Find the right health coverage' },
];

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
						<Popover className="relative">
							{({ open: desktopMenuOpen, close: closeDesktopMenu }) => (
								<>
									<Popover.Button className="group inline-flex items-center text-base font-medium text-secondary-700 hover:text-accent-500 focus:outline-none">
										<span>Insurance Type</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${desktopMenuOpen ? 'transform rotate-180' : ''} ml-1 h-5 w-5 text-secondary-400 group-hover:text-accent-500 transition-transform duration-150`}>
                                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
									</Popover.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
									>
										<Popover.Panel className="absolute z-10 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:left-1/2 lg:-translate-x-1/2">
											<div className="rounded-lg shadow-lg ring-1 ring-secondary-900 ring-opacity-5 overflow-hidden">
												<div className="relative grid gap-2 bg-primary-50 px-5 py-6 sm:gap-4 sm:p-8 justify-items-center">
													{insuranceProducts.map((item) => (
														<Link
															key={item.name}
															href={item.href}
															className="-m-3 p-3 w-full flex flex-col items-center rounded-lg hover:bg-primary-100 transition ease-in-out duration-150 text-center"
															onClick={() => closeDesktopMenu()} 
														>
															<p className="text-base font-medium text-secondary-900">{item.name}</p>
															<p className="mt-1 text-sm text-secondary-500">{item.description}</p>
														</Link>
													))}
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
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
				<Transition
					show={isMobileMenuOpen}
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<div className="md:hidden border-t border-gray-200 absolute left-0 right-0 bg-white shadow-lg z-50">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{insuranceProducts.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent-500 hover:bg-gray-50 text-center transition-colors"
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
				</Transition>
			</nav>
		</header>
	);
};

export default Header;