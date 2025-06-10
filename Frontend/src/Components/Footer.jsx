// import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
                <div>
                    <h2 className="text-xl font-bold mb-3">Food Heaven</h2>
                    <p className="text-sm">
                        Serving delicious meals with love. Fresh ingredients, great taste, every single day.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Menu</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>+91 9876543210</li>
                        <li>support@foodheaven.com</li>
                        <li>123 Food Street, Delhi</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Opening Hours</h3>
                    <ul className="space-y-1 text-sm">
                        <li>Mon - Thu: 9:00 - 21:00</li>
                        <li>Fri: 9:00 - 23:00</li>
                        <li>Sat - Sun: 10:00 - 22:00</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm mb-2">&copy; {new Date().getFullYear()} Food Heaven. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:text-white"><FaFacebookF size={20} /></a>
                    <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
                    <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
                    <a href="#" className="hover:text-white"><FaLinkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
