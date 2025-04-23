import { LuUser } from 'react-icons/lu';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

function UserIcon() {
  const { user, isLoaded } = useUser();
  const profileImage = user?.imageUrl;
  
  if (!isLoaded) {
    return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
  }
  
  if (profileImage) {
    return (
      <Image 
        src={profileImage} 
        alt={`${user?.firstName || 'User'}'s profile`}
        width={24}
        height={24}
        className='rounded-full object-cover' 
      />
    );
  }
  
  // Provide a fallback UI when no user or profile image is available
  return <LuUser className='w-6 h-6 bg-primary rounded-full' />;
}

export default UserIcon;