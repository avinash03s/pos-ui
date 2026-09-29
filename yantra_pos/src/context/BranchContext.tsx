import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getAllBranches, type Branch } from "../service/branchService";

const STORAGE_KEY = "selectedBranchId";
export const ALL_BRANCHES = "ALL";

type BranchContextType = {
  branches: Branch[];
  loading: boolean;
  selectedBranchId: string; // ALL_BRANCHES or branch id as string
  selectedBranch: Branch | null; // null when ALL_BRANCHES is selected
  setSelectedBranchId: (id: string) => void;
  refreshBranches: () => Promise<void>;
};

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranchId, setSelectedBranchIdState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || ALL_BRANCHES
  );

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getAllBranches();
      setBranches(data);

      // If the previously selected branch no longer exists, fall back to All Branches
      if (selectedBranchId !== ALL_BRANCHES) {
        const stillExists = data.some((b) => String(b.id) === selectedBranchId);
        if (!stillExists) {
          setSelectedBranchIdState(ALL_BRANCHES);
          localStorage.setItem(STORAGE_KEY, ALL_BRANCHES);
        }
      }
    } catch (err) {
      // Silently fail here; consuming pages handle their own error states
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSelectedBranchId = (id: string) => {
    setSelectedBranchIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const selectedBranch =
    selectedBranchId === ALL_BRANCHES
      ? null
      : branches.find((b) => String(b.id) === selectedBranchId) ?? null;

  return (
    <BranchContext.Provider
      value={{
        branches,
        loading,
        selectedBranchId,
        selectedBranch,
        setSelectedBranchId,
        refreshBranches: fetchBranches,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within a BranchProvider");
  return ctx;
}