import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Store,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Power,
  PowerOff,
  X,
} from "lucide-react";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  activateBranch,
  deactivateBranch,
  type Branch,
  type BranchRequest,
} from "../../service/branchService";
import { isAxiosError } from "axios";

type BranchForm = BranchRequest;

const emptyForm: BranchForm = {
  name: "",
  address: "",
  phone: "",
  email: "",
  branchCode: "",
  city: "",
  state: "",
  pincode: "",
  gstNumber: "",
};

export default function Branches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [form, setForm] = useState<BranchForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BranchForm, string>>>({});
  const [saving, setSaving] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getAllBranches();
      setBranches(data);
    } catch (err) {
      setToast({ message: "Couldn't load branches. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBranch(null);
    setForm(emptyForm);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setForm({
      name: branch.name ?? "",
      address: branch.address ?? "",
      phone: branch.phone ?? "",
      email: branch.email ?? "",
      branchCode: branch.branchCode ?? "",
      city: branch.city ?? "",
      state: branch.state ?? "",
      pincode: branch.pincode ?? "",
      gstNumber: branch.gstNumber ?? "",
    });
    setFormErrors({});
    setModalOpen(true);
    setMenuOpenId(null);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const validate = (): boolean => {
    const errors: Partial<Record<keyof BranchForm, string>> = {};
    if (!form.name.trim()) errors.name = "Branch name is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email";
    }
    if (form.pincode && !/^\d{4,6}$/.test(form.pincode)) {
      errors.pincode = "Enter a valid pincode";
    }
    if (form.phone && !/^[\d+\-\s]{7,15}$/.test(form.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingBranch) {
        const updated = await updateBranch(editingBranch.id, form);
        setBranches((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        setToast({ message: "Branch updated", type: "success" });
      } else {
        const created = await createBranch(form);
        setBranches((prev) => [created, ...prev]);
        setToast({ message: "Branch created", type: "success" });
      }
      setModalOpen(false);
    } catch (err) {
      const message =
        isAxiosError(err) && err.response?.data
          ? typeof err.response.data === "string"
            ? err.response.data
            : err.response.data.message ?? "Something went wrong"
          : "Something went wrong";
      setToast({ message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (branch: Branch) => {
    setMenuOpenId(null);
    try {
      if (branch.active) {
        await deactivateBranch(branch.id);
      } else {
        await activateBranch(branch.id);
      }
      setBranches((prev) =>
        prev.map((b) => (b.id === branch.id ? { ...b, active: !b.active } : b))
      );
      setToast({
        message: `${branch.name} ${branch.active ? "deactivated" : "activated"}`,
        type: "success",
      });
    } catch (err) {
      setToast({ message: "Couldn't update branch status", type: "error" });
    }
  };

  const filtered = branches.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.branchCode?.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q) ||
      b.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative space-y-8">
      <div className="pointer-events-none fixed -top-40 right-0 h-96 w-96 rounded-full bg-[#E8862A]/[0.06] blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/4 h-96 w-96 rounded-full bg-[#2F6F5E]/[0.05] blur-[140px]" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-black tracking-tight text-[#14213D]">Branches</h1>
          <p className="mt-1 text-sm text-[#14213D]/50">
            Manage every store location under your business.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 self-start rounded-xl bg-[#E8862A] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_15px_35px_-15px_rgba(232,134,42,0.6)] transition hover:bg-[#DB7A1F] sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Branch
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, code, city, phone..."
          className="w-full rounded-xl border border-[#14213D]/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#14213D] placeholder:text-[#14213D]/35 outline-none transition focus:border-[#E8862A]/60 focus:ring-2 focus:ring-[#E8862A]/15"
        />
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-[28px] border border-[#14213D]/10 bg-[#14213D]/[0.03]"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="relative overflow-hidden rounded-[28px] border border-dashed border-[#14213D]/15 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8862A]/10 text-[#E8862A]">
            <Store className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#14213D]">
            {search ? "No branches match your search" : "No branches yet"}
          </h3>
          <p className="mt-1 text-sm text-[#14213D]/50">
            {search
              ? "Try a different name, code, or city."
              : "Add your first branch to start managing multiple store locations."}
          </p>
          {!search && (
            <button
              onClick={openCreateModal}
              className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-[#E8862A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#DB7A1F]"
            >
              <Plus className="h-4 w-4" />
              Add Branch
            </button>
          )}
        </div>
      ) : (
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((branch) => (
            <div
              key={branch.id}
              className="group relative overflow-hidden rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,33,61,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8862A]/30 hover:shadow-[0_25px_60px_-20px_rgba(20,33,61,0.18)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8862A]/[0.08] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8862A]/10 text-[#E8862A] ring-1 ring-[#E8862A]/10">
                    <Store className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-[#14213D]">{branch.name}</p>
                    {branch.branchCode && (
                      <p className="text-xs font-medium text-[#14213D]/40">{branch.branchCode}</p>
                    )}
                  </div>
                </div>

                <div className="relative flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      branch.active
                        ? "bg-[#2F6F5E]/10 text-[#2F6F5E] ring-1 ring-[#2F6F5E]/20"
                        : "bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20"
                    }`}
                  >
                    {branch.active ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => setMenuOpenId(menuOpenId === branch.id ? null : branch.id)}
                    className="rounded-lg p-1.5 text-[#14213D]/40 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {menuOpenId === branch.id && (
                    <div className="absolute right-0 top-9 z-10 w-44 overflow-hidden rounded-2xl border border-[#14213D]/10 bg-white shadow-[0_25px_60px_-20px_rgba(20,33,61,0.2)]">
                      <button
                        onClick={() => openEditModal(branch)}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#14213D]/70 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleActive(branch)}
                        className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition ${
                          branch.active
                            ? "text-rose-600 hover:bg-rose-500/10"
                            : "text-[#2F6F5E] hover:bg-[#2F6F5E]/10"
                        }`}
                      >
                        {branch.active ? (
                          <PowerOff className="h-3.5 w-3.5" />
                        ) : (
                          <Power className="h-3.5 w-3.5" />
                        )}
                        {branch.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mt-5 space-y-2 text-sm text-[#14213D]/60">
                {(branch.city || branch.address) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#14213D]/35" />
                    <span className="line-clamp-2">
                      {[branch.address, branch.city, branch.state, branch.pincode]
                        .filter(Boolean)
                        .join(", ") || "No address on file"}
                    </span>
                  </div>
                )}
                {branch.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#14213D]/35" />
                    <span>{branch.phone}</span>
                  </div>
                )}
                {branch.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#14213D]/35" />
                    <span className="truncate">{branch.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/40 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_40px_100px_-30px_rgba(20,33,61,0.35)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black tracking-tight text-[#14213D]">
                {editingBranch ? "Edit Branch" : "Add Branch"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-lg p-1.5 text-[#14213D]/40 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Branch name"
                required
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                error={formErrors.name}
                placeholder="Koregaon Park Branch"
                span2
              />
              <Field
                label="Branch code"
                value={form.branchCode}
                onChange={(v) => setForm({ ...form, branchCode: v })}
                placeholder="KP-01"
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                error={formErrors.phone}
                placeholder="+91 98765 43210"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                error={formErrors.email}
                placeholder="branch@business.com"
                span2
              />
              <Field
                label="Address"
                value={form.address}
                onChange={(v) => setForm({ ...form, address: v })}
                placeholder="123 Main Road"
                span2
              />
              <Field
                label="City"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                placeholder="Pune"
              />
              <Field
                label="State"
                value={form.state}
                onChange={(v) => setForm({ ...form, state: v })}
                placeholder="Maharashtra"
              />
              <Field
                label="Pincode"
                value={form.pincode}
                onChange={(v) => setForm({ ...form, pincode: v })}
                error={formErrors.pincode}
                placeholder="411001"
              />
              <Field
                label="GST number"
                value={form.gstNumber}
                onChange={(v) => setForm({ ...form, gstNumber: v })}
                placeholder="27AAAAA0000A1Z5"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-[#14213D]/10 bg-white px-4 py-2.5 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#14213D]/[0.03] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="rounded-xl bg-[#E8862A] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_15px_35px_-15px_rgba(232,134,42,0.6)] transition hover:bg-[#DB7A1F] disabled:opacity-60"
              >
                {saving ? "Saving..." : editingBranch ? "Save changes" : "Create branch"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-4 py-3 text-sm font-medium shadow-[0_25px_60px_-20px_rgba(20,33,61,0.3)] ${
            toast.type === "success" ? "bg-[#2F6F5E] text-white" : "bg-rose-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  span2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-xs font-semibold text-[#14213D]/60">
        {label} {required && <span className="text-[#E8862A]">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#14213D] placeholder:text-[#14213D]/30 outline-none transition focus:bg-white focus:ring-2 ${
          error
            ? "border-rose-300 focus:ring-rose-200"
            : "border-[#14213D]/10 focus:border-[#E8862A]/60 focus:ring-[#E8862A]/15"
        }`}
      />
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}