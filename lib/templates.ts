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

type IndustryProfile = (typeof INDUSTRY_DATA)[keyof typeof INDUSTRY_DATA];

function createOriginalComposition(category: string, data: IndustryProfile, index: number, orientation: "landscape" | "portrait"): CardElement[] {
  const portrait = orientation === "portrait";
  const W = portrait ? 600 : 1050;
  const H = portrait ? 1050 : 600;
  const paletteIndex = index % 10;
  const ink = ["#172554","#18211f","#111827","#251b35","#171717","#071d2b","#18332d","#20243a","#202020","#33251f"][paletteIndex];
  const paper = ["#f8fafc","#f4f1ea","#f5f7fb","#fff8f1","#f5f0e6","#071d2b","#f3f5ef","#f4f1e9","#f8f5f1","#f8f1e8"][paletteIndex];
  const accent = ["#2563eb","#a36b45","#22c55e","#f97316","#c6a15b","#38bdf8","#6b9b79","#b08b56","#e64b3c","#b45c42"][paletteIndex];
  const muted = ["#64748b","#756b60","#64748b","#796b60","#756b60","#8ba5b6","#69786c","#756b60","#77716d","#82756a"][paletteIndex];
  const out: CardElement[] = [];
  let z = 0;
  const shape = (side: "front"|"back", x:number,y:number,width:number,height:number,fill:string,shapeType:"rect"|"circle"|"line"|"triangle"="rect",extra:Partial<CardElement>={}) => out.push({id:"studio-"+index+"-"+side+"-shape-"+z,type:"shape",side,x,y,width,height,rotation:0,opacity:1,locked:false,zIndex:z++,shapeType,fill,stroke:"none",...extra});
  const text = (side:"front"|"back",x:number,y:number,width:number,height:number,value:string,size:number,color:string,extra:Partial<CardElement>={}) => out.push({id:"studio-"+index+"-"+side+"-text-"+z,type:"text",side,x,y,width,height,rotation:0,opacity:1,locked:false,zIndex:z++,text:value,fontFamily:extra.fontFamily||data.fontBody,fontSize:size,fontWeight:extra.fontWeight||"500",color,align:extra.align||"left",...extra});
  const logo = (side:"front"|"back",x:number,y:number,size:number,fill:string,color:string) => out.push({id:"studio-"+index+"-"+side+"-logo-"+z,type:"logo",side,x,y,width:size,height:size,rotation:0,opacity:1,locked:false,zIndex:z++,shapeType:"circle",fill,stroke:color,strokeWidth:2,text:category.slice(0,2).toUpperCase()});
  const qr = (side:"front"|"back",x:number,y:number,size:number,dark:string,light:string) => out.push({id:"studio-"+index+"-"+side+"-qr-"+z,type:"qr",side,x,y,width:size,height:size,rotation:0,opacity:1,locked:false,zIndex:z++,qrType:"url",qrData:data.web,qrText:data.web,qrColorDark:dark,qrColorLight:light,qrMargin:2});

  if(index===0){ // Swiss editorial grid
    shape("front",0,0,18,H,accent); text("front",64,52,800,24,data.company.toUpperCase(),15,accent,{fontWeight:"800",letterSpacing:3});
    text("front",64,150,850,80,data.name,48,ink,{fontFamily:"Helvetica",fontWeight:"800"});
    text("front",66,236,700,30,data.title.toUpperCase(),14,muted,{fontWeight:"700",letterSpacing:2});
    shape("front",64,300,920,3,ink); text("front",66,342,420,30,data.email,17,ink); text("front",66,390,420,30,data.phone,17,ink);
    text("front",550,342,420,30,data.web,17,ink); text("front",550,390,420,55,data.address,15,muted);
    shape("back",0,0,W,H,ink); text("back",70,70,900,120,data.company,42,"#ffffff",{fontWeight:"800"});
    text("back",72,235,780,40,"THOUGHTFUL WORK. LASTING IMPACT.",15,accent,{letterSpacing:3});
    shape("back",72,315,900,2,"#64748b"); text("back",72,365,690,30,data.web,19,"#ffffff"); qr("back",850,350,125,"#172554","#ffffff");
  } else if(index===1){ // Architectural split panel
    shape("front",0,0,360,H,ink); shape("front",360,0,12,H,accent); logo("front",112,100,132,ink,accent);
    text("front",55,285,250,55,data.company,25,"#ffffff",{align:"center",fontWeight:"800"});
    text("front",420,105,570,70,data.name,38,ink,{fontWeight:"800"}); text("front",422,180,550,30,data.title,17,accent,{fontWeight:"700"});
    shape("front",422,245,520,2,"#cbd5e1"); text("front",422,285,560,30,data.phone,17,ink); text("front",422,335,560,30,data.email,16,ink); text("front",422,385,560,30,data.web,16,ink);
    shape("back",0,0,W,H,accent); shape("back",35,35,W-70,H-70,"none","rect",{stroke:"#ffffff",strokeWidth:2});
    text("back",80,105,800,90,data.company.toUpperCase(),42,"#ffffff",{align:"center",fontWeight:"800",letterSpacing:2});
    text("back",100,255,650,50,"LET'S BUILD SOMETHING GREAT.",18,"#ffffff",{align:"center",letterSpacing:2}); qr("back",820,220,130,"#172554","#ffffff");
  } else if(index===2){ // Circular seal
    shape("front",0,0,W,H,paper); shape("front",355,52,250,250,"none","circle",{stroke:accent,strokeWidth:5});
    shape("front",378,75,204,204,"none","circle",{stroke:ink,strokeWidth:1}); logo("front",430,127,100,paper,accent);
    text("front",80,335,890,55,data.name,34,ink,{align:"center",fontFamily:"Georgia",fontWeight:"700"});
    text("front",100,395,850,24,data.title.toUpperCase(),13,accent,{align:"center",letterSpacing:3,fontWeight:"700"});
    text("front",100,475,850,24,data.web+"  •  "+data.phone,14,muted,{align:"center"});
    shape("back",0,0,W,H,ink); shape("back",375,85,300,300,"none","circle",{stroke:accent,strokeWidth:4});
    text("back",100,205,850,55,data.company,34,"#ffffff",{align:"center",fontFamily:"Georgia",fontWeight:"700"});
    text("back",100,440,850,35,data.email,18,"#ffffff",{align:"center"});
  } else if(index===3){ // Brutalist typography
    shape("front",0,0,250,H,accent); text("front",38,42,180,180,category.slice(0,1),170,"#ffffff",{fontFamily:"Arial Black",fontWeight:"900",align:"center"});
    text("front",300,72,690,88,data.name.toUpperCase(),43,ink,{fontFamily:"Arial Black",fontWeight:"900"});
    shape("front",300,180,650,12,ink); text("front",302,220,650,35,data.title,20,ink,{fontWeight:"700"});
    text("front",302,330,650,28,data.email,17,muted); text("front",302,380,650,28,data.phone,17,muted); text("front",302,430,650,28,data.web,17,muted);
    shape("back",0,0,W,H,paper); text("back",65,55,900,125,data.company.toUpperCase(),54,ink,{fontFamily:"Arial Black",fontWeight:"900"});
    shape("back",65,215,920,5,accent); text("back",65,275,600,60,"MAKE IT MATTER.",36,ink,{fontWeight:"900"}); qr("back",825,345,130,ink,"#ffffff");
  } else if(index===4){ // Quiet luxury
    shape("front",28,28,W-56,H-56,"none","rect",{stroke:accent,strokeWidth:2}); shape("front",42,42,W-84,H-84,"none","rect",{stroke:"#cbd5e1",strokeWidth:1});
    text("front",90,78,870,28,data.company.toUpperCase(),13,accent,{align:"center",letterSpacing:5,fontWeight:"700"}); logo("front",465,145,120,ink,accent);
    text("front",100,315,850,55,data.name,36,ink,{fontFamily:"Georgia",align:"center"}); text("front",100,375,850,25,data.title.toUpperCase(),12,muted,{align:"center",letterSpacing:3});
    text("front",100,455,850,25,data.web,16,ink,{align:"center"}); shape("back",0,0,W,H,ink); shape("back",40,40,W-80,H-80,"none","rect",{stroke:accent,strokeWidth:2});
    text("back",100,125,850,60,data.company,34,"#f8fafc",{fontFamily:"Georgia",align:"center"}); shape("back",480,235,90,2,accent);
    text("back",100,300,850,32,data.email,18,"#f8fafc",{align:"center"}); text("back",100,355,850,32,data.phone,18,"#f8fafc",{align:"center"});
  } else if(index===5){ // Technical blueprint
    shape("front",0,0,W,H,ink); for(let x=0;x<=W;x+=75)shape("front",x,0,1,H,"#18384b"); for(let y=0;y<=H;y+=75)shape("front",0,y,W,1,"#18384b");
    shape("front",65,65,8,470,accent); text("front",105,75,850,28,"SYSTEMS / NETWORK / INNOVATION",13,accent,{fontFamily:"monospace",letterSpacing:3});
    text("front",105,175,820,65,data.name,42,"#f8fafc",{fontWeight:"800"}); text("front",105,250,820,28,data.title,17,"#a9c4d2");
    text("front",105,360,820,28,data.email,17,"#f8fafc"); text("front",105,410,820,28,data.web,17,"#f8fafc"); text("front",105,460,820,28,data.phone,17,"#f8fafc");
    shape("back",0,0,W,H,"#f8fafc"); text("back",65,65,650,45,data.company,30,ink,{fontWeight:"800"});
    text("back",65,135,650,30,"DIGITAL IDENTITY / CONTACT NODE",13,accent,{fontFamily:"monospace",letterSpacing:2}); qr("back",790,180,170,ink,"#ffffff");
    text("back",65,270,650,35,data.email,17,ink); text("back",65,325,650,35,data.phone,17,ink); text("back",65,380,650,35,data.address,14,muted);
  } else if(index===6){ // Portrait editorial
    shape("front",0,0,W,270,accent); shape("front",42,42,W-84,186,"none","rect",{stroke:"#ffffff",strokeWidth:2});
    text("front",70,80,W-140,40,data.company.toUpperCase(),20,"#ffffff",{align:"center",letterSpacing:2,fontWeight:"800"});
    text("front",45,350,W-90,90,data.name,40,ink,{align:"center",fontFamily:"Georgia",fontWeight:"700"});
    text("front",45,445,W-90,35,data.title,17,accent,{align:"center"}); shape("front",205,525,190,3,ink);
    text("front",50,605,W-100,32,data.phone,18,ink,{align:"center"}); text("front",50,660,W-100,48,data.email,16,muted,{align:"center"});
    text("front",50,735,W-100,32,data.web,18,ink,{align:"center"}); shape("back",0,0,W,H,ink);
    text("back",55,210,W-110,70,data.company,33,"#ffffff",{align:"center",fontWeight:"800"}); logo("back",235,360,130,ink,accent);
    text("back",55,565,W-110,45,"SCAN TO CONNECT",17,accent,{align:"center",letterSpacing:3}); qr("back",215,650,170,"#111827","#ffffff");
  } else if(index===7){ // Architectural real estate
    shape("front",0,0,430,H,"#20243a"); shape("front",430,0,620,H,paper);
    shape("front",80,100,260,350,"none","rect",{stroke:accent,strokeWidth:3}); shape("front",105,145,210,305,accent,"triangle"); shape("front",150,210,125,240,"#20243a","triangle");
    text("front",480,100,520,85,data.name,36,ink,{fontFamily:"Georgia",fontWeight:"700"}); text("front",482,190,520,30,data.title,15,accent,{fontWeight:"700"});
    shape("front",482,255,440,2,"#cbd5e1"); text("front",482,295,520,28,data.phone,16,ink); text("front",482,345,520,28,data.email,15,ink); text("front",482,395,520,28,data.web,16,ink);
    shape("back",0,0,W,H,paper); text("back",70,85,900,55,data.company.toUpperCase(),34,ink,{fontWeight:"800",letterSpacing:2});
    text("back",70,185,650,55,"SPACES WITH PURPOSE.",24,accent,{fontFamily:"Georgia"}); qr("back",810,310,150,ink,"#ffffff");
    text("back",70,420,650,35,data.address,16,muted);
  } else if(index===8){ // Kinetic diagonals
    shape("front",0,0,W,H,"#fffaf5"); shape("front",-120,-160,500,900,accent,"rect",{rotation:22}); shape("front",35,-180,120,900,ink,"rect",{rotation:22,opacity:0.92});
    text("front",365,82,620,75,data.name,43,ink,{fontWeight:"900"}); text("front",370,170,580,35,data.title.toUpperCase(),14,accent,{letterSpacing:2,fontWeight:"800"});
    text("front",370,325,600,28,data.email,17,ink); text("front",370,375,600,28,data.web,17,ink); text("front",370,425,600,28,data.phone,17,ink);
    shape("back",0,0,W,H,accent); text("back",70,100,900,85,data.company,45,"#ffffff",{fontWeight:"900"});
    text("back",75,230,700,35,"MAKE YOUR MARK.",20,"#ffffff",{letterSpacing:4}); qr("back",820,350,135,"#111827","#ffffff");
  } else if(index===10){ // Monogram luxury
    shape("front",0,0,W,H,"#101820"); shape("front",60,60,930,480,"none","rect",{stroke:"#c6a15b",strokeWidth:2});
    text("front",350,95,350,190,category.slice(0,1).toUpperCase(),150,"#c6a15b",{fontFamily:"Georgia",align:"center"});
    text("front",100,330,850,48,data.name,34,"#ffffff",{fontFamily:"Georgia",align:"center"});
    text("front",100,390,850,28,data.title.toUpperCase(),13,"#c6a15b",{align:"center",letterSpacing:4});
    shape("back",0,0,W,H,"#c6a15b"); text("back",90,115,650,60,data.company,36,"#101820",{fontFamily:"Georgia"});
    text("back",90,220,650,30,data.email,17,"#101820"); text("back",90,270,650,30,data.phone,17,"#101820");
    qr("back",810,205,150,"#101820","#ffffff");
  } else if(index===11){ // Color-block modernist
    shape("front",0,0,700,H,"#f4f1ea"); shape("front",700,0,350,H,"#f05d3b"); shape("front",70,70,180,180,"#18211f","circle");
    text("front",70,115,180,75,"A",68,"#ffffff",{align:"center",fontWeight:"900"});
    text("front",300,100,350,75,data.name,38,"#18211f",{fontWeight:"900"}); text("front",300,190,350,30,data.title,16,"#f05d3b");
    text("front",300,330,350,28,data.email,15,"#18211f"); text("front",300,380,350,28,data.phone,15,"#18211f");
    shape("back",0,0,W,H,"#18211f"); shape("back",0,0,28,H,"#f05d3b");
    text("back",85,125,800,75,data.company.toUpperCase(),38,"#ffffff",{fontWeight:"900",letterSpacing:2});
    text("back",85,245,650,35,"IDEAS INTO ACTION.",20,"#f05d3b",{fontWeight:"800"}); qr("back",825,350,130,"#18211f","#ffffff");
  } else if(index===12){ // Organic wellness
    shape("front",0,0,W,H,"#edf2e8"); shape("front",690,-130,480,480,"#9caf88","circle");
    shape("front",760,300,360,360,"#d8a77b","circle"); shape("front",55,65,8,470,"#47634c");
    text("front",100,105,550,75,data.company,35,"#294333",{fontFamily:"Georgia"});
    text("front",100,220,560,55,data.name,30,"#294333",{fontWeight:"700"});
    text("front",100,280,560,28,data.title,16,"#6e826d"); text("front",100,385,560,28,data.phone,16,"#294333");
    text("front",100,430,560,28,data.web,16,"#294333");
    shape("back",0,0,W,H,"#294333"); shape("back",75,70,900,460,"none","rect",{stroke:"#c9d7bd",strokeWidth:2});
    text("back",120,150,800,55,"GROW WELL. LIVE WELL.",27,"#edf2e8",{fontFamily:"Georgia",align:"center"});
    text("back",120,260,800,30,data.email,17,"#edf2e8",{align:"center"}); qr("back",455,350,130,"#294333","#ffffff");
  } else if(index===13){ // Vertical sidebar profile
    shape("front",0,0,270,H,"#222b45"); shape("front",270,0,14,H,"#f4a261");
    text("front",45,100,180,120,category.slice(0,2).toUpperCase(),58,"#ffffff",{align:"center",fontWeight:"900"});
    text("front",335,100,650,70,data.name,38,"#222b45",{fontWeight:"800"});
    text("front",338,180,620,28,data.title.toUpperCase(),14,"#d97745",{letterSpacing:2});
    shape("front",338,240,570,2,"#cbd5e1"); text("front",338,285,620,28,data.email,16,"#222b45");
    text("front",338,335,620,28,data.phone,16,"#222b45"); text("front",338,385,620,28,data.web,16,"#222b45");
    shape("back",0,0,W,H,"#f7f4ef"); shape("back",0,0,W,24,"#222b45");
    text("back",75,115,650,65,data.company,37,"#222b45",{fontFamily:"Georgia"});
    text("back",75,220,650,30,data.address,16,"#64748b"); qr("back",820,330,135,"#222b45","#ffffff");
  } else if(index===14){ // Photo-frame placeholder / portfolio
    shape("front",0,0,W,H,"#f3f4f6"); shape("front",55,55,350,490,"#dbeafe");
    shape("front",95,95,270,270,"#93c5fd","circle"); shape("front",150,150,160,160,"#1e3a8a","circle");
    text("front",455,100,530,65,data.name,39,"#111827",{fontWeight:"800"});
    text("front",458,180,520,30,data.title,17,"#2563eb"); shape("front",458,240,450,3,"#111827");
    text("front",458,300,520,28,data.email,16,"#111827"); text("front",458,350,520,28,data.web,16,"#111827");
    text("front",458,400,520,28,data.phone,16,"#111827");
    shape("back",0,0,W,H,"#111827"); text("back",75,95,850,70,"YOUR NEXT GREAT PROJECT.",28,"#ffffff",{fontWeight:"900"});
    text("back",75,220,650,30,data.company,20,"#93c5fd"); qr("back",820,340,140,"#111827","#ffffff");
  } else if(index===15){ // Premium diagonal foil
    shape("front",0,0,W,H,"#171717"); shape("front",-130,-180,430,900,"#b08b56","rect",{rotation:18});
    shape("front",-55,-180,70,900,"#e7d3a5","rect",{rotation:18});
    text("front",350,105,620,70,data.company.toUpperCase(),29,"#e7d3a5",{fontFamily:"Georgia",letterSpacing:2});
    text("front",350,235,620,55,data.name,34,"#ffffff",{fontFamily:"Georgia"}); text("front",350,300,620,25,data.title,14,"#b08b56");
    text("front",350,405,620,28,data.web,16,"#ffffff"); text("front",350,455,620,28,data.phone,16,"#ffffff");
    shape("back",0,0,W,H,"#b08b56"); shape("back",35,35,W-70,H-70,"none","rect",{stroke:"#171717",strokeWidth:2});
    text("back",100,130,850,55,data.company,34,"#171717",{fontFamily:"Georgia",align:"center"});
    text("back",100,260,850,30,data.email,18,"#171717",{align:"center"}); qr("back",460,355,130,"#171717","#ffffff");
  } else if(index===16){ // Neo-brutal grid
    shape("front",0,0,W,H,"#f8e94e"); shape("front",55,55,940,490,"#ffffff");
    shape("front",55,55,940,115,"#171717"); text("front",85,88,870,45,data.company.toUpperCase(),25,"#ffffff",{fontWeight:"900",letterSpacing:2});
    text("front",90,220,840,70,data.name.toUpperCase(),43,"#171717",{fontWeight:"900"});
    text("front",90,300,840,30,data.title,18,"#171717"); shape("front",90,365,850,5,"#171717");
    text("front",90,405,420,28,data.email,16,"#171717"); text("front",560,405,400,28,data.phone,16,"#171717");
    shape("back",0,0,W,H,"#171717"); text("back",70,100,850,100,"NO BORING BUSINESS.",38,"#f8e94e",{fontWeight:"900"});
    text("back",75,250,650,30,data.web,18,"#ffffff"); qr("back",825,350,135,"#171717","#ffffff");
  } else if(index===17){ // Art deco symmetry
    shape("front",0,0,W,H,"#142b2b"); shape("front",60,45,W-120,H-90,"none","rect",{stroke:"#d8b56d",strokeWidth:2});
    shape("front",430,75,190,190,"none","triangle",{stroke:"#d8b56d",strokeWidth:3});
    shape("front",465,115,120,120,"none","triangle",{stroke:"#d8b56d",strokeWidth:2});
    text("front",100,300,850,48,data.company,32,"#f4e8c9",{fontFamily:"Georgia",align:"center"});
    text("front",100,365,850,40,data.name,25,"#d8b56d",{fontFamily:"Georgia",align:"center"});
    text("front",100,425,850,25,data.title.toUpperCase(),12,"#f4e8c9",{align:"center",letterSpacing:3});
    shape("back",0,0,W,H,"#f4e8c9"); text("back",85,100,850,55,"ESTABLISHED WITH INTENT",24,"#142b2b",{fontFamily:"Georgia",align:"center"});
    text("back",100,240,850,30,data.phone,17,"#142b2b",{align:"center"}); text("back",100,290,850,30,data.email,17,"#142b2b",{align:"center"});
    qr("back",455,375,130,"#142b2b","#ffffff");
  } else if(index===18){ // Minimal typographic stack
    shape("front",0,0,W,H,"#ffffff"); shape("front",0,0,W,18,"#111827");
    text("front",70,75,900,35,data.company.toUpperCase(),14,"#64748b",{letterSpacing:4,fontWeight:"700"});
    text("front",70,185,900,100,data.name,58,"#111827",{fontWeight:"300"});
    text("front",75,300,850,30,data.title,18,"#6366f1"); shape("front",75,365,900,1,"#cbd5e1");
    text("front",75,405,420,25,data.email,16,"#111827"); text("front",540,405,420,25,data.web,16,"#111827");
    shape("back",0,0,W,H,"#6366f1"); text("back",80,140,850,75,data.company,40,"#ffffff",{fontWeight:"800"});
    text("back",80,255,650,30,data.phone,18,"#ffffff"); qr("back",820,350,135,"#6366f1","#ffffff");
  } else if(index===19){ // Contemporary dark gradient-like bands
    shape("front",0,0,W,H,"#101827"); shape("front",0,0,W,18,"#22d3ee");
    shape("front",0,470,W,130,"#172b43"); shape("front",75,85,105,105,"#22d3ee","circle");
    text("front",220,95,760,65,data.name,40,"#f8fafc",{fontWeight:"800"});
    text("front",222,170,700,30,data.title.toUpperCase(),14,"#22d3ee",{letterSpacing:2});
    text("front",80,365,850,28,data.email,17,"#f8fafc"); text("front",80,415,850,28,data.web,17,"#f8fafc");
    shape("back",0,0,W,H,"#172b43"); text("back",75,110,850,65,data.company,36,"#f8fafc",{fontWeight:"800"});
    text("back",75,220,650,35,"CONNECT BEYOND THE CARD.",18,"#22d3ee",{letterSpacing:2}); qr("back",820,350,140,"#172b43","#ffffff");
  } else { // Editorial hospitality / menu
    shape("front",0,0,W,H,paper); shape("front",42,42,W-84,H-84,"none","rect",{stroke:accent,strokeWidth:2});
    text("front",95,82,860,45,data.company,31,ink,{fontFamily:"Georgia",align:"center"}); text("front",100,140,850,24,"EST. WITH PASSION",12,accent,{align:"center",letterSpacing:5});
    shape("front",465,195,120,2,accent); text("front",110,245,830,45,data.name,29,ink,{fontFamily:"Georgia",align:"center"});
    text("front",100,300,850,24,data.title,14,muted,{align:"center"}); text("front",100,390,850,25,data.phone+"  •  "+data.web,15,ink,{align:"center"});
    shape("back",0,0,W,H,"#33251f"); text("back",75,75,900,55,"A NOTE OF THANKS",26,"#f8f1e8",{fontFamily:"Georgia",align:"center",letterSpacing:2});
    shape("back",470,165,110,2,accent); text("back",110,230,830,80,data.address,18,"#f8f1e8",{align:"center"});
    qr("back",455,365,140,"#33251f","#ffffff");
  }
  return out;
}

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

  const featured = [
    ["Corporate", "executive", "landscape", "navy", "01 · Swiss Editorial"],
    ["Minimal", "zen", "landscape", "light", "02 · Architectural Split"],
    ["Modern", "metro", "landscape", "dark", "03 · Circular Identity"],
    ["Creative", "metro", "landscape", "brand", "04 · Brutalist Typography"],
    ["Luxury", "executive", "landscape", "luxury", "05 · Quiet Luxury"],
    ["Technology", "metro", "landscape", "emerald", "06 · Tech Blueprint"],
    ["Real Estate", "executive", "landscape", "navy", "07 · Portrait Editorial"],
    ["Restaurant", "zen", "landscape", "luxury", "08 · Architectural Property"],
    ["Healthcare", "zen", "landscape", "emerald", "09 · Kinetic Creative"],
    ["Freelancer", "metro", "portrait", "brand", "10 · Hospitality Editorial"],
    ["Luxury", "executive", "landscape", "luxury", "11 · Monogram Luxury"],
    ["Creative", "metro", "landscape", "brand", "12 · Color-Block Modernist"],
    ["Healthcare", "zen", "landscape", "emerald", "13 · Organic Wellness"],
    ["Corporate", "executive", "landscape", "navy", "14 · Vertical Sidebar"],
    ["Freelancer", "metro", "landscape", "light", "15 · Portfolio Profile"],
    ["Luxury", "executive", "landscape", "luxury", "16 · Premium Foil"],
    ["Creative", "metro", "landscape", "brand", "17 · Neo-Brutalist Grid"],
    ["Restaurant", "zen", "landscape", "luxury", "18 · Art Deco Symmetry"],
    ["Corporate", "executive", "landscape", "navy", "19 · Minimal Typographic"],
    ["Technology", "metro", "landscape", "emerald", "20 · Neon Tech"]
  ] as const;

  // Ten original, curated designs created for QR Studio (not copied Canva assets).
  // Build a typed result explicitly so missing optional template matches never
  // leak null into the Template[] return type.
  const featuredTemplates: Template[] = [];

  for (const [category, layout, orientation, palette, label] of featured) {
    const id = `tpl-${category.toLowerCase()}-${layout}-${orientation}-${palette}-double`.replace(/\s+/g, "-");
    const template = templates.find(item => item.id === id);

    if (template) {
      const designIndex = featuredTemplates.length;
      const uniqueOrientation = designIndex === 6 ? "portrait" : "landscape";
      featuredTemplates.push({
        ...template,
        name: label,
        orientation: uniqueOrientation,
        presetSize: "us_standard",
        backgrounds: {
          front: { type: "color", color: ["#f8fafc","#f4f1ea","#f5f7fb","#fff8f1","#f5f0e6","#071d2b","#f3f5ef","#f4f1e9","#fffaf5","#f8f1e8"][designIndex] },
          back: { type: "color", color: ["#172554","#18211f","#111827","#251b35","#171717","#f8fafc","#111827","#20243a","#e64b3c","#33251f"][designIndex] }
        },
        elements: createOriginalComposition(category, INDUSTRY_DATA[category], designIndex, uniqueOrientation)
      });
    }
  }

  return featuredTemplates;
}
