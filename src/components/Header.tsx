'use client';

import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Fragment, useState } from 'react';
import Logo from './Logo';

const insuranceProducts = [
	{ name: 'Auto Insurance', href: '/get-quote?type=auto', description: 'Get a quote for your car' },
	{ name: 'Home Insurance', href: '/get-quote?type=home', description: 'Protect your home and belongings' },
	{ name: 'Life Insurance', href: '/get-quote?type=life', description: 'Secure your family\'s future' },
	{ name: 'Health Insurance', href: '/get-quote?type=health', description: 'Find the right health coverage' },
	{ name: 'Disability Insurance', href: '/get-quote?type=disability', description: 'Protect your income' },
	{ name: 'Supplemental Health', href: '/get-quote?type=supplemental-health', description: 'Cover out-of-pocket expenses' },
];

// const companyLinks = [
// 	{ name: 'About Us', href: '/about' },
// 	{ name: 'Contact', href: '/contact' },
// 	{ name: 'Privacy Policy', href: '/privacy' },
// 	{ name: 'Terms of Service', href: '/terms' },
// ];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
			<nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Link href="/" aria-label="Homepage">
                            <Logo />
                        </Link>
						<div className="hidden md:flex items-center space-x-6 lg:space-x-8">
							<Popover className="relative">
								{({ open }) => (
									<>
										<Popover.Button className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-cyan-500 focus:outline-none">
											<span>Insurance</span>
											<ChevronDown
												className={`${open ? 'transform rotate-180' : ''} ml-1 h-5 w-5 text-gray-400 group-hover:text-cyan-500 transition-transform duration-150`}
												aria-hidden="true"
											/>
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
											<Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
												<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
													<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
														{insuranceProducts.map((item) => (
															<Link
																key={item.name}
																href={item.href}
																className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
															>
																<div className="ml-4">
																	<p className="text-base font-medium text-gray-900">{item.name}</p>
																	<p className="mt-1 text-sm text-gray-500">{item.description}</p>
																</div>
															</Link>
														))}
													</div>
												</div>
											</Popover.Panel>
										</Transition>
									</>
								)}
							</Popover>
							<Link href="/education" className="text-base font-medium text-gray-700 hover:text-cyan-500">Learn</Link>
							<Link href="/agents" className="text-base font-medium text-gray-700 hover:text-cyan-500">Agents</Link>
						</div>
					</div>
					
					<div className="flex items-center">
						<div className="hidden md:flex items-center">
							<Link href="/get-quote" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-500 hover:bg-cyan-600">
								Get a Quote
							</Link>
						</div>
						<div className="-mr-2 flex items-center md:hidden">
							<button
								type="button"
								className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
								onClick={() => setMobileMenuOpen(true)}
							>
								<span className="sr-only">Open main menu</span>
								<Menu className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile menu */}
			<Transition.Root show={mobileMenuOpen} as={Fragment}>
				<div className="md:hidden">
					<Transition.Child
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50">
							<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="px-5 pt-4 flex items-center justify-between">
									<div>
										<Logo />
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500" onClick={() => setMobileMenuOpen(false)}>
											<span className="sr-only">Close menu</span>
											<X className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="px-2 pt-2 pb-3 space-y-1">
									{/* Mobile Insurance Links */}
									{insuranceProducts.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
											onClick={() => setMobileMenuOpen(false)} // Close menu on click
										>
											{item.name}
										</Link>
									))}
									<Link href="/education" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Learn</Link>
									<Link href="/agents" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Agents</Link>
								</div>
								<Link
									href="/get-quote"
									className="block w-full px-5 py-3 text-center font-medium text-white bg-cyan-500 hover:bg-cyan-600"
									onClick={() => setMobileMenuOpen(false)} // Close menu on click
								>
									Get a Quote
								</Link>
							</div>
						</Popover.Panel>
					</Transition.Child>
				</div>
			</Transition.Root>
		</header>
	);
};

export default Header;