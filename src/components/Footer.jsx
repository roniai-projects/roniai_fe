import logo from "../assets/logo-strap.png";

export default function Footer() {
  return (
    <div id="contact" className="px-4 py-12 w-full border-t-2 border-[#CDB6D6] flex flex-col gap-12">
      <footer className="grid md:grid-cols-2 lg:grid-cols-5 place-items-baseline place-content-center gap-6">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <p className="font-semibold">OUR SOCIALS</p>
          <ul className="text-sm underline">
            <li>
              <a href="" className="hover:opacity-80">Facebook</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">Twitter</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <p className="font-semibold">ABOUT</p>
          <ul className="text-sm underline">
            <li>
              <a href="" className="hover:opacity-80">Roni AI</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">Our Team</a>
            </li>

            <li>
              <a href="" className="hover:opacity-80">Blog</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <p className="font-semibold">POLICIES</p>
          <ul className="text-sm underline">
            <li>
              <a href="" className="hover:opacity-80">Data Privacy</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">Terms & Conditions</a>
            </li>
            <li>
              <a href="" className="hover:opacity-80">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 lg:col-span-2 w-full">
          <p className="font-semibold">GET IN TOUCH WITH US</p>
          <ul className="text-sm flex flex-col gap-3">
            <li className="max-w-md">
              Sign up to our newsletter and get updates and exclusive content.
            </li>
            <li>
              <form action="" className="flex flex-row">
                <input
                  type="text"
                  className="w-full px-3 py-2 border-[#CDB6D6] border-2"
                />
                <button className="px-6 py-2 bg-[#CDB6D6] hover:opacity-80 ease-in transition duration-150 font-semibold">
                  Join
                </button>
              </form>
            </li>
          </ul>
        </div>
      </footer>
      <img src={logo} alt="Roni AI logo" className="w-auto h-16 -my-6 mx-auto" />
      <p className="text-xs mx-auto">Copyright © 2023 Roni AI. All rights reserved.</p>
    </div>
  );
}
