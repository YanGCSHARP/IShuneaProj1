import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className='footer'>
    <div className='footer__links-container'>
      <div className='footer__rights'>
        <Image src='/logo.svg' alt='logo' width={118} height={18} className='object-contain' />
        <p className='text-base text-gray-700'>
          Carhub 2023 <br />
          All Rights Reserved &copy;
        </p>
      </div>

      <div className="footer__links">
        {footerLinks.map((item) => (
          <div key={item.title} className="footer__link">
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <div className="flex flex-col gap-4">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='footer__copyrights'>
      <p className="text-gray-600">@2023 CarHub. All rights reserved</p>

      <div className="footer__copyrights-link">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;