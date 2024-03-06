
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from "next-themes"

const Logo = () => {
  
  const theme = useTheme();

  return (
    <Link href={"/"}>
      {theme.theme === "dark" || theme.theme === "system" || !theme.theme ? (       
        <Image 
          src="/logo-dark.svg" 
          alt="Query Corner Logo" 
          width={200} 
          height={30}
          quality={100}
          priority={true}
          className="mt-1"
        />      
      ) : (
        <Image 
          src="/logo-light.svg" 
          alt="Query Corner Logo" 
          width={200} 
          height={30}
          className="mt-1"
        />
      )}
    </Link>
  )
}

export default Logo