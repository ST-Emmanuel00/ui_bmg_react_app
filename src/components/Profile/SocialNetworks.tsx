import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Container } from "../common/Container";
import { Accordion } from "./Accordion";

export const SocialNetworks = () => {
  return (
    <Accordion title="Social Networks" isLoading={false}>
      
      <div className="w-full flex ml-1"> 
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} className="text-gray-600 hover:text-gray-900" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} className="text-gray-600 hover:text-pink-600" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} className="text-gray-600 hover:text-blue-600" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} className="text-gray-600 hover:text-blue-800" />
          </a>
        </div>
      </div>
    </Accordion>
  );
};
