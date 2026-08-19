import { Template, CardElement, CardState } from "./types";

// The 15 categories requested
export const CATEGORIES = [
  "Corporate",
  "Minimal",
  "Modern",
  "Creative",
  "Professional",
  "Luxury",
  "Technology",
  "Real Estate",
  "Restaurant",
  "Healthcare",
  "Education",
  "Finance",
  "Construction",
  "Freelancer",
  "Personal",
];

export const PRESETS = [
  {
    id: "us_standard",
    name: 'US Standard (3.5" x 2")',
    width: 1050,
    height: 600,
  },
  {
    id: "euro_standard",
    name: "UK/EU Standard (85 x 55 mm)",
    width: 1004,
    height: 650,
  },
  { id: "square", name: 'Square (2.5" x 2.5")', width: 750, height: 750 },
];

// Color palettes for templates
const PALETTES = [
  {
    id: "dark",
    name: "Executive Dark",
    bgFront: "#111827",
    bgFrontEnd: "#0f172a",
    bgBack: "#1f2937",
    bgBackEnd: "#111827",
    textPrimary: "#f9fafb",
    textSecondary: "#9ca3af",
    accent: "#6366f1",
    accentLight: "#a5b4fc",
    accentDark: "#4338ca",
  },
  {
    id: "light",
    name: "Minimal Light",
    bgFront: "#ffffff",
    bgFrontEnd: "#f8fafc",
    bgBack: "#f3f4f6",
    bgBackEnd: "#e5e7eb",
    textPrimary: "#111827",
    textSecondary: "#4b5563",
    accent: "#3b82f6",
    accentLight: "#93c5fd",
    accentDark: "#1d4ed8",
  },
  {
    id: "brand",
    name: "Vibrant Accent",
    bgFront: "#faf5ff",
    bgFrontEnd: "#f3e8ff",
    bgBack: "#6366f1",
    bgBackEnd: "#4f46e5",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    accent: "#ec4899",
    accentLight: "#fbcfe8",
    accentDark: "#db2777",
  },
  {
    id: "luxury",
    name: "Royal Gold",
    bgFront: "#0f172a",
    bgFrontEnd: "#020617",
    bgBack: "#1e293b",
    bgBackEnd: "#0f172a",
    textPrimary: "#fffbeb",
    textSecondary: "#d97706",
    accent: "#fbbf24",
    accentLight: "#fde68a",
    accentDark: "#b45309",
  },
  {
    id: "emerald",
    name: "Mint Emerald",
    bgFront: "#064e3b",
    bgFrontEnd: "#022c22",
    bgBack: "#022c22",
    bgBackEnd: "#064e3b",
    textPrimary: "#f0fdf4",
    textSecondary: "#a7f3d0",
    accent: "#10b981",
    accentLight: "#6ee7b7",
    accentDark: "#047857",
  },
  {
    id: "navy",
    name: "Classic Navy",
    bgFront: "#0b132b",
    bgFrontEnd: "#1c2541",
    bgBack: "#1c2541",
    bgBackEnd: "#0b132b",
    textPrimary: "#ffffff",
    textSecondary: "#5bc0be",
    accent: "#6fffe9",
    accentLight: "#a5f3fc",
    accentDark: "#3a506b",
  }
];

// Metadata per industry for generating specific, realistic content
const INDUSTRY_DATA: Record<
  string,
  {
    company: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    web: string;
    address: string;
    fontTitle: string;
    fontBody: string;
    logoType: "circle" | "square" | "shield" | "triangle" | "monogram";
  }
> = {
  Corporate: {
    company: "Global Holdings Inc.",
    name: "Jonathan Vance",
    title: "Chief Executive Officer",
    phone: "+1 (555) 019-2834",
    email: "j.vance@globalholdings.com",
    web: "www.globalholdings.com",
    address: "500 Park Avenue, New York, NY 10022",
    fontTitle: "Montserrat",
    fontBody: "Inter",
    logoType: "shield",
  },
  Minimal: {
    company: "AURA CREATIVE",
    name: "Sarah Jenkins",
    title: "Lead Designer",
    phone: "+1 (555) 014-9988",
    email: "sarah@auracreative.io",
    web: "auracreative.io",
    address: "102 Light Street, Portland, OR 97201",
    fontTitle: "Inter",
    fontBody: "Inter",
    logoType: "circle",
  },
  Modern: {
    company: "NEXUS DIGITAL",
    name: "Alexander Rivers",
    title: "Product Strategist",
    phone: "+1 (555) 018-1234",
    email: "rivers@nexusdigital.co",
    web: "nexusdigital.co",
    address: "88 Tech Boulevard, Austin, TX 78701",
    fontTitle: "Outfit",
    fontBody: "Inter",
    logoType: "square",
  },
  Creative: {
    company: "Vivid Studios",
    name: "Mia Chen",
    title: "Art Director",
    phone: "+1 (555) 015-7766",
    email: "mia@vividstudios.design",
    web: "vividstudios.design",
    address: "42 Chroma Alley, San Francisco, CA 94107",
    fontTitle: "Syne",
    fontBody: "Montserrat",
    logoType: "circle",
  },
  Professional: {
    company: "Summit Advisory Group",
    name: "Robert Vance Jr.",
    title: "Senior Managing Partner",
    phone: "+1 (555) 011-8899",
    email: "r.vance@summitadvisory.com",
    web: "summitadvisory.com",
    address: "100 Financial Plaza, Suite 450, Chicago, IL 60603",
    fontTitle: "Lora",
    fontBody: "Open Sans",
    logoType: "shield",
  },
  Luxury: {
    company: "Maison D'Or",
    name: "Victoria Sterling",
    title: "Brand Ambassador",
    phone: "+1 (555) 016-5500",
    email: "v.sterling@maison-dor.com",
    web: "maison-dor.com",
    address: "720 Fifth Avenue, Suite 12B, New York, NY 10019",
    fontTitle: "Cinzel",
    fontBody: "Montserrat",
    logoType: "monogram",
  },
  Technology: {
    company: "CYBERDYNE LABS",
    name: "Ethan Wozniak",
    title: "Lead Systems Architect",
    phone: "+1 (555) 017-4545",
    email: "wozniak@cyberdyne.io",
    web: "cyberdyne.io",
    address: "1010 Binary Way, San Jose, CA 95110",
    fontTitle: "Space Grotesk",
    fontBody: "Fira Code",
    logoType: "square",
  },
  "Real Estate": {
    company: "Apex Realty Group",
    name: "Claire Dunphy",
    title: "Senior Real Estate Broker",
    phone: "+1 (555) 013-1122",
    email: "claire@apexrealty.com",
    web: "apexrealty.com",
    address: "12 Skyview Terraces, Los Angeles, CA 90024",
    fontTitle: "Montserrat",
    fontBody: "Inter",
    logoType: "triangle",
  },
  Restaurant: {
    company: "L'Étoile Bistro",
    name: "Pierre Laurent",
    title: "Executive Chef / Owner",
    phone: "+1 (555) 012-3344",
    email: "chef.pierre@letoile.com",
    web: "letoilebistro.com",
    address: "89 Rue Gourmande, Montreal, QC H2W 1Y4",
    fontTitle: "Playfair Display",
    fontBody: "Lora",
    logoType: "circle",
  },
  Healthcare: {
    company: "Nova Health & Clinic",
    name: "Dr. Sophia Carter",
    title: "Pediatric Specialist",
    phone: "+1 (555) 015-8822",
    email: "dr.carter@novahealth.org",
    web: "novahealth.org",
    address: "400 Medical Center Parkway, Seattle, WA 98104",
    fontTitle: "Outfit",
    fontBody: "Inter",
    logoType: "circle",
  },
  Education: {
    company: "Veritas Academy",
    name: "Prof. Charles Xavier",
    title: "Academic Dean",
    phone: "+1 (555) 019-1234",
    email: "c.xavier@veritas.edu",
    web: "veritas.edu",
    address: "1407 Graymalkin Lane, Westchester, NY 10504",
    fontTitle: "Lora",
    fontBody: "Inter",
    logoType: "shield",
  },
  Finance: {
    company: "Quantum Wealth Mgmt",
    name: "Marcus Aurelius",
    title: "Principal Portfolio Manager",
    phone: "+1 (555) 012-9900",
    email: "marcus.aurelius@quantumwealth.com",
    web: "quantumwealth.com",
    address: "50 Wall Street, Floor 24, New York, NY 10005",
    fontTitle: "Montserrat",
    fontBody: "Inter",
    logoType: "shield",
  },
  Construction: {
    company: "Ironclad Builders",
    name: "Jack Hammer",
    title: "Project Superintendent",
    phone: "+1 (555) 014-4455",
    email: "jack@ironcladbuilders.com",
    web: "ironcladbuilders.com",
    address: "90 Heavy Machinery Rd, Denver, CO 80216",
    fontTitle: "Montserrat",
    fontBody: "Inter",
    logoType: "square",
  },
  Freelancer: {
    company: "PixelPerfect Designs",
    name: "Chris Evans",
    title: "UX / UI Consultant",
    phone: "+1 (555) 018-8833",
    email: "chris@pixelperfect.design",
    web: "pixelperfect.design",
    address: "Remote / Global Consulting",
    fontTitle: "Outfit",
    fontBody: "Inter",
    logoType: "monogram",
  },
  Personal: {
    company: "Jane Smith Consulting",
    name: "Jane Smith",
    title: "Independent Advisor",
    phone: "+1 (555) 016-1212",
    email: "jane@janesmith.me",
    web: "janesmith.me",
    address: "Brooklyn, New York, NY 11201",
    fontTitle: "Playfair Display",
    fontBody: "Inter",
    logoType: "monogram",
  },
};

// Layout configurations
type LayoutVariation = "executive" | "metro" | "zen";

// Programmatically generate templates
export function generateTemplates(): Template[] {
  const templates: Template[] = [];

  for (const category of CATEGORIES) {
    const data = INDUSTRY_DATA[category];
    const layouts: LayoutVariation[] = ["executive", "metro", "zen"];
    const orientations: ("landscape" | "portrait")[] = [
      "landscape",
      "portrait",
    ];

    // We generate multiple templates per category to reach our 500+ count
    // Combinations: 15 categories * 3 layouts * 2 orientations * 3 palettes * 2 sidedness = 540 templates!
    for (const layout of layouts) {
      for (const orientation of orientations) {
        for (const palette of PALETTES) {
          for (const isDoubleSided of [true, false]) {
            const id =
              `tpl-${category.toLowerCase()}-${layout}-${orientation}-${palette.id}-${isDoubleSided ? "double" : "single"}`.replace(
                /\s+/g,
                "-",
              );

            // Set up dimensions
            const width = orientation === "landscape" ? 1050 : 600;
            const height = orientation === "landscape" ? 600 : 1050;

            const name = `${category} ${layout.charAt(0).toUpperCase() + layout.slice(1)} ${palette.name} (${orientation === "landscape" ? "Landscape" : "Portrait"})`;

            // Card backgrounds
            const backgrounds: CardState["backgrounds"] = {
              front: {
                type: "gradient",
                color: palette.bgFront,
                gradientStart: palette.bgFront,
                gradientEnd: (palette as any).bgFrontEnd || palette.bgFront,
                gradientAngle: 135,
              },
              back: {
                type: "gradient",
                color: palette.bgBack,
                gradientStart: palette.bgBack,
                gradientEnd: (palette as any).bgBackEnd || palette.bgBack,
                gradientAngle: 135,
              },
            };

            const elements: CardElement[] = [];

            const accentColor = palette.accent;
            const accentLightColor = palette.accentLight || palette.accent;
            const accentDarkColor = palette.accentDark || palette.accent;
            const textPrimaryColor = palette.textPrimary;
            const textSecondaryColor = palette.textSecondary;
            const isL = orientation === "landscape";

            if (layout === "executive") {
              // 1. EXECUTIVE LAYOUT (Modern Geometric / Diagonal Polygon)
              if (isL) {
                // Landscape (1050x600)
                // Decorative polygonal shapes on right side
                elements.push({
                  id: `${id}-shape-poly1`,
                  type: "shape",
                  side: "front",
                  x: 650,
                  y: -50,
                  width: 450,
                  height: 700,
                  rotation: 20,
                  opacity: 0.95,
                  locked: true,
                  zIndex: 0,
                  shapeType: "triangle",
                  fill: palette.id === "dark" ? "#1e293b" : "#f1f5f9",
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-poly2`,
                  type: "shape",
                  side: "front",
                  x: 750,
                  y: 50,
                  width: 320,
                  height: 550,
                  rotation: 15,
                  opacity: 0.9,
                  locked: true,
                  zIndex: 1,
                  shapeType: "triangle",
                  fill: accentColor,
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-poly3`,
                  type: "shape",
                  side: "front",
                  x: 820,
                  y: 200,
                  width: 250,
                  height: 450,
                  rotation: 10,
                  opacity: 0.85,
                  locked: true,
                  zIndex: 2,
                  shapeType: "triangle",
                  fill: accentLightColor,
                  stroke: "none"
                });

                // Name banner block
                elements.push({
                  id: `${id}-shape-banner`,
                  type: "shape",
                  side: "front",
                  x: 80,
                  y: 80,
                  width: 480,
                  height: 75,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 3,
                  shapeType: "rect",
                  fill: accentColor,
                  borderRadius: 4
                });

                // Employee Name
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 100,
                  y: 95,
                  width: 440,
                  height: 45,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 26,
                  fontWeight: "800",
                  color: "#ffffff",
                  align: "left"
                });

                // Designation
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 100,
                  y: 175,
                  width: 440,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 14,
                  fontWeight: "600",
                  color: textPrimaryColor,
                  align: "left"
                });

                // Line separator
                elements.push({
                  id: `${id}-el-line`,
                  type: "shape",
                  side: "front",
                  x: 100,
                  y: 215,
                  width: 320,
                  height: 2,
                  rotation: 0,
                  opacity: 0.7,
                  locked: false,
                  zIndex: 6,
                  shapeType: "line",
                  fill: accentLightColor,
                  stroke: accentLightColor,
                  strokeWidth: 2
                });

                // Logo
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 80,
                  y: 245,
                  width: 60,
                  height: 60,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 7,
                  shapeType: data.logoType === "circle" ? "circle" : "rect",
                  fill: palette.id === "dark" ? "#1f2937" : "#f8fafc",
                  stroke: accentColor,
                  strokeWidth: 3,
                  text: category.substring(0, 2).toUpperCase()
                });

                // Company Name
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 160,
                  y: 255,
                  width: 350,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 8,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 18,
                  fontWeight: "700",
                  color: textPrimaryColor,
                  align: "left"
                });

                // Contact Details
                const gap = 40;
                const infoYStart = 340;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 80,
                    y: infoYStart + idx * gap,
                    width: 450,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 9 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 13,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "left"
                  });
                });

                // QR Code
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 580,
                  y: 350,
                  width: 150,
                  height: 150,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 13,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });
              } else {
                // Portrait (600x1050)
                // Bottom Polygon shapes
                elements.push({
                  id: `${id}-shape-poly1`,
                  type: "shape",
                  side: "front",
                  x: -50,
                  y: 750,
                  width: 700,
                  height: 350,
                  rotation: 20,
                  opacity: 0.95,
                  locked: true,
                  zIndex: 0,
                  shapeType: "triangle",
                  fill: palette.id === "dark" ? "#1e293b" : "#f1f5f9",
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-poly2`,
                  type: "shape",
                  side: "front",
                  x: 50,
                  y: 820,
                  width: 550,
                  height: 250,
                  rotation: 15,
                  opacity: 0.9,
                  locked: true,
                  zIndex: 1,
                  shapeType: "triangle",
                  fill: accentColor,
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-poly3`,
                  type: "shape",
                  side: "front",
                  x: 150,
                  y: 880,
                  width: 450,
                  height: 200,
                  rotation: 10,
                  opacity: 0.85,
                  locked: true,
                  zIndex: 2,
                  shapeType: "triangle",
                  fill: accentLightColor,
                  stroke: "none"
                });

                // Name banner
                elements.push({
                  id: `${id}-shape-banner`,
                  type: "shape",
                  side: "front",
                  x: 60,
                  y: 120,
                  width: 480,
                  height: 75,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 3,
                  shapeType: "rect",
                  fill: accentColor,
                  borderRadius: 4
                });

                // Employee Name
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 80,
                  y: 135,
                  width: 440,
                  height: 45,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 24,
                  fontWeight: "800",
                  color: "#ffffff",
                  align: "left"
                });

                // Designation
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 80,
                  y: 215,
                  width: 440,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 13,
                  fontWeight: "600",
                  color: textPrimaryColor,
                  align: "left"
                });

                // Line
                elements.push({
                  id: `${id}-el-line`,
                  type: "shape",
                  side: "front",
                  x: 80,
                  y: 250,
                  width: 250,
                  height: 2,
                  rotation: 0,
                  opacity: 0.7,
                  locked: false,
                  zIndex: 6,
                  shapeType: "line",
                  fill: accentLightColor,
                  stroke: accentLightColor,
                  strokeWidth: 2
                });

                // Logo
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 60,
                  y: 280,
                  width: 60,
                  height: 60,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 7,
                  shapeType: data.logoType === "circle" ? "circle" : "rect",
                  fill: palette.id === "dark" ? "#1f2937" : "#f8fafc",
                  stroke: accentColor,
                  strokeWidth: 3,
                  text: category.substring(0, 2).toUpperCase()
                });

                // Company Name
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 140,
                  y: 290,
                  width: 400,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 8,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 18,
                  fontWeight: "700",
                  color: textPrimaryColor,
                  align: "left"
                });

                // Contact details stacked
                const gap = 42;
                const infoYStart = 380;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 60,
                    y: infoYStart + idx * gap,
                    width: 480,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 9 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 13,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "left"
                  });
                });

                // QR Code
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 220,
                  y: 600,
                  width: 160,
                  height: 160,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 13,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });
              }
            } else if (layout === "metro") {
              // 2. METRO LAYOUT (Fluid Curves / Wavy Shapes)
              if (isL) {
                // Landscape (1050x600)
                // Wavy circles on corners
                elements.push({
                  id: `${id}-shape-wave1`,
                  type: "shape",
                  side: "front",
                  x: 800,
                  y: -150,
                  width: 400,
                  height: 400,
                  rotation: 0,
                  opacity: 0.8,
                  locked: true,
                  zIndex: 0,
                  shapeType: "circle",
                  fill: accentColor,
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-wave2`,
                  type: "shape",
                  side: "front",
                  x: 880,
                  y: -180,
                  width: 350,
                  height: 350,
                  rotation: 0,
                  opacity: 0.9,
                  locked: true,
                  zIndex: 1,
                  shapeType: "circle",
                  fill: palette.id === "dark" ? "#111827" : "#f3f4f6",
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-wave3`,
                  type: "shape",
                  side: "front",
                  x: -200,
                  y: 380,
                  width: 450,
                  height: 450,
                  rotation: 0,
                  opacity: 0.9,
                  locked: true,
                  zIndex: 2,
                  shapeType: "circle",
                  fill: accentLightColor,
                  stroke: "none"
                });
                elements.push({
                  id: `${id}-shape-wave4`,
                  type: "shape",
                  side: "front",
                  x: -250,
                  y: 430,
                  width: 400,
                  height: 400,
                  rotation: 0,
                  opacity: 0.95,
                  locked: true,
                  zIndex: 3,
                  shapeType: "circle",
                  fill: palette.id === "dark" ? "#1e293b" : "#e5e7eb",
                  stroke: "none"
                });

                // Logo Centered
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 485,
                  y: 110,
                  width: 80,
                  height: 80,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  shapeType: "circle",
                  fill: "#ffffff",
                  stroke: accentColor,
                  strokeWidth: 4,
                  text: category.substring(0, 2).toUpperCase()
                });

                // Company Centered
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 325,
                  y: 200,
                  width: 400,
                  height: 45,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 24,
                  fontWeight: "800",
                  color: textPrimaryColor,
                  align: "center"
                });

                // Tagline Centered
                elements.push({
                  id: `${id}-el-tagline`,
                  type: "text",
                  side: "front",
                  x: 325,
                  y: 250,
                  width: 400,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 6,
                  text: "CREATIVE & INNOVATIVE SOLUTIONS",
                  fontFamily: data.fontBody,
                  fontSize: 10,
                  fontWeight: "600",
                  color: textSecondaryColor,
                  align: "center",
                  letterSpacing: 2
                });

                // Name & title (compact, centered)
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 325,
                  y: 295,
                  width: 400,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 7,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 22,
                  fontWeight: "850",
                  color: textPrimaryColor,
                  align: "center"
                });
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 325,
                  y: 335,
                  width: 400,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 8,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 13,
                  fontWeight: "600",
                  color: accentColor,
                  align: "center"
                });

                // Contact details centered
                const gap = 32;
                const infoYStart = 380;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 325,
                    y: infoYStart + idx * gap,
                    width: 400,
                    height: 26,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 9 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 12,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "center"
                  });
                });

                // QR Code on right side
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 820,
                  y: 380,
                  width: 140,
                  height: 140,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 13,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });
              } else {
                // Portrait (600x1050)
                elements.push({
                  id: `${id}-shape-wave1`,
                  type: "shape",
                  side: "front",
                  x: 350,
                  y: -150,
                  width: 400,
                  height: 400,
                  rotation: 0,
                  opacity: 0.8,
                  locked: true,
                  zIndex: 0,
                  shapeType: "circle",
                  fill: accentColor
                });
                elements.push({
                  id: `${id}-shape-wave2`,
                  type: "shape",
                  side: "front",
                  x: -200,
                  y: 800,
                  width: 450,
                  height: 450,
                  rotation: 0,
                  opacity: 0.9,
                  locked: true,
                  zIndex: 1,
                  shapeType: "circle",
                  fill: accentLightColor
                });

                // Logo Centered
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 260,
                  y: 180,
                  width: 80,
                  height: 80,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 2,
                  shapeType: "circle",
                  fill: "#ffffff",
                  stroke: accentColor,
                  strokeWidth: 4,
                  text: category.substring(0, 2).toUpperCase()
                });

                // Company Name Centered
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 100,
                  y: 280,
                  width: 400,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 3,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 22,
                  fontWeight: "800",
                  color: textPrimaryColor,
                  align: "center"
                });

                // Employee details
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 100,
                  y: 340,
                  width: 400,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 22,
                  fontWeight: "850",
                  color: textPrimaryColor,
                  align: "center"
                });
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 100,
                  y: 380,
                  width: 400,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 13,
                  fontWeight: "600",
                  color: accentColor,
                  align: "center"
                });

                // Contacts stacked
                const gap = 38;
                const infoYStart = 440;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 100,
                    y: infoYStart + idx * gap,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 6 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 13,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "center"
                  });
                });

                // QR Code
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 220,
                  y: 650,
                  width: 160,
                  height: 160,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 10,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });
              }
            } else {
              // 3. ZEN LAYOUT (Clean Minimalist / Split Striped Column)
              if (isL) {
                // Landscape (1050x600)
                // Left border stripe
                elements.push({
                  id: `${id}-shape-lstripe`,
                  type: "shape",
                  side: "front",
                  x: 0,
                  y: 0,
                  width: 15,
                  height: 600,
                  rotation: 0,
                  opacity: 1,
                  locked: true,
                  zIndex: 0,
                  shapeType: "rect",
                  fill: accentColor
                });
                // Right border stripe
                elements.push({
                  id: `${id}-shape-rstripe`,
                  type: "shape",
                  side: "front",
                  x: 1035,
                  y: 0,
                  width: 15,
                  height: 600,
                  rotation: 0,
                  opacity: 1,
                  locked: true,
                  zIndex: 1,
                  shapeType: "rect",
                  fill: accentDarkColor
                });
                // Vertical splitting bar
                elements.push({
                  id: `${id}-shape-split`,
                  type: "shape",
                  side: "front",
                  x: 380,
                  y: 0,
                  width: 8,
                  height: 600,
                  rotation: 0,
                  opacity: 1,
                  locked: true,
                  zIndex: 2,
                  shapeType: "rect",
                  fill: accentColor
                });

                // Employee Details (left column)
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 50,
                  y: 120,
                  width: 300,
                  height: 45,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 3,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 28,
                  fontWeight: "850",
                  color: textPrimaryColor,
                  align: "left"
                });
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 50,
                  y: 175,
                  width: 300,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 14,
                  fontWeight: "600",
                  color: accentColor,
                  align: "left"
                });

                // QR Code (bottom left column)
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 50,
                  y: 300,
                  width: 180,
                  height: 180,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });

                // Right Column Logo & Company branding
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 430,
                  y: 110,
                  width: 60,
                  height: 60,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 6,
                  shapeType: "circle",
                  fill: "#ffffff",
                  stroke: accentColor,
                  strokeWidth: 3,
                  text: category.substring(0, 2).toUpperCase()
                });
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 510,
                  y: 120,
                  width: 480,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 7,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 20,
                  fontWeight: "700",
                  color: textPrimaryColor,
                  align: "left"
                });

                // Right Column Contact info
                const gap = 44;
                const infoYStart = 220;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 430,
                    y: infoYStart + idx * gap,
                    width: 550,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 8 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 13,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "left"
                  });
                });
              } else {
                // Portrait (600x1050)
                // Horizontal divider line/bar
                elements.push({
                  id: `${id}-shape-split`,
                  type: "shape",
                  side: "front",
                  x: 0,
                  y: 380,
                  width: 600,
                  height: 10,
                  rotation: 0,
                  opacity: 1,
                  locked: true,
                  zIndex: 0,
                  shapeType: "rect",
                  fill: accentColor
                });

                // Top part Employee details
                elements.push({
                  id: `${id}-el-name`,
                  type: "text",
                  side: "front",
                  x: 50,
                  y: 100,
                  width: 500,
                  height: 45,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 1,
                  text: data.name,
                  fontFamily: data.fontTitle,
                  fontSize: 28,
                  fontWeight: "850",
                  color: textPrimaryColor,
                  align: "center"
                });
                elements.push({
                  id: `${id}-el-title`,
                  type: "text",
                  side: "front",
                  x: 50,
                  y: 155,
                  width: 500,
                  height: 30,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 2,
                  text: data.title,
                  fontFamily: data.fontBody,
                  fontSize: 14,
                  fontWeight: "600",
                  color: accentColor,
                  align: "center"
                });
                elements.push({
                  id: `${id}-el-qr`,
                  type: "qr",
                  side: "front",
                  x: 210,
                  y: 200,
                  width: 150,
                  height: 150,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 3,
                  qrType: "url",
                  qrText: `https://${data.web}`,
                  qrColorDark: palette.id === "dark" ? "#ffffff" : "#000000",
                  qrColorLight: palette.id === "dark" ? "#111827" : "#ffffff",
                  qrMargin: 1
                });

                // Bottom part Company and contacts
                elements.push({
                  id: `${id}-el-logo`,
                  type: "logo",
                  side: "front",
                  x: 80,
                  y: 430,
                  width: 60,
                  height: 60,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 4,
                  shapeType: "circle",
                  fill: "#ffffff",
                  stroke: accentColor,
                  strokeWidth: 3,
                  text: category.substring(0, 2).toUpperCase()
                });
                elements.push({
                  id: `${id}-el-company`,
                  type: "text",
                  side: "front",
                  x: 160,
                  y: 440,
                  width: 360,
                  height: 40,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: 5,
                  text: data.company,
                  fontFamily: data.fontTitle,
                  fontSize: 20,
                  fontWeight: "700",
                  color: textPrimaryColor,
                  align: "left"
                });

                const gap = 42;
                const infoYStart = 530;
                const contacts = [
                  { id: "phone", text: `📞  ${data.phone}` },
                  { id: "email", text: `✉️  ${data.email}` },
                  { id: "web", text: `🌐  ${data.web}` },
                  { id: "address", text: `📍  ${data.address}` }
                ];
                contacts.forEach((c, idx) => {
                  elements.push({
                    id: `${id}-el-${c.id}`,
                    type: "text",
                    side: "front",
                    x: 80,
                    y: infoYStart + idx * gap,
                    width: 440,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 6 + idx,
                    text: c.text,
                    fontFamily: data.fontBody,
                    fontSize: 13,
                    fontWeight: "400",
                    color: textSecondaryColor,
                    align: "left"
                  });
                });
              }
            }

            // Back Side Elements (only generated if double sided is true)
            if (isDoubleSided) {
              if (layout === "executive") {
                // Polygon corner back design
                if (isL) {
                  elements.push({
                    id: `${id}-shape-backpoly1`,
                    type: "shape",
                    side: "back",
                    x: -150,
                    y: -150,
                    width: 400,
                    height: 400,
                    rotation: 180,
                    opacity: 0.95,
                    locked: true,
                    zIndex: 0,
                    shapeType: "triangle",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backpoly2`,
                    type: "shape",
                    side: "back",
                    x: -80,
                    y: -80,
                    width: 250,
                    height: 250,
                    rotation: 180,
                    opacity: 0.9,
                    locked: true,
                    zIndex: 1,
                    shapeType: "triangle",
                    fill: accentLightColor
                  });
                  elements.push({
                    id: `${id}-shape-backpoly3`,
                    type: "shape",
                    side: "back",
                    x: 800,
                    y: 350,
                    width: 400,
                    height: 400,
                    rotation: 0,
                    opacity: 0.95,
                    locked: true,
                    zIndex: 2,
                    shapeType: "triangle",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backpoly4`,
                    type: "shape",
                    side: "back",
                    x: 880,
                    y: 430,
                    width: 250,
                    height: 250,
                    rotation: 0,
                    opacity: 0.9,
                    locked: true,
                    zIndex: 3,
                    shapeType: "triangle",
                    fill: accentLightColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 475,
                    y: 150,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 4,
                    shapeType: data.logoType === "circle" ? "circle" : "rect",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 280,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 5,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "850",
                    color: "#ffffff",
                    align: "center"
                  });
                  elements.push({
                    id: `${id}-el-tagline-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 335,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 0.8,
                    locked: false,
                    zIndex: 6,
                    text: "INNOVATION & INTEGRITY",
                    fontFamily: data.fontBody,
                    fontSize: 11,
                    fontWeight: "600",
                    color: accentLightColor,
                    align: "center",
                    letterSpacing: 2
                  });
                  elements.push({
                    id: `${id}-el-web-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 375,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 0.9,
                    locked: false,
                    zIndex: 7,
                    text: data.web,
                    fontFamily: data.fontBody,
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#ffffff",
                    align: "center"
                  });
                } else {
                  // Portrait
                  elements.push({
                    id: `${id}-shape-backpoly1`,
                    type: "shape",
                    side: "back",
                    x: -150,
                    y: -150,
                    width: 350,
                    height: 350,
                    rotation: 180,
                    opacity: 0.95,
                    locked: true,
                    zIndex: 0,
                    shapeType: "triangle",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backpoly2`,
                    type: "shape",
                    side: "back",
                    x: 400,
                    y: 850,
                    width: 350,
                    height: 350,
                    rotation: 0,
                    opacity: 0.95,
                    locked: true,
                    zIndex: 1,
                    shapeType: "triangle",
                    fill: accentColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 250,
                    y: 350,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 2,
                    shapeType: data.logoType === "circle" ? "circle" : "rect",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 100,
                    y: 480,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 3,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "850",
                    color: "#ffffff",
                    align: "center"
                  });
                  elements.push({
                    id: `${id}-el-tagline-back`,
                    type: "text",
                    side: "back",
                    x: 100,
                    y: 535,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 0.8,
                    locked: false,
                    zIndex: 4,
                    text: "INNOVATION & INTEGRITY",
                    fontFamily: data.fontBody,
                    fontSize: 11,
                    fontWeight: "600",
                    color: accentLightColor,
                    align: "center",
                    letterSpacing: 2
                  });
                }
              } else if (layout === "metro") {
                // Wavy corners back design
                if (isL) {
                  elements.push({
                    id: `${id}-shape-backwave1`,
                    type: "shape",
                    side: "back",
                    x: -200,
                    y: -200,
                    width: 400,
                    height: 400,
                    rotation: 0,
                    opacity: 0.85,
                    locked: true,
                    zIndex: 0,
                    shapeType: "circle",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backwave2`,
                    type: "shape",
                    side: "back",
                    x: 850,
                    y: 400,
                    width: 400,
                    height: 400,
                    rotation: 0,
                    opacity: 0.85,
                    locked: true,
                    zIndex: 1,
                    shapeType: "circle",
                    fill: accentColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 475,
                    y: 155,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 2,
                    shapeType: "circle",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 285,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 3,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "850",
                    color: "#ffffff",
                    align: "center"
                  });
                  elements.push({
                    id: `${id}-el-tagline-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 340,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 0.8,
                    locked: false,
                    zIndex: 4,
                    text: "CREATIVE & INNOVATIVE SOLUTIONS",
                    fontFamily: data.fontBody,
                    fontSize: 11,
                    fontWeight: "600",
                    color: accentLightColor,
                    align: "center",
                    letterSpacing: 2
                  });
                } else {
                  // Portrait
                  elements.push({
                    id: `${id}-shape-backwave1`,
                    type: "shape",
                    side: "back",
                    x: -200,
                    y: -200,
                    width: 350,
                    height: 350,
                    rotation: 0,
                    opacity: 0.85,
                    locked: true,
                    zIndex: 0,
                    shapeType: "circle",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backwave2`,
                    type: "shape",
                    side: "back",
                    x: 450,
                    y: 900,
                    width: 350,
                    height: 350,
                    rotation: 0,
                    opacity: 0.85,
                    locked: true,
                    zIndex: 1,
                    shapeType: "circle",
                    fill: accentColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 250,
                    y: 350,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 2,
                    shapeType: "circle",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 100,
                    y: 480,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 3,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "850",
                    color: "#ffffff",
                    align: "center"
                  });
                }
              } else {
                // Split striped back design
                if (isL) {
                  elements.push({
                    id: `${id}-shape-backstripe`,
                    type: "shape",
                    side: "back",
                    x: 0,
                    y: 460,
                    width: 1050,
                    height: 140,
                    rotation: 0,
                    opacity: 1,
                    locked: true,
                    zIndex: 0,
                    shapeType: "rect",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backstripe-line`,
                    type: "shape",
                    side: "back",
                    x: 0,
                    y: 455,
                    width: 1050,
                    height: 5,
                    rotation: 0,
                    opacity: 1,
                    locked: true,
                    zIndex: 1,
                    shapeType: "rect",
                    fill: accentLightColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 475,
                    y: 110,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 2,
                    shapeType: "circle",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 230,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 3,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "800",
                    color: textPrimaryColor,
                    align: "center"
                  });
                  elements.push({
                    id: `${id}-el-tagline-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 285,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 0.8,
                    locked: false,
                    zIndex: 4,
                    text: "QUALITY · INTEGRITY · TRUST",
                    fontFamily: data.fontBody,
                    fontSize: 11,
                    fontWeight: "600",
                    color: textSecondaryColor,
                    align: "center",
                    letterSpacing: 3
                  });
                  elements.push({
                    id: `${id}-el-web-back`,
                    type: "text",
                    side: "back",
                    x: 325,
                    y: 515,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 5,
                    text: data.web,
                    fontFamily: data.fontBody,
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#ffffff",
                    align: "center"
                  });
                } else {
                  // Portrait split back design
                  elements.push({
                    id: `${id}-shape-backstripe`,
                    type: "shape",
                    side: "back",
                    x: 0,
                    y: 850,
                    width: 600,
                    height: 200,
                    rotation: 0,
                    opacity: 1,
                    locked: true,
                    zIndex: 0,
                    shapeType: "rect",
                    fill: accentColor
                  });
                  elements.push({
                    id: `${id}-shape-backstripe-line`,
                    type: "shape",
                    side: "back",
                    x: 0,
                    y: 845,
                    width: 600,
                    height: 5,
                    rotation: 0,
                    opacity: 1,
                    locked: true,
                    zIndex: 1,
                    shapeType: "rect",
                    fill: accentLightColor
                  });

                  elements.push({
                    id: `${id}-el-logo-back`,
                    type: "logo",
                    side: "back",
                    x: 250,
                    y: 200,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 2,
                    shapeType: "circle",
                    fill: "#ffffff",
                    stroke: accentColor,
                    strokeWidth: 4,
                    text: category.substring(0, 2).toUpperCase()
                  });
                  elements.push({
                    id: `${id}-el-company-back`,
                    type: "text",
                    side: "back",
                    x: 100,
                    y: 320,
                    width: 400,
                    height: 45,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 3,
                    text: data.company,
                    fontFamily: data.fontTitle,
                    fontSize: 26,
                    fontWeight: "800",
                    color: textPrimaryColor,
                    align: "center"
                  });
                  elements.push({
                    id: `${id}-el-web-back`,
                    type: "text",
                    side: "back",
                    x: 100,
                    y: 930,
                    width: 400,
                    height: 30,
                    rotation: 0,
                    opacity: 1,
                    locked: false,
                    zIndex: 4,
                    text: data.web,
                    fontFamily: data.fontBody,
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#ffffff",
                    align: "center"
                  });
                }
              }
            }

            templates.push({
              id,
              name,
              category,
              orientation,
              isDoubleSided,
              presetSize: "us_standard",
              backgrounds,
              elements,
            });
          }
        }
      }
    }
  }

  return templates;
}
