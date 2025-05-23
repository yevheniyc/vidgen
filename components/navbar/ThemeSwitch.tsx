'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon'>
        <SunIcon className='h-[1.2rem] w-[1.2rem]' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          {theme === 'dark' ? (
            <MoonIcon className='h-[1.2rem] w-[1.2rem]' />
          ) : (
            <SunIcon className='h-[1.2rem] w-[1.2rem]' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-purple-700 text-white hover:bg-purple-800'>
        <DropdownMenuItem onClick={() => setTheme('light')} className='bg-purple-700 text-white hover:bg-purple-800'>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className='bg-purple-700 text-white hover:bg-purple-800 '>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}