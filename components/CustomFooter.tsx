"use client";

import React from 'react'
import { Github } from 'lucide-react';
import Logo from "@/components/Logo"
import { Footer } from "@/components/layout/footer";


const CustomFooter = () => {
  return (
    <Footer className="bg-primary-foreground p-8 flex justify-between items-center mt-24">
        <Logo />
        {/* List the github */}
        <a
          href="https://github.com/Sankalpsp21/query-corner"
          className="text-primary hover:text-secondary bg"
          aria-label="GitHub"
          title="View on GitHub"
        >
          {/* Give it a min height and with of 8 rem using tailwind */}
          <Github size={42} />
        </a>

        Made with ❤️ by the Query Corner Team
      </Footer>
  )
}

export default CustomFooter