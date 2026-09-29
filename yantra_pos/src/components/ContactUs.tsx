export default function ContactUs() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#FAF8F4] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-[#14213D] md:text-4xl">
            Get in touch with Yantra POS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#14213D]/55">
            Have questions about our POS solutions? Our team is ready to help you
            improve your business operations.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-[#14213D]">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="rounded-xl border border-[#14213D]/10 bg-white p-5">
                <p className="text-sm text-[#14213D]/50">Email</p>
                <p className="mt-1 text-[#14213D]">support@yantrapos.com</p>
              </div>

              <div className="rounded-xl border border-[#14213D]/10 bg-white p-5">
                <p className="text-sm text-[#14213D]/50">Phone</p>
                <p className="mt-1 text-[#14213D]">+91 98765 43210</p>
              </div>

              <div className="rounded-xl border border-[#14213D]/10 bg-white p-5">
                <p className="text-sm text-[#14213D]/50">Office Address</p>
                <p className="mt-1 leading-6 text-[#14213D]">
                  Yantra Technologies Pvt. Ltd.
                  <br />
                  Pune, Maharashtra, India
                </p>
              </div>

              <div className="rounded-xl border border-[#14213D]/10 bg-white p-5">
                <p className="text-sm text-[#14213D]/50">Working Hours</p>
                <p className="mt-1 text-[#14213D]">
                  Monday - Friday (9:00 AM - 6:00 PM)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#14213D]/10 bg-white p-8">
            <h3 className="mb-6 text-xl font-semibold text-[#14213D]">
              Send us a message
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-[#14213D]/15 bg-[#FAF8F4] px-4 py-3 text-[#14213D] outline-none placeholder:text-[#14213D]/40 focus:border-[#E8862A]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-[#14213D]/15 bg-[#FAF8F4] px-4 py-3 text-[#14213D] outline-none placeholder:text-[#14213D]/40 focus:border-[#E8862A]"
              />

              <input
                type="text"
                placeholder="Company Name"
                className="w-full rounded-lg border border-[#14213D]/15 bg-[#FAF8F4] px-4 py-3 text-[#14213D] outline-none placeholder:text-[#14213D]/40 focus:border-[#E8862A]"
              />

              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full rounded-lg border border-[#14213D]/15 bg-[#FAF8F4] px-4 py-3 text-[#14213D] outline-none placeholder:text-[#14213D]/40 focus:border-[#E8862A]"
              />

              <button className="w-full rounded-lg bg-[#E8862A] py-3 font-semibold text-white transition hover:bg-[#DB7A1F]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}