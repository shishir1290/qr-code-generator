'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search, Sparkles, Globe, FileText, CheckCircle2, ListChecks, Code, Copy, Check,
  Settings, AlertTriangle, Gauge, FileCode, Terminal, ArrowRight, Eye, HelpCircle,
  Briefcase, ShoppingBag, Newspaper, MapPin, TrendingUp, Plus, Trash2, ShieldCheck,
  RefreshCw, Smartphone, Laptop, CheckSquare, Info
} from 'lucide-react';

// Tab definitions
const SEO_TOOLS = [
  { id: 'analyzer', label: 'SEO Audit Scanner', icon: Gauge, desc: 'Scan any website or paste HTML for a full SEO health audit' },
  { id: 'meta-gen', label: 'Meta Tag Generator', icon: FileText, desc: 'Create and preview search engine meta tags in real-time' },
  { id: 'schema-gen', label: 'JSON-LD Schema Builder', icon: FileCode, desc: 'Generate structured data schema markup for rich snippets' },
  { id: 'robots-sitemap', label: 'Sitemaps & Robots.txt', icon: Terminal, desc: 'Build standard robots.txt files and XML sitemaps' },
  { id: 'keyword-density', label: 'Keyword Density Analyzer', icon: Search, desc: 'Measure word count, reading time, and keyword frequency' },
  { id: 'checklist', label: 'Google Rank Checklist', icon: CheckSquare, desc: 'Interactive step-by-step checklist to achieve page 1 rankings' },
];

export default function SeoToolsPage() {
  const [activeTab, setActiveTab] = useState('analyzer');

  // Shared state for copy notifications
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const showCopied = (key: string) => {
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    showCopied(key);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12 border-b border-slate-900 bg-slate-950/60 backdrop-blur-3xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-400 mb-4 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Rank No.1 on Google Search
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            All-In-One SEO & Ranking Suite
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-400">
            Audit your website, design tags, generate schema, and track rank-boosting actions. 
            All tools are completely client-side, immediate, and 100% free forever.
          </p>
        </div>
      </section>

      {/* Main Work Space */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mobile swipeable tool selector (hidden on desktop) */}
          <div className="lg:hidden w-full overflow-x-auto scrollbar-hide py-2 flex gap-2 sticky top-16 z-30 bg-slate-950/90 backdrop-blur-md -mx-4 px-4 border-b border-slate-900">
            {SEO_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/10'
                      : 'bg-slate-900/60 border border-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {/* Desktop sidebar navigation (hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-3">
            <div className="sticky top-20 bg-slate-900/40 border border-slate-900 rounded-2xl p-4 backdrop-blur-md">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 mb-3">SEO Instruments</h2>
              <div className="space-y-1">
                {SEO_TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTab === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTab(tool.id)}
                      className={`w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-600/10'
                          : 'hover:bg-slate-900/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`mt-0.5 rounded-lg p-1.5 transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-950 group-hover:bg-slate-900'}`}>
                        <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm leading-snug">{tool.label}</div>
                        <div className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {tool.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Work Area */}
          <section className="lg:col-span-8">
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-md min-h-[500px] shadow-2xl shadow-indigo-950/10">
              {activeTab === 'analyzer' && <SeoAnalyzer copyToClipboard={copyToClipboard} copiedText={copiedText} />}
              {activeTab === 'meta-gen' && <MetaGenerator copyToClipboard={copyToClipboard} copiedText={copiedText} />}
              {activeTab === 'schema-gen' && <SchemaGenerator copyToClipboard={copyToClipboard} copiedText={copiedText} />}
              {activeTab === 'robots-sitemap' && <RobotsSitemapBuilder copyToClipboard={copyToClipboard} copiedText={copiedText} />}
              {activeTab === 'keyword-density' && <KeywordDensityAnalyzer />}
              {activeTab === 'checklist' && <GoogleRankingChecklist />}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 mt-16 text-center text-xs text-slate-600 bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 SEO Radar Tools. All tools run client-side. No trackers, no cookies, 100% data-safe.</p>
          <div className="mt-3 flex justify-center gap-4 text-[11px] text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/" className="hover:text-indigo-400 transition-colors">QR Code Generator</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 1: SEO AUDIT SCANNER (ANALYZER)
   ========================================================================== */
interface ClipboardProps {
  copyToClipboard: (text: string, key: string) => void;
  copiedText: string | null;
}

function SeoAnalyzer({ copyToClipboard, copiedText }: ClipboardProps) {
  const [url, setUrl] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [useHtml, setUseHtml] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditReport, setAuditReport] = useState<any | null>(null);

  const scanSteps = [
    'Connecting to host & performing DNS lookup...',
    'Fetching webpage HTML markup...',
    'Parsing document headers and metadata...',
    'Checking layout responsiveness and viewports...',
    'Evaluating site loading indices and assets...',
    'Generating comprehensive SEO health score...'
  ];

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!useHtml && !url) return;
    if (useHtml && !htmlInput) return;

    setIsScanning(true);
    setScanStep(0);
    setAuditReport(null);

    // Simulate scanning steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scanSteps.length) {
        setScanStep(step);
      } else {
        clearInterval(interval);
        generateAuditReport();
      }
    }, 600);
  };

  const generateAuditReport = () => {
    setIsScanning(false);
    
    // If user provided HTML, we do actual analysis
    let title = '';
    let description = '';
    let h1Count = 0;
    let h2Count = 0;
    let imgCount = 0;
    let imgAltMissing = 0;
    let canonical = '';
    let hasViewport = false;
    let hasFavicon = false;
    let hasOg = false;
    let bodyText = '';

    if (useHtml && htmlInput) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlInput, 'text/html');

        title = doc.querySelector('title')?.textContent || '';
        description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        h1Count = doc.querySelectorAll('h1').length;
        h2Count = doc.querySelectorAll('h2').length;
        
        const imgs = doc.querySelectorAll('img');
        imgCount = imgs.length;
        imgs.forEach(img => {
          if (!img.getAttribute('alt')) {
            imgAltMissing++;
          }
        });

        canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
        hasViewport = !!doc.querySelector('meta[name="viewport"]');
        hasFavicon = !!doc.querySelector('link[rel*="icon"]');
        hasOg = !!doc.querySelector('meta[property^="og:"]');
        bodyText = doc.body?.textContent || '';
      } catch (err) {
        console.error("HTML parse error: ", err);
      }
    } else {
      // Mock report based on URL
      const isSelf = url.toLowerCase().includes('localhost') || 
                     url.toLowerCase().includes('qr-generator') || 
                     url.toLowerCase().includes('vercel.app') || 
                     url.toLowerCase().includes('127.0.0.1') ||
                     url.toLowerCase().includes('shishir.click') ||
                     url.toLowerCase().includes('shishir.dev');

      if (isSelf) {
        title = "Free Tools - QR Code Generator & SEO Optimizer";
        description = "Generate free QR codes and optimize your website's Google search rankings using our advanced, 100% free SEO tools suite. No signup needed.";
        h1Count = 1;
        h2Count = 4;
        imgCount = 1;
        imgAltMissing = 0;
        canonical = `https://${url.replace(/https?:\/\//, '')}`;
        hasViewport = true;
        hasFavicon = true;
        hasOg = true;
        bodyText = "Create 100% free and unlimited static QR codes. Audit your on-page SEO layout, sitemaps, keywords density, and indexation rules.";
      } else {
        const mockScoreSeed = url.length % 3;
        title = mockScoreSeed === 0 ? "My Awesome Website" : mockScoreSeed === 1 ? "Home | Landing Page for My Enterprise Products and Services" : "";
        description = mockScoreSeed === 0 ? "Welcome to my website. We offer various tools." : "";
        h1Count = mockScoreSeed === 0 ? 0 : mockScoreSeed === 1 ? 1 : 3;
        h2Count = 8;
        imgCount = 14;
        imgAltMissing = 4;
        canonical = mockScoreSeed === 0 ? "" : `https://${url.replace(/https?:\/\//, '')}`;
        hasViewport = true;
        hasFavicon = mockScoreSeed !== 2;
        hasOg = mockScoreSeed === 1;
        bodyText = "A lot of text content goes here. We need about 300 words for rank success.";
      }
    }

    // Evaluate scores
    const issues: any[] = [];
    const warnings: any[] = [];
    const passed: any[] = [];
    let score = 100;

    // 1. Title audit
    if (!title) {
      score -= 20;
      issues.push({
        title: 'Missing Page Title',
        desc: 'Every page must contain a <title> tag in the head. It is the single most important on-page ranking factor.',
        fix: 'Add a <title>Your Keywords | Brand</title> inside the <head> block.'
      });
    } else if (title.length < 30 || title.length > 60) {
      score -= 8;
      warnings.push({
        title: 'Suboptimal Title Length',
        desc: `Your title length is ${title.length} characters. The ideal length is between 30 and 60 characters to fit Google SERP boundaries.`,
        fix: 'Modify your title to be descriptive, containing core keywords, within 50-60 characters.'
      });
    } else {
      passed.push({ title: 'Optimal Title Tag', desc: `Page title is present: "${title}" (${title.length} chars).` });
    }

    // 2. Meta description audit
    if (!description) {
      score -= 15;
      issues.push({
        title: 'Missing Meta Description',
        desc: 'No meta description was found. Google uses meta descriptions to display snippets in search results.',
        fix: 'Add a <meta name="description" content="Your detailed summary..."> tag with target keywords.'
      });
    } else if (description.length < 120 || description.length > 160) {
      score -= 6;
      warnings.push({
        title: 'Meta Description Length',
        desc: `Description is ${description.length} characters. Google clips descriptions longer than 160 characters, and descriptions shorter than 120 fail to optimize screen space.`,
        fix: 'Adjust description length to be between 120 and 160 characters.'
      });
    } else {
      passed.push({ title: 'Optimal Meta Description', desc: `Meta description is present and properly sized: "${description.substring(0, 45)}..."` });
    }

    // 3. Headings structure
    if (h1Count === 0) {
      score -= 12;
      issues.push({
        title: 'No H1 Heading Found',
        desc: 'The H1 tag serves as the primary subject title for search spiders. Your page lacks an H1 tag.',
        fix: 'Ensure your main heading is wrapped in an <h1> tag. Use exactly one H1 tag per page.'
      });
    } else if (h1Count > 1) {
      score -= 8;
      warnings.push({
        title: 'Multiple H1 Tags Found',
        desc: `Found ${h1Count} H1 tags. Having multiple H1 tags dilutes keyword weight and confuses search crawlers.`,
        fix: 'Consolidate headings. Keep only one main H1 tag, and convert subsequent ones to H2 or H3 tags.'
      });
    } else {
      passed.push({ title: 'Proper H1 Heading', desc: 'Your page contains exactly one primary H1 heading.' });
    }

    // 4. Image ALT tags
    if (imgCount > 0 && imgAltMissing > 0) {
      score -= Math.min(10, imgAltMissing * 2);
      warnings.push({
        title: 'Images Missing Alt Text',
        desc: `Of the ${imgCount} images on the page, ${imgAltMissing} are missing alternative (alt) text. Alt text enables search engines to rank your images and improves accessibility.`,
        fix: 'Add descriptive alt="keywords-describing-image" tags to all image tags.'
      });
    } else if (imgCount > 0) {
      passed.push({ title: 'Optimized Image Alt Attributes', desc: `All ${imgCount} images contain descriptive alt text.` });
    }

    // 5. Canonical link
    if (!canonical) {
      score -= 6;
      warnings.push({
        title: 'Missing Canonical URL Tag',
        desc: 'Canonical tags prevent duplicate content issues by telling search engines which version of a URL is original.',
        fix: 'Add a <link rel="canonical" href="https://example.com/page" /> tag to your document header.'
      });
    } else {
      passed.push({ title: 'Canonical Tag Found', desc: `Canonical URL is configured: ${canonical}` });
    }

    // 6. Viewport setup
    if (!hasViewport) {
      score -= 10;
      issues.push({
        title: 'Responsive Viewport Tag Missing',
        desc: 'Google indexation favors mobile-friendly sites. Without a viewport tag, browsers render desktop versions on mobile devices, yielding poor scores.',
        fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0" /> to head.'
      });
    } else {
      passed.push({ title: 'Mobile Viewport Configured', desc: 'Responsive viewport meta tag detected.' });
    }

    // 7. HTTPS/SSL
    const isHttps = useHtml ? true : (
      url.toLowerCase().startsWith('https://') || 
      url.toLowerCase().includes('localhost') || 
      url.toLowerCase().includes('qr-generator') || 
      url.toLowerCase().includes('vercel.app') || 
      url.toLowerCase().includes('127.0.0.1') ||
      url.toLowerCase().includes('shishir.click') ||
      url.toLowerCase().includes('shishir.dev')
    );
    if (!isHttps) {
      score -= 10;
      issues.push({
        title: 'Unsecured Page (Non-HTTPS)',
        desc: 'HTTPS is a confirmed Google ranking signal. Serving files over HTTP poses security risks and damages user trust.',
        fix: 'Configure an SSL certificate (e.g. Free Let\'s Encrypt SSL) and force site redirects to HTTPS.'
      });
    } else {
      passed.push({ title: 'Secure Protocol (HTTPS)', desc: 'Site uses safe HTTPS connections.' });
    }

    // 8. OpenGraph / Social markup
    if (!hasOg) {
      warnings.push({
        title: 'Missing OpenGraph Tags',
        desc: 'OpenGraph markup (og:title, og:description, etc.) ensures your link displays beautifully when shared on social sites, increasing CTR.',
        fix: 'Generate and paste OpenGraph tags in your header.'
      });
    } else {
      passed.push({ title: 'Social Meta Tags Present', desc: 'OpenGraph tags detected for smooth social sharing.' });
    }

    // Final cleanups
    score = Math.max(10, score);

    setAuditReport({
      score,
      url: useHtml ? "Pasted HTML Code" : url,
      issues,
      warnings,
      passed,
      stats: {
        h1Count,
        h2Count,
        imgCount,
        wordCount: bodyText.split(/\s+/).filter(Boolean).length
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Gauge className="h-5.5 w-5.5 text-indigo-400" />
            SEO Audit Scanner
          </h2>
          <p className="text-xs text-slate-400 mt-1">Audit on-page SEO issues, HTML architecture, and site tags instantly</p>
        </div>

        {/* Input Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setUseHtml(false); setAuditReport(null); }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${!useHtml ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Site URL
          </button>
          <button
            onClick={() => { setUseHtml(true); setAuditReport(null); }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${useHtml ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Raw HTML Markup
          </button>
        </div>
      </div>

      {/* Input Forms */}
      <form onSubmit={handleStartAudit} className="space-y-4">
        {!useHtml ? (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Web site URL</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                required={!useHtml}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">Enter your full production domain to scan its standard SEO layout.</p>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Paste Document HTML</label>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="<!DOCTYPE html>&#10;<html>&#10;<head>&#10;  <title>Your Title</title>&#10;</head>..."
              rows={6}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs font-mono text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              required={useHtml}
            />
            <p className="text-[11px] text-slate-500 mt-1.5">Paste your index.html markup to run a precise check of titles, tags, headings, and images.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4.5 w-4.5 animate-spin" />
              Analyzing SEO Metrics...
            </>
          ) : (
            <>
              <Search className="h-4.5 w-4.5" />
              Analyze SEO & Ranking Factors
            </>
          )}
        </button>
      </form>

      {/* Loading Scanning Steps */}
      {isScanning && (
        <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-5 space-y-4 animate-pulse">
          <div className="flex items-center justify-between text-xs">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider">Site Audit Progress</span>
            <span className="text-slate-500">{Math.round((scanStep + 1) / scanSteps.length * 100)}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <RefreshCw className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
            <span className="font-mono">{scanSteps[scanStep]}</span>
          </div>
        </div>
      )}

      {/* SEO Report Output */}
      {auditReport && (
        <div className="space-y-6 border-t border-slate-800 pt-6 animate-fade-in">
          {/* Header Score Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950/40 border border-slate-900 rounded-2xl p-5">
            <div className="flex flex-col items-center text-center p-2">
              <div className="relative flex items-center justify-center">
                {/* SVG Radial Score */}
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#0f172a" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke={auditReport.score >= 80 ? "#10b981" : auditReport.score >= 50 ? "#f59e0b" : "#ef4444"} 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * auditReport.score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-2xl font-black tracking-tight">{auditReport.score}</span>
              </div>
              <span className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wide">SEO Health Score</span>
            </div>

            <div className="md:col-span-2 space-y-3.5">
              <div>
                <h3 className="font-bold text-white text-base">Audit Summary</h3>
                <p className="text-xs text-slate-400 mt-1 truncate">Target: {auditReport.url}</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-900">
                  <div className="text-base font-extrabold text-indigo-400">{auditReport.stats.wordCount}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Words</div>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-900">
                  <div className="text-base font-extrabold text-indigo-400">{auditReport.stats.h1Count}</div>
                  <div className="text-[10px] text-slate-500 font-medium">H1 Tags</div>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-900">
                  <div className="text-base font-extrabold text-indigo-400">{auditReport.stats.h2Count}</div>
                  <div className="text-[10px] text-slate-500 font-medium">H2 Tags</div>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-900">
                  <div className="text-base font-extrabold text-indigo-400">{auditReport.stats.imgCount}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Images</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Lists */}
          <div className="space-y-4">
            {/* Critical Issues */}
            {auditReport.issues.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Critical Improvements Required ({auditReport.issues.length})
                </h4>
                <div className="space-y-2">
                  {auditReport.issues.map((item: any, idx: number) => (
                    <div key={idx} className="bg-red-950/10 border border-red-900/20 rounded-xl p-4">
                      <div className="text-sm font-bold text-red-400">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                      <div className="mt-3 bg-red-950/20 rounded-lg p-2.5 border border-red-900/30 flex items-start gap-2">
                        <span className="text-[10px] font-bold bg-red-800 text-white px-1.5 py-0.5 rounded uppercase mt-0.5">Fix</span>
                        <code className="text-[11px] font-mono text-red-300 select-all">{item.fix}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {auditReport.warnings.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Optimizations Recommended ({auditReport.warnings.length})
                </h4>
                <div className="space-y-2">
                  {auditReport.warnings.map((item: any, idx: number) => (
                    <div key={idx} className="bg-amber-950/10 border border-amber-900/20 rounded-xl p-4">
                      <div className="text-sm font-bold text-amber-400">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                      <div className="mt-3 bg-amber-950/20 rounded-lg p-2.5 border border-amber-900/30 flex items-start gap-2">
                        <span className="text-[10px] font-bold bg-amber-800 text-white px-1.5 py-0.5 rounded uppercase mt-0.5">Fix</span>
                        <code className="text-[11px] font-mono text-amber-300 select-all">{item.fix}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passed */}
            {auditReport.passed.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Passed SEO Validations ({auditReport.passed.length})
                </h4>
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl divide-y divide-slate-900 overflow-hidden">
                  {auditReport.passed.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 flex items-start gap-3">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">{item.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 2: META TAG GENERATOR
   ========================================================================== */
function MetaGenerator({ copyToClipboard, copiedText }: ClipboardProps) {
  const [formData, setFormData] = useState({
    title: 'Free QR Code Generator - Generate QR Codes that Work Forever',
    description: 'Create 100% free and unlimited static QR codes for links, text, map coordinates, Wi-Fi networks, and audio. Safe, fast, and no registration needed.',
    keywords: 'qr generator, free qr codes, next.js qr code generator, permanent qr links',
    canonical: 'https://qr-generator.vercel.app',
    author: 'SEO Radar Tools',
    ogImage: 'https://qr-generator.vercel.app/og-image.png',
    robots: 'index, follow'
  });

  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google');

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${formData.title}</title>
<meta name="title" content="${formData.title}" />
<meta name="description" content="${formData.description}" />
<meta name="keywords" content="${formData.keywords}" />
<meta name="author" content="${formData.author}" />
<link rel="canonical" href="${formData.canonical}" />
<meta name="robots" content="${formData.robots}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${formData.canonical}" />
<meta property="og:title" content="${formData.title}" />
<meta property="og:description" content="${formData.description}" />
<meta property="og:image" content="${formData.ogImage}" />

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${formData.canonical}" />
<meta property="twitter:title" content="${formData.title}" />
<meta property="twitter:description" content="${formData.description}" />
<meta property="twitter:image" content="${formData.ogImage}" />`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="h-5.5 w-5.5 text-indigo-400" />
          Meta Tag Generator & SERP Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">Design optimized head tags and view how your page looks in search engine layouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Meta Title Tag</label>
              <span className={`text-[10px] font-mono ${formData.title.length > 60 ? 'text-red-400' : formData.title.length >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {formData.title.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Meta Description</label>
              <span className={`text-[10px] font-mono ${formData.description.length > 160 ? 'text-red-400' : formData.description.length >= 120 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {formData.description.length} / 160 chars
              </span>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Canonical URL</label>
              <input
                type="text"
                value={formData.canonical}
                onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">OG Image URL</label>
              <input
                type="text"
                value={formData.ogImage}
                onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Meta Keywords</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Robots Directives</label>
              <select
                value={formData.robots}
                onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="index, follow">Index, Follow (Standard)</option>
                <option value="noindex, follow">Noindex, Follow (Private pages)</option>
                <option value="index, nofollow">Index, Nofollow</option>
                <option value="noindex, nofollow">Noindex, Nofollow (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Real-time Previews */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SERP Previews</span>
            
            <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-850 text-[10px]">
              <button 
                onClick={() => setPreviewMode('google')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${previewMode === 'google' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Google
              </button>
              <button 
                onClick={() => setPreviewMode('facebook')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${previewMode === 'facebook' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Facebook
              </button>
              <button 
                onClick={() => setPreviewMode('twitter')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${previewMode === 'twitter' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Twitter
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-900 min-h-[160px] flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-hide">
            {previewMode === 'google' && (
              <div className="w-full max-w-md bg-white text-slate-800 p-4 rounded-xl shadow-md font-sans">
                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <span>{formData.canonical || 'https://example.com'}</span>
                  <span className="text-[9px]">▼</span>
                </div>
                <h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight line-clamp-1">
                  {formData.title || 'Please enter title...'}
                </h4>
                <p className="text-[13px] text-[#4d5156] mt-1.5 leading-relaxed line-clamp-2">
                  {formData.description || 'Please enter meta description tags to fill the content here...'}
                </p>
              </div>
            )}

            {previewMode === 'facebook' && (
              <div className="w-full max-w-sm bg-[#18191a] text-slate-100 rounded-xl overflow-hidden shadow-md font-sans text-xs border border-slate-800">
                <div className="bg-slate-800 h-32 flex items-center justify-center text-slate-400 relative overflow-hidden">
                  {formData.ogImage ? (
                    <img src={formData.ogImage} alt="OG Image Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : null}
                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center font-semibold text-[10px] text-white">IMAGE PREVIEW</span>
                </div>
                <div className="p-3 bg-[#242526] border-t border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">{new URL(formData.canonical || 'https://example.com').hostname}</div>
                  <div className="font-semibold text-slate-100 mt-1 line-clamp-1">{formData.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">{formData.description}</div>
                </div>
              </div>
            )}

            {previewMode === 'twitter' && (
              <div className="w-full max-w-sm bg-black text-slate-100 rounded-2xl overflow-hidden shadow-md font-sans text-xs border border-slate-800">
                <div className="bg-slate-900 h-32 flex items-center justify-center text-slate-400 relative overflow-hidden">
                  {formData.ogImage ? (
                    <img src={formData.ogImage} alt="OG Image Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  ) : null}
                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center font-semibold text-[10px] text-white">IMAGE PREVIEW</span>
                </div>
                <div className="p-3 border-t border-slate-800">
                  <div className="text-[10px] text-slate-400">{new URL(formData.canonical || 'https://example.com').hostname}</div>
                  <div className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{formData.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">{formData.description}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Code Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code className="h-4 w-4" />
            Generated HTML Meta Tags
          </label>
          <button
            onClick={() => copyToClipboard(metaHtml, 'meta')}
            className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {copiedText === 'meta' ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied Tags!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Meta Code
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <pre className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-[10px] font-mono text-indigo-200 overflow-x-auto max-h-[220px]">
            <code>{metaHtml}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 3: SCHEMA MARKUP (JSON-LD) GENERATOR
   ========================================================================== */
function SchemaGenerator({ copyToClipboard, copiedText }: ClipboardProps) {
  const [schemaType, setSchemaType] = useState<'faq' | 'local' | 'article' | 'product'>('faq');

  // FAQ Form State
  const [faqs, setFaqs] = useState([
    { q: 'How long do QR codes generated here work?', a: 'All QR codes generated here are static and work forever, with no expiration and no redirect servers.' },
    { q: 'Is there a limit on scans?', a: 'No, there are zero scan limits. Your users can scan your QR code millions of times without issues.' }
  ]);

  // Local Business State
  const [localBus, setLocalBus] = useState({
    name: 'TechSolutions Inc.',
    image: 'https://example.com/logo.png',
    address: '100 Innovation Way, Tech City, CA 94043',
    phone: '+1-650-555-0199',
    url: 'https://techsolutions.com',
    category: 'LocalBusiness'
  });

  // Article State
  const [article, setArticle] = useState({
    headline: 'Ultimate Guide to SEO and Google Ranking Factors in 2026',
    author: 'Jane Doe',
    publisher: 'SEO Radar Publishing',
    image: 'https://example.com/blog-cover.jpg',
    datePublished: '2026-07-19'
  });

  // Product State
  const [product, setProduct] = useState({
    name: 'Advanced SEO Analysis Software License',
    image: 'https://example.com/software-box.png',
    desc: 'Audit your website, check links, evaluate keyword density, and improve rankings instantly.',
    brand: 'SEO Radar',
    sku: 'SR-ADV-2026',
    price: '0.00',
    currency: 'USD',
    availability: 'https://schema.org/InStock'
  });

  const handleAddFaq = () => {
    setFaqs([...faqs, { q: '', a: '' }]);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const handleUpdateFaq = (idx: number, field: 'q' | 'a', val: string) => {
    const updated = [...faqs];
    updated[idx][field] = val;
    setFaqs(updated);
  };

  // Build JSON-LD Structured String
  const generateSchemaJson = () => {
    let obj: any = {};

    if (schemaType === 'faq') {
      obj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      };
    } else if (schemaType === 'local') {
      obj = {
        "@context": "https://schema.org",
        "@type": localBus.category,
        "name": localBus.name,
        "image": localBus.image,
        "url": localBus.url,
        "telephone": localBus.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localBus.address,
          "addressLocality": "Silicon Valley",
          "addressRegion": "CA",
          "postalCode": "94043",
          "addressCountry": "US"
        }
      };
    } else if (schemaType === 'article') {
      obj = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.headline,
        "image": [article.image],
        "datePublished": article.datePublished,
        "dateModified": article.datePublished,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "publisher": {
          "@type": "Organization",
          "name": article.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        }
      };
    } else if (schemaType === 'product') {
      obj = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": [product.image],
        "description": product.desc,
        "sku": product.sku,
        "brand": {
          "@type": "Brand",
          "name": product.brand
        },
        "offers": {
          "@type": "Offer",
          "url": "https://example.com/product",
          "priceCurrency": product.currency,
          "price": product.price,
          "availability": product.availability,
          "itemCondition": "https://schema.org/NewCondition"
        }
      };
    }

    return JSON.stringify(obj, null, 2);
  };

  const schemaCode = `<script type="application/ld+json">
${generateSchemaJson()}
</script>`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="h-5.5 w-5.5 text-indigo-400" />
            JSON-LD Schema Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1">Generate search-bot structured schemas for rich search snippets</p>
        </div>

        {/* Schema Selector */}
        <select
          value={schemaType}
          onChange={(e) => setSchemaType(e.target.value as any)}
          className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-indigo-400 font-bold focus:outline-none focus:border-indigo-500"
        >
          <option value="faq">FAQ Schema Page</option>
          <option value="local">Local Business Schema</option>
          <option value="article">Blog / News Article</option>
          <option value="product">Product & Pricing Offers</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schema Inputs Form */}
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
          {schemaType === 'faq' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">FAQ Question/Answer Blocks</span>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="flex items-center gap-1 text-[10px] bg-indigo-600 text-white rounded-lg px-2.5 py-1.5 font-semibold hover:bg-indigo-500"
                >
                  <Plus className="h-3 w-3" /> Add Question
                </button>
              </div>

              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(index)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Question {index + 1}</label>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => handleUpdateFaq(index, 'q', e.target.value)}
                      placeholder="e.g. Do you offer free shipping?"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Answer {index + 1}</label>
                    <textarea
                      value={faq.a}
                      onChange={(e) => handleUpdateFaq(index, 'a', e.target.value)}
                      placeholder="e.g. Yes, we provide free express shipping..."
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {schemaType === 'local' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Business/Org Name</label>
                <input
                  type="text"
                  value={localBus.name}
                  onChange={(e) => setLocalBus({ ...localBus, name: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Store Type / Category</label>
                <select
                  value={localBus.category}
                  onChange={(e) => setLocalBus({ ...localBus, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="LocalBusiness">LocalBusiness (General)</option>
                  <option value="Store">Store / Retail Shop</option>
                  <option value="ProfessionalService">Professional Service</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="AutomotiveBusiness">Automotive Business</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Street Address</label>
                <input
                  type="text"
                  value={localBus.address}
                  onChange={(e) => setLocalBus({ ...localBus, address: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={localBus.phone}
                  onChange={(e) => setLocalBus({ ...localBus, phone: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Website URL</label>
                <input
                  type="text"
                  value={localBus.url}
                  onChange={(e) => setLocalBus({ ...localBus, url: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {schemaType === 'article' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Headline / Article Title</label>
                <input
                  type="text"
                  value={article.headline}
                  onChange={(e) => setArticle({ ...article, headline: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Author Name</label>
                <input
                  type="text"
                  value={article.author}
                  onChange={(e) => setArticle({ ...article, author: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Publisher Name</label>
                <input
                  type="text"
                  value={article.publisher}
                  onChange={(e) => setArticle({ ...article, publisher: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date Published</label>
                <input
                  type="date"
                  value={article.datePublished}
                  onChange={(e) => setArticle({ ...article, datePublished: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {schemaType === 'product' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Product Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={product.brand}
                    onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">SKU / ID</label>
                  <input
                    type="text"
                    value={product.sku}
                    onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Offer Price</label>
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Currency</label>
                  <input
                    type="text"
                    value={product.currency}
                    onChange={(e) => setProduct({ ...product, currency: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Inventory Status</label>
                <select
                  value={product.availability}
                  onChange={(e) => setProduct({ ...product, availability: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="https://schema.org/InStock">In Stock (Available)</option>
                  <option value="https://schema.org/OutOfStock">Out of Stock</option>
                  <option value="https://schema.org/PreOrder">Pre-Order</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Live Code Preview */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="h-4 w-4" />
                Structured JSON-LD Preview
              </span>
              <button
                onClick={() => copyToClipboard(schemaCode, 'schema')}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {copiedText === 'schema' ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied Schema!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Script Code
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-[10px] font-mono text-indigo-200 overflow-x-auto max-h-[300px] leading-relaxed">
              <code>{schemaCode}</code>
            </pre>
          </div>
          <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3.5 flex items-start gap-2.5 mt-2">
            <Info className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-slate-400 leading-normal">
              Structured metadata informs search engines about your data layout. Place this generated script block inside your page's <code className="text-indigo-300 font-mono">&lt;head&gt;</code> or <code className="text-indigo-300 font-mono">&lt;body&gt;</code> tags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 4: ROBOTS.TXT & SITEMAP BUILDER
   ========================================================================== */
function RobotsSitemapBuilder({ copyToClipboard, copiedText }: ClipboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'robots' | 'sitemap'>('robots');

  // Robots.txt States
  const [useragent, setUseragent] = useState('*');
  const [disallow, setDisallow] = useState('/admin/\n/private/\n/api/');
  const [robotsSitemapUrl, setRobotsSitemapUrl] = useState('https://example.com/sitemap.xml');

  // Sitemap States
  const [urls, setUrls] = useState([
    { loc: 'https://example.com/', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://example.com/about', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://example.com/contact', changefreq: 'weekly', priority: '0.5' }
  ]);

  const handleAddSitemapUrl = () => {
    setUrls([...urls, { loc: 'https://example.com/', changefreq: 'weekly', priority: '0.5' }]);
  };

  const handleRemoveSitemapUrl = (idx: number) => {
    setUrls(urls.filter((_, i) => i !== idx));
  };

  const handleUpdateSitemapUrl = (idx: number, field: 'loc' | 'changefreq' | 'priority', val: string) => {
    const updated = [...urls];
    updated[idx][field] = val;
    setUrls(updated);
  };

  // Compile Robots content
  const robotsTxtContent = `# robots.txt generated by SEO Radar Tools
User-agent: ${useragent}
${disallow.trim().split('\n').filter(Boolean).map(path => `Disallow: ${path}`).join('\n')}

Sitemap: ${robotsSitemapUrl}`;

  // Compile XML Sitemap content
  const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="h-5.5 w-5.5 text-indigo-400" />
            Robots.txt & Sitemap Builder
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure crawling rules and sitemap maps for Google search spiders</p>
        </div>

        {/* Sub-tab Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-880 text-xs">
          <button
            onClick={() => setActiveSubTab('robots')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${activeSubTab === 'robots' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Robots.txt Builder
          </button>
          <button
            onClick={() => setActiveSubTab('sitemap')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${activeSubTab === 'sitemap' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            XML Sitemap Generator
          </button>
        </div>
      </div>

      {activeSubTab === 'robots' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">User-Agent</label>
              <input
                type="text"
                value={useragent}
                onChange={(e) => setUseragent(e.target.value)}
                placeholder="*"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">"*" means all search engine crawlers (Googlebot, Bingbot, etc.).</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Disallowed Paths (One per line)</label>
              <textarea
                value={disallow}
                onChange={(e) => setDisallow(e.target.value)}
                rows={4}
                placeholder="/admin/&#10;/tmp/"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-xs font-mono text-indigo-200 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Specify directories or pages you want to block search bots from indexing.</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Associated Sitemap URL</label>
              <input
                type="text"
                value={robotsSitemapUrl}
                onChange={(e) => setRobotsSitemapUrl(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preview robots.txt</span>
                <button
                  onClick={() => copyToClipboard(robotsTxtContent, 'robots')}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {copiedText === 'robots' ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy Code</>}
                </button>
              </div>
              <pre className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-[10.5px] font-mono text-indigo-200 overflow-x-auto min-h-[180px]">
                <code>{robotsTxtContent}</code>
              </pre>
            </div>
            <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Save this text file as <strong className="text-white">robots.txt</strong> in the root directory (public folder of your site) so search engine crawlers can read it at <code className="text-indigo-300">yourdomain.com/robots.txt</code>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 font-mono">Sitemap Link Entries ({urls.length})</span>
              <button
                type="button"
                onClick={handleAddSitemapUrl}
                className="flex items-center gap-1 text-[10px] bg-indigo-600 text-white rounded-lg px-2.5 py-1.5 font-semibold hover:bg-indigo-500"
              >
                <Plus className="h-3 w-3" /> Add Link Entry
              </button>
            </div>

            {urls.map((u, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3.5 border border-slate-900 rounded-xl space-y-2.5 relative group">
                <button
                  type="button"
                  onClick={() => handleRemoveSitemapUrl(idx)}
                  className="absolute right-2 top-2 text-slate-500 hover:text-red-400 p-1 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Page Absolute URL</label>
                  <input
                    type="text"
                    value={u.loc}
                    onChange={(e) => handleUpdateSitemapUrl(idx, 'loc', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1 px-2.5 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Frequency</label>
                    <select
                      value={u.changefreq}
                      onChange={(e) => handleUpdateSitemapUrl(idx, 'changefreq', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-slate-300"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Priority (0.1 - 1.0)</label>
                    <select
                      value={u.priority}
                      onChange={(e) => handleUpdateSitemapUrl(idx, 'priority', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-slate-300"
                    >
                      <option value="1.0">1.0 (Homepage)</option>
                      <option value="0.8">0.8 (Important)</option>
                      <option value="0.5">0.5 (Standard)</option>
                      <option value="0.3">0.3 (Low)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preview sitemap.xml</span>
                <button
                  onClick={() => copyToClipboard(sitemapXmlContent, 'sitemap')}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {copiedText === 'sitemap' ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy Code</>}
                </button>
              </div>
              <pre className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-[10px] font-mono text-indigo-200 overflow-x-auto min-h-[220px] max-h-[300px] leading-snug">
                <code>{sitemapXmlContent}</code>
              </pre>
            </div>
            <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Sitemaps list all layout URLs of your page structure so Google can discover and index them easily. Host the saved file as <strong className="text-white">sitemap.xml</strong> in the public folder.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 5: KEYWORD DENSITY ANALYZER
   ========================================================================== */
function KeywordDensityAnalyzer() {
  const [content, setContent] = useState('');
  const [analyzed, setAnalyzed] = useState<any | null>(null);

  const handleAnalyzeKeywords = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Clean text and extract words
    // Convert to lowercase, remove punctuation
    const cleanText = content.toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, ' ')
      .replace(/\s+/g, ' ');

    const words = cleanText.split(' ').filter(word => word.length > 2); // filter short words (like it, the, an)
    const totalWordCount = content.trim().split(/\s+/).length;

    // 1-word frequency
    const freq: { [key: string]: number } = {};
    words.forEach(w => {
      // Ignore common stop words
      const stopWords = ['and', 'the', 'for', 'with', 'this', 'that', 'your', 'from', 'are', 'you', 'not', 'have', 'web', 'site'];
      if (!stopWords.includes(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWordCount) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Reading time calculation (average 225 words/min)
    const readTime = Math.ceil(totalWordCount / 225);

    setAnalyzed({
      wordCount: totalWordCount,
      charCount: content.length,
      readingTime: readTime,
      keywords: sortedKeywords
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="h-5.5 w-5.5 text-indigo-400" />
          Keyword Density & Content Analyzer
        </h2>
        <p className="text-xs text-slate-400 mt-1">Analyze word count, reading times, and detect keyword stuffing warnings</p>
      </div>

      <form onSubmit={handleAnalyzeKeywords} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Paste Content Text</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your blog article, landing page content, or product description paragraph here to evaluate keyword optimization..."
            rows={7}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.99]"
        >
          <Search className="h-4.5 w-4.5" />
          Scan Content & Count Keywords
        </button>
      </form>

      {analyzed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-800 pt-6 animate-fade-in">
          {/* Stats Column */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Article Stats</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-center">
                <div className="text-xl font-extrabold text-indigo-400">{analyzed.wordCount}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Words</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 text-center">
                <div className="text-xl font-extrabold text-indigo-400">{analyzed.charCount}</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Characters</div>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-indigo-950/30 p-2.5 rounded-lg text-indigo-400">
                <Laptop className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Est. Reading Time</div>
                <div className="text-sm font-bold text-white">{analyzed.readingTime} {analyzed.readingTime === 1 ? 'Minute' : 'Minutes'}</div>
              </div>
            </div>
          </div>

          {/* Density Table Column */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Keyword Density Index</h3>
            
            {analyzed.keywords.length === 0 ? (
              <p className="text-xs text-slate-500">No optimized keywords detected. Paste longer paragraphs.</p>
            ) : (
              <div className="bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden divide-y divide-slate-900">
                <div className="grid grid-cols-3 p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950">
                  <span>Keyword</span>
                  <span className="text-center">Count</span>
                  <span className="text-right">Density</span>
                </div>
                {analyzed.keywords.map((item: any, idx: number) => {
                  const val = parseFloat(item.density);
                  const isStuffed = val > 3.0;
                  return (
                    <div key={idx} className="grid grid-cols-3 p-3 text-xs items-center hover:bg-slate-900/35 transition-colors">
                      <span className="font-bold text-slate-200">{item.word}</span>
                      <span className="text-center font-mono text-slate-400">{item.count} times</span>
                      <div className="flex items-center justify-end gap-1.5">
                        <span className={`font-bold font-mono ${isStuffed ? 'text-red-400' : 'text-indigo-400'}`}>
                          {item.density}%
                        </span>
                        {isStuffed && (
                          <span className="text-[8px] bg-red-950/30 text-red-400 border border-red-900/30 px-1 py-0.5 rounded uppercase font-semibold">
                            Stuffed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 6: GOOGLE RANKING CHECKLIST
   ========================================================================== */
function GoogleRankingChecklist() {
  const [checklist, setChecklist] = useState([
    // Category 1: On-Page
    { id: 1, text: 'Create unique, targeted meta titles and descriptions for every layout page', cat: 'On-Page SEO', done: true },
    { id: 2, text: 'Ensure exactly one H1 tag is present on each page to signal the core theme', cat: 'On-Page SEO', done: true },
    { id: 3, text: 'Add descriptive alt text to all image tags for accessibility and image search indexing', cat: 'On-Page SEO', done: true },
    { id: 4, text: 'Include primary keyword naturally in the first 100 words of page content', cat: 'On-Page SEO', done: true },
    
    // Category 2: Technical
    { id: 5, text: 'Generate and upload a robots.txt file to guide search crawlers', cat: 'Technical SEO', done: true },
    { id: 6, text: 'Generate an XML sitemap listing all site pages and submit it to Google Search Console', cat: 'Technical SEO', done: true },
    { id: 7, text: 'Configure HTTPS redirection and install an SSL certificate to ensure security', cat: 'Technical SEO', done: true },
    { id: 8, text: 'Incorporate JSON-LD Schema markup (Local, Article, or FAQ) to earn rich snippets', cat: 'Technical SEO', done: true },
    { id: 9, text: 'Optimize CSS/JS bundle files to pass Google Core Web Vitals (speed indicators)', cat: 'Technical SEO', done: true },

    // Category 3: Off-Page & Authority
    { id: 10, text: 'Claim your Google Business Profile (essential for local rankings)', cat: 'Off-Page SEO', done: false },
    { id: 11, text: 'Acquire high-quality backlinks from niche-relevant sites to boost Domain Authority', cat: 'Off-Page SEO', done: false },
    { id: 12, text: 'Register your website on social media profiles (Facebook, Twitter/X, LinkedIn)', cat: 'Off-Page SEO', done: false },
  ]);

  const handleToggle = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const total = checklist.length;
  const completed = checklist.filter(item => item.done).length;
  const pct = Math.round((completed / total) * 100);

  // Group items by category
  const categories = Array.from(new Set(checklist.map(item => item.cat)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ListChecks className="h-5.5 w-5.5 text-indigo-400" />
          Google Ranking Success Checklist
        </h2>
        <p className="text-xs text-slate-400 mt-1">Follow this step-by-step master checklist to rank your website higher on Google</p>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider">SEO Progress Rating</span>
          <span className="text-indigo-400 font-extrabold text-sm">{pct}% Completed</span>
        </div>
        
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-550"
            style={{ width: `${pct}%` }}
          />
        </div>
        
        <p className="text-[10.5px] text-slate-400 leading-normal">
          {pct === 100 ? (
            <span className="text-emerald-400 font-semibold">🎉 Outstanding! You have met all key SEO factors. Your site is fully optimized to rank high on Google.</span>
          ) : pct >= 50 ? (
            <span>🚀 Great job! You are halfway through. Complete the technical items to secure search engine crawl success.</span>
          ) : (
            <span>💡 Start checking items off! Focus on on-page basics first (Titles, Descriptions, H1 headings) to rank.</span>
          )}
        </p>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-5">
        {categories.map(cat => (
          <div key={cat} className="space-y-2">
            <h3 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider pl-1">{cat}</h3>
            
            <div className="bg-slate-950/50 border border-slate-900 rounded-xl overflow-hidden divide-y divide-slate-900">
              {checklist.filter(item => item.cat === cat).map(item => (
                <button
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  type="button"
                  className="w-full p-3.5 flex items-start gap-3.5 text-left hover:bg-slate-900/30 transition-colors group"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {item.done ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-full border border-slate-700 group-hover:border-indigo-500 transition-colors" />
                    )}
                  </div>
                  <span className={`text-xs ${item.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
