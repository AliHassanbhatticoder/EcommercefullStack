"use client";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function AuthButtons() {
  const { isSignedIn } = useUser();

  return (
    <div className="">
      {!isSignedIn && (
        <div className="flex items-center justify-center gap-2 md:gap-4 ">
          {/* Sign In Button */}
          <SignInButton mode="modal">
            <button className="px-2 py-2 text-black rounded-lg text-sm md:text-base font-medium flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Sign In
            </button>
          </SignInButton>

          {/* Divider */}
          <div className="w-px h-6 md:h-9 bg-black opacity-20"></div>

          {/* Sign Up Button */}
          <SignUpButton mode="modal">
            <button className="px-1 py-2 text-black rounded-lg text-sm md:text-base font-medium flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              Sign Up
            </button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}
