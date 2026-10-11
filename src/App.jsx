import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  TreeStructure,
  Code,
  MagnifyingGlass,
  CaretRight,
  LockSimple,
  ArrowClockwise,
  Star,
  ShoppingCart,
  DotsThreeVertical,
  FileJs,
  FileCss,
  FileImage,
  File,
  DownloadSimple,
  GearSix,
  ShieldCheck,
  Database,
  Info,
  EnvelopeSimple,
  TelegramLogo,
  Circle,
  List,
  X,
} from "@phosphor-icons/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import chromeLogo from "@browser-logos/chrome/chrome.svg";
import firefoxLogo from "@browser-logos/firefox/firefox.svg";
import operaLogo from "@browser-logos/opera/opera.svg";
import edgeLogo from "@browser-logos/edge/edge.svg";
import safariLogo from "@browser-logos/safari/safari.svg";

const browsers = [
  {
    id: "firefox",
    name: "Firefox",
    logo: firefoxLogo,
    store: "Firefox Add-ons",
    marketplace: "https://addons.mozilla.org/en-US/firefox/",
  },
  {
    id: "chrome",
    name: "Chrome",
    logo: chromeLogo,
    store: "Chrome Web Store",
    marketplace: "https://chromewebstore.google.com/",
  },
  {
    id: "opera",
    name: "Opera",
    logo: operaLogo,
    store: "Opera Add-ons",
    marketplace: "https://addons.opera.com/en/extensions/",
  },
  {
    id: "edge",
    name: "Edge",
    logo: edgeLogo,
    store: "Edge Add-ons",
    marketplace:
      "https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions",
  },
  {
    id: "safari",
    name: "Safari",
    logo: safariLogo,
    store: "App Store",
    marketplace: "https://apps.apple.com/us/mac/story/id1377753262",
  },
];
function detectBrowser() {
  const ua = navigator.userAgent;
  if (/OPR\/|Opera/.test(ua)) return "opera";
  if (/Edg\//.test(ua)) return "edge";
  if (/Firefox\//.test(ua)) return "firefox";
  if (/Chrome\//.test(ua)) return "chrome";
  if (/Safari\//.test(ua)) return "safari";
  return "";
}
const assets = [
  ["app.js", "JS", "418 KB", FileJs],
  ["chunk-vendors.js", "JS", "244 KB", FileJs],
  ["atelier.css", "CSS", "32 KB", FileCss],
  ["tailwind.css", "CSS", "98 KB", FileCss],
  ["logo.svg", "Images", "12 KB", FileImage],
  ["hero.webp", "Images", "86 KB", FileImage],
  ["inter-var.woff2", "Fonts", "106 KB", File],
  ["favicon.ico", "Other", "4 KB", FileImage],
];
function Brand({ small = false }) {
  return (
    <span className={`brand ${small ? "brand-small" : ""}`}>
      <span className="brand-mark-wrap">
        <img className="brand-mark" src="/assets/techtree-mark.png" alt="" />
      </span>
      <span>TechTree</span>
    </span>
  );
}
function Tabs({ values, current, onChange, label }) {
  return (
    <div className="demo-tabs" role="tablist" aria-label={label}>
      {values.map((v) => (
        <button
          key={v}
          role="tab"
          aria-selected={current === v}
          onClick={() => onChange(v)}
          className={current === v ? "selected" : ""}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
function Technologies() {
  return (
    <div className="technologies">
      {[
        [faReact, "React", "JavaScript library", "v18.2.0"],
        [null, "Next.js", "React framework", "v14.2.3"],
        [faCss3Alt, "Tailwind CSS", "CSS framework", "v3.4.1"],
        [null, "Browser APIs", "Page signals detected", ""],
      ].map(([icon, name, desc, version]) => (
        <div className="tech-row" key={name}>
          {icon ? (
            <FontAwesomeIcon icon={icon} className="tech-brand" />
          ) : (
            <Code weight="bold" />
          )}
          <span>
            <b>{name}</b>
            <small>{desc}</small>
          </span>
          {version ? <em>{version}</em> : <CaretRight />}
        </div>
      ))}
    </div>
  );
}
function DomTree({ search = "" }) {
  const nodes = [
    [0, "<!DOCTYPE html>"],
    [0, '<html lang="en">'],
    [1, "<head> ... </head>"],
    [1, "<body>"],
    [2, '<header class="site-header"> ...'],
    [2, "<main>"],
    [3, '<section class="hero"> ...'],
    [3, '<section class="products"> ...'],
    [3, '<section class="about"> ...'],
    [2, "</main>"],
    [2, '<footer class="site-footer"> ...'],
    [1, "</body>"],
    [0, "</html>"],
  ].filter(([, s]) => s.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="dom-tree" aria-live="polite">
      {nodes.length ? (
        nodes.map(([depth, tag], i) => (
          <div key={i} style={{ paddingLeft: depth * 14 }}>
            <CaretRight size={10} />
            <code>{tag}</code>
          </div>
        ))
      ) : (
        <p className="empty-state">No matching elements.</p>
      )}
    </div>
  );
}
function AssetList() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="asset-list">
      <div className="asset-heading">
        <b>Assets ({assets.length})</b>
        <CaretRight />
      </div>
      <div className="asset-filters" aria-label="Filter demo assets">
        {["All", "JS", "CSS", "Images", "Fonts", "Other"].map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            aria-pressed={filter === v}
            className={filter === v ? "active" : ""}
          >
            {v}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {assets
          .filter(([, type]) => filter === "All" || type === filter)
          .map(([name, type, size, Icon]) => (
            <div className="asset-row" key={name}>
              <Icon weight="duotone" className={`file-${type.toLowerCase()}`} />
              <span>{name}</span>
              <small>{size}</small>
              <small>{type === "Images" ? "Image" : type}</small>
            </div>
          ))}
      </div>
    </div>
  );
}
function HeroBrowser() {
  const [tab, setTab] = useState("Technologies");
  return (
    <div
      className="hero-browser"
      aria-label="Interactive TechTree demonstration"
    >
      <div className="window-bar" aria-hidden="true">
        <Circle weight="fill" className="red" />
        <Circle weight="fill" className="yellow" />
        <Circle weight="fill" className="green" />
      </div>
      <div className="address-bar">
        <ArrowLeft />
        <ArrowRight />
        <ArrowClockwise />
        <span>
          <LockSimple /> atelier.example
        </span>
        <Star />
      </div>
      <div className="atelier-page">
        <div className="atelier-nav">
          <span>Atelier</span>
          <small>Shop　Journal　About</small>
          <ShoppingCart />
        </div>
        <div className="atelier-photo">
          <img
            src="/assets/atelier-room.png"
            alt="A wood chair and ceramic vase on a pale table in a softly lit room"
          />
          <p>
            Design objects
            <br />
            for a calmer web.
          </p>
        </div>
      </div>
      <div className="hero-inspector">
        <div className="inspector-title">
          <Brand small />
          <span className="demo-badge">Demo</span>
          <DotsThreeVertical />
        </div>
        <Tabs
          values={["Technologies", "DOM", "Assets"]}
          current={tab}
          onChange={setTab}
          label="Hero inspector"
        />
        <div className="hero-tab-panel" role="tabpanel" aria-label={tab}>
          {tab === "Technologies" ? (
            <Technologies />
          ) : tab === "DOM" ? (
            <DomTree />
          ) : (
            <AssetList />
          )}
        </div>
        <div className="inspector-summary">
          <TreeStructure />
          <span>
            <b>
              {tab === "Technologies"
                ? "4 technologies detected"
                : tab === "DOM"
                  ? "Explore page structure"
                  : "8 assets classified"}
            </b>
            <small>on atelier.example · sample data</small>
          </span>
          <CaretRight />
        </div>
      </div>
    </div>
  );
}
function DemoTitle({ children, label = "Demo" }) {
  return (
    <div className="demo-title">
      <TreeStructure /> TechTree — {children}
      <span>{label}</span>
    </div>
  );
}
function DiscoveryDemo() {
  const [tab, setTab] = useState("DOM");
  const [search, setSearch] = useState("");
  return (
    <div className="demo-window discovery-demo">
      <DemoTitle>atelier.example</DemoTitle>
      <Tabs
        values={["Stack", "DOM", "Assets"]}
        current={tab}
        onChange={setTab}
        label="Page inspector"
      />
      <div
        role="tabpanel"
        aria-label={`Inspector ${tab}`}
        className={`discovery-content ${tab === "Assets" ? "single-panel" : ""}`}
      >
        {tab === "DOM" && (
          <div className="dom-panel">
            <label className="dom-search">
              <MagnifyingGlass />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search DOM…"
                aria-label="Search demo DOM"
              />
            </label>
            <DomTree search={search} />
          </div>
        )}
        {tab === "Stack" && <Technologies />}
        <AssetList />
      </div>
    </div>
  );
}
const history = [
  { visit: "Oct 4", time: 3.8 },
  { visit: "Oct 7", time: 4.1 },
  { visit: "Oct 9", time: 4.7 },
  { visit: "Oct 10", time: 5.9 },
  { visit: "Oct 11", time: 4.2 },
];
function MetricsDemo() {
  return (
    <div className="demo-window metrics-demo">
      <DemoTitle label="Illustrative">Page performance</DemoTitle>
      <div className="metrics-content">
        <div className="metric-table">
          {[
            ["LCP", "1.8 s", 25],
            ["INP", "120 ms", 43],
            ["CLS", "0.02", 18],
            ["TTFB", "420 ms", 57],
          ].map(([label, value, score]) => (
            <div className="metric-row" key={label}>
              <b>{label}</b>
              <strong>{value}</strong>
              <progress
                className={label === "TTFB" ? "amber" : ""}
                max="100"
                value={score}
                aria-label={`${label}: ${value}`}
              />
            </div>
          ))}
        </div>
        <div className="history-chart">
          <b>Load-time history</b>
          <small> Sample visits</small>
          <ResponsiveContainer width="100%" height={124}>
            <LineChart
              data={history}
              margin={{ top: 15, right: 10, left: -23, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#edf0f6" />
              <XAxis
                dataKey="visit"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#71809b" }}
              />
              <YAxis
                unit=" s"
                domain={[0, 8]}
                ticks={[0, 4, 8]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#71809b" }}
              />
              <Tooltip formatter={(value) => [`${value} s`, "Load time"]} />
              <Line
                type="linear"
                dataKey="time"
                stroke="#0862fc"
                strokeWidth={2}
                dot={{
                  r: 3.5,
                  fill: "#0862fc",
                  stroke: "#fff",
                  strokeWidth: 1,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
function KeepDemo() {
  const [metadata, setMetadata] = useState(true),
    [files, setFiles] = useState(true),
    [cache, setCache] = useState(false),
    [saved, setSaved] = useState(false);
  return (
    <div className="demo-window keep-demo">
      <DemoTitle>Save page</DemoTitle>
      <div className="keep-content">
        <div className="save-options">
          <label>
            <input
              type="checkbox"
              checked={metadata}
              onChange={(e) => setMetadata(e.target.checked)}
            />
            <span>
              Page metadata <small>(title, URL, technologies)</small>
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={files}
              onChange={(e) => setFiles(e.target.checked)}
            />
            <span>
              Downloaded assets <small>(CSS, JS, images, fonts)</small>
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={cache}
              onChange={(e) => setCache(e.target.checked)}
            />
            <span>
              Choose cache items <small>(demo selection)</small>
            </span>
          </label>
          <p className="demo-note">
            A sample export; your browser data stays unchanged.
          </p>
        </div>
        <div className="export-copy">
          <b>Export for offline viewing</b>
          <p>
            Keep a readable HTML copy with its assets. Dynamic features may
            still need a connection.
          </p>
          <a
            className="outline-button"
            download="techtree-sample.html"
            href={`/downloads/sample-${metadata ? 1 : 0}${files ? 1 : 0}.html`}
            onClick={() => setSaved(true)}
          >
            <DownloadSimple />
            {saved ? "Export sample again" : "Export sample HTML"}
          </a>
          <span className="export-status" role="status">
            {saved ? "Sample export requested." : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
function PrivacyDemo() {
  const [lookup, setLookup] = useState(true);
  return (
    <div className="demo-window privacy-demo">
      <DemoTitle>Settings</DemoTitle>
      <div className="privacy-content">
        <div className="settings-menu">
          <span>
            <GearSix /> General
          </span>
          <span className="active">
            <ShieldCheck /> Privacy
          </span>
          <span>
            <Database /> Data
          </span>
          <span>
            <Info /> About
          </span>
        </div>
        <div className="privacy-setting">
          <div>
            <b>Online technology lookup</b>
            <button
              className={`switch ${lookup ? "on" : ""}`}
              role="switch"
              aria-label="Demo online technology lookup"
              aria-checked={lookup}
              onClick={() => setLookup(!lookup)}
            >
              <Circle weight="fill" />
            </button>
          </div>
          <p>Use an optional online service to improve technology detection.</p>
          <small aria-live="polite">
            {lookup
              ? "Online lookup is on in this demo."
              : "Online lookup is off. Use browser signals only."}
          </small>
          <small>You can turn this off at any time in Settings.</small>
        </div>
      </div>
    </div>
  );
}
function ContactPage({ config }) {
  return (
    <>
      <header className="site-header container">
        <a className="brand-link" href="/" aria-label="TechTree home">
          <Brand />
        </a>
        <a className="text-button" href="/">
          <ArrowLeft /> Back to TechTree
        </a>
      </header>
      <main className="contact-page container">
        <p className="eyebrow">CONTACT</p>
        <h1>
          Let’s talk
          <br />
          about TechTree.
        </h1>
        <p>
          Questions, ideas, or a website worth exploring?
          <br />
          Reach the creator by email or Telegram.
        </p>
        <div className="contact-channels">
          {config.email ? (
            <a className="primary-button" href={`mailto:${config.email}`}>
              <EnvelopeSimple /> Send an email <ArrowUpRight />
            </a>
          ) : (
            <span className="channel-pending">
              <EnvelopeSimple /> Email — coming soon
            </span>
          )}
          {config.telegram ? (
            <a
              className="outline-button"
              href={config.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramLogo /> Open Telegram <ArrowUpRight />
            </a>
          ) : (
            <span className="channel-pending">
              <TelegramLogo /> Telegram — coming soon
            </span>
          )}
        </div>
        <a className="text-button" href="/#how-it-works">
          Explore the features <ArrowRight />
        </a>
      </main>
    </>
  );
}
export function App() {
  const [config, setConfig] = useState({
      contactPath: "/contact/",
      email: "",
      telegram: "",
      storeUrls: {},
    }),
    [activeStep, setActiveStep] = useState(0),
    [mobileMenu, setMobileMenu] = useState(false),
    [currentBrowser] = useState(detectBrowser),
    [railPositions, setRailPositions] = useState([]);
  useEffect(() => {
    fetch("/site-config.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setConfig)
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (window.location.pathname.startsWith("/contact")) return;
    const rail = document.querySelector(".step-rail");
    const story = document.querySelector(".story");
    const update = () => {
      const y = rail.getBoundingClientRect().top;
      setRailPositions(
        [...story.querySelectorAll("h2")].map((h) => {
          const r = h.getBoundingClientRect();
          return r.top + r.height / 2 - y - 23;
        }),
      );
    };
    const resize = new ResizeObserver(update);
    resize.observe(story);
    document.fonts.ready.then(update);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveStep(Number(entry.target.dataset.step));
        }),
      { rootMargin: "-18% 0px -48% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-step]")
      .forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      resize.disconnect();
    };
  }, []);
  if (window.location.pathname.startsWith("/contact"))
    return <ContactPage config={config} />;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <a className="brand-link" href="#top" aria-label="TechTree home">
          <Brand />
        </a>
        <nav
          className={mobileMenu ? "main-nav menu-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>
            How it works
          </a>
          <a href="#privacy" onClick={() => setMobileMenu(false)}>
            Privacy
          </a>
          <a href={config.contactPath}>Contact</a>
        </nav>
        <a className="primary-button header-cta" href="#download">
          Get TechTree <ArrowRight />
        </a>
        <button
          className="menu-toggle"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <List />}
        </button>
      </header>
      <main id="main">
        <section className="hero container" id="top">
          <div className="hero-copy">
            <h1>
              The web,
              <br />
              with the
              <br />
              <span>layers revealed.</span>
            </h1>
            <p>One extension to detect, inspect and keep the useful bits.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#download">
                Choose your browser <ArrowRight />
              </a>
              <a className="text-button" href="#how-it-works">
                Explore features <ArrowDown />
              </a>
            </div>
          </div>
          <HeroBrowser />
        </section>
        <div className="browser-strip container">
          <span>Made for your favorite browser</span>
          <div>
            {browsers.map((b) => (
              <a
                key={b.id}
                href={`#browser-${b.id}`}
                aria-label={`Find TechTree for ${b.name}`}
              >
                <img src={b.logo} alt="" />
                <b>{b.name}</b>
              </a>
            ))}
          </div>
        </div>
        <section
          id="how-it-works"
          className="story container"
          aria-label="How TechTree works"
        >
          <nav className="step-rail" aria-label="Feature chapters">
            {["discover", "metrics", "keep"].map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                style={{ top: railPositions[i] ?? 0 }}
                className={activeStep === i ? "active" : ""}
                aria-current={activeStep === i ? "step" : undefined}
              >
                <Circle weight="fill" />
                <span>0{i + 1}</span>
                <span className="sr-only">
                  {["Discover", "Performance", "Keep"][i]}
                </span>
              </a>
            ))}
          </nav>
          <article
            className="story-row discovery-row"
            id="discover"
            data-step="0"
          >
            <div className="story-copy">
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>Discover the ingredients.</h2>
              <p>
                Detect the technologies behind the current URL; visualize the
                DOM; classify downloaded page assets.
              </p>
            </div>
            <DiscoveryDemo />
          </article>
          <article className="story-row metrics-row" id="metrics" data-step="1">
            <div className="story-copy">
              <h2>Follow the slowdowns.</h2>
              <p>
                See web metrics and scoring. Saved load-time history helps spot
                patterns in network, server or CDN issues.
              </p>
            </div>
            <MetricsDemo />
          </article>
          <article className="story-row keep-row" id="keep" data-step="2">
            <div className="story-copy">
              <h2>Make the page yours to revisit.</h2>
              <p>
                Save browsing metadata, keep downloaded assets, selectively
                remove cached items, and export HTML for offline viewing.
              </p>
            </div>
            <KeepDemo />
          </article>
        </section>
        <section className="privacy-section" id="privacy">
          <div className="privacy-grid container">
            <div>
              <p className="eyebrow">PRIVACY</p>
              <h2>You decide what goes online.</h2>
              <p>
                Optional online lookup improves technology detection.
                <br />
                Switch it off in Settings.
              </p>
            </div>
            <PrivacyDemo />
          </div>
        </section>
        <section className="download-section container" id="download">
          <div className="download-copy">
            <p className="eyebrow">GET TECHTREE</p>
            <h2>Five browsers. One clearer web.</h2>
            <p>Choose the edition for your browser.</p>
          </div>
          <div className="download-browsers">
            {browsers.map((b) => (
              <div
                key={b.id}
                id={`browser-${b.id}`}
                className={`download-browser ${currentBrowser === b.id ? "current-browser" : ""}`}
              >
                <img src={b.logo} alt={`${b.name} logo`} />
                <b>{b.name}</b>
                <a
                  className="store-link"
                  href={config.storeUrls?.[b.id] || b.marketplace}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={
                    config.storeUrls?.[b.id]
                      ? `Download TechTree from ${b.store}`
                      : `Browse ${b.store} — TechTree listing coming soon`
                  }
                >
                  {b.store}
                  <ArrowUpRight />
                </a>
              </div>
            ))}
            <p className="store-status">
              {Object.values(config.storeUrls || {}).filter(Boolean).length ===
              5
                ? "Download from your browser’s official store."
                : "TechTree listings coming soon. Links currently open the official stores."}
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="brand-link" href="#top">
          <Brand />
        </a>
        <span className="footer-tagline">
          A browser extension for a more transparent web.
        </span>
        <a className="contact-link" href={config.contactPath}>
          Contact the creator <ArrowUpRight />
        </a>
        <a className="footer-contact" href={config.contactPath}>
          <b>Email & Telegram</b>
          <small>Get in touch via the contact page.</small>
        </a>
      </footer>
    </>
  );
}
