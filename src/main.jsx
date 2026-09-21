import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Lenis from "lenis";
import { gsap } from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  Globe2,
  Bot,
  Mail,
  Menu,
  X,
  Play,
  Radio,
  Server,
  Sparkles,
  Terminal,
  Zap,
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

const external = { target: "_blank", rel: "noopener noreferrer" };

function ParticleField() {
  const points = useRef();
  const group = useRef();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const touchActive = useRef(false);
  const { viewport } = useThree();

  const data = useMemo(() => {
    const count = 6200;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 2.35 + Math.random() * 0.55;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const j = i * 3;
      positions[j] = seeds[j] = x;
      positions[j + 1] = seeds[j + 1] = y;
      positions[j + 2] = seeds[j + 2] = z;
    }
    return { count, positions, seeds };
  }, []);

  useEffect(() => {
    const setPointer = (clientX, clientY) => {
      mouse.current.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") touchActive.current = true;
      setPointer(e.clientX, e.clientY);
    };

    const onPointerDown = (e) => {
      if (e.pointerType === "touch") touchActive.current = true;
      setPointer(e.clientX, e.clientY);
    };

    const onPointerUp = (e) => {
      if (e.pointerType === "touch") touchActive.current = false;
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchActive.current = true;
      setPointer(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchActive.current = true;
      setPointer(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      touchActive.current = false;
      mouse.current.multiplyScalar(0.82);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;

    const targetX = mouse.current.x * 2.6;
    const targetY = mouse.current.y * 2.1;

    for (let i = 0; i < data.count; i++) {
      const j = i * 3;
      const sx = data.seeds[j];
      const sy = data.seeds[j + 1];
      const sz = data.seeds[j + 2];

      let x = arr[j];
      let y = arr[j + 1];
      let z = arr[j + 2];

      const dx = x - targetX;
      const dy = y - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const interactionRadius = touchActive.current ? 1.45 : 1.15;
      const influence = Math.max(0, 1 - dist / interactionRadius);

      if (influence > 0) {
        const sensitivity = touchActive.current ? 1.45 : 0.8;
        const force = influence * influence * sensitivity;
        x += (dx / Math.max(dist, 0.05)) * force * delta * 12;
        y += (dy / Math.max(dist, 0.05)) * force * delta * 12;
        z += influence * (touchActive.current ? 0.32 : 0.22) * Math.sin(i * 0.07 + t * 4);
      }

      const noise = Math.sin(t * 0.55 + i * 0.017) * 0.018;
      x = THREE.MathUtils.lerp(x, sx + noise, 0.045);
      y = THREE.MathUtils.lerp(y, sy + Math.cos(t * 0.4 + i) * 0.012, 0.045);
      z = THREE.MathUtils.lerp(z, sz, 0.045);

      arr[j] = x;
      arr[j + 1] = y;
      arr[j + 2] = z;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    group.current.rotation.y += delta * (0.06 + mouse.current.x * 0.02);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.13,
      0.035
    );
  });

  return (
    <group ref={group} scale={viewport.width < 6 ? 0.82 : 1}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={data.positions}
            count={data.count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#55a8ff"
          size={0.018}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh>
        <sphereGeometry args={[2.35, 48, 48]} />
        <meshBasicMaterial
          color="#0a3b78"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>

      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          rotation={[
            i * 0.8,
            i * 1.1,
            i * 0.35,
          ]}
        >
          <torusGeometry args={[2.65 + i * 0.14, 0.012, 8, 180]} />
          <meshBasicMaterial
            color={i === 1 ? "#f1bd42" : "#287dff"}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

function CinematicCanvas() {
  return (
    <div className="vfx-canvas">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <ParticleField />
      </Canvas>
    </div>
  );
}

function CursorFX() {
  const cursor = useRef();
  const glow = useRef();

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: "power2.out",
      });
      gsap.to(glow.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={glow} className="cursor-glow" />
      <div ref={cursor} className="cursor-dot" />
    </>
  );
}


function InstagramIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GithubIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4.2c.05-1.3-.45-2.1-1-2.6 3.3-.36 6.8-1.62 6.8-7.25 0-1.6-.57-2.92-1.52-3.95.15-.37.66-1.87-.15-3.9 0 0-1.24-.4-4.08 1.5a14 14 0 0 0-7.44 0C4.77-.3 3.52.1 3.52.1c-.81 2.03-.3 3.53-.15 3.9A5.72 5.72 0 0 0 1.85 7.95c0 5.62 3.48 6.9 6.78 7.25-.43.38-.82 1.02-.96 1.98-.86.39-3.04 1.05-4.38-1.25-.29-.5-1.15-1.64-2.36-1.62-.1 0-.4.03-.03.18.37.15.8.53 1.1 1.1.62 1.1 1.65 3.2 5.58 2.3V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="social-row">
      <a className="social-pill" href={LINKS.instagram} {...external}>
        <InstagramIcon size={15} /> Instagram
      </a>
      <a className="social-pill" href={LINKS.github} {...external}>
        <GithubIcon size={15} /> GitHub
      </a>
      <a className="social-pill" href={LINKS.linkedin} {...external}>
        <LinkedinIcon size={15} /> LinkedIn
      </a>
    </div>
  );
}

function App() {
  const [autoScroll, setAutoScroll] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroTimer = useRef(null);
  const lenisRef = useRef(null);

  const scrollTo = useCallback((id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (!autoScroll) return;

    heroTimer.current = window.setTimeout(() => {
      scrollTo("intro");
    }, 12000);

    return () => window.clearTimeout(heroTimer.current);
  }, [autoScroll, scrollTo]);

  useEffect(() => {
    const stopAuto = () => setAutoScroll(false);
    const resumeAuto = () => {
      if (window.scrollY < window.innerHeight * 0.4) {
        setAutoScroll(true);
      }
    };

    window.addEventListener("wheel", stopAuto, { passive: true });
    window.addEventListener("touchstart", stopAuto, { passive: true });
    window.addEventListener("scrollend", resumeAuto);

    return () => {
      window.removeEventListener("wheel", stopAuto);
      window.removeEventListener("touchstart", stopAuto);
      window.removeEventListener("scrollend", resumeAuto);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <CursorFX />

      <header className="nav">
        <button
          className="brand"
          onClick={() => scrollTo("hero")}
        >
          PRATISH<span>.</span>
          <small>AI / SOFTWARE / CREATIVE TECHNOLOGY</small>
        </button>

        <nav className="desktop-nav">
          <button onClick={() => scrollTo("intro")}>ABOUT</button>
          <button onClick={() => scrollTo("work")}>WORK</button>
          <button onClick={() => scrollTo("tech")}>TECH</button>
          <button onClick={() => scrollTo("contact")}>CONTACT</button>
        </nav>

        <div className="nav-actions">
          <a
            className="nav-cta"
            href={LINKS.edusphere}
            {...external}
          >
            EXPLORE EDUSPHERE <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu((value) => !value)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`mobile-menu ${mobileMenu ? "open" : ""}`}>
          <button onClick={() => scrollTo("intro")}>ABOUT</button>
          <button onClick={() => scrollTo("work")}>WORK</button>
          <button onClick={() => scrollTo("tech")}>TECH</button>
          <button onClick={() => scrollTo("contact")}>CONTACT</button>
          <a href={LINKS.edusphere} {...external} onClick={() => setMobileMenu(false)}>
            EXPLORE EDUSPHERE <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero scene">
          <div className="hero-grid" />

          <div className="hero-copy">
            <div className="eyebrow">
              01 / DIGITAL ARCHITECT · AI ENGINEER
            </div>

            <h1>
              PRATISH
              <span>KUMAR</span>
              <i>AGARWAL</i>
            </h1>

            <p className="hero-lead">
              I build intelligent digital experiences,
              full-stack platforms and technology systems
              where <strong>AI meets software.</strong>
            </p>

            <div className="hero-actions">
              <button
                className="primary"
                onClick={() => scrollTo("work")}
              >
                ENTER MY WORLD <ArrowDown size={15} />
              </button>

              <a
                className="secondary"
                href={LINKS.edusphere}
                {...external}
              >
                VIEW EDUSPHERE <ArrowUpRight size={15} />
              </a>
            </div>

            <SocialLinks />
          </div>

          <div className="hero-visual">
            <CinematicCanvas />

            <div className="portrait-wrap">
              <div className="portrait-aura" />
              <div alt="Pratish Kumar Agarwal" />
            </div>

            <div className="orbit-copy orbit-copy-a">
              PEOPLE<br />
              IDEAS<br />
              TECHNOLOGY<br />
              EDUCATION<br />
              IMPACT
            </div>

            <div className="orbit-copy orbit-copy-b">
              A SMARTER EDUCATION<br />
              <strong>A BRIGHTER TOMORROW</strong>
            </div>
          </div>

          <div className="hero-bottom">
            <span>MOVE YOUR CURSOR</span>
            <span className="hero-line" />
            <span>PARTICLES RESPOND</span>
          </div>
        </section>

        {/* INTRO */}
        <section id="intro" className="scene intro">
          <div className="section-number">02 / INTRO</div>

          <div className="intro-copy reveal">
            <div className="eyebrow">THE PERSON BEHIND THE SCREEN</div>

            <h2>
              Building at the
              <br />
              intersection of
              <span> AI & software.</span>
            </h2>

            <p>
              I create products, intelligent systems and
              immersive digital experiences. My work spans
              artificial intelligence, full-stack engineering,
              backend architecture and connected hardware.
            </p>

            <button
              className="text-link"
              onClick={() => scrollTo("work")}
            >
              DISCOVER THE WORK <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="intro-visual reveal">
            <div className="intro-ring">
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
              <Sparkles className="intro-icon" size={40} />
            </div>
          </div>
        </section>

        {/* WHAT I DO */}
        <section className="scene services">
          <div className="section-number">03 / CAPABILITIES</div>

          <div className="section-head reveal">
            <div>
              <div className="eyebrow">WHAT I BUILD</div>
              <h2>
                SYSTEMS.
                <br />
                <span>EXPERIENCES.</span>
              </h2>
            </div>
            <p>
              From intelligent APIs to immersive interfaces,
              every layer is designed as part of one system.
            </p>
          </div>

          <div className="service-grid">
            {[
              [
                Cpu,
                "AI ENGINEERING",
                "Intelligent applications, AI integrations and model-powered workflows.",
              ],
              [
                Code2,
                "FULL-STACK",
                "Modern web products spanning interfaces, APIs, authentication and databases.",
              ],
              [
                Server,
                "BACKEND SYSTEMS",
                "FastAPI services, database architecture, payments and secure application infrastructure.",
              ],
              [
                Zap,
                "UI / UX",
                "High-impact interfaces built around motion, hierarchy and usability.",
              ],
              [
                Radio,
                "IoT / EMBEDDED",
                "Connected systems combining sensors, automation, and intelligent control.",
              ],
            ].map(([Icon, title, body]) => (
              <article className="service reveal" key={title}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="scene work">
          <div className="section-number">04 / SELECTED WORK</div>

          <div className="section-head reveal">
            <div>
              <div className="eyebrow">FEATURED PROJECT</div>
              <h2>
                <span>EDU</span>SPHERE
              </h2>
            </div>
            <p>
              A student-focused digital platform built to
              connect education, technology and opportunity.
            </p>
          </div>

          <a
            className="edu-project reveal"
            href={LINKS.edusphere}
            {...external}
          >
            <div className="edu-copy">
              <div className="project-kicker">
                LIVE PRODUCT / 01
              </div>

              <h3>
                Edu<span>Sphere</span>
              </h3>

              <p>
                A full-stack education platform and
                marketplace experience designed around
                students, professors and digital resources.
              </p>

              <div className="project-tags">
                <span>FULL-STACK</span>
                <span>AI</span>
                <span>MARKETPLACE</span>
                <span>EDUCATION</span>
              </div>

              <div className="project-cta">
                EXPLORE EDUSPHERE
                <ArrowUpRight size={17} />
              </div>
            </div>

            <div className="edu-screen">
              <div className="screen-glow" />

              <div className="edu-universe">
                <img
                  src={edusphereHero}
                  alt="EduSphere intelligent academic ecosystem"
                  className="edusphere-full-image"
                />
                <div className="edu-visual-vignette" />
              </div>
            </div>
          </a>

          <div className="project-pair">
            <article className="mini-project reveal">
              <div className="mini-art rehab">
                <Radio size={38} />
              </div>
              <div>
                <small>02 / AI + HARDWARE</small>
                <h3>Hand Movement Rehabilitation</h3>
                <p>
                  AI-assisted rehabilitation system combining
                  sensors, servo motors and intelligent movement assistance.
                </p>
              </div>
            </article>

            <article className="mini-project reveal">
              <div className="mini-art irrigation">
                <Bot size={18}/>
              </div>
              <div>
                <small>03 / AI + AUTOMATION</small>
                <h3>Personal Assistant Bot</h3>
                <p>
                  AI-powered personal assistant bot designed to handle
                  conversations, automate tasks and provide intelligent assistance.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* TECH */}
        <section id="tech" className="scene tech">
          <div className="section-number">05 / TECHNOLOGY</div>

          <div className="section-head reveal">
            <div>
              <div className="eyebrow">THE STACK</div>
              <h2>
                TOOLS THAT
                <br />
                <span>MOVE IDEAS.</span>
              </h2>
            </div>
          </div>

          <div className="tech-orbit reveal">
            {[
              "Python",
              "TypeScript",
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
              "Arduino",
              "GSAP",
              "Lenis",
            ].map((item, index) => (
              <span
                key={item}
                className={`tech-pill t${index % 6}`}
              >
                {item}
              </span>
            ))}

            <div className="tech-core">
              <Terminal size={30} />
              <span>BUILD</span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="scene about">
          <div className="section-number">06 / ABOUT</div>

          <div className="about-grid">
            <div className="about-copy reveal">
              <div className="eyebrow">PRATISH KUMAR AGARWAL</div>

              <h2>
                Technology
                <br />
                with <span>purpose.</span>
              </h2>

              <p>
                Computer Science & Engineering student
                specializing in AI, focused on building
                products that are useful, intelligent and
                visually memorable.
              </p>

              <div className="education-block reveal">
                <div className="education-label">EDUCATION</div>
                <h3>Bachelor of Technology in Computer Science and Engineering (Artificial Intelligence)</h3>
                <h3>2025-29 Batch (2nd Year)</h3>
                <p>
                  University of Engineering &amp; Management, Kolkata
                </p>
                <a
                  className="education-address"
                  href="https://www.google.com/search?q=University+of+Engineering+%26+Management%2C+Kolkata+address"
                  {...external}
                >
                  University Area, Plot No. III B/5, New Town Road, Action Area III, Newtown, Kolkata, West Bengal 700160
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div className="about-photo reveal">
              <div className="photo-frame">
                <img
                  src={portrait}
                  alt="Pratish Kumar Agarwal"
                />
              </div>
              <div className="photo-caption">
                AI / SOFTWARE / PRODUCT
              </div>
            </div>

            <div className="facts reveal">
              <div>
                <b>FOCUS</b>
                <span>AI · Software Engineering · Product Development</span>
              </div>
              <div>
                <b>BUILDING</b>
                <span>EduSphere and intelligent technology systems</span>
              </div>
              <div>
                <b>EXPLORING</b>
                <span>3D web · creative coding · IoT · intelligent systems</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scene contact">
          <div className="contact-stars" />

          <div className="contact-content reveal">
            <div className="eyebrow">07 / CONTACT</div>

            <h2>
              LET'S BUILD
              <br />
              <span>SOMETHING</span>
              <br />
              MEANINGFUL.
            </h2>

            <p>
              Have an idea, product or technical challenge?
              Let's turn it into something real.
            </p>

            <div className="contact-actions">
              <a
                className="primary"
                href={LINKS.linkedin}
                {...external}
              >
                CONNECT ON LINKEDIN <ArrowUpRight size={15} />
              </a>

              <a
                className="secondary"
                href={LINKS.edusphere}
                {...external}
              >
                VISIT EDUSPHERE <Globe2 size={15} />
              </a>
            </div>

            <SocialLinks />
          </div>

          <div className="contact-earth">
            <div className="earth-horizon" />
          </div>

          <footer>
            <span>PRATISH KUMAR AGARWAL</span>
            <span>© 2026 / ALL SYSTEMS ONLINE</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
