import { useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { NexoVisit } from "@/config/nexoLink";

export function NexoCampaignRedirect() {
  const { campanha } = useParams<{ campanha?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;

    try {
      const searchParams = new URLSearchParams(location.search);
      const utmSource = searchParams.get("utm_source") || undefined;
      const utmMedium = searchParams.get("utm_medium") || undefined;
      const utmCampaign = searchParams.get("utm_campaign") || undefined;
      const utmContent = searchParams.get("utm_content") || undefined;

      const slug = campanha || "default";

      // 1. Record in nexo_visits for campaign tracking
      const visit: NexoVisit = {
        id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug,
        timestamp: new Date().toISOString(),
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        referrer: typeof document !== "undefined" ? document.referrer || "direto" : "direto"
      };

      const existingVisits: NexoVisit[] = JSON.parse(
        localStorage.getItem("nexo_visits") || "[]"
      );
      existingVisits.push(visit);
      localStorage.setItem("nexo_visits", JSON.stringify(existingVisits));

      // 2. Also record in nexo_premium_visits
      const premiumVisits = JSON.parse(
        localStorage.getItem("nexo_premium_visits") || "[]"
      );
      premiumVisits.push({
        ...visit,
        slug: `redirect-${slug}`
      });
      localStorage.setItem("nexo_premium_visits", JSON.stringify(premiumVisits));
    } catch {
      // Ignore localStorage errors
    }

    // Redirect to /l preserving search parameters (UTMs)
    navigate(`/l${location.search}`, { replace: true });
  }, [campanha, location.search, navigate]);

  return null;
}
