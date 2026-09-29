import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getAdminProfile } from "../service/adminService";

interface AdminProfile {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  role: string;
}

interface AdminProfileContextValue {
  profile: AdminProfile | null;
  loading: boolean;
  error: string;
}

const AdminProfileContext = createContext<AdminProfileContextValue>({
  profile: null,
  loading: true,
  error: "",
});

export function AdminProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: any = await getAdminProfile();

        console.log("RAW PROFILE RESPONSE:", data); // 👈 YAHAN ADD KIYA

        setProfile({
          businessName:
            data.businessName ??
            data.tenantName ??
            data.tenant?.name ??
            "",
          ownerName: data.name ?? data.ownerName ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          role: data.role ?? "",
        });
      } catch (err) {
        setError("Could not load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AdminProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </AdminProfileContext.Provider>
  );
}

export function useAdminProfile() {
  return useContext(AdminProfileContext);
}