import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="w-full p-6 rounded-2xl border border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 hover:shadow-[0_8px_30px_rgb(16,185,129,0.04)] dark:hover:shadow-[0_8px_30px_rgb(16,185,129,0.06)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <h1 className="text-lg font-bold text-slate-800 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 tracking-tight transition-colors duration-200">
        {name ? name : "Heading"}
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
        {description
          ? description
          : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
      </p>
    </div>
  );
};

export default ServiceCard;
