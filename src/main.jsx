import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import "./styles.css";
import portrait from "./assets/pratish-cutout.png";
import edusphereHero from "./assets/edusphere-hero.png";

const LINKS = {
  instagram: "https://www.instagram.com/00._nobody.ai._.00",
  github: "https://github.com/pratish2657-del",
  linkedin: "https://www.linkedin.com/in/pratish-kumar-agarwal-0a2a81296",
  edusphere: "https://edusphere-rho-sable.vercel.app/",
};

const external = {
  target: "_blank",
  rel: "noopener noreferrer",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "work", "stack", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setMenuOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="site">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="topbar">
        <button
          className="wordmark"
          onClick={() => go("home")}
          aria-label="Back to home"
        >
          PK<span>®</span>
        </button>

        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          {[
            ["home", "Home"],
            ["about", "About"],
            ["work", "Work"],
            ["stack", "Stack"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="availability">
          <span />
          Available for opportunities
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={19} />
          ) : (
            <Menu size={19} />
          )}
        </button>
      </header>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}

      {menuOpen && (
        <div className="mobile-nav">
          {[
            ["home", "Home"],
            ["about", "About"],
            ["work", "Work"],
            ["stack", "Stack"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <main>
        {/* =======================================================
            HERO
        ======================================================= */}

        <section
          id="home"
          className="hero section-shell"
        >
          <div className="hero-meta">
            01 — PORTFOLIO / 2026
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">
                COMPUTER SCIENCE × AI
              </p>

              <h1>
                I build <em>useful</em>
                <br />
                digital things.
              </h1>

              <p className="hero-intro">
                Pratish Kumar Agarwal — developer and
                product builder focused on AI,
                full-stack systems and interfaces that
                feel considered rather than generated.
              </p>

              <div className="hero-actions">
                <button
                  className="button button-dark"
                  onClick={() => go("work")}
                >
                  See selected work
                  <ArrowDownRight size={16} />
                </button>

                <a
                  className="text-action"
                  href={LINKS.linkedin}
                  {...external}
                >
                  Say hello
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-card">
                <img
                  src={portrait}
                  alt="Pratish Kumar Agarwal"
                />

                <div className="portrait-caption">
                  <span>
                    PRATISH KUMAR AGARWAL
                  </span>

                  <span>
                    AI / SOFTWARE / PRODUCT
                  </span>
                </div>
              </div>

              <div className="hero-note note-one">
                BUILD / SHIP / LEARN
              </div>

              <div className="hero-note note-two">
                KOLKATA · INDIA
              </div>
            </div>
          </div>

          <div className="scroll-cue">
            <span />
            Scroll to explore
          </div>
        </section>

        {/* =======================================================
            ABOUT
        ======================================================= */}

        <section
          id="about"
          className="section-shell about-section"
        >
          <div className="section-label">
            02 — ABOUT
          </div>

          <div className="about-layout">
            <h2>
              Less noise.
              <br />
              <span>More intention.</span>
            </h2>

            <div className="about-copy">
              <p className="large-copy">
                I like software that solves a real
                problem and design that knows when to
                get out of the way.
              </p>

              <p>
                I’m a CSE student specializing in AI,
                building products across web
                applications, backend architecture,
                intelligent systems and connected
                hardware. I’m currently developing
                <strong> EduSphere </strong>,
                a student-focused platform combining
                a marketplace with an AI study
                assistant.
              </p>

              <div className="fact-row">
                <div>
                  <small>FOCUS</small>
                  <b>
                    AI · Full-stack · Product
                  </b>
                </div>

                <div>
                  <small>EDUCATION</small>
                  <b>B.Tech CSE (AI)</b>
                </div>

                <div>
                  <small>BASE</small>
                  <b>India</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            WORK
        ======================================================= */}

        <section
          id="work"
          className="section-shell work-section"
        >
          <div className="section-topline">
            <div className="section-label">
              03 — SELECTED WORK
            </div>

            <span>03 PROJECTS</span>
          </div>

          {/* Featured Project */}

          <article className="featured-project">
            <div className="project-copy">
              <div className="project-index">
                01 / LIVE PRODUCT
              </div>

              <h2>
                EduSphere
              </h2>

              <p>
                A student-first platform bringing
                notes, resources, marketplace workflows
                and an AI study layer into one system.
              </p>

              <div className="tag-row">
                {[
                  "React",
                  "FastAPI",
                  "MySQL",
                  "AI",
                  "Marketplace",
                ].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <a
                className="project-link"
                href={LINKS.edusphere}
                {...external}
              >
                Visit product
                <ExternalLink size={15} />
              </a>
            </div>

            <div className="project-image">
              <img
                src={edusphereHero}
                alt="EduSphere interface"
              />

              <div className="image-overlay">
                <span>EDUSPHERE</span>
                <MoveUpRight size={18} />
              </div>
            </div>
          </article>

          {/* Additional Projects */}

          <div className="project-list">
            <article className="project-row">
              <div className="row-number">
                02
              </div>

              <div className="row-title">
                <h3>
                  AI Hand Movement Rehabilitation
                </h3>

                <p>
                  AI-assisted rehabilitation concept
                  combining sensors, servo motors and
                  an ergonomic brace.
                </p>
              </div>

              <div className="row-tech">
                AI + HARDWARE
              </div>

              <ArrowUpRight
                className="row-arrow"
                size={19}
              />
            </article>

            <article className="project-row">
              <div className="row-number">
                03
              </div>

              <div className="row-title">
                <h3>
                  Personal Assistant Bot
                </h3>

                <p>
                  AI-powered personal assistant bot designed to handle conversations, automate tasks and provide intelligent assistance.
                </p>
              </div>

              <div className="row-tech">
                AI + AUTOMATION
              </div>

              <ArrowUpRight
                className="row-arrow"
                size={19}
              />
            </article>
          </div>
        </section>

        {/* =======================================================
            STACK
        ======================================================= */}

        <section
          id="stack"
          className="section-shell stack-section"
        >
          <div className="section-label">
            04 — TOOLKIT
          </div>

          <div className="stack-layout">
            <div>
              <h2>
                The tools
                <br />
                <span>behind the work.</span>
              </h2>

              <p>
                Not a list for decoration — these are
                technologies I actively use to build,
                test and ship.
              </p>
            </div>

            <div className="stack-grid">
              {[
                "Python",
                "JavaScript",
                "React",
                "Vite",
                "Next.js",
                "FastAPI",
                "MySQL",
                "Supabase",
                "Firebase",
                "Gemini",
                "Three.js",
                "GSAP",
                "Arduino",
              ].map((item, index) => (
                <div
                  className="stack-item"
                  key={item}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <b>{item}</b>

                  <Check size={14} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================
            CONTACT
        ======================================================= */}

        <section
          id="contact"
          className="section-shell contact-section"
        >
          <div className="section-label">
            05 — CONTACT
          </div>

          <div className="contact-inner">
            <p className="kicker">
              HAVE A PROJECT IN MIND?
            </p>

            <h2>
              Let’s make
              <br />
              <em>something real.</em>
            </h2>

            <a
              className="contact-mail"
              href={LINKS.linkedin}
              {...external}
            >
              Connect on LinkedIn
              <ArrowUpRight size={21} />
            </a>

            <div className="socials">
              <a
                href={LINKS.github}
                {...external}
                aria-label="GitHub"
              >
                <span className="social-mark">
                  GH
                </span>
                GitHub
              </a>

              <a
                href={LINKS.linkedin}
                {...external}
                aria-label="LinkedIn"
              >
                <span className="social-mark">
                  IN
                </span>
                LinkedIn
              </a>

              <a
                href={LINKS.instagram}
                {...external}
                aria-label="Instagram"
              >
                <span className="social-mark">
                  IG
                </span>
                Instagram
              </a>
            </div>
          </div>

          <footer>
            <span>
              PRATISH KUMAR AGARWAL
            </span>

            <span>© 2026</span>

            <span>BUILT WITH REACT</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);