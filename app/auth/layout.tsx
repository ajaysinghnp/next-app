import { ModeToggle } from '@/components/ui/theme-toggle';
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>
      {children}
    </div>
  )
}

export default AuthLayout;