import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className=" w-full bg-base-300 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          © 2025 Shreya Goyal. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/your-linkedin-id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/your-github-id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 transition-colors"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="mailto:yourmail@example.com"
            className="hover:text-red-400 transition-colors"
          >
            <MdEmail size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
