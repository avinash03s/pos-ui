import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Store, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import Navbar from "../Navbar";
import { registerUser } from "../../service/authService";

const passwordChecks = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "1 number", test: (v: string) => /\d/.test(v) },
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!adminName.trim() || !businessName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        adminName,
        businessName,
        email,
        phone,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("userName", data.name ?? adminName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("tenantId", String(data.tenantId));

      navigate("/admin/dashboard");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF8F4]">
      <Navbar />

      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E8862A]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#2F6F5E]/[0.05] blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 pb-16 pt-32">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[#14213D]/10 bg-white p-8 shadow-[0_25px_60px_-20px_rgba(20,33,61,0.15)] sm:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-black text-[#14213D]">Create your account</h1>
              <p className="mt-2 text-sm text-[#14213D]/55">
                Set up your store in under two minutes.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#14213D]/70">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-11 pr-4 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#14213D]/70">
                  Business name
                </label>
                <div className="relative">
                  <Store className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Sharma Retail Co."
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-11 pr-4 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#14213D]/70">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-11 pr-4 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#14213D]/70">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-4 pr-4 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#14213D]/70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-11 pr-11 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14213D]/35 hover:text-[#14213D]/60"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2 flex gap-4">
                  {passwordChecks.map((c) => {
                    const passed = c.test(password);
                    return (
                      <span
                        key={c.label}
                        className={`flex items-center gap-1 text-xs transition ${
                          passed ? "text-[#2F6F5E]" : "text-[#14213D]/35"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        {c.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-[#14213D]/55">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#14213D]/20 bg-[#FAF8F4] accent-[#E8862A]"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#E8862A] hover:text-[#C36A1A]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#E8862A] hover:text-[#C36A1A]">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#E8862A] py-3 font-semibold text-white transition hover:bg-[#DB7A1F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#14213D]/10" />
              <span className="text-xs text-[#14213D]/40">or continue with</span>
              <div className="h-px flex-1 bg-[#14213D]/10" />
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-[#14213D]/15 bg-white py-3 text-sm font-medium text-[#14213D] transition hover:bg-[#14213D]/[0.03]">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 10.8v3.7h5.2c-.2 1.3-1.6 3.9-5.2 3.9-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 .8 3.6 1.4l2.5-2.4C16.6 4.1 14.5 3.2 12 3.2 6.9 3.2 2.8 7.3 2.8 12.4S6.9 21.6 12 21.6c6.9 0 8.9-4.8 8.9-7.3 0-.5-.1-.9-.1-1.3H12z"
                />
              </svg>
              Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[#14213D]/55">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#E8862A] hover:text-[#C36A1A]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}