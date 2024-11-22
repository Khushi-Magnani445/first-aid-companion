import React from 'react';
import { Link } from 'react-scroll';


export default function Nav() {
  return (
    <nav className="flex justify-between items-center px-10 bg-blue-500 text-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold">First Aid Companion</h1>
      <ul className="flex space-x-6">
        <li><Link to="learn-more" spy={true} smooth={true} duration={500} className="cursor-pointer">Learn More</Link></li>
        <li><Link to="contact" spy={true} smooth={true} duration={500} className="cursor-pointer">Contact</Link></li>
      </ul>
    </nav>
  );
}
