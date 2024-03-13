"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo"
import { ModeToggle } from '@/components/ModeToggle'
import { useConvexAuth } from 'convex/react';
import { Vortex, ThreeDots } from 'react-loader-spinner';
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { StickyHeader } from '@/components/layout/sticky-header';

const Nav = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  function SignInAndSignUpButtons() {
    return (
      <div className="flex gap-4">
        {/* If the user is not authenticated, and is loading (i.e. we don't know if they are authenticated or not), show a loading spinner */}
        {isLoading && (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              radius="9"
              ariaLabel="three-dots-loading"
              color="grey" 
            />
        )}
        {/* If the user is not authenticated, and is not loading, show the sign in and sign up buttons */}
        {
          !isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal" afterSignInUrl='/dashboard'> 
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal" afterSignUpUrl='/dashboard'> 
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          )
        }
        {/* If the user is authenticated, show the search and user buttons */}
        { isAuthenticated && !isLoading && (
          <UserButton afterSignOutUrl='/'/>
        )}
      </div>
    );
  }

  return (
      <StickyHeader className="px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex gap-4 items-center">
            <SignInAndSignUpButtons />
            <ModeToggle />
          </div>
        </div>
      </StickyHeader>       
  )
}

export default Nav