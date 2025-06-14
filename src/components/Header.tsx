'use client';

import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Fragment, useState } from 'react';
import Logo from './Logo';

const insuranceProducts = [
	{ name: 'Auto Insurance', href: '/quote?type=auto', description: 'Get a quote for your car' },
	{ name: 'Home Insurance', href: '/quote?type=home', description: 'Protect your home and belongings' },
	{ name: 'Life Insurance', href: '/quote?type=life', description: "Secure your family's future" },
	{ name: 'Health Insurance', href: '/quote?type=health', description: 'Find the right health coverage' },
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm"> {/* Changed z-50 to z-40 */}
			<nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<Link href="/" aria-label="Homepage">
                            <Logo />
                        </Link>
					</div>
                    {/* Desktop Menu Links - Group Insurance, Learn, Agents and push Learn/Agents to the right */} 
					<div className="hidden md:flex flex-grow items-center justify-start ml-6 lg:ml-8"> {/* Added ml-6 lg:ml-8 for spacing from logo */}
						<Popover className="relative">
							{({ open, close }) => (
								<>
									<Popover.Button className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-cyan-500 focus:outline-none">
										<span>Insurance Type</span> {/* Changed from Insurance to Insurance Type */}
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
										<Popover.Panel className="absolute z-10 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:left-1/2 lg:-translate-x-1/2">
											<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
												<div className="relative grid gap-2 bg-white px-5 py-6 sm:gap-4 sm:p-8 justify-items-center"> {/* Reduced gap for tighter packing if needed */}
													{insuranceProducts.map((item) => (
														<Link
															key={item.name}
															href={item.href}
															className="-m-3 p-3 w-full flex flex-col items-center rounded-lg hover:bg-gray-50 transition ease-in-out duration-150 text-center" // Added w-full, flex-col, items-center, text-center
															onClick={() => close()} 
														>
															<p className="text-base font-medium text-gray-900">{item.name}</p>
															<p className="mt-1 text-sm text-gray-500">{item.description}</p>
														</Link>
													))}
												</div>
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
						{/* Spacer to push Learn and Agents to the right */}
                        <div className="ml-auto flex items-center space-x-6 lg:space-x-8">
                            <Link href="/learn" className="text-base font-medium text-gray-700 hover:text-cyan-500">Learn</Link>
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
				<Transition.Child
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50 md:hidden">
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
								{/* Mobile Insurance Links - Show only the 4 main products */}
								{insuranceProducts.map((item) => (
									<Link
										key={item.name}
										href={item.href} // These already point to /quote?type=...
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-center"
										onClick={() => setMobileMenuOpen(false)} // Close menu on click
									>
										{item.name}
									</Link>
								))}
                                {/* Ensure Learn and Agents are also centered and consistently styled in mobile */}
								<Link href="/learn" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-center" onClick={() => setMobileMenuOpen(false)}>Learn</Link>
								<Link href="/agents" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-center" onClick={() => setMobileMenuOpen(false)}>Agents</Link>
							</div>
							<Link
								href="/get-quote"
								className="block w-full px-5 py-3 text-center font-medium text-white bg-cyan-500 hover:bg-cyan-600"
								onClick={() => setMobileMenuOpen(false)}
							>
								Get a Quote
							</Link>
						</div>
					</Popover.Panel>
				</Transition.Child>
			</Transition.Root>
		</header>
	);
};

export default Header;