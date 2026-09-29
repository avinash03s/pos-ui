import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Navbar from "../Navbar";
import axiosInstance from "../../interceptor/axiosInstance";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

      const token = data.token ?? data.accessToken ?? data.jwt;

      if (!token) {
        setError("Login succeeded but no token was returned.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);

      if (data.id !== undefined) localStorage.setItem("userId", String(data.id));
      if (data.name) localStorage.setItem("userName", data.name);
      if (data.email) localStorage.setItem("email", data.email);
      if (data.role) localStorage.setItem("role", data.role);
      if (data.tenantId !== undefined) localStorage.setItem("tenantId", String(data.tenantId));

      navigate("/admin/dashboard");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF8F4]">
      <Navbar />

      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#E8862A]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#2F6F5E]/[0.05] blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 pb-16 pt-32">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[#14213D]/10 bg-white p-8 shadow-[0_25px_60px_-20px_rgba(20,33,61,0.15)] sm:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-black text-[#14213D]">Welcome back</h1>
              <p className="mt-2 text-sm text-[#14213D]/55">
                Login to manage your stores, stock and sales.
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
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#14213D]/70">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#E8862A] hover:text-[#C36A1A]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-[#14213D]/15 bg-[#FAF8F4] py-3 pl-11 pr-11 text-sm text-[#14213D] outline-none transition placeholder:text-[#14213D]/35 focus:border-[#E8862A] focus:bg-white focus:ring-2 focus:ring-[#E8862A]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14213D]/35 hover:text-[#14213D]/60"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#14213D]/55">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#14213D]/20 bg-[#FAF8F4] accent-[#E8862A]"
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#E8862A] py-3 font-semibold text-white transition hover:bg-[#DB7A1F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
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
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-[#E8862A] hover:text-[#C36A1A]">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}