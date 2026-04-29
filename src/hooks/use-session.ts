"use client";

import { useState, useEffect, useCallback } from "react";
import { logout as apiLogout } from "@/lib/api";

const DASHBOARD_URL = "/dashboard";

export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(
      document.cookie.split(";").some((c) => c.trim().startsWith("session="))
    );
  }, []);

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    await apiLogout();
  }, []);

  return { isLoggedIn, dashboardUrl: DASHBOARD_URL, logout };
}
