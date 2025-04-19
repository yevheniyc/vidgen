import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <Image src='/LOGO.png' alt='logo' width={48} height={48} />
      </Link>
    </Button>
  );
}

export default Logo;
