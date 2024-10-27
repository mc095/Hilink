"use client"; // Add this line

import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { auth, provider } from "../firebase"; // Adjust the path if necessary
import { signInWithPopup, signOut, User } from "firebase/auth"; // Import User type
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Import the method to check auth state

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null); // Set user type correctly

  // Function to handle login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in: ", result.user); // Log user details or handle user state
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation if not logged in
      alert("You must be logged in to access this page."); // Alert the user
    }
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href} onClick={(e) => handleLinkClick(link.href, e)}>
              <span className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {!user ? ( // Check if user is not logged in
          <Button 
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={handleLogin} // Pass the login handler
          />
        ) : (
          <div className="flex items-center">
            <span className="text-gray-50 mr-4">Welcome, {user.displayName || user.email}</span> {/* Show welcome message */}
            <Button 
              type="button"
              title="Logout"
              icon="/user.svg" // Optional: Add a logout icon
              variant="btn_dark_green"
              onClick={handleLogout} // Pass the logout handler
            />
          </div>
        )}
      </div>

      <Image 
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
