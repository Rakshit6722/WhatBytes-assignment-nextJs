// app/components/common/Navbar.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../assets/whatBytes_logo.png'
import profileLogo from '../../assets/profile-photo.png'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-5 py-3 border-b-2 border-gray-300'>
            <Link href="/">
                <div className='w-40  lg:w-[12rem] relative h-12'> {/* Added height for proper Image rendering */}
                    <Image
                        src={logo}
                        alt='WhatBytes logo'
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>
            </Link>
            
            <div className='flex items-center gap-2 lg:border-2 lg:border-gray-300 rounded-md lg:px-1 lg:py-2 cursor-pointer'>
                <div className='rounded-full bg-gray-200 w-8 h-8 relative flex items-center justify-center'>
                    <Image
                        src={profileLogo}
                        alt='Profile photo'
                        fill
                        style={{ objectFit: 'cover' }}
                        className='rounded-full'
                    />
                    
                </div>
                <p className='hidden lg:block font-bold'>Rahil Siddique</p>
            </div>
        </div>
    );
};

export default Navbar;