"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight, CalendarCheck2, CircleHelp, ClipboardCheck, FileCheck2,
  GraduationCap, Menu, MessageCircle, MessagesSquare, TrendingUp,
  UsersRound, X,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { guidance, steps, sampleMentors, testimonials, faqs } from "./landingData";
import "./landing.css";

const mentorHref = "/explore-mentor";
const joinHref = "/auth?mode=register&role=MENTOR";
const guidanceIcons = [ClipboardCheck, FileCheck2, MessagesSquare, GraduationCap, TrendingUp];
const stepIcons = [CircleHelp, UsersRound, CalendarCheck2, MessageCircle];

function Brand({ light = false }) {
  return <Link href="/" className={`lp-brand ${light ? "lp-brand-light" : ""}`} aria-label="PeerSupport home">
    <span className="lp-brand-mark" aria-hidden="true"><MessageCircle size={17} strokeWidth={1.7} /><span /></span>
    <span>PeerSupport</span>
  </Link>;
}

function ButtonLink({ href, children, outline = false }) {
  return <Link href={href} className={`lp-button ${outline ? "lp-button-outline" : "lp-button-solid"}`}>{children}<ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></Link>;
}

function Eyebrow({ children }) {
  return <div className="lp-eyebrow"><span aria-hidden="true" />{children}</div>;
}

function SectionIntro({ eyebrow, title, description, id }) {
  return <div className="lp-section-intro"><div><Eyebrow>{eyebrow}</Eyebrow><h2 id={id}>{title}</h2></div><p>{description}</p></div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();
  useEffect(() => {
    if (!hasCheckedSession) fetchCurrentUser();
  }, [hasCheckedSession, fetchCurrentUser]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const accountHref = user
    ? user.role === "MENTOR" ? "/mentor/dashboard" : user.role === "ADMIN" ? "/admin/dashboard" : "/mentee/dashboard"
    : "/auth?mode=login";
  return <header className={`lp-header ${scrolled ? "lp-header-scrolled" : ""}`}>
    <div className="lp-header-inner">
      <Brand />
      <nav className="lp-nav" aria-label="Primary navigation">
        <a href="#mentorship-needs">Find a Mentor</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#become-a-mentor">For Mentors</a>
      </nav>
      <div className="lp-header-actions"><Link href={accountHref} className="lp-login">{user ? "Dashboard" : "Log In"}</Link><ButtonLink href={joinHref} outline>Become a Mentor</ButtonLink></div>
      <button className="lp-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    {menuOpen && <nav className="lp-mobile-nav" aria-label="Mobile navigation" onClick={() => setMenuOpen(false)}>
      <a href="#mentorship-needs">Find a Mentor</a><a href="#how-it-works">How It Works</a><a href="#become-a-mentor">For Mentors</a>
      <Link href={accountHref}>{user ? "Dashboard" : "Log In"}</Link><Link href={joinHref}>Become a Mentor <ArrowUpRight size={16} /></Link>
    </nav>}
  </header>;
}

function Hero() {
  return <section className="lp-hero" aria-labelledby="lp-hero-heading">
    <div className="lp-hero-copy">
      <Eyebrow>PEERSUPPORT · MBA MENTORSHIP</Eyebrow>
      <h1 id="lp-hero-heading">MBA mentorship for the decisions that <span>shape your future.</span></h1>
      <p>Get honest, one-to-one guidance from people who’ve navigated the MBA journey. Shortlist B-schools, improve your resume, prepare for interviews, and make your next move with greater clarity.</p>
      <div className="lp-actions"><ButtonLink href={mentorHref}>Find a Mentor</ButtonLink><ButtonLink href={joinHref} outline>Become a Mentor</ButtonLink></div>
      <div className="lp-services"><span>B-School Selection</span><i /><span>Resume Reviews</span><i /><span>Interview Preparation</span></div>
    </div>
    <div className="lp-hero-visual">
      <div className="lp-visual-index"><span>01</span><span>INFORMED DECISIONS</span></div>
      <div className="lp-image-frame"><img src="https://images.unsplash.com/photo-1603418242909-2eaeeea04c40?auto=format&fit=crop&w=1400&q=88" alt="Two young professionals having a thoughtful conversation" fetchPriority="high" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /></div>
      <div className="lp-image-note"><span><MessageCircle size={19} strokeWidth={1.6} /></span><p>Your MBA journey,<strong>with clearer direction.</strong></p></div>
      <div className="lp-sand-detail" aria-hidden="true" />
    </div>
  </section>;
}

function Guidance() {
  return <section className="lp-guidance" id="mentorship-needs" aria-labelledby="lp-guidance-heading"><div className="lp-container">
    <SectionIntro eyebrow="YOUR MBA JOURNEY, YOUR QUESTIONS" title="What would you like help with on your MBA journey?" description="From choosing the right B-school to preparing your application, find mentorship that meets you where you are. Start with the question you need answered." id="lp-guidance-heading" />
    <div className="lp-guidance-grid">{guidance.map(([eyebrow, title, description, action], index) => {
      const Icon = guidanceIcons[index];
      return <Link href={mentorHref} className="lp-guidance-card" key={title}>
        <span className="lp-card-index">{String(index + 1).padStart(2, "0")}</span><Icon className="lp-guidance-icon" size={60} strokeWidth={1.1} aria-hidden="true" />
        <span className="lp-card-kicker">{eyebrow}</span><h3>{title}</h3><p>{description}</p>
        <span className="lp-text-link">{action}<ArrowUpRight size={16} aria-hidden="true" /></span>
      </Link>;
    })}</div>
    <div className="lp-section-close"><p>The right guidance starts with the right conversation.</p><Link href={mentorHref}>Explore all mentors <ArrowUpRight size={17} /></Link></div>
  </div></section>;
}

function Process() {
  return <section className="lp-process" id="how-it-works" aria-labelledby="lp-process-heading"><div className="lp-container">
    <SectionIntro eyebrow="HOW IT WORKS" title="A clearer path to your next MBA decision." description="From your first question to a more informed next step, PeerSupport helps you find relevant experience, book a one-to-one conversation, and explore your MBA decisions with greater clarity." id="lp-process-heading" />
    <div className="lp-process-grid">{steps.map(([title, description, note], index) => {
      const Icon = stepIcons[index];
      return <div className="lp-process-step" key={title}><span className="lp-step-number">{String(index + 1).padStart(2, "0")}</span><Icon className="lp-step-icon" size={58} strokeWidth={1.15} aria-hidden="true" /><h3>{title}</h3><p>{description}</p><span className="lp-step-note">{note}</span></div>;
    })}</div>
    <div className="lp-process-close"><ButtonLink href={mentorHref}>Find a Mentor</ButtonLink><span>Know the details before you book. Choose the guidance that fits your needs.</span></div>
    <div className="lp-mentor-callout" id="become-a-mentor">
      <div><span className="lp-card-kicker">FOR FUTURE MENTORS</span><h3>Have experience<br />worth sharing?</h3></div>
      <div><p>Help MBA aspirants navigate important decisions by sharing your relevant experience. Apply to PeerSupport, complete the review and observation process, and offer mentorship sessions after approval.</p><small>Applications are reviewed by the PeerSupport team before mentors can begin offering paid sessions. Once approved, mentors set their own session prices subject to platform policies.</small></div>
      <ButtonLink href={joinHref} outline>Become a Mentor</ButtonLink>
    </div>
  </div></section>;
}

function Mentors() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById("featured-mentors");
    if (!target || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <section className={`lp-mentors ${visible ? "lp-visible" : ""}`} id="featured-mentors" aria-labelledby="lp-mentors-heading"><div className="lp-container">
    <SectionIntro eyebrow="THE PEOPLE BEHIND THE PERSPECTIVE" title="Meet the mentors behind better-informed decisions." description="Connect with experienced MBA mentors who can guide your B-school choices, strengthen your profile, and prepare you for what comes next." id="lp-mentors-heading" />
    <div className="lp-mentor-grid">{sampleMentors.map((mentor) => <article className="lp-mentor-card" key={mentor.name}>
      <div className="lp-mentor-image"><img src={mentor.image} alt={`Illustrative portrait for ${mentor.name}`} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /></div>
      <div className="lp-mentor-content"><h3>{mentor.name}</h3><p className="lp-mentor-meta">{mentor.role} · {mentor.school} · {mentor.year}</p>
        <div className="lp-tags">{mentor.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p className="lp-mentor-description">{mentor.description}</p>
        <div className="lp-mentor-bottom"><div><strong>{mentor.price}</strong><span>{mentor.duration}</span></div><Link href={mentorHref}>View Profile <ArrowUpRight size={16} /></Link></div>
      </div>
    </article>)}</div>
    <div className="lp-section-close"><p>Find someone with the experience and perspective you need.</p><ButtonLink href={mentorHref}>Explore All Mentors</ButtonLink></div>
  </div></section>;
}

function SchoolNetwork() {
  return <section className="lp-network" id="school-network" aria-labelledby="lp-network-heading"><div className="lp-container">
    <SectionIntro eyebrow="DIVERSE B-SCHOOL JOURNEYS" title="Experience shaped by different B-school journeys." description="Our mentors bring first-hand perspectives on campus life, career paths, and the decisions that shape an MBA journey." id="lp-network-heading" />
    <div className="lp-school-grid"><div><strong>ISB</strong><span>INDIAN SCHOOL OF BUSINESS</span></div><div><strong>IIM BANGALORE</strong><span>IIM BANGALORE</span></div><div><strong>INSEAD</strong><span>INSEAD</span></div></div>
  </div></section>;
}

function Audience() {
  return <section className="lp-audience" id="audience-pathways" aria-labelledby="lp-audience-heading"><div className="lp-container">
    <SectionIntro eyebrow="BUILT FOR BOTH SIDES" title="Every great mentorship starts with a conversation." description="Whether you’re looking for guidance or ready to share your experience, PeerSupport helps you take the next step." id="lp-audience-heading" />
    <div className="lp-audience-grid">
      <article><span className="lp-card-kicker">FOR ASPIRANTS</span><h3>Find clarity in your MBA journey.</h3><p>Connect with people who understand the decisions ahead—from choosing the right B-school to preparing for interviews and planning your career.</p><ul><li>Get guidance tailored to your goals.</li><li>Learn from real experiences and different perspectives.</li><li>Leave conversations with clearer next steps.</li></ul><ButtonLink href={mentorHref}>Find a Mentor</ButtonLink></article>
      <article><span className="lp-card-kicker">FOR MENTORS</span><h3>Turn your experience into someone else's advantage.</h3><p>Help aspiring MBA students navigate important decisions by sharing the knowledge and perspective you’ve gained along the way.</p><ul><li>Share your expertise on your own terms.</li><li>Set your availability and session pricing.</li><li>Help aspiring professionals make informed decisions.</li></ul><ButtonLink href={joinHref}>Become a Mentor</ButtonLink></article>
    </div>
  </div></section>;
}

function Testimonials() {
  return <section className="lp-testimonials" id="testimonials" aria-labelledby="lp-testimonials-heading">
    <div className="lp-container"><SectionIntro eyebrow="THE VALUE OF SHARED EXPERIENCE" title="Sometimes, the right conversation changes everything." description="Get a clearer perspective from people who have navigated the decisions you’re facing." id="lp-testimonials-heading" /></div>
    <div className="lp-testimonial-marquee" aria-label="Shared experience testimonials"><div className="lp-testimonial-track">
      {[...testimonials, ...testimonials].map(([quote, name, role, topic], index) => <article className="lp-testimonial-card" key={`${name}-${index}`} aria-hidden={index >= testimonials.length}>
        <span className="lp-quote-mark">“</span><blockquote>{quote}</blockquote><div><strong>{name}</strong><span>{role} <i /> {topic}</span></div>
      </article>)}
    </div></div>
  </section>;
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return <section className="lp-faq" id="faq" aria-labelledby="lp-faq-heading"><div className="lp-container lp-faq-grid">
    <div className="lp-faq-intro"><Eyebrow>GOOD TO KNOW</Eyebrow><h2 id="lp-faq-heading">Questions worth asking before your next big decision.</h2><p>Choosing your next step is easier when you know what to expect. Here are a few things to help you get started.</p><div className="lp-faq-art" aria-hidden="true"><span /><span /><i /></div><div className="lp-faq-cta"><h3>Ready to find your perspective?</h3><ButtonLink href={mentorHref}>Find a Mentor</ButtonLink></div></div>
    <div className="lp-faq-list">{faqs.map(([question, answer], index) => <div className={`lp-faq-item ${openIndex === index ? "lp-faq-open" : ""}`} key={question}>
      <h3><button type="button" aria-expanded={openIndex === index} aria-controls={`lp-faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}><span className="lp-faq-number">{String(index + 1).padStart(2, "0")}</span><span className="lp-faq-question">{question}</span><span className="lp-faq-toggle" aria-hidden="true">{openIndex === index ? "−" : "+"}</span></button></h3>
      <div className="lp-faq-answer" id={`lp-faq-answer-${index}`}><div><p>{answer}</p></div></div>
    </div>)}</div>
  </div></section>;
}

function FinalCta() {
  return <section className="lp-final" id="next-step" aria-labelledby="lp-final-heading"><div className="lp-container lp-final-grid">
    <div><Eyebrow>YOUR NEXT STEP STARTS HERE</Eyebrow><h2 id="lp-final-heading">You don't have to figure out your MBA journey alone.</h2><p>Get guidance from people who understand the decisions ahead. Find a mentor who fits your goals, ask the questions that matter, and move forward with greater clarity.</p><div className="lp-actions"><ButtonLink href={mentorHref}>Find a Mentor</ButtonLink><ButtonLink href={joinHref} outline>Become a Mentor</ButtonLink></div><small>Real perspectives. Meaningful conversations. Clearer next steps.</small></div>
    <div className="lp-final-art" aria-hidden="true"><div className="lp-bubble lp-bubble-a"><span /><span /></div><div className="lp-bubble lp-bubble-b"><span /><span /></div><div className="lp-art-orbit" /><div className="lp-art-dot" /><ArrowUpRight size={36} strokeWidth={1.1} /><div className="lp-art-chips"><span>B-School Decisions</span><span>Interview Preparation</span><span>Career Direction</span></div></div>
  </div></section>;
}

function Footer() {
  return <footer className="lp-footer"><div className="lp-container"><div className="lp-footer-main">
    <div><Brand light /><p>Helping MBA aspirants make informed decisions through meaningful conversations with experienced mentors.</p></div>
    <div className="lp-footer-links">
      <div><h2>EXPLORE</h2><Link href={mentorHref}>Find a Mentor</Link><a href="#how-it-works">How It Works</a><a href="#mentorship-needs">Areas of Guidance</a><a href="#faq">Frequently Asked Questions</a></div>
      <div><h2>FOR MENTORS</h2><Link href={joinHref}>Become a Mentor</Link><a href="#how-it-works">Mentorship Process</a></div>
      <div><h2>GET IN TOUCH</h2><a href="mailto:hello@peersupport.in">Contact Us</a></div>
    </div>
  </div><div className="lp-footer-bottom"><span>© {new Date().getFullYear()} PeerSupport. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-service">Terms of Service</Link></div></div></div></footer>;
}

export default function LandingPage() {
  return <main className="landing-page"><Header /><Hero /><Guidance /><Process /><Mentors /><SchoolNetwork /><Audience /><Testimonials /><Faq /><FinalCta /><Footer /></main>;
}
