import { useMemo } from "react";

const useInitials = (fullName: string): string => {
  return useMemo(() => {
    if (!fullName) return "";

    const nameParts = fullName.trim().split(/\s+/);
    const initials = nameParts
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join("");

    return initials;
  }, [fullName]);
};

export default useInitials;
