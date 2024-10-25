'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RiBarChartFill } from 'react-icons/ri';
import { TfiMedallAlt } from 'react-icons/tfi';
import { FaRegFile } from 'react-icons/fa';

const Sidebar = ({ children }) => {
    const links = [
        {
            element: 'Dashboard',
            path: '/dashboard',
            logo: <RiBarChartFill />,
        },
        {
            element: 'Skill Test',
            path: '/skill-test',
            logo: <TfiMedallAlt />,
        },
        {
            element: 'Internship',
            path: '/internship',
            logo: <FaRegFile />,
        },
    ];

    const pathname = usePathname();

    const isActiveRoute = (route, name) => {
        if (name === 'Skill Test') {
            return true
        }
        return route === pathname
    };

    return (
        <div className="font-custom">
            <div className="sm:flex h-full">
                {/* Sidebar for larger screens */}
                <div className="w-[15%] hidden sm:block border-r-2 border-gray-300 font-bold text-gray-600  text-[.95rem] px-2">
                    <ul className="mt-16 flex flex-col gap-5">
                        {links.map((link) => (
                            <li key={link.element} className="cursor-pointer">
                                <Link href={link.path}>
                                    <div
                                        className={`flex gap-5 items-center p-4 transition-all duration-300 ${isActiveRoute(link.path, link.element)
                                                ? 'bg-blue-100 text-blue-600 rounded-r-full'
                                                : ''
                                            }`}
                                    >
                                        <div className="text-lg sm:text-3xl lg:text-2xl">
                                            {link.logo}
                                        </div>
                                        <div>
                                            <span className="hidden lg:block">{link.element}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* For mobile screens */}
                <div className="w-full block sm:hidden">
                    <div className="fixed bottom-0 left-0 right-0 bg-white z-[100] border-t border-gray-400">
                        <ul className="flex justify-around p-2">
                            {links.map((link) => (
                                <li key={link.element} className="cursor-pointer">
                                    <Link href={link.path}>
                                        <div
                                            className={`flex flex-col items-center p-2 transition-all duration-300 ${isActiveRoute(link.path) ? 'text-blue-700' : 'text-gray-600'
                                                }`}
                                        >
                                            <div className="text-xl">{link.logo}</div>
                                            <span className="text-sm">{link.element}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full sm:w-[85%]">{children}</div>
            </div>
        </div>
    );
};

export default Sidebar;
