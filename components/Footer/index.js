import React from "react";
import Link from "next/link";
import data from "../../data/portfolio.json";
import { useScrollReveal } from "../../utils";
import { useLanguage } from "../../context/LanguageContext";

const Footer = ({}) => {
  const [footerRevealRef, footerVisible] = useScrollReveal();
  const { lang } = useLanguage();

  const translations = {
    en: {
      title: "Need an internal system?",
      description: "From purchase requests to approval flows — custom built for your company's workflows. Let's discuss.",
      emailBtn: "Email me"
    },
    id: {
      title: "Punya kebutuhan sistem internal?",
      description: "Dari purchase request sampai approval flow — bisa dibangun custom sesuai alur kerja perusahaan kamu. Yuk diskusi.",
      emailBtn: "Email saya"
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <div className="mt-24 tablet:mt-36">
      {/* Centered CTA Card matching screenshot 2 */}
      <div
        ref={footerRevealRef}
        className={`w-full p-8 md:p-16 rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#161e2e] shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-all duration-1000 transform ${
          footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight leading-tight">
          {t.title}
        </h2>
        <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          {t.description}
        </p>
        
        {/* Buttons Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {/* Email button in solid green */}
          <button
            onClick={() =>
              window.open(
                data.socials.find((s) => s.title === "Email")?.link ||
                  "mailto:jovfrinjoiner01@gmail.com"
              )
            }
            className="text-sm px-6 py-3 rounded-xl font-mono bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.emailBtn}
          </button>
          
          {/* FastWork button in outlined style */}
          <button
            onClick={() => window.open("https://fastwork.id/user/jovfrinn")}
            className="text-sm px-6 py-3 rounded-xl font-mono border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-500/50 hover:text-emerald-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            FastWork
          </button>

          {/* Projects.co.id button in outlined style */}
          <button
            onClick={() => window.open("https://projects.co.id/public/browse_users/view/f8f26b/jovfrinnn")}
            className="text-sm px-6 py-3 rounded-xl font-mono border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-500/50 hover:text-emerald-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-emerald-400/50 dark:hover:text-emerald-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Projects.co.id
          </button>
        </div>
      </div>

      {/* Mini Copyright Footer block */}
      <div className="mt-16 pt-8 border-t border-slate-100 dark:border-zinc-900 flex flex-col tablet:flex-row items-center justify-center gap-4 font-mono text-xs text-slate-400 dark:text-zinc-500">
        <span>© {new Date().getFullYear()} Jovfrin Joiner</span>
      </div>
    </div>
  );
};

export default Footer;
