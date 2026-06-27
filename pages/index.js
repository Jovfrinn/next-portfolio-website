import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect, useScrollReveal } from "../utils";
import { useLanguage } from "../context/LanguageContext";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

const socialConfig = {
  Github: {
    color:
      "hover:border-slate-800 dark:hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(31,41,55,0.08)]",
    icon: (
      <svg
        className="w-6 h-6 fill-current text-slate-800 dark:text-zinc-200"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    ),
    action: {
      en: "Follow on GitHub",
      id: "Ikuti di GitHub",
    },
  },
  LinkedIn: {
    color:
      "hover:border-blue-500 hover:text-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]",
    icon: (
      <svg className="w-6 h-6 fill-current text-[#0a66c2]" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    action: {
      en: "Connect on LinkedIn",
      id: "Terhubung di LinkedIn",
    },
  },
  WhatsApp: {
    color:
      "hover:border-emerald-500 hover:text-emerald-500 hover:shadow-[0_8px_30px_rgba(37,211,102,0.08)]",
    icon: (
      <svg className="w-6 h-6 fill-current text-[#25D366]" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.735-3.805l.39.232c1.472.873 3.1 1.334 4.777 1.335 5.534 0 10.038-4.502 10.04-10.04.002-2.684-1.045-5.207-2.951-7.112C17.135 2.705 14.615 1.657 12.01 1.657 6.473 1.657 1.97 6.158 1.968 11.696c0 1.765.467 3.486 1.353 5.011l.243.418L2.57 20.3l3.222-.845zM16.6 13.9c-.25-.125-1.477-.73-1.705-.813-.227-.084-.393-.125-.557.125-.165.25-.637.813-.78 1-.144.187-.288.208-.538.083a7.892 7.892 0 0 1-2.92-1.8 8.71 8.71 0 0 1-2.01-2.5c-.145-.25-.015-.385.11-.51.113-.11.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.557-1.344-.763-1.844-.2-.486-.403-.418-.557-.426-.144-.007-.31-.009-.476-.009a.916.916 0 0 0-.663.308c-.23.25-.875.854-.875 2.083 0 1.23.894 2.417.99 2.55.097.135 1.76 2.688 4.26 3.77 1.15.5 2.052.793 2.76 1.018 1.157.368 2.1.315 2.894.197.88-.13 1.802-.736 2.053-1.42.25-.683.25-1.27.175-1.393-.075-.125-.27-.208-.52-.333z" />
      </svg>
    ),
    action: {
      en: "Chat on WhatsApp",
      id: "Chat di WhatsApp",
    },
  },
  Email: {
    color:
      "hover:border-emerald-500 hover:text-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)]",
    icon: (
      <svg
        className="w-6 h-6 fill-current text-emerald-500"
        viewBox="0 0 24 24"
      >
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 4.622v-9.244l4.623 4.622zm1.066 1.066l4.311 4.311 4.312-4.311 4.877 4.877h-18.377l4.877-4.877zm1.066-1.066l4.622-4.623 4.623 4.623-4.623 4.622-4.622-4.622zm7.622-3.557l4.623 4.622v9.244l-4.623-4.622v-9.244z" />
      </svg>
    ),
    action: {
      en: "Send an email",
      id: "Kirim email",
    },
  },
};

const defaultSocial = {
  color:
    "hover:border-emerald-500 hover:text-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)]",
  icon: (
    <svg className="w-6 h-6 fill-current text-emerald-500" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  action: {
    en: "Connect profile",
    id: "Hubungkan profil",
  },
};

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const { lang } = useLanguage();

  // Typewriter tagline three rotation
  const words =
    data.headerTaglineThreeRotations && data.headerTaglineThreeRotations[lang]
      ? data.headerTaglineThreeRotations[lang]
      : ["systems & websites"];

  const [currentText, setCurrentText] = useState(words[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typewriter state when language changes to prevent index out of bounds
  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText(words[0]);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    let timer;

    const tick = () => {
      const fullWord = words[currentWordIndex];
      if (!fullWord) return;

      if (!isDeleting) {
        const nextText = fullWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);

        if (nextText === fullWord) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
          return;
        }
      } else {
        const nextText = fullWord.substring(0, currentText.length - 1);
        setCurrentText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          return;
        }
      }
    };

    let delay = 100;
    if (isDeleting) {
      delay = 50;
    } else if (currentText === "") {
      delay = 500;
    }

    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const highlightWord = words[0];
  const taglineParts = data.headerTaglineThree[lang].split(highlightWord);
  const taglinePrefix = taglineParts[0] || "";
  const taglineSuffix = taglineParts[1] || "";

  // Scroll Reveals
  const [statusRevealRef, statusVisible] = useScrollReveal();
  const [proyekRevealRef, proyekVisible] = useScrollReveal();
  const [servicesRevealRef, servicesVisible] = useScrollReveal();
  const [techRevealRef, techVisible] = useScrollReveal();
  const [aboutRevealRef, aboutVisible] = useScrollReveal();
  const [socialRevealRef, socialVisible] = useScrollReveal();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop - 80,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop - 80,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
    );
  }, []);

  const erpStatusesData = {
    en: [
      {
        name: "Web Application Development",
        status: "active",
        completed: true,
      },
      { name: "CRM / CMS Systems", status: "active", completed: true },
      { name: "E-Learning Platform", status: "active", completed: true },
      { name: "E-Commerce Platform", status: "active", completed: true },
      {
        name: "Mobile Application (React Native)",
        status: "active",
        completed: true,
      },
      { name: "ERP System", status: "in progress", completed: false },
      { name: "New project", status: "open", completed: false },
    ],
    id: [
      { name: "Pengembangan Aplikasi Web", status: "aktif", completed: true },
      { name: "Sistem CRM / CMS", status: "aktif", completed: true },
      { name: "Platform E-Learning", status: "aktif", completed: true },
      { name: "Platform E-Commerce", status: "aktif", completed: true },
      {
        name: "Aplikasi Mobile (React Native)",
        status: "aktif",
        completed: true,
      },
      { name: "Sistem ERP", status: "sedang berjalan", completed: false },
      { name: "Proyek baru", status: "terbuka", completed: false },
    ],
  };

  const erpStatuses = erpStatusesData[lang] || erpStatusesData.en;

  const highlight = (text) => {
    if (text.includes("sistem & website")) {
      const parts = text.split("sistem & website");
      return (
        <>
          {parts[0]}
          <span className="text-emerald-500 dark:text-emerald-400">
            sistem & website
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div
      className={`relative min-h-screen ${data.showCursor && "cursor-none"}`}
    >
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name} | Full-Stack Developer</title>
        <meta name="description" content={lang === "en" ? "Portfolio of Jovfrin Joiner, a Full-Stack Developer specializing in building robust, custom ERP systems, CRM, CMS, e-learning platforms, and mobile apps." : "Portfolio Jovfrin Joiner, seorang Full-Stack Developer yang berspesialisasi dalam membangun sistem ERP custom, CRM, CMS, platform e-learning, dan aplikasi mobile."} />
        <meta name="keywords" content="Jovfrin Joiner, Jovfrin, Joiner, Full-Stack Developer, Web Developer, Software Engineer, ERP Developer, Indonesia, Pamulang, React, Next.js, Laravel, React Native, Tailwind CSS" />
        <meta name="author" content="Jovfrin Joiner" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jovfrin.dev" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${data.name} | Full-Stack Developer`} />
        <meta property="og:description" content={data.headerTaglineThree[lang]} />
        <meta property="og:url" content="https://jovfrin.dev" />
        <meta property="og:site_name" content={`${data.name} Portfolio`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${data.name} | Full-Stack Developer`} />
        <meta name="twitter:description" content={data.headerTaglineThree[lang]} />
      </Head>

      {/* Decorative gradient containers remain but are hidden in style/globals.css */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
      />

      <div className="container mx-auto px-6 tablet:px-12 laptop:px-16 mb-20">
        {/* Hero Section */}
        <div className="mt-12 tablet:mt-24">
          <div className="space-y-4 tablet:space-y-6">
            {/* Tagline */}
            <p
              ref={textOne}
              className="text-xs tablet:text-sm font-mono tracking-wider text-slate-500 dark:text-emerald-400 uppercase flex items-center gap-2 font-semibold"
            >
              <span className="text-slate-400 dark:text-emerald-400 text-sm">
                ●
              </span>
              {data.headerTaglineOne[lang]}
            </p>

            {/* Main Headline Line 1 */}
            <h1
              ref={textTwo}
              className="text-4xl tablet:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              {data.headerTaglineTwo[lang]}
            </h1>

            {/* Main Headline Line 2 (Highlighted) */}
            <h2
              ref={textThree}
              className="text-3xl tablet:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              {taglinePrefix}
              <span className="text-emerald-500 dark:text-emerald-400">
                {currentText}
                <span className="ml-1 inline-block w-1 h-[0.85em] bg-emerald-500 dark:bg-emerald-400 align-middle animate-blink"></span>
              </span>
              {taglineSuffix}
            </h2>

            {/* Description */}
            <p
              ref={textFour}
              className="text-base tablet:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed pt-2"
            >
              {data.headerTaglineFour[lang]}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 tablet:gap-6">
            <button
              onClick={handleWorkScroll}
              className="text-xs tablet:text-sm px-4 tablet:px-6 py-2.5 tablet:py-3 rounded-xl font-mono flex items-center gap-2 whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-transparent text-slate-900 hover:opacity-80 dark:bg-emerald-500 dark:text-zinc-950 dark:font-bold dark:hover:bg-emerald-400"
            >
              {lang === "en" ? "View projects" : "Lihat proyek"} <span>→</span>
            </button>

            <Button
              onClick={() =>
                window.open(
                  data.socials.find((s) => s.title === "Email")?.link ||
                    "mailto:jovfrinjoiner01@gmail.com",
                )
              }
            >
              {lang === "en" ? "Contact me" : "Hubungi saya"}
            </Button>
          </div>

          {/* ERP System Status Card */}
          <div
            ref={statusRevealRef}
            className={`mt-12 mx-auto border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 bg-white dark:bg-[#161e2e] shadow-sm transition-all duration-1000 transform ${
              statusVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative flex items-center justify-center pb-4 mb-4 border-b border-slate-100 dark:border-zinc-800/80">
              <div className="absolute left-0 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="font-mono text-xs text-slate-400 dark:text-zinc-500 lowercase tracking-wider">
                ~/dev — status
              </span>
            </div>
            <div className="space-y-3 font-mono">
              {erpStatuses.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-zinc-800/40 rounded-lg transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="text-amber-500 dark:text-orange-500 text-[10px] animate-pulse">
                        ●
                      </span>
                    )}
                    <span className="text-slate-700 dark:text-zinc-100">
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs ${
                      item.completed
                        ? "text-emerald-500 dark:text-emerald-400 font-semibold"
                        : "text-amber-500 dark:text-orange-400 font-semibold"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proyek Section */}
        <div
          className="mt-24 tablet:mt-36 pt-12 border-t border-slate-100 dark:border-zinc-850"
          ref={workRef}
        >
          <div
            ref={proyekRevealRef}
            className={`transition-all duration-1000 transform ${
              proyekVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {lang === "en" ? "Projects" : "Proyek"}
              </h3>
            </div>

            <div className="space-y-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full p-6 rounded-2xl border border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-[#161e2e] shadow-sm flex flex-col md:flex-row gap-6 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 hover:shadow-[0_8px_30px_rgb(16,185,129,0.04)] dark:hover:shadow-[0_8px_30px_rgb(16,185,129,0.06)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Left Column (Number & Path) */}
                  <div className="md:w-1/4 flex flex-row md:flex-col items-baseline md:items-start gap-3 md:gap-1 flex-shrink-0">
                    <span className="font-mono text-sm text-slate-400 dark:text-zinc-500 font-semibold group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {project.id}
                    </span>
                    <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400 font-semibold">
                      {project.path}
                    </span>
                  </div>

                  {/* Right Column (Content) */}
                  <div className="md:w-3/4 flex flex-col gap-3">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-mono group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      {project.title[lang]}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
                      {project.description[lang]}
                    </p>
                    {/* Links */}
                    {project.link && project.link.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.link.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-slate-50/50 hover:bg-slate-100 hover:text-emerald-500 hover:border-emerald-500/50 hover:scale-[1.03] dark:border-zinc-800 dark:text-zinc-300 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 dark:hover:text-white dark:hover:border-emerald-400/50 transition-all duration-200"
                          >
                            {item.label !== "Live" && (
                              <svg
                                className="w-3.5 h-3.5 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                />
                              </svg>
                            )}
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1 rounded-lg border border-slate-200 text-slate-500 dark:border-zinc-800 dark:text-zinc-400 bg-slate-50/50 dark:bg-zinc-900/40 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors duration-150"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-24 tablet:mt-36 pt-12 border-t border-slate-100 dark:border-zinc-850">
          <div
            ref={servicesRevealRef}
            className={`transition-all duration-1000 transform ${
              servicesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400 font-semibold">
                [02]
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                {lang === "en" ? "Services" : "Layanan"}
                <span className="text-emerald-500 dark:text-emerald-400">
                  .
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
              {data.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.title[lang]}
                  description={service.description[lang]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div
          className="mt-24 tablet:mt-36 pt-12 border-t border-slate-100 dark:border-zinc-850"
          ref={aboutRef}
        >
          <div
            ref={aboutRevealRef}
            className={`transition-all duration-1000 transform ${
              aboutVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400 font-semibold">
                [04]
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                {lang === "en" ? "About Me" : "Tentang Saya"}
                <span className="text-emerald-500 dark:text-emerald-400">
                  .
                </span>
              </h3>
            </div>
            <p className="text-base tablet:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed ">
              {data.aboutpara[lang]}
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-24 tablet:mt-36 pt-12 border-t border-slate-100 dark:border-zinc-850">
          <div
            ref={techRevealRef}
            className={`transition-all duration-1000 transform ${
              techVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400 font-semibold">
                  [03]
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {data.techstack.title[lang]}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    .
                  </span>
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-sans max-w-xl">
                {data.techstack.description[lang]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.techstack.categories.map((category, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-[#161e2e] shadow-sm hover:border-emerald-500/30 dark:hover:border-emerald-400/30 hover:shadow-[0_8px_30px_rgb(16,185,129,0.03)] dark:hover:shadow-[0_8px_30px_rgb(16,185,129,0.05)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <h4 className="text-sm font-semibold font-mono text-slate-700 dark:text-zinc-300 mb-4 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {category.name[lang]}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 bg-slate-50/50 hover:bg-slate-100 hover:text-emerald-500 hover:border-emerald-500/50 dark:border-zinc-800 dark:text-zinc-400 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/60 dark:hover:text-white dark:hover:border-emerald-400/50 transition-all duration-200 cursor-default hover:scale-[1.03]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Socials Section */}
        <div className="mt-24 tablet:mt-36 pt-12 border-t border-slate-100 dark:border-zinc-850">
          <div
            ref={socialRevealRef}
            className={`transition-all duration-1000 transform ${
              socialVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-emerald-500 dark:text-emerald-400 font-semibold">
                  [05]
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {data.socials_section.title[lang]}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    .
                  </span>
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-sans max-w-xl">
                {data.socials_section.description[lang]}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.socials.map((social) => {
                const config = socialConfig[social.title] || defaultSocial;
                return (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-6 rounded-2xl border border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-[#161e2e] shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 group hover:-translate-y-1 ${config.color}`}
                  >
                    <div className="text-slate-400 transition-colors duration-200">
                      {config.icon}
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      {social.title}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors duration-200">
                      {config.action[lang]}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
