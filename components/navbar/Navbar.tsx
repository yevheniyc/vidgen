import React from 'react'
import Logo from './Logo'
import LinksDropdown from './LinksDropdown'
import { Suspense } from 'react'
import { Container } from '../ui/container'
import SearchBar, { YouTubeSearchResult } from './SearchBar'
import ThemeSwitch from './ThemeSwitch'

interface NavbarProps {
  onSearchResults: (results: YouTubeSearchResult[]) => void;
}

function Navbar({ onSearchResults }: NavbarProps) {
  return (
    <nav className='border-b border-gray-400 dark:border-gray-300'>
        <Container className='flex flex-cols sm:flex-row sm:justify-between sm:items-center flex-warp py-8 gap-4'>
            <Logo />
            <Suspense fallback={<div>Loading...</div>}>
                <SearchBar onSearchResults={onSearchResults} />
            </Suspense>
            <div className='flex items-center justify-between gap-4'>
                <ThemeSwitch/>
                <LinksDropdown />
            </div>
        </Container>
    </nav>
  )
}

export default Navbar