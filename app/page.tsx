"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".project, .about-grid")
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    )
    revealItems.forEach((item) => revealObserver.observe(item))

    const playTimers = new WeakMap<HTMLVideoElement, number>()
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          const video = target as HTMLVideoElement
          const pending = playTimers.get(video)
          if (pending) window.clearTimeout(pending)
          playTimers.delete(video)
          if (isIntersecting && intersectionRatio >= 0.5) {
            playTimers.set(
              video,
              window.setTimeout(() => {
                playTimers.delete(video)
                video.currentTime = 0
                video.play().catch(() => {})
              }, 800),
            )
          } else {
            video.pause()
            video.currentTime = 0
          }
        })
      },
      { threshold: 0.5 },
    )
    const videos = document.querySelectorAll<HTMLVideoElement>(".project video")
    videos.forEach((video) => videoObserver.observe(video))

    return () => {
      revealObserver.disconnect()
      videoObserver.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
    .site { --bg:#080a0f; --panel:#10131b; --line:#28303d; --text:#f2f4f8; --muted:#9199aa; --blue:#67a9ff; --orange:#f38b54; --max:1180px; }
    .site * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    .site { margin:0; background:var(--bg); color:var(--text); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size:16px; line-height:1.5; min-height:100vh; }
    .site a { color:inherit; text-decoration:none; }
    .site .wrap { width:min(var(--max), calc(100% - 48px)); margin:auto; }
    .site .nav { height:88px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); }
    .site .mark { display:flex; align-items:center; gap:11px; font-weight:750; letter-spacing:.05em; font-size:14px; }
    .site .mark-dot { width:30px; height:30px; display:grid; place-items:center; border:1px solid var(--blue); border-radius:9px; color:var(--blue); font-size:12px; }
    .site .nav-links { display:flex; gap:26px; color:var(--muted); font-size:14px; }
    .site .nav-links a:hover { color:var(--text); }
    .site .hero { min-height:560px; display:grid; grid-template-columns:1.15fr .85fr; gap:60px; align-items:center; padding:72px 0 82px; }
    .site .eyebrow { color:var(--blue); text-transform:uppercase; letter-spacing:.18em; font-size:12px; font-weight:700; margin:0 0 22px; }
    .site h1 { font-size:clamp(3.4rem, 8vw, 7.1rem); line-height:.92; letter-spacing:-.075em; margin:0; max-width:720px; }
    .site .hero-copy { max-width:560px; color:var(--muted); font-size:19px; margin:28px 0 34px; }
    .site .hero-actions { display:flex; align-items:center; gap:22px; }
    .site .button { display:inline-flex; align-items:center; gap:10px; padding:14px 20px; border-radius:999px; background:var(--blue); color:#07101e; font-weight:750; font-size:14px; }
    .site .text-link { color:var(--text); font-size:14px; border-bottom:1px solid var(--line); padding-bottom:4px; }
    .site .hero-art { position:relative; aspect-ratio:16/10; border:1px solid var(--line); background:radial-gradient(circle at 52% 50%, #1b263a 0, #0c1018 47%, #080a0f 72%); overflow:hidden; }
    .site .hero-art img { width:100%; height:100%; object-fit:contain; display:block; }
    .site .hero-label { position:absolute; left:18px; bottom:18px; font-size:11px; color:#bfc8d7; letter-spacing:.12em; text-transform:uppercase; }
    .site .section { padding:95px 0; border-top:1px solid var(--line); }
    .site .section-head { display:flex; align-items:end; justify-content:space-between; gap:20px; margin-bottom:32px; }
    .site h2 { font-size:clamp(2rem, 4vw, 3.4rem); line-height:1; letter-spacing:-.05em; margin:0; }
    .site .section-note { max-width:360px; color:var(--muted); margin:0; }
    .site .work-grid { display:grid; gap:26px; }
    .site .project { display:grid; grid-template-columns:minmax(0,1.65fr) minmax(270px,.8fr); background:var(--panel); border:1px solid var(--line); transition:transform .7s cubic-bezier(.2,.75,.25,1), border-color .25s ease, opacity .7s ease; opacity:0; transform:translateY(80px) scale(.96); overflow:hidden; }
    .site .project.is-visible { opacity:1; transform:translateY(0) scale(1); }
    .site .project:nth-child(2) { grid-template-columns:minmax(270px,.8fr) minmax(0,1.65fr); }
    .site .project:nth-child(2) .project-image { order:2; }
    .site .project.project--portrait { grid-template-columns:minmax(280px,360px) minmax(0,1fr); }
    .site .project--portrait .project-image { aspect-ratio:9/16; }
    .site .project--portrait .project-image video { object-fit:contain; }
    .site .project:hover { transform:translateY(-6px); border-color:#53647c; }
    .site .project-image { aspect-ratio:16/9; overflow:hidden; background:#0d1118; }
    .site .project-image video { width:100%; height:100%; display:block; object-fit:cover; }
    .site .project-body { padding:clamp(24px,3.2vw,44px); display:flex; flex-direction:column; justify-content:center; gap:14px; }
    .site .project h3 { margin:0; font-size:clamp(1.6rem,3vw,2.5rem); line-height:1.05; letter-spacing:-.045em; }
    .site .project p { margin:0; color:var(--muted); font-size:16px; line-height:1.55; }
    .site .tag { color:var(--orange); font-size:12px; letter-spacing:.12em; text-transform:uppercase; }
    .site .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:70px; }
    .site .about-grid > * { opacity:0; transform:translateY(60px); transition:opacity .8s ease, transform .8s cubic-bezier(.2,.75,.25,1); }
    .site .about-grid.is-visible > * { opacity:1; transform:translateY(0); }
    .site .about-grid.is-visible > *:nth-child(2) { transition-delay:.12s; }
    .site .about-lede { font-size:clamp(1.7rem, 3vw, 2.7rem); line-height:1.05; letter-spacing:-.045em; margin:0; }
    .site .about-copy { color:var(--muted); max-width:500px; }
    .site .skills { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:34px; }
    .site .skill { padding:18px; background:var(--bg); color:#d6dbe4; }
    .site .skill small { display:block; color:var(--muted); font-size:12px; margin-top:5px; }
    .site footer { padding:28px 0 42px; color:var(--muted); font-size:13px; display:flex; justify-content:space-between; gap:20px; }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior:auto; } .site *, .site *::before, .site *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; } .site .project, .site .about-grid > * { opacity:1; transform:none; } }
    @media (max-width: 760px) { .site .wrap { width:min(var(--max), calc(100% - 32px)); } .site .nav { height:72px; } .site .nav-links { gap:14px; font-size:13px; } .site .hero { grid-template-columns:1fr; padding:65px 0 70px; gap:42px; } .site .hero-art { max-width:460px; } .site .section { padding:70px 0; } .site .section-head { align-items:flex-start; flex-direction:column; } .site .about-grid { grid-template-columns:1fr; } .site .project, .site .project:nth-child(2), .site .project.project--portrait { grid-template-columns:1fr; } .site .project:nth-child(2) .project-image { order:0; } .site .project--portrait .project-image { width:100%; max-width:360px; justify-self:center; } .site footer { flex-direction:column; } }
      `}</style>

      <div className="site">
        <header className="wrap nav">
          <a className="mark" href="#top" aria-label="Back to top">
            <span className="mark-dot" aria-hidden="true">
              ↗
            </span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </nav>
        </header>
        <main id="top">
          <section className="wrap hero">
            <div>
              <p className="eyebrow">3D · Motion · Edit</p>
              <h1>
                Ideas made
                <br />
                <span style={{ color: "var(--blue)" }}>visible.</span>
              </h1>
              <p className="hero-copy">
                A selection of finished 3D and motion work, from a reflective brand world and an animated aircraft
                reveal to a travel campaign made for mobile.
              </p>
              <div className="hero-actions">
                <a className="button" href="#work">
                  View selected work <span>↘</span>
                </a>
                <a className="text-link" href="#about">
                  About the work
                </a>
              </div>
            </div>
            <div className="hero-art">
              <img
                src="/assets/moonline-poster.png"
                alt="Moonline 3D logo floating in a neon-lit reflective corridor"
              />
              <span className="hero-label">Moonline / 3D identity</span>
            </div>
          </section>
          <section className="section" id="work">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <p className="eyebrow">01 / Selected work</p>
                  <h2>
                    Made to hold
                    <br />
                    attention.
                  </h2>
                </div>
                <p className="section-note">
                  Three finished pieces across 3D identity, motion design, and social video. Each film plays as you
                  scroll to it.
                </p>
              </div>
              <div className="work-grid">
                <article className="project">
                  <div className="project-image">
                    <video
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/assets/moonline-poster.png"
                      aria-label="Moonline 3D animation"
                    >
                      <source src="/assets/moonline-film.mp4" type="video/mp4" />
                      Your browser does not support video.{" "}
                      <a href="/assets/moonline-film.mp4">Download the Moonline film</a>.
                    </video>
                  </div>
                  <div className="project-body">
                    <span className="tag">3D identity / 01</span>
                    <h3>Moonline</h3>
                    <p>
                      An extruded Moonline Business logo suspended in a reflective corridor. Metallic surfaces,
                      structural pathway lights, and a rotating mark give the identity a physical presence.
                    </p>
                  </div>
                </article>
                <article className="project">
                  <div className="project-image">
                    <video
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/assets/holiday-poster.png"
                      aria-label="Babylon Holiday aircraft reveal"
                    >
                      <source src="/assets/holiday-film.mp4" type="video/mp4" />
                      Your browser does not support video.{" "}
                      <a href="/assets/holiday-film.mp4">Download the Holiday film</a>.
                    </video>
                  </div>
                  <div className="project-body">
                    <span className="tag">Motion design / 02</span>
                    <h3>Babylon Holiday</h3>
                    <p>
                      A ten-second brand reveal over a moving sky. An aircraft enters as the Holiday script writes
                      itself, followed by the gold figure and BABYLON badge.
                    </p>
                  </div>
                </article>
                <article className="project project--portrait">
                  <div className="project-image">
                    <video
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/assets/travel-deal-poster.jpg"
                      aria-label="Moonline Travel Instagram ad"
                    >
                      <source src="/assets/travel-deal-film.mp4" type="video/mp4" />
                      Your browser does not support video.{" "}
                      <a href="/assets/travel-deal-film.mp4">Download the travel ad</a>.
                    </video>
                  </div>
                  <div className="project-body">
                    <span className="tag">Social video / 03</span>
                    <h3>4 Nights, 5 Days</h3>
                    <p>
                      A vertical Instagram ad for one of Moonline&apos;s Travel available packages. A quick tour through
                      Istanbul, Izmir, Pamukkale, Cappadocia, and Antalya leads into a clear $599 trip offer and booking
                      call to action.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>
          <section className="section" id="about">
            <div className="wrap about-grid">
              <div>
                <p className="eyebrow">02 / About</p>
                <p className="about-lede">
                  I use Blender, After Effects, and Premiere Pro to bring depth, movement, and polish to visual
                  projects.
                </p>
              </div>
              <div>
                <p className="about-copy">
                  Across these pieces, I applied 3D modeling, materials, lighting, compositing, motion graphics, and
                  video editing to shape brand visuals and short-form video.
                </p>
                <div className="skills">
                  <div className="skill">
                    3D modeling<small>Blender / hard-surface / materials</small>
                  </div>
                  <div className="skill">
                    Motion design<small>After Effects / compositing</small>
                  </div>
                  <div className="skill">
                    Video editing<small>Premiere Pro / pacing / sound</small>
                  </div>
                  <div className="skill">
                    Visual development<small>Concepts / look development</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="wrap">
          <span>© 2026</span>
          <span>3D · Motion · Edit</span>
        </footer>
      </div>
    </>
  )
}
