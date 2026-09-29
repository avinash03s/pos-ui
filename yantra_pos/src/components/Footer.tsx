import logo from "../assets/yantra-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#14213D]/10 bg-[#FAF8F4] text-[#14213D]/60">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img src={logo} className="h-9" />
              <span className="text-xl font-bold text-[#14213D]">Yantra POS</span>
            </div>

            <p className="text-sm leading-6">
              Smart POS solutions built for modern businesses. Manage billing,
              inventory, customers and analytics from one dependable platform.
            </p>

            <div className="mt-5 flex gap-4">
              <a className="cursor-pointer hover:text-[#14213D]">LinkedIn</a>
              <a className="cursor-pointer hover:text-[#14213D]">Twitter</a>
              <a className="cursor-pointer hover:text-[#14213D]">Facebook</a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 font-semibold text-[#14213D]">Product</h3>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-[#14213D]">Features</li>
              <li className="cursor-pointer hover:text-[#14213D]">Pricing</li>
              <li className="cursor-pointer hover:text-[#14213D]">Integrations</li>
              <li className="cursor-pointer hover:text-[#14213D]">Updates</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 font-semibold text-[#14213D]">Company</h3>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-[#14213D]">About Us</li>
              <li className="cursor-pointer hover:text-[#14213D]">Careers</li>
              <li className="cursor-pointer hover:text-[#14213D]">Contact</li>
              <li className="cursor-pointer hover:text-[#14213D]">Partners</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 font-semibold text-[#14213D]">Support</h3>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-[#14213D]">Help Center</li>
              <li className="cursor-pointer hover:text-[#14213D]">Documentation</li>
              <li className="cursor-pointer hover:text-[#14213D]">Privacy Policy</li>
              <li className="cursor-pointer hover:text-[#14213D]">Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#14213D]/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">© 2026 Yantra Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-sm">Built with care for growing businesses</p>
        </div>
      </div>
    </footer>
  );
}