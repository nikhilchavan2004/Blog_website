import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsTwitter, BsGithub, BsInstagram } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
          <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white">
              N
            </span>
            <span className="ml-1">blog</span>
          </Link>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full sm:w-auto">
          <div>
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer" className="mt-3">
                100 JS Projects
              </Footer.Link>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer" className="-mt-1">
                Blogs
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer" className="mt-2">
                Privacy policy
              </Footer.Link>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                Terms and conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Follow Us" />
            <Footer.LinkGroup col>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer" className="mt-3">
                Github
              </Footer.Link>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer" className="mt-3">
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>

      {/* Copyright and Social Media Icons */}
      <div className="mt-4">
        <Footer.Divider />
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 px-4">
          <Footer.Copyright href="#" by="Nikhil's Productions" year="2024" />
          <div className="flex flex-row gap-8 mt-4 items-center justify-center sm:justify-end">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}