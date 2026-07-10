"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const KEY = "casteryx-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const id = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(id);
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(KEY, value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-bg-surface/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:left-4"
          data-testid="cookie-banner"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Cookie className="h-6 w-6 shrink-0 text-gold" />
            <p className="flex-1 text-caption text-ink-secondary">{t("text")}</p>
            <div className="flex shrink-0 gap-2">
              <Button size="sm" variant="ghost" onClick={() => decide("declined")} data-testid="cookie-decline">
                {t("decline")}
              </Button>
              <Button size="sm" onClick={() => decide("accepted")} data-testid="cookie-accept">
                {t("accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
