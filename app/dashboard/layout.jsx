'use client'
import '../globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import Header from 'app/components/Header'
import { signOut, useSession } from "next-auth/react"
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
	title: 'Game Store',
	description: 'Generated by create next app',
}

import {
	CalendarIcon,
	HomeIcon,
	RectangleStackIcon,
	NewspaperIcon,
	UserGroupIcon,
	BuildingStorefrontIcon,
	PuzzlePieceIcon,
	UserIcon,
	PaperClipIcon,
	BanknotesIcon,
	CurrencyDollarIcon,
	ShieldCheckIcon
} from '@heroicons/react/24/outline'

const navigation = [
	{ name: 'Home', href: '#', icon: HomeIcon, current: false },
	{ name: 'Store', href: '#', icon: BuildingStorefrontIcon, current: false },
	{ name: 'Games', href: '/dashboard/game', icon: PuzzlePieceIcon, current: false },
	{ name: 'Users', href: '/dashboard/user', icon: UserIcon, current: false },
	{ name: 'Tasks', href: '#', icon: RectangleStackIcon, current: false },
	{ name: 'News', href: '/dashboard/news', icon: NewspaperIcon, current: false },
	{ name: 'Reviews', href: '/dashboard/review', icon: PaperClipIcon, current: false },
	{ name: 'Refund Requests', href: '/#', icon: BanknotesIcon, current: false },
	{ name: 'Discount', href: '#', icon: CurrencyDollarIcon, current: false },
	{ name: 'Support', href: '#', icon: ShieldCheckIcon, current: false },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout({ children }) {
	const { data: session, status } = useSession()
	return (
		<div className="flex">
			<div className="flex flex-shrink-0">
				<div className="flex w-64 flex-col">
					<div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
						<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
							<div className="flex flex-shrink-0 items-center px-4">
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
									alt="Your Company"
								/>
							</div>
							<nav className="mt-5 flex-1" aria-label="Sidebar">
								<div className="space-y-1 px-2">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												item.current
													? 'bg-gray-200 text-gray-900'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
												'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
											)}
										>
											<item.icon
												className={classNames(
													item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
													'mr-3 h-6 w-6'
												)}
												aria-hidden="true"
											/>
											{item.name}
										</Link>
									))}
								</div>
							</nav>
						</div>
						<div className="flex flex-shrink-0 border-t border-gray-200 p-4">
							<Link href="profile" className="group block w-full flex-shrink-0">
								<div className="flex items-center">
									<div>
										<img
											className="inline-block h-9 w-9 rounded-full"
											src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div className="ml-3">
										{/* <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Fahim Haider</p> */}
										<button onClick={()=>signOut()} className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Log Out</button>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="relative z-0 flex flex-1 overflow-hidden">
				{children}
			</div>
		</div>
	)
}
