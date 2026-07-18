'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

// Google Fonts list for additional text
const FONTS = [
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Outfit', value: 'Outfit, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Pacifico', value: 'Pacifico, cursive' },
  { name: 'Caveat', value: 'Caveat, cursive' },
  { name: 'Courier New', value: '"Courier New", monospace' },
];

interface PresetTemplate {
  id: string;
  name: string;
  bodyShape: string;
  eyeOuter: string;
  eyeInner: string;
  bodyColorType: 'single' | 'gradient';
  bodyColor: string;
  bodyColorEnd?: string;
  bodyGradAngle?: number;
  eyeOuterColor: string;
  eyeInnerColor: string;
  bgColor: string;
  bgType: 'single' | 'gradient' | 'transparent';
  frame: string;
  frameColor?: string;
  frameBgColor?: string;
  frameText?: string;
  frameFont?: string;
  frameFontSize?: string;
  frameTextColor?: string;
  frameIcon?: string;
  selectedLogo?: string;
  decoration?: string;
}

// Generate the massive library of 64 pre-made templates
const generatePresetTemplates = (): PresetTemplate[] => {
  const list: PresetTemplate[] = [];

  // 1. None / Standard Clean
  list.push({
    id: 'curated-none',
    name: 'Standard Clean',
    bodyShape: 'square',
    eyeOuter: 'square',
    eyeInner: 'square',
    bodyColorType: 'single',
    bodyColor: '#1e293b',
    eyeOuterColor: '#1e293b',
    eyeInnerColor: '#1e293b',
    bgColor: '#ffffff',
    bgType: 'single',
    frame: 'none',
    decoration: 'none',
  });

  // 2. Curated Autumn Flowers
  list.push({
    id: 'curated-flowers',
    name: 'Autumn Blossoms',
    bodyShape: 'circle',
    eyeOuter: 'circle',
    eyeInner: 'circle',
    bodyColorType: 'single',
    bodyColor: '#b45309',
    eyeOuterColor: '#b45309',
    eyeInnerColor: '#ea580c',
    bgColor: '#fffbfa',
    bgType: 'single',
    frame: 'none',
    decoration: 'flowers',
  });

  // 3. Curated Foliage
  list.push({
    id: 'curated-foliage',
    name: 'Green Foliage',
    bodyShape: 'rounded',
    eyeOuter: 'leaf',
    eyeInner: 'circle',
    bodyColorType: 'single',
    bodyColor: '#047857',
    eyeOuterColor: '#047857',
    eyeInnerColor: '#059669',
    bgColor: '#f0fdf4',
    bgType: 'single',
    frame: 'none',
    decoration: 'foliage',
  });

  // 4. Curated Builder Site
  list.push({
    id: 'curated-builder',
    name: 'Construction Site',
    bodyShape: 'square',
    eyeOuter: 'shield',
    eyeInner: 'square',
    bodyColorType: 'single',
    bodyColor: '#581c87',
    eyeOuterColor: '#581c87',
    eyeInnerColor: '#eab308',
    bgColor: '#faf5ff',
    bgType: 'single',
    frame: 'border',
    frameColor: '#581c87',
    frameBgColor: '#ffffff',
    frameText: 'BUILDING SITE',
    frameTextColor: '#ffffff',
    decoration: 'builder',
  });

  // 5. Curated Holiday Holly
  list.push({
    id: 'curated-christmas',
    name: 'Christmas Holly',
    bodyShape: 'cross',
    eyeOuter: 'rounded',
    eyeInner: 'square',
    bodyColorType: 'single',
    bodyColor: '#14532d',
    eyeOuterColor: '#dc2626',
    eyeInnerColor: '#16a34a',
    bgColor: '#fdf2f2',
    bgType: 'single',
    frame: 'none',
    decoration: 'stars',
  });

  // 6. Curated Sakura Hearts
  list.push({
    id: 'curated-hearts',
    name: 'Sakura Hearts',
    bodyShape: 'heart',
    eyeOuter: 'rounded',
    eyeInner: 'circle',
    bodyColorType: 'gradient',
    bodyColor: '#ec4899',
    bodyColorEnd: '#a21caf',
    bodyGradAngle: 45,
    eyeOuterColor: '#db2777',
    eyeInnerColor: '#701a75',
    bgColor: '#fdf2f8',
    bgType: 'single',
    frame: 'none',
    decoration: 'hearts',
  });

  // 7. Curated Birthday Balloons
  list.push({
    id: 'curated-birthday',
    name: 'Happy Birthday',
    bodyShape: 'rounded',
    eyeOuter: 'circle',
    eyeInner: 'rounded',
    bodyColorType: 'gradient',
    bodyColor: '#db2777',
    bodyColorEnd: '#2563eb',
    bodyGradAngle: 90,
    eyeOuterColor: '#2563eb',
    eyeInnerColor: '#db2777',
    bgColor: '#faf5ff',
    bgType: 'single',
    frame: 'border',
    frameColor: '#7c3aed',
    frameBgColor: '#ffffff',
    frameText: 'HAPPY BIRTHDAY',
    frameTextColor: '#ffffff',
    decoration: 'balloons',
  });

  // Programmatically generate another 57 templates to make 64 templates in total
  const shapes = ['square', 'circle', 'rounded', 'diamond', 'star', 'heart', 'cross', 'hexagon', 'liquid', 'point'];
  const outers = ['square', 'rounded', 'circle', 'leaf', 'shield'];
  const inners = ['square', 'circle', 'rounded', 'diamond', 'star'];
  const colorSchemes = [
    { name: 'Ocean Aqua', main: '#0891b2', end: '#06b6d4' },
    { name: 'Emerald Forest', main: '#047857', end: '#10b981' },
    { name: 'Lava Flame', main: '#b91c1c', end: '#ef4444' },
    { name: 'Midnight Violet', main: '#7e22ce', end: '#ec4899' },
    { name: 'Tangerine Sun', main: '#ea580c', end: '#f97316' },
    { name: 'Goldenrod', main: '#d97706', end: '#f59e0b' },
    { name: 'Royal Sapphire', main: '#1d4ed8', end: '#3b82f6' },
    { name: 'Sakura Petals', main: '#be185d', end: '#f472b6' },
  ];
  const decors = ['none', 'flowers', 'foliage', 'stars', 'hearts', 'balloons'];

  let idCounter = 1;
  while (list.length < 64) {
    const shape = shapes[idCounter % shapes.length];
    const outer = outers[idCounter % outers.length];
    const inner = inners[idCounter % inners.length];
    const color = colorSchemes[idCounter % colorSchemes.length];
    const dec = decors[idCounter % decors.length];

    list.push({
      id: `generated-tmpl-${idCounter}`,
      name: `${color.name} ${shape.charAt(0).toUpperCase() + shape.slice(1)}`,
      bodyShape: shape,
      eyeOuter: outer,
      eyeInner: inner,
      bodyColorType: idCounter % 2 === 0 ? 'gradient' : 'single',
      bodyColor: color.main,
      bodyColorEnd: color.end,
      bodyGradAngle: 45,
      eyeOuterColor: color.main,
      eyeInnerColor: color.end,
      bgColor: '#ffffff',
      bgType: 'single',
      frame: idCounter % 4 === 0 ? 'border' : 'none',
      frameColor: color.main,
      frameText: 'SCAN ME',
      frameTextColor: '#ffffff',
      decoration: dec,
    });
    idCounter++;
  }

  return list;
};

const PRESET_TEMPLATES = generatePresetTemplates();

// Predefined Brand SVG Logos
const BRAND_LOGOS = [
  {
    id: 'none',
    name: 'None',
    icon: '✕',
    svg: '',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2"><circle cx="12" cy="12" r="12"/><path d="M13.5 12h2.5l.5-3h-3V7.5c0-.8.2-1 1-1h2V3.7c-.3 0-1.5-.2-2.8-.2-2.7 0-4.7 1.6-4.7 4.8V9H7v3h2v7.5h4.5V12z" fill="white"/></svg>`,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '🔴',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000"><rect x="0" y="3" width="24" height="18" rx="5"/><path d="M9.5 8.5v7l6-3.5z" fill="white"/></svg>`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366"><circle cx="12" cy="12" r="12"/><path d="M12.012 5.5a6.49 6.49 0 0 0-5.632 3.256 6.42 6.42 0 0 0-.6 4.962l-.72 2.635 2.7-.71a6.46 6.46 0 0 0 9.878-5.326 6.5 6.5 0 0 0-5.626-4.817zm-2.87 8.35a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0zm2.87 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0zm2.87 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0z" fill="white"/></svg>`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><radialGradient id="rg" cx="20%" cy="115%" r="135%"><stop offset="0%" stop-color="#FFF5C0"/><stop offset="10%" stop-color="#FFDE50"/><stop offset="25%" stop-color="#FF9A00"/><stop offset="45%" stop-color="#FF1540"/><stop offset="60%" stop-color="#E20080"/><stop offset="70%" stop-color="#AF00E0"/><stop offset="100%" stop-color="#515BD4"/></radialGradient><rect width="24" height="24" rx="6" fill="url(#rg)"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2 3.2 1.43 3.2 3.2-1.43 3.2-3.2 3.2zm4.7-8.3c-.4 0-.7.3-.7.7s.3.7.7.7.7-.3.7-.7-.3-.7-.7-.7z" fill="white"/></svg>`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '👥',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2"><rect width="24" height="24" rx="4"/><path d="M6.5 8v10h-3zM8 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5.5 4h3v1.5c.4-.7 1.3-1.5 2.5-1.5 2.2 0 3 1.3 3 4.5V18h-3v-5c0-1.2-.5-2-1.5-2-1 0-1.5.8-1.5 2v5h-3V8z" fill="white"/></svg>`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#229ED9"><circle cx="12" cy="12" r="12"/><path d="M17.5 7.5l-2.5 12c0 0-.2.5-.7.5s-.6-.3-.6-.3l-3.2-2.5-1.7 1.7s-.2.2-.5.2-.4-.2-.4-.2l.6-5.8 6.5-6c.2-.2-.1-.3-.3-.1L7.5 13l-4-1.2s-.4-.1-.4-.5.4-.5.4-.5l14-5.5s.4-.2.7 0c.2.2.1.7.1.7z" fill="white"/></svg>`,
  },
];

interface FramePreset {
  id: string;
  name: string;
  type: string;
  color: string;
  bgColor: string;
  textColor: string;
  text: string;
  font: string;
  fontSize: string;
  icon: string;
}

// Generate a massive library of 100+ styled frame presets
const generateFramePresets = (): FramePreset[] => {
  const layouts = [
    { type: 'border', name: 'Classic Banner' },
    { type: 'top-tag', name: 'Top Tag' },
    { type: 'chat', name: 'Chat Bubble' },
    { type: 'chat-top', name: 'Top Bubble' },
    { type: 'bracket', name: 'Corner Brackets' },
    { type: 'polaroid', name: 'Polaroid Style' },
    { type: 'phone', name: 'Phone Screen' },
    { type: 'stamp', name: 'Postage Stamp' },
    { type: 'ticket', name: 'Ticket Stub' },
    { type: 'vintage', name: 'Retro Vintage' },
    { type: 'viewfinder', name: 'Camera Focus' },
  ];

  const colorPalettes = [
    { name: 'Midnight', main: '#0f172a', text: '#ffffff', bg: '#ffffff' },
    { name: 'Amethyst', main: '#8b5cf6', text: '#ffffff', bg: '#f5f3ff' },
    { name: 'Crimson', main: '#e11d48', text: '#ffffff', bg: '#fff1f2' },
    { name: 'Emerald', main: '#059669', text: '#ffffff', bg: '#ecfdf5' },
    { name: 'Sapphire', main: '#2563eb', text: '#ffffff', bg: '#eff6ff' },
    { name: 'Tangerine', main: '#ea580c', text: '#ffffff', bg: '#fff7ed' },
    { name: 'Teal', main: '#0d9488', text: '#ffffff', bg: '#f0fdfa' },
    { name: 'Plum', main: '#701a75', text: '#ffffff', bg: '#fdf4ff' },
    { name: 'Gold', main: '#d97706', text: '#ffffff', bg: '#fef3c7' },
    { name: 'Slate', main: '#475569', text: '#ffffff', bg: '#f8fafc' },
  ];

  const callToActions = [
    { label: 'Scan Me', text: 'SCAN ME', icon: 'scan' },
    { label: 'Visit URL', text: 'VISIT URL', icon: 'link' },
    { label: 'Download App', text: 'DOWNLOAD', icon: 'scan' },
    { label: 'WiFi Access', text: 'JOIN WIFI', icon: 'wifi' },
    { label: 'Play Audio', text: 'LISTEN NOW', icon: 'play' },
    { label: 'Read Doc', text: 'READ PDF', icon: 'document' },
    { label: 'Directions', text: 'GET MAP', icon: 'map' },
    { label: 'Contact Us', text: 'CALL US', icon: 'phone' },
    { label: 'Shop Now', text: 'BUY NOW', icon: 'cart' },
    { label: 'Rate Us', text: 'GIVE 5 STARS', icon: 'star' },
  ];

  const list: FramePreset[] = [];

  // Add None
  list.push({
    id: 'none',
    name: 'No Frame',
    type: 'none',
    color: '#000000',
    bgColor: '#ffffff',
    textColor: '#000000',
    text: '',
    font: 'Inter, sans-serif',
    fontSize: 'auto',
    icon: 'none'
  });

  let idCounter = 1;
  for (let l = 0; l < layouts.length; l++) {
    const layout = layouts[l];
    for (let cp = 0; cp < colorPalettes.length; cp++) {
      const palette = colorPalettes[cp];
      const ctaIndex = (l * colorPalettes.length + cp) % callToActions.length;
      const cta = callToActions[ctaIndex];

      list.push({
        id: `preset-${idCounter++}`,
        name: `${palette.name} ${cta.label} (${layout.name})`,
        type: layout.type,
        color: palette.main,
        bgColor: palette.bg,
        textColor: palette.text,
        text: cta.text,
        font: layout.type === 'polaroid' ? 'Caveat, cursive' : 'Inter, sans-serif',
        fontSize: 'auto',
        icon: cta.icon
      });
    }
  }

  return list;
};

// Canvas drawing vector icon helper
const drawCanvasIcon = (ctx: CanvasRenderingContext2D, icon: string, x: number, y: number, size: number, color: string) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1.5, size * 0.1);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (icon === 'scan') {
    ctx.strokeRect(x, y, size * 0.4, size * 0.4);
    ctx.strokeRect(x + size * 0.6, y, size * 0.4, size * 0.4);
    ctx.strokeRect(x, y + size * 0.6, size * 0.4, size * 0.4);
    ctx.fillRect(x + size * 0.7, y + size * 0.7, size * 0.3, size * 0.3);
  } else if (icon === 'link') {
    ctx.beginPath();
    ctx.arc(x + size * 0.35, y + size * 0.65, size * 0.25, Math.PI * 0.75, Math.PI * 1.75);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + size * 0.65, y + size * 0.35, size * 0.25, -Math.PI * 0.25, Math.PI * 0.75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.35, y + size * 0.65);
    ctx.lineTo(x + size * 0.65, y + size * 0.35);
    ctx.stroke();
  } else if (icon === 'phone') {
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.4, size * 0.25, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.25, y + size * 0.4);
    ctx.quadraticCurveTo(x + size * 0.25, y + size * 0.8, x + size * 0.5, y + size * 0.9);
    ctx.quadraticCurveTo(x + size * 0.75, y + size * 0.8, x + size * 0.75, y + size * 0.4);
    ctx.stroke();
  } else if (icon === 'wifi') {
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.8, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.8, size * 0.3, -Math.PI * 0.85, -Math.PI * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.8, size * 0.55, -Math.PI * 0.85, -Math.PI * 0.15);
    ctx.stroke();
  } else if (icon === 'play') {
    ctx.beginPath();
    ctx.moveTo(x + size * 0.35, y + size * 0.2);
    ctx.lineTo(x + size * 0.8, y + size * 0.5);
    ctx.lineTo(x + size * 0.35, y + size * 0.8);
    ctx.closePath();
    ctx.fill();
  } else if (icon === 'document') {
    ctx.strokeRect(x + size * 0.15, y + size * 0.1, size * 0.7, size * 0.8);
    ctx.beginPath();
    ctx.moveTo(x + size * 0.3, y + size * 0.35); ctx.lineTo(x + size * 0.7, y + size * 0.35);
    ctx.moveTo(x + size * 0.3, y + size * 0.55); ctx.lineTo(x + size * 0.7, y + size * 0.55);
    ctx.stroke();
  } else if (icon === 'map') {
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.35, size * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + size * 0.5, y + size * 0.6);
    ctx.lineTo(x + size * 0.5, y + size * 0.95);
    ctx.stroke();
  } else if (icon === 'cart') {
    ctx.beginPath();
    ctx.moveTo(x + size * 0.1, y + size * 0.2);
    ctx.lineTo(x + size * 0.3, y + size * 0.2);
    ctx.lineTo(x + size * 0.45, y + size * 0.65);
    ctx.lineTo(x + size * 0.8, y + size * 0.65);
    ctx.lineTo(x + size * 0.9, y + size * 0.3);
    ctx.lineTo(x + size * 0.3, y + size * 0.3);
    ctx.stroke();
  } else if (icon === 'star') {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        x + size * 0.5 + size * 0.35 * Math.cos(((18 + i * 72 - 90) * Math.PI) / 180),
        y + size * 0.5 + size * 0.35 * Math.sin(((18 + i * 72 - 90) * Math.PI) / 180)
      );
      ctx.lineTo(
        x + size * 0.5 + size * 0.15 * Math.cos(((54 + i * 72 - 90) * Math.PI) / 180),
        y + size * 0.5 + size * 0.15 * Math.sin(((54 + i * 72 - 90) * Math.PI) / 180)
      );
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
};

interface Props {
  qrText: string;
  name: string;
}

export default function QRCustomizer({ qrText, name }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framePresets = useRef<FramePreset[]>(generateFramePresets());

  // Tabs state
  const [activeTab, setActiveTab] = useState<'frames' | 'shapes' | 'logo' | 'level'>('frames');

  // Customization States
  const [bodyShape, setBodyShape] = useState('square');
  const [eyeOuter, setEyeOuter] = useState('square');
  const [eyeInner, setEyeInner] = useState('square');

  // Colors
  const [bodyColorType, setBodyColorType] = useState<'single' | 'gradient'>('single');
  const [bodyColor, setBodyColor] = useState('#7e22ce');
  const [bodyColorEnd, setBodyColorEnd] = useState('#db2777');
  const [bodyGradAngle, setBodyGradAngle] = useState(45);

  const [eyeOuterColor, setEyeOuterColor] = useState('#7e22ce');
  const [eyeInnerColor, setEyeInnerColor] = useState('#db2777');

  const [bgType, setBgType] = useState<'single' | 'gradient' | 'transparent'>('transparent');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgColorEnd, setBgColorEnd] = useState('#f3e8ff');

  // Frames
  const [frameType, setFrameType] = useState<string>('none');
  const [frameColor, setFrameColor] = useState('#7e22ce');
  const [frameBgColor, setFrameBgColor] = useState('#ffffff');
  const [frameText, setFrameText] = useState('SCAN ME');
  const [frameFont, setFrameFont] = useState('Inter, sans-serif');
  const [frameFontSize, setFrameFontSize] = useState('auto');
  const [frameTextColor, setFrameTextColor] = useState('#ffffff');
  const [frameIcon, setFrameIcon] = useState<string>('none');

  // Decoration overlay
  const [decoration, setDecoration] = useState<string>('none');

  // Frame Modal State
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [frameSearchQuery, setFrameSearchQuery] = useState('');
  const [frameCategory, setFrameCategory] = useState<string>('all');

  // Pre-made Templates Modal State
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');
  const [templateCategory, setTemplateCategory] = useState<string>('all');

  // Logo
  const [selectedLogo, setSelectedLogo] = useState('none');
  const [customLogoFile, setCustomLogoFile] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.2); // Percentage of QR code size (0.1 to 0.3)
  const [logoBg, setLogoBg] = useState(true); // Draw solid shape behind logo

  // Scannability Level
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');

  // Download settings
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg'>('png');
  const [downloadSize, setDownloadSize] = useState(1000);

  // Logo images cache
  const [logoCache, setLogoCache] = useState<Record<string, HTMLImageElement>>({});

  // Load Google Fonts dynamically on mount
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Pacifico&family=Outfit:wght@400;700&family=Montserrat:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Reset Customizations
  const handleReset = () => {
    setBodyShape('square');
    setEyeOuter('square');
    setEyeInner('square');
    setBodyColorType('single');
    setBodyColor('#1a1a2e');
    setEyeOuterColor('#1a1a2e');
    setEyeInnerColor('#1a1a2e');
    setBgType('transparent');
    setBgColor('#ffffff');
    setFrameType('none');
    setFrameIcon('none');
    setDecoration('none');
    setSelectedLogo('none');
    setCustomLogoFile(null);
    setErrorLevel('H');
  };

  // Apply Preset Template
  const applyPreset = (preset: PresetTemplate) => {
    setBodyShape(preset.bodyShape);
    setEyeOuter(preset.eyeOuter);
    setEyeInner(preset.eyeInner);
    setBodyColorType(preset.bodyColorType);
    setBodyColor(preset.bodyColor);
    if (preset.bodyColorEnd) setBodyColorEnd(preset.bodyColorEnd);
    if (preset.bodyGradAngle) setBodyGradAngle(preset.bodyGradAngle);
    setEyeOuterColor(preset.eyeOuterColor);
    setEyeInnerColor(preset.eyeInnerColor);
    setBgType(preset.bgType);
    setBgColor(preset.bgColor);
    setFrameType(preset.frame);

    setFrameColor(preset.frameColor || '#7e22ce');
    setFrameBgColor(preset.frameBgColor || '#ffffff');
    setFrameText(preset.frameText || 'SCAN ME');
    setFrameFont(preset.frameFont || 'Inter, sans-serif');
    setFrameFontSize(preset.frameFontSize || 'auto');
    setFrameTextColor(preset.frameTextColor || '#ffffff');
    setFrameIcon(preset.frameIcon || 'none');
    setDecoration(preset.decoration || 'none');
    setShowTemplatesModal(false);
  };

  // Apply Frame Preset from Modal
  const applyFramePreset = (preset: FramePreset) => {
    setFrameType(preset.type);
    setFrameColor(preset.color);
    setFrameBgColor(preset.bgColor);
    setFrameText(preset.text || 'SCAN ME');
    setFrameFont(preset.font || 'Inter, sans-serif');
    setFrameFontSize(preset.fontSize || 'auto');
    setFrameTextColor(preset.textColor || '#ffffff');
    setFrameIcon(preset.icon || 'none');
    setShowFrameModal(false);
  };

  // Custom Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogoFile(event.target?.result as string);
        setSelectedLogo('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  // Cache Brand SVG Images
  useEffect(() => {
    const cache: Record<string, HTMLImageElement> = {};
    let loaded = 0;
    const logos = BRAND_LOGOS.filter(l => l.svg);

    if (logos.length === 0) return;

    logos.forEach(logo => {
      const img = new Image();
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(logo.svg);
      img.onload = () => {
        cache[logo.id] = img;
        loaded++;
        if (loaded === logos.length) {
          setLogoCache(cache);
        }
      };
    });
  }, []);

  // Main drawing logic
  const drawQR = (canvas: HTMLCanvasElement, targetResolution: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // 1. Generate QR code matrix using node-qrcode
      const qr = QRCode.create(qrText || 'https://example.com', {
        errorCorrectionLevel: errorLevel,
      });

      const size = qr.modules.size;
      const data = qr.modules.data;

      // 2. Setup Dimensions with scaling logic
      const scale = targetResolution / 350;

      let paddingX = 20 * scale;
      let paddingY = 20 * scale;
      let extraTop = 0;
      let extraBottom = 0;

      if (frameType === 'border') {
        extraBottom = 70 * scale;
      } else if (frameType === 'top-tag') {
        extraTop = 70 * scale;
      } else if (frameType === 'chat') {
        extraBottom = 75 * scale;
      } else if (frameType === 'chat-top') {
        extraTop = 75 * scale;
      } else if (frameType === 'polaroid') {
        extraBottom = 95 * scale;
      } else if (frameType === 'phone') {
        extraTop = 35 * scale;
        extraBottom = 45 * scale;
        paddingX = 30 * scale;
        paddingY = 30 * scale;
      } else if (frameType === 'stamp') {
        paddingX = 25 * scale;
        paddingY = 25 * scale;
      } else if (frameType === 'ticket') {
        extraBottom = 70 * scale;
      } else if (frameType === 'vintage') {
        paddingX = 25 * scale;
        paddingY = 25 * scale;
      }

      const qrWidth = targetResolution - paddingX * 2;
      const qrHeight = qrWidth;

      canvas.width = targetResolution;
      canvas.height = targetResolution + extraTop + extraBottom;

      const cellSize = qrWidth / size;
      const qrX = paddingX;
      const qrY = paddingY + extraTop;

      // 3. Clear canvas & Fill background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (bgType !== 'transparent') {
        if (bgType === 'gradient') {
          const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          grad.addColorStop(0, bgColor);
          grad.addColorStop(1, bgColorEnd);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = bgColor;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw custom Frame Background Card
      if (frameType !== 'none') {
        ctx.fillStyle = frameBgColor;
        ctx.beginPath();
        const rx = 10 * scale;
        const ry = 10 * scale;
        const rw = canvas.width - 20 * scale;
        const rh = canvas.height - 20 * scale;
        const rd = 20 * scale;
        if (ctx.roundRect) {
          ctx.roundRect(rx, ry, rw, rh, rd);
        } else {
          ctx.rect(rx, ry, rw, rh);
        }
        ctx.shadowColor = 'rgba(0,0,0,0.06)';
        ctx.shadowBlur = 15 * scale;
        ctx.shadowOffsetY = 5 * scale;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        ctx.shadowOffsetY = 0;
      }

      // Draw stamp edge pattern if active
      if (frameType === 'stamp') {
        ctx.fillStyle = frameBgColor;
        const radius = 6 * scale;
        const spacing = 18 * scale;
        for (let x = 20 * scale; x < canvas.width - 20 * scale; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, 10 * scale, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, canvas.height - 10 * scale, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let y = 20 * scale; y < canvas.height - 20 * scale; y += spacing) {
          ctx.beginPath();
          ctx.arc(10 * scale, y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(canvas.width - 10 * scale, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Determine Area Exclusions
      const isEyeArea = (r: number, c: number) => {
        if (r < 7 && c < 7) return true; // Top-Left
        if (r < 7 && c >= size - 7) return true; // Top-Right
        if (r >= size - 7 && c < 7) return true; // Bottom-Left
        return false;
      };

      const logoBlockSize = selectedLogo !== 'none' ? Math.floor(size * logoSize) : 0;
      const isLogoArea = (r: number, c: number) => {
        if (logoBlockSize <= 0) return false;
        const center = Math.floor(size / 2);
        const halfBlock = Math.ceil(logoBlockSize / 2);
        return (
          r >= center - halfBlock &&
          r <= center + halfBlock &&
          c >= center - halfBlock &&
          c <= center + halfBlock
        );
      };

      // 5. Draw QR Code Body Modules
      let bodyStyle: string | CanvasGradient = bodyColor;
      if (bodyColorType === 'gradient') {
        const rad = (bodyGradAngle * Math.PI) / 180;
        const x1 = qrX + Math.cos(rad) * qrWidth;
        const y1 = qrY + Math.sin(rad) * qrHeight;
        const grad = ctx.createLinearGradient(qrX, qrY, x1, y1);
        grad.addColorStop(0, bodyColor);
        grad.addColorStop(1, bodyColorEnd);
        bodyStyle = grad;
      }

      ctx.fillStyle = bodyStyle;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const isDark = data[r * size + c] === 1;
          if (!isDark) continue;
          if (isEyeArea(r, c) || isLogoArea(r, c)) continue;

          const cx = qrX + c * cellSize;
          const cy = qrY + r * cellSize;

          ctx.beginPath();
          if (bodyShape === 'circle') {
            ctx.arc(cx + cellSize / 2, cy + cellSize / 2, cellSize / 2 * 0.85, 0, Math.PI * 2);
            ctx.fill();
          } else if (bodyShape === 'rounded') {
            if (ctx.roundRect) {
              ctx.roundRect(cx + cellSize * 0.08, cy + cellSize * 0.08, cellSize * 0.84, cellSize * 0.84, cellSize * 0.25);
            } else {
              ctx.rect(cx, cy, cellSize, cellSize);
            }
            ctx.fill();
          } else if (bodyShape === 'diamond') {
            ctx.moveTo(cx + cellSize / 2, cy + cellSize * 0.05);
            ctx.lineTo(cx + cellSize * 0.95, cy + cellSize / 2);
            ctx.lineTo(cx + cellSize / 2, cy + cellSize * 0.95);
            ctx.lineTo(cx + cellSize * 0.05, cy + cellSize / 2);
            ctx.closePath();
            ctx.fill();
          } else if (bodyShape === 'star') {
            ctx.moveTo(cx + cellSize / 2, cy + cellSize * 0.05);
            ctx.quadraticCurveTo(cx + cellSize / 2, cy + cellSize / 2, cx + cellSize * 0.95, cy + cellSize / 2);
            ctx.quadraticCurveTo(cx + cellSize / 2, cy + cellSize / 2, cx + cellSize / 2, cy + cellSize * 0.95);
            ctx.quadraticCurveTo(cx + cellSize / 2, cy + cellSize / 2, cx + cellSize * 0.05, cy + cellSize / 2);
            ctx.quadraticCurveTo(cx + cellSize / 2, cy + cellSize / 2, cx + cellSize / 2, cy + cellSize * 0.05);
            ctx.closePath();
            ctx.fill();
          } else if (bodyShape === 'heart') {
            const d = cellSize;
            ctx.moveTo(cx + d / 2, cy + d * 0.3);
            ctx.bezierCurveTo(cx + d / 2, cy + d * 0.2, cx + d * 0.2, cy, cx, cy + d * 0.3);
            ctx.bezierCurveTo(cx, cy + d * 0.6, cx + d / 2, cy + d * 0.8, cx + d / 2, cy + d * 0.95);
            ctx.bezierCurveTo(cx + d / 2, cy + d * 0.8, cx + d, cy + d * 0.6, cx + d, cy + d * 0.3);
            ctx.bezierCurveTo(cx + d, cy, cx + d * 0.8, cy + d * 0.2, cx + d / 2, cy + d * 0.3);
            ctx.closePath();
            ctx.fill();
          } else if (bodyShape === 'cross') {
            ctx.fillRect(cx + cellSize * 0.35, cy, cellSize * 0.3, cellSize);
            ctx.fillRect(cx, cy + cellSize * 0.35, cellSize, cellSize * 0.3);
          } else if (bodyShape === 'hexagon') {
            ctx.moveTo(cx + cellSize / 2, cy);
            ctx.lineTo(cx + cellSize, cy + cellSize * 0.25);
            ctx.lineTo(cx + cellSize, cy + cellSize * 0.75);
            ctx.lineTo(cx + cellSize / 2, cy + cellSize);
            ctx.lineTo(cx, cy + cellSize * 0.75);
            ctx.lineTo(cx, cy + cellSize * 0.25);
            ctx.closePath();
            ctx.fill();
          } else if (bodyShape === 'liquid') {
            const hasTop = r > 0 && data[(r - 1) * size + c] === 1;
            const hasBottom = r < size - 1 && data[(r + 1) * size + c] === 1;
            const hasLeft = c > 0 && data[r * size + c - 1] === 1;
            const hasRight = c < size - 1 && data[r * size + c + 1] === 1;

            const rTL = !hasTop && !hasLeft ? cellSize * 0.45 : 0;
            const rTR = !hasTop && !hasRight ? cellSize * 0.45 : 0;
            const rBL = !hasBottom && !hasLeft ? cellSize * 0.45 : 0;
            const rBR = !hasBottom && !hasRight ? cellSize * 0.45 : 0;

            if (ctx.roundRect) {
              ctx.roundRect(cx, cy, cellSize, cellSize, [rTL, rTR, rBR, rBL]);
            } else {
              ctx.rect(cx, cy, cellSize, cellSize);
            }
            ctx.fill();
          } else if (bodyShape === 'point') {
            ctx.arc(cx + cellSize / 2, cy + cellSize / 2, cellSize / 2 * 0.6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(cx, cy, cellSize, cellSize);
          }
        }
      }

      // 6. Draw Corner Finder Patterns (Eyes)
      const drawEye = (x: number, y: number) => {
        const w = 7 * cellSize;
        ctx.strokeStyle = eyeOuterColor;
        ctx.lineWidth = cellSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        const strokeOffset = cellSize / 2;
        const outerSize = w - cellSize;

        if (eyeOuter === 'circle') {
          ctx.arc(x + w / 2, y + w / 2, w / 2 - strokeOffset, 0, Math.PI * 2);
          ctx.stroke();
        } else if (eyeOuter === 'rounded') {
          if (ctx.roundRect) {
            ctx.roundRect(x + strokeOffset, y + strokeOffset, outerSize, outerSize, cellSize * 1.5);
          } else {
            ctx.rect(x + strokeOffset, y + strokeOffset, outerSize, outerSize);
          }
          ctx.stroke();
        } else if (eyeOuter === 'leaf') {
          if (ctx.roundRect) {
            ctx.roundRect(x + strokeOffset, y + strokeOffset, outerSize, outerSize, [cellSize * 3, 0, cellSize * 3, 0]);
          } else {
            ctx.rect(x + strokeOffset, y + strokeOffset, outerSize, outerSize);
          }
          ctx.stroke();
        } else if (eyeOuter === 'shield') {
          if (ctx.roundRect) {
            ctx.roundRect(x + strokeOffset, y + strokeOffset, outerSize, outerSize, [cellSize * 2, cellSize * 2, 0, cellSize * 2]);
          } else {
            ctx.rect(x + strokeOffset, y + strokeOffset, outerSize, outerSize);
          }
          ctx.stroke();
        } else {
          ctx.strokeRect(x + strokeOffset, y + strokeOffset, outerSize, outerSize);
        }

        // Inner Eye
        ctx.fillStyle = eyeInnerColor;
        const ix = x + 2 * cellSize;
        const iy = y + 2 * cellSize;
        const iw = 3 * cellSize;

        ctx.beginPath();
        if (eyeInner === 'circle') {
          ctx.arc(ix + iw / 2, iy + iw / 2, iw / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (eyeInner === 'rounded') {
          if (ctx.roundRect) {
            ctx.roundRect(ix, iy, iw, iw, cellSize * 0.7);
          } else {
            ctx.rect(ix, iy, iw, iw);
          }
          ctx.fill();
        } else if (eyeInner === 'diamond') {
          ctx.moveTo(ix + iw / 2, iy);
          ctx.lineTo(ix + iw, iy + iw / 2);
          ctx.lineTo(ix + iw / 2, iy + iw);
          ctx.lineTo(ix, iy + iw / 2);
          ctx.closePath();
          ctx.fill();
        } else if (eyeInner === 'star') {
          ctx.moveTo(ix + iw / 2, iy);
          ctx.quadraticCurveTo(ix + iw / 2, iy + iw / 2, ix + iw, iy + iw / 2);
          ctx.quadraticCurveTo(ix + iw / 2, iy + iw / 2, ix + iw / 2, iy + iw);
          ctx.quadraticCurveTo(ix + iw / 2, iy + iw / 2, ix, iy + iw / 2);
          ctx.quadraticCurveTo(ix + iw / 2, iy + iw / 2, ix + iw / 2, iy);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(ix, iy, iw, iw);
        }
      };

      drawEye(qrX, qrY);
      drawEye(qrX + (size - 7) * cellSize, qrY);
      drawEye(qrX, qrY + (size - 7) * cellSize);

      // 7. Render Logo
      if (selectedLogo !== 'none') {
        const qrCenter = qrX + qrWidth / 2;
        const qrMiddle = qrY + qrHeight / 2;
        const logoRenderSize = qrWidth * logoSize;

        if (logoBg) {
          ctx.fillStyle = frameBgColor || '#ffffff';
          ctx.beginPath();
          const borderSize = logoRenderSize * 1.25;
          if (eyeOuter === 'circle') {
            ctx.arc(qrCenter, qrMiddle, borderSize / 2, 0, Math.PI * 2);
          } else {
            ctx.roundRect ? ctx.roundRect(qrCenter - borderSize / 2, qrMiddle - borderSize / 2, borderSize, borderSize, borderSize * 0.25) : ctx.rect(qrCenter - borderSize / 2, qrMiddle - borderSize / 2, borderSize, borderSize);
          }
          ctx.fill();
        }

        const drawLogoOnCanvas = (img: HTMLImageElement) => {
          ctx.drawImage(img, qrCenter - logoRenderSize / 2, qrMiddle - logoRenderSize / 2, logoRenderSize, logoRenderSize);
        };

        if (selectedLogo === 'custom' && customLogoFile) {
          const img = new Image();
          img.src = customLogoFile;
          img.onload = () => drawLogoOnCanvas(img);
        } else {
          const cachedImg = logoCache[selectedLogo];
          if (cachedImg) {
            drawLogoOnCanvas(cachedImg);
          }
        }
      }

      // Helper function to render text + vector icon centered inside a frame banner
      const drawBannerContent = (bx: number, by: number, bw: number, bh: number) => {
        ctx.fillStyle = frameTextColor;
        const fSize = (frameFontSize === 'auto' ? 22 : parseInt(frameFontSize)) * scale;
        ctx.font = `bold ${fSize}px ${frameFont}`;
        ctx.textBaseline = 'middle';

        const textY = by + bh / 2;

        if (frameIcon !== 'none') {
          const iconSize = 22 * scale;
          const textWidth = ctx.measureText(frameText).width;
          const totalW = iconSize + 8 * scale + textWidth;
          const startX = bx + (bw - totalW) / 2;

          drawCanvasIcon(ctx, frameIcon, startX, textY - iconSize / 2, iconSize, frameTextColor);
          ctx.textAlign = 'left';
          ctx.fillText(frameText, startX + iconSize + 8 * scale, textY);
        } else {
          ctx.textAlign = 'center';
          ctx.fillText(frameText, bx + bw / 2, textY);
        }
      };

      // 8. Draw Frame and Add Additional Text
      if (frameType !== 'none') {
        ctx.fillStyle = frameColor;

        if (frameType === 'border') {
          const bx = 15 * scale;
          const by = canvas.height - 65 * scale;
          const bw = canvas.width - 30 * scale;
          const bh = 50 * scale;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 10 * scale) : ctx.rect(bx, by, bw, bh);
          ctx.fill();

          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 3 * scale;
          ctx.lineCap = 'round';
          const bLen = 12 * scale;
          ctx.beginPath();
          ctx.moveTo(qrX, qrY); ctx.lineTo(qrX, qrY + bLen); ctx.moveTo(qrX, qrY); ctx.lineTo(qrX + bLen, qrY);
          ctx.moveTo(qrX + qrWidth, qrY); ctx.lineTo(qrX + qrWidth, qrY + bLen); ctx.moveTo(qrX + qrWidth, qrY); ctx.lineTo(qrX + qrWidth - bLen, qrY);
          ctx.stroke();

          drawBannerContent(bx, by, bw, bh);
        } else if (frameType === 'top-tag') {
          const bx = 15 * scale;
          const by = 15 * scale;
          const bw = canvas.width - 30 * scale;
          const bh = 50 * scale;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 10 * scale) : ctx.rect(bx, by, bw, bh);
          ctx.fill();

          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 3 * scale;
          ctx.lineCap = 'round';
          const bLen = 12 * scale;
          ctx.beginPath();
          ctx.moveTo(qrX, qrY + qrHeight); ctx.lineTo(qrX, qrY + qrHeight - bLen); ctx.moveTo(qrX, qrY + qrHeight); ctx.lineTo(qrX + bLen, qrY + qrHeight);
          ctx.moveTo(qrX + qrWidth, qrY + qrHeight); ctx.lineTo(qrX + qrWidth, qrY + qrHeight - bLen); ctx.moveTo(qrX + qrWidth, qrY + qrHeight); ctx.lineTo(qrX + qrWidth - bLen, qrY + qrHeight);
          ctx.stroke();

          drawBannerContent(bx, by, bw, bh);
        } else if (frameType === 'chat') {
          const bx = 20 * scale;
          const by = canvas.height - 70 * scale;
          const bw = canvas.width - 40 * scale;
          const bh = 50 * scale;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 12 * scale) : ctx.rect(bx, by, bw, bh);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 - 10 * scale, by);
          ctx.lineTo(canvas.width / 2, by - 8 * scale);
          ctx.lineTo(canvas.width / 2 + 10 * scale, by);
          ctx.closePath();
          ctx.fill();

          drawBannerContent(bx, by, bw, bh);
        } else if (frameType === 'chat-top') {
          const bx = 20 * scale;
          const by = 20 * scale;
          const bw = canvas.width - 40 * scale;
          const bh = 50 * scale;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 12 * scale) : ctx.rect(bx, by, bw, bh);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 - 10 * scale, by + bh);
          ctx.lineTo(canvas.width / 2, by + bh + 8 * scale);
          ctx.lineTo(canvas.width / 2 + 10 * scale, by + bh);
          ctx.closePath();
          ctx.fill();

          drawBannerContent(bx, by, bw, bh);
        } else if (frameType === 'bracket') {
          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 5 * scale;
          ctx.lineCap = 'round';
          const bOffset = 25 * scale;
          const bLen = 30 * scale;

          ctx.beginPath();
          ctx.moveTo(bOffset, bOffset + bLen); ctx.lineTo(bOffset, bOffset); ctx.lineTo(bOffset + bLen, bOffset);
          ctx.moveTo(canvas.width - bOffset, bOffset + bLen); ctx.lineTo(canvas.width - bOffset, bOffset); ctx.lineTo(canvas.width - bOffset - bLen, bOffset);
          ctx.moveTo(bOffset, canvas.height - bOffset - bLen); ctx.lineTo(bOffset, canvas.height - bOffset); ctx.lineTo(bOffset + bLen, canvas.height - bOffset);
          ctx.moveTo(canvas.width - bOffset, canvas.height - bOffset - bLen); ctx.lineTo(canvas.width - bOffset, canvas.height - bOffset); ctx.lineTo(canvas.width - bOffset - bLen, canvas.height - bOffset);
          ctx.stroke();
        } else if (frameType === 'polaroid') {
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2 * scale;
          ctx.strokeRect(qrX - 2 * scale, qrY - 2 * scale, qrWidth + 4 * scale, qrHeight + 4 * scale);

          ctx.fillStyle = frameTextColor === '#ffffff' ? '#1f2937' : frameTextColor;
          const fSize = 25 * scale;
          ctx.font = `bold ${fSize}px ${frameFont}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(frameText, canvas.width / 2, canvas.height - 45 * scale);
        } else if (frameType === 'phone') {
          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 10 * scale;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(10 * scale, 10 * scale, canvas.width - 20 * scale, canvas.height - 20 * scale, 24 * scale) : ctx.rect(10 * scale, 10 * scale, canvas.width - 20 * scale, canvas.height - 20 * scale);
          ctx.stroke();

          ctx.fillStyle = frameColor;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(canvas.width / 2 - 40 * scale, 15 * scale, 80 * scale, 15 * scale, 7 * scale) : ctx.rect(canvas.width / 2 - 40 * scale, 15 * scale, 80 * scale, 15 * scale);
          ctx.fill();

          ctx.fillStyle = frameColor;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(canvas.width / 2 - 25 * scale, canvas.height - 18 * scale, 50 * scale, 4 * scale, 2 * scale) : ctx.rect(canvas.width / 2 - 25 * scale, canvas.height - 18 * scale, 50 * scale, 4 * scale);
          ctx.fill();
        } else if (frameType === 'ticket') {
          ctx.fillStyle = bgColor === '#ffffff' ? '#f3f4f6' : bgColor;
          ctx.beginPath();
          ctx.arc(10 * scale, canvas.height - 70 * scale, 12 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(canvas.width - 10 * scale, canvas.height - 70 * scale, 12 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 1.5 * scale;
          ctx.setLineDash([5 * scale, 4 * scale]);
          ctx.beginPath();
          ctx.moveTo(22 * scale, canvas.height - 70 * scale);
          ctx.lineTo(canvas.width - 22 * scale, canvas.height - 70 * scale);
          ctx.stroke();
          ctx.setLineDash([]); // reset

          drawBannerContent(10 * scale, canvas.height - 55 * scale, canvas.width - 20 * scale, 45 * scale);
        } else if (frameType === 'vintage') {
          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 3 * scale;
          ctx.strokeRect(18 * scale, 18 * scale, canvas.width - 36 * scale, canvas.height - 36 * scale);

          ctx.lineWidth = 1 * scale;
          ctx.strokeRect(22 * scale, 22 * scale, canvas.width - 44 * scale, canvas.height - 44 * scale);

          const boxSize = 8 * scale;
          ctx.fillStyle = frameColor;
          ctx.fillRect(14 * scale, 14 * scale, boxSize, boxSize);
          ctx.fillRect(canvas.width - 14 * scale - boxSize, 14 * scale, boxSize, boxSize);
          ctx.fillRect(14 * scale, canvas.height - 14 * scale - boxSize, boxSize, boxSize);
          ctx.fillRect(canvas.width - 14 * scale - boxSize, canvas.height - 14 * scale - boxSize, boxSize, boxSize);
        } else if (frameType === 'viewfinder') {
          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 2 * scale;
          const vLen = 22 * scale;
          const vOffset = 18 * scale;

          ctx.beginPath();
          ctx.moveTo(vOffset, vOffset + vLen); ctx.lineTo(vOffset, vOffset); ctx.lineTo(vOffset + vLen, vOffset);
          ctx.moveTo(canvas.width - vOffset, vOffset + vLen); ctx.lineTo(canvas.width - vOffset, vOffset); ctx.lineTo(canvas.width - vOffset - vLen, vOffset);
          ctx.moveTo(vOffset, canvas.height - vOffset - vLen); ctx.lineTo(vOffset, canvas.height - vOffset); ctx.lineTo(vOffset + vLen, canvas.height - vOffset);
          ctx.moveTo(canvas.width - vOffset, canvas.height - vOffset - vLen); ctx.lineTo(canvas.width - vOffset, canvas.height - vOffset); ctx.lineTo(canvas.width - vOffset - vLen, canvas.height - vOffset);
          ctx.stroke();

          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(35 * scale, 35 * scale, 5 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = frameColor;
          ctx.font = `bold ${11 * scale}px sans-serif`;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText('REC', 46 * scale, 35 * scale);

          ctx.strokeStyle = frameColor;
          ctx.lineWidth = 1.5 * scale;
          ctx.strokeRect(canvas.width - 55 * scale, 28 * scale, 22 * scale, 12 * scale);
          ctx.fillRect(canvas.width - 33 * scale, 32 * scale, 2 * scale, 4 * scale);
          ctx.fillStyle = frameColor;
          ctx.fillRect(canvas.width - 52 * scale, 31 * scale, 10 * scale, 6 * scale);

          ctx.lineWidth = 1 * scale;
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 - 10 * scale, canvas.height / 2);
          ctx.lineTo(canvas.width / 2 + 10 * scale, canvas.height / 2);
          ctx.moveTo(canvas.width / 2, canvas.height / 2 - 10 * scale);
          ctx.lineTo(canvas.width / 2, canvas.height / 2 + 10 * scale);
          ctx.stroke();
        }
      }

      // 9. Draw Custom Visual Decorations
      if (decoration === 'flowers') {
        ctx.save();
        const drawFlower = (cx: number, cy: number) => {
          ctx.fillStyle = '#f97316'; // orange petals
          const petals = 5;
          const r = 8 * scale;
          for (let i = 0; i < petals; i++) {
            const angle = (i * 2 * Math.PI) / petals;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 5 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#eab308'; // yellow center
          ctx.beginPath();
          ctx.arc(cx, cy, 4 * scale, 0, Math.PI * 2);
          ctx.fill();
        };

        // Draw connecting brown vines
        ctx.strokeStyle = '#854d0e';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(qrX - 10 * scale, qrY + qrHeight / 2);
        ctx.quadraticCurveTo(qrX - 15 * scale, qrY - 15 * scale, qrX + qrWidth / 2, qrY - 10 * scale);
        ctx.moveTo(qrX + qrWidth + 10 * scale, qrY + qrHeight / 2);
        ctx.quadraticCurveTo(qrX + qrWidth + 15 * scale, qrY + qrHeight + 15 * scale, qrX + qrWidth / 2, qrY + qrHeight + 10 * scale);
        ctx.stroke();

        drawFlower(qrX - 10 * scale, qrY - 10 * scale);
        drawFlower(qrX + qrWidth + 10 * scale, qrY - 10 * scale);
        drawFlower(qrX - 10 * scale, qrY + qrHeight + 10 * scale);
        drawFlower(qrX + qrWidth + 10 * scale, qrY + qrHeight + 10 * scale);
        ctx.restore();
      } else if (decoration === 'foliage') {
        ctx.save();
        ctx.strokeStyle = '#15803d'; // green vine
        ctx.lineWidth = 2 * scale;
        ctx.strokeRect(qrX - 8 * scale, qrY - 8 * scale, qrWidth + 16 * scale, qrHeight + 16 * scale);

        const drawLeaf = (lx: number, ly: number, angle: number) => {
          ctx.save();
          ctx.translate(lx, ly);
          ctx.rotate(angle);
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.ellipse ? ctx.ellipse(0, 0, 8 * scale, 4 * scale, 0, 0, Math.PI * 2) : ctx.rect(-8 * scale, -4 * scale, 16 * scale, 8 * scale);
          ctx.fill();
          ctx.restore();
        };

        drawLeaf(qrX - 8 * scale, qrY + qrHeight / 2, Math.PI / 2);
        drawLeaf(qrX + qrWidth + 8 * scale, qrY + qrHeight / 2, Math.PI / 2);
        drawLeaf(qrX + qrWidth / 2, qrY - 8 * scale, 0);
        drawLeaf(qrX + qrWidth / 2, qrY + qrHeight + 8 * scale, 0);

        drawLeaf(qrX - 8 * scale, qrY - 8 * scale, -Math.PI / 4);
        drawLeaf(qrX + qrWidth + 8 * scale, qrY - 8 * scale, Math.PI / 4);
        ctx.restore();
      } else if (decoration === 'builder') {
        ctx.save();
        const hx = qrX + 3.5 * cellSize;
        const hy = qrY - 8 * scale;

        ctx.fillStyle = '#eab308'; // Safety yellow dome
        ctx.beginPath();
        ctx.arc(hx, hy, 18 * scale, Math.PI, 0);
        ctx.fill();

        ctx.fillRect(hx - 24 * scale, hy - 1 * scale, 48 * scale, 4 * scale); // brim

        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(hx - 3 * scale, hy - 18 * scale, 6 * scale, 18 * scale); // ridge
        ctx.restore();
      } else if (decoration === 'stars') {
        ctx.save();
        const drawStar = (sx: number, sy: number, size: number) => {
          ctx.fillStyle = '#eab308'; // gold star
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(sx + Math.cos(angle) * size, sy + Math.sin(angle) * size);
            ctx.lineTo(sx + Math.cos(angle + Math.PI / 4) * (size / 3), sy + Math.sin(angle + Math.PI / 4) * (size / 3));
          }
          ctx.closePath();
          ctx.fill();
        };

        drawStar(qrX - 15 * scale, qrY + qrHeight / 3, 12 * scale);
        drawStar(qrX + qrWidth + 15 * scale, qrY + 2 * qrHeight / 3, 12 * scale);
        drawStar(qrX + qrWidth / 3, qrY - 15 * scale, 10 * scale);
        drawStar(qrX + 2 * qrWidth / 3, qrY + qrHeight + 15 * scale, 10 * scale);
        ctx.restore();
      } else if (decoration === 'hearts') {
        ctx.save();
        const drawMiniHeart = (hx: number, hy: number, size: number) => {
          ctx.fillStyle = '#ec4899'; // pink heart
          ctx.beginPath();
          ctx.moveTo(hx, hy + size * 0.3);
          ctx.bezierCurveTo(hx, hy + size * 0.1, hx - size * 0.5, hy, hx - size * 0.5, hy + size * 0.4);
          ctx.bezierCurveTo(hx - size * 0.5, hy + size * 0.7, hx, hy + size * 0.9, hx, hy + size);
          ctx.bezierCurveTo(hx, hy + size * 0.9, hx + size * 0.5, hy + size * 0.7, hx + size * 0.5, hy + size * 0.4);
          ctx.bezierCurveTo(hx + size * 0.5, hy, hx, hy + size * 0.3, hx, hy + size * 0.3);
          ctx.fill();
        };

        drawMiniHeart(qrX - 15 * scale, qrY + 15 * scale, 12 * scale);
        drawMiniHeart(qrX + qrWidth + 15 * scale, qrY + qrHeight - 15 * scale, 12 * scale);
        drawMiniHeart(qrX - 15 * scale, qrY + qrHeight / 2, 8 * scale);
        drawMiniHeart(qrX + qrWidth + 15 * scale, qrY + qrHeight / 2, 10 * scale);
        ctx.restore();
      } else if (decoration === 'balloons') {
        ctx.save();
        const drawBalloon = (bx: number, by: number, color: string) => {
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1 * scale;
          ctx.beginPath();
          ctx.moveTo(bx, by + 12 * scale);
          ctx.quadraticCurveTo(bx - 5 * scale, by + 30 * scale, bx, by + 45 * scale);
          ctx.stroke();

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse ? ctx.ellipse(bx, by, 10 * scale, 14 * scale, 0, 0, Math.PI * 2) : ctx.rect(bx - 10 * scale, by - 14 * scale, 20 * scale, 28 * scale);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(bx, by + 13 * scale);
          ctx.lineTo(bx - 3 * scale, by + 16 * scale);
          ctx.lineTo(bx + 3 * scale, by + 16 * scale);
          ctx.closePath();
          ctx.fill();
        };

        drawBalloon(qrX - 22 * scale, qrY + qrHeight / 2 - 15 * scale, '#db2777'); // pink
        drawBalloon(qrX - 14 * scale, qrY + qrHeight / 2 + 10 * scale, '#2563eb'); // blue
        drawBalloon(qrX + qrWidth + 14 * scale, qrY + qrHeight / 2 - 10 * scale, '#db2777');
        drawBalloon(qrX + qrWidth + 22 * scale, qrY + qrHeight / 2 + 15 * scale, '#eab308'); // yellow
        ctx.restore();
      }

    } catch (e) {
      console.error('Failed to draw customized QR', e);
    }
  };

  // Re-draw QR whenever any parameter changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      drawQR(canvas, 350);
    }
  }, [
    qrText,
    bodyShape,
    eyeOuter,
    eyeInner,
    bodyColorType,
    bodyColor,
    bodyColorEnd,
    bodyGradAngle,
    eyeOuterColor,
    eyeInnerColor,
    bgType,
    bgColor,
    bgColorEnd,
    frameType,
    frameColor,
    frameBgColor,
    frameText,
    frameFont,
    frameFontSize,
    frameTextColor,
    frameIcon,
    decoration,
    selectedLogo,
    customLogoFile,
    logoSize,
    logoBg,
    errorLevel,
    logoCache,
  ]);

  // Handle Export and Download
  const handleDownload = () => {
    const offscreenCanvas = document.createElement('canvas');
    drawQR(offscreenCanvas, downloadSize);

    const type = downloadFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = offscreenCanvas.toDataURL(type, 1.0);

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${name || 'custom-qr'}.${downloadFormat}`;
    a.click();
  };

  // Copy Image to Clipboard
  const handleCopy = async () => {
    const offscreenCanvas = document.createElement('canvas');
    drawQR(offscreenCanvas, 1000);

    try {
      offscreenCanvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          alert('QR Code copied to clipboard!');
        }
      }, 'image/png');
    } catch {
      window.open(offscreenCanvas.toDataURL('image/png'), '_blank');
    }
  };

  // Filter frame presets
  const frameCategories = [
    { id: 'all', label: 'All Designs' },
    { id: 'border', label: 'Classic Banners' },
    { id: 'chat', label: 'Speech Bubbles' },
    { id: 'creative', label: 'Unique Frames' },
  ];

  const filteredFramePresets = framePresets.current.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(frameSearchQuery.toLowerCase()) ||
                          p.text.toLowerCase().includes(frameSearchQuery.toLowerCase()) ||
                          p.type.toLowerCase().includes(frameSearchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (frameCategory === 'all') return true;
    if (frameCategory === 'border') return p.type === 'border' || p.type === 'top-tag';
    if (frameCategory === 'chat') return p.type === 'chat' || p.type === 'chat-top';
    if (frameCategory === 'creative') return ['polaroid', 'phone', 'stamp', 'ticket', 'vintage', 'viewfinder'].includes(p.type);
    return true;
  });

  // Filter templates presets
  const templateCategories = [
    { id: 'all', label: 'All Templates' },
    { id: 'clean', label: 'Clean & Minimal' },
    { id: 'creative', label: 'Creative & Decor' },
    { id: 'gradients', label: 'Vibrant Gradients' },
  ];

  const filteredTemplatePresets = PRESET_TEMPLATES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                          p.bodyShape.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                          (p.decoration && p.decoration.toLowerCase().includes(templateSearchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (templateCategory === 'all') return true;
    if (templateCategory === 'clean') return p.decoration === 'none' && p.frame === 'none';
    if (templateCategory === 'creative') return p.decoration !== 'none';
    if (templateCategory === 'gradients') return p.bodyColorType === 'gradient';
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
      {/* LEFT COLUMN: Customizer Settings */}
      <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">② Customize</h2>
            <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">
              Premium Styling
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            🧹 Reset Settings
          </button>
        </div>

        {/* Pre-Made Templates Row (Exact mockup design) */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3">Pre-Made Templates</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {/* 1. None */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[0])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'none' && bodyShape === 'square' && bodyColor === '#1e293b' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-10 h-10 stroke-gray-400" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-semibold text-gray-500 mt-1">Clean</span>
            </button>

            {/* 2. blossoms */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[1])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] relative overflow-hidden ${
                decoration === 'flowers' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">🌸</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Blossoms</span>
            </button>

            {/* 3. green foliage */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[2])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'foliage' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">🌿</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Foliage</span>
            </button>

            {/* 4. Safety Builder */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[3])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'builder' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">👷</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Safety</span>
            </button>

            {/* 5. Christmas Holly */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[4])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'stars' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">✨</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Holly</span>
            </button>

            {/* 6. Sakura Hearts */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[5])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'hearts' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">💖</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Sakura</span>
            </button>

            {/* 7. Happy Birthday Balloons */}
            <button
              onClick={() => applyPreset(PRESET_TEMPLATES[6])}
              className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all min-h-[85px] ${
                decoration === 'balloons' ? 'border-purple-500 bg-purple-50/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">🎈</span>
              <span className="text-[10px] font-semibold text-gray-500 mt-1 text-center truncate w-full">Birthday</span>
            </button>

            {/* 8. More Option Modal Button */}
            <button
              onClick={() => setShowTemplatesModal(true)}
              className="p-2 border border-dashed border-purple-400 hover:border-purple-600 rounded-xl flex flex-col items-center justify-center bg-purple-50/10 hover:bg-purple-50/30 transition-all cursor-pointer min-h-[85px]"
            >
              <span className="text-lg font-bold text-purple-700">+61</span>
              <span className="text-[10px] font-bold text-purple-700 mt-1">More</span>
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-gray-100">
          {[
            { id: 'frames', label: 'Frames', icon: '🖼️' },
            { id: 'shapes', label: 'Shapes', icon: '🎨' },
            { id: 'logo', label: 'Logo', icon: '🏷️' },
            { id: 'level', label: 'Level', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: FRAMES */}
        {activeTab === 'frames' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Vector frame outlines row */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2.5">Select a Frame Template</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {/* 1. None */}
                <button
                  onClick={() => { setFrameType('none'); setFrameIcon('none'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'none' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10 stroke-gray-400" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">No Frame</span>
                </button>

                {/* 2. Top Tag */}
                <button
                  onClick={() => { setFrameType('top-tag'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'top-tag' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="6" width="32" height="8" rx="2" fill="#4b5563" />
                    <path d="M12 24 v8 h8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 24 v8 h-8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                    <rect x="14" y="18" width="20" height="20" rx="1" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Top Tag</span>
                </button>

                {/* 3. Bottom Tag */}
                <button
                  onClick={() => { setFrameType('border'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'border' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="14" y="8" width="20" height="20" rx="1" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="2 2" />
                    <path d="M12 20 v-8 h8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 20 v-8 h-8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                    <rect x="8" y="34" width="32" height="8" rx="2" fill="#4b5563" />
                    <path d="M24 34 l-3 -3 h6 z" fill="#4b5563" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Bottom Tag</span>
                </button>

                {/* 4. Chat Bubble Bottom */}
                <button
                  onClick={() => { setFrameType('chat'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'chat' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="12" y="34" width="24" height="8" rx="2" fill="#4b5563" />
                    <path d="M24 34 l-3 -3 h6 z" fill="#4b5563" />
                    <rect x="12" y="8" width="24" height="24" rx="1" stroke="#9ca3af" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Chat Bot</span>
                </button>

                {/* 5. Chat Bubble Top */}
                <button
                  onClick={() => { setFrameType('chat-top'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'chat-top' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="10" y="6" width="28" height="8" rx="2" fill="#4b5563" />
                    <path d="M24 14 l-3 3 h6 z" fill="#4b5563" />
                    <rect x="12" y="20" width="24" height="22" rx="2" stroke="#9ca3af" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Chat Top</span>
                </button>

                {/* 6. Phone Frame */}
                <button
                  onClick={() => { setFrameType('phone'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'phone' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="10" y="6" width="28" height="36" rx="4" stroke="#4b5563" strokeWidth="2" />
                    <circle cx="24" cy="9" r="1.5" fill="#4b5563" />
                    <rect x="14" y="14" width="20" height="20" rx="1" stroke="#9ca3af" strokeWidth="1.5" />
                    <rect x="14" y="36" width="20" height="4" rx="1" fill="#4b5563" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Phone Look</span>
                </button>

                {/* 7. Vintage Frame */}
                <button
                  onClick={() => { setFrameType('vintage'); }}
                  className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${
                    frameType === 'vintage' ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="36" height="36" rx="4" stroke="#4b5563" strokeWidth="2" />
                    <rect x="10" y="10" width="28" height="28" rx="2" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>
                  <span className="text-[10px] font-semibold text-gray-500 mt-1">Vintage</span>
                </button>

                {/* 8. More Option Frame Button */}
                <button
                  onClick={() => setShowFrameModal(true)}
                  className="p-2 border border-dashed border-purple-400 hover:border-purple-600 rounded-xl flex flex-col items-center justify-center bg-purple-50/10 hover:bg-purple-50/30 transition-all cursor-pointer"
                >
                  <span className="text-xl">✨</span>
                  <span className="text-[10px] font-bold text-purple-700 mt-1">+100 More</span>
                </button>
              </div>
            </div>

            {/* Custom controls for active frame */}
            {frameType !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/30 border border-purple-100 rounded-2xl">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Frame Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={frameColor}
                      onChange={(e) => setFrameColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                    />
                    <input
                      type="text"
                      value={frameColor.toUpperCase()}
                      onChange={(e) => setFrameColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Frame Canvas Backing</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={frameBgColor}
                      onChange={(e) => setFrameBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                    />
                    <input
                      type="text"
                      value={frameBgColor.toUpperCase()}
                      onChange={(e) => setFrameBgColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                    />
                  </div>
                </div>

                {/* Additional Text & Icon Customizations */}
                {!['bracket', 'phone', 'vintage', 'viewfinder'].includes(frameType) && (
                  <div className="sm:col-span-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Banner Text Label</label>
                        <input
                          type="text"
                          value={frameText}
                          onChange={(e) => setFrameText(e.target.value)}
                          placeholder="SCAN ME"
                          maxLength={25}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:outline-none text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Vector Icon</label>
                        <select
                          value={frameIcon}
                          onChange={(e) => setFrameIcon(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-800"
                        >
                          <option value="none">No Icon (Plain Text)</option>
                          <option value="scan">🔍 QR Scanner Box</option>
                          <option value="link">🔗 Chain Link</option>
                          <option value="phone">📞 Phone call</option>
                          <option value="wifi">📶 Wi-Fi wave</option>
                          <option value="play">▶ Audio Play</option>
                          <option value="document">📄 PDF Document</option>
                          <option value="map">📍 Location Pin</option>
                          <option value="cart">🛒 Cart purchase</option>
                          <option value="star">★ Rating Star</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Font family</label>
                        <select
                          value={frameFont}
                          onChange={(e) => setFrameFont(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-800"
                        >
                          {FONTS.map((font) => (
                            <option key={font.name} value={font.value}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Font size</label>
                        <select
                          value={frameFontSize}
                          onChange={(e) => setFrameFontSize(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-800"
                        >
                          <option value="auto">Auto</option>
                          <option value="16px">Small (16px)</option>
                          <option value="20px">Medium (20px)</option>
                          <option value="24px">Large (24px)</option>
                          <option value="28px">XL (28px)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Text & Icon Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={frameTextColor}
                            onChange={(e) => setFrameTextColor(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                          />
                          <input
                            type="text"
                            value={frameTextColor.toUpperCase()}
                            onChange={(e) => setFrameTextColor(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono text-gray-800 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SHAPES & COLORS */}
        {activeTab === 'shapes' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Body Shape</label>
                <select
                  value={bodyShape}
                  onChange={(e) => setBodyShape(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800"
                >
                  <option value="square">Square (Classic)</option>
                  <option value="circle">Circle / Dots</option>
                  <option value="rounded">Rounded Squares</option>
                  <option value="diamond">Diamonds</option>
                  <option value="star">Four-Point Stars</option>
                  <option value="heart">Love Hearts</option>
                  <option value="cross">Cross Lines</option>
                  <option value="hexagon">Hexagons</option>
                  <option value="liquid">Liquid / Connected</option>
                  <option value="point">Pixel Points</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Eye Frame (Outer)</label>
                <select
                  value={eyeOuter}
                  onChange={(e) => setEyeOuter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800"
                >
                  <option value="square">Square</option>
                  <option value="rounded">Rounded</option>
                  <option value="circle">Circle</option>
                  <option value="leaf">Leaf Border</option>
                  <option value="shield">Shield</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Eye Center (Inner)</label>
                <select
                  value={eyeInner}
                  onChange={(e) => setEyeInner(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800"
                >
                  <option value="square">Square</option>
                  <option value="circle">Circle / Dot</option>
                  <option value="rounded">Rounded</option>
                  <option value="diamond">Diamond</option>
                  <option value="star">Star</option>
                </select>
              </div>
            </div>

            {/* Custom Visual Decoration select */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Corner & Side Decorations Overlay</label>
              <select
                value={decoration}
                onChange={(e) => setDecoration(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800"
              >
                <option value="none">No Decoration</option>
                <option value="flowers">🌸 Autumn Blossoms (Flowers & Vines)</option>
                <option value="foliage">🌿 Green Foliage (Organic Ivy Leaves)</option>
                <option value="builder">👷 Safety Helmet (Construction look)</option>
                <option value="stars">✨ Christmas Holly & Sparkles</option>
                <option value="hearts">💖 Sakura Hearts & Butterflies</option>
                <option value="balloons">🎈 Birthday Party Balloons</option>
              </select>
            </div>

            {/* Colors System */}
            <div className="border-t border-gray-100 pt-5 space-y-4">
              <h4 className="text-sm font-bold text-gray-700">Colors Customization</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-600">QR Body Color</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setBodyColorType('single')}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                          bodyColorType === 'single'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-500 border border-gray-200'
                        }`}
                      >
                        Single
                      </button>
                      <button
                        onClick={() => setBodyColorType('gradient')}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                          bodyColorType === 'gradient'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-500 border border-gray-200'
                        }`}
                      >
                        Gradient
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bodyColor}
                      onChange={(e) => setBodyColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                    />
                    <input
                      type="text"
                      value={bodyColor.toUpperCase()}
                      onChange={(e) => setBodyColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                    />
                  </div>

                  {bodyColorType === 'gradient' && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={bodyColorEnd}
                          onChange={(e) => setBodyColorEnd(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                        />
                        <input
                          type="text"
                          value={bodyColorEnd.toUpperCase()}
                          onChange={(e) => setBodyColorEnd(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Angle</span>
                          <span>{bodyGradAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={bodyGradAngle}
                          onChange={(e) => setBodyGradAngle(Number(e.target.value))}
                          className="w-full accent-purple-600"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Eye Frame Color (Outer)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={eyeOuterColor}
                        onChange={(e) => setEyeOuterColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                      />
                      <input
                        type="text"
                        value={eyeOuterColor.toUpperCase()}
                        onChange={(e) => setEyeOuterColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Eye Center Color (Inner)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={eyeInnerColor}
                        onChange={(e) => setEyeInnerColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                      />
                      <input
                        type="text"
                        value={eyeInnerColor.toUpperCase()}
                        onChange={(e) => setEyeInnerColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-3 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-600">QR Code Background</label>
                    <div className="flex gap-1.5">
                      {['transparent', 'single', 'gradient'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setBgType(mode as any)}
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize transition-all ${
                            bgType === mode
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-500 border border-gray-200'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {bgType !== 'transparent' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                        />
                        <input
                          type="text"
                          value={bgColor.toUpperCase()}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                        />
                      </div>

                      {bgType === 'gradient' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={bgColorEnd}
                            onChange={(e) => setBgColorEnd(e.target.value)}
                            className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
                          />
                          <input
                            type="text"
                            value={bgColorEnd.toUpperCase()}
                            onChange={(e) => setBgColorEnd(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 bg-white"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOGO SETTINGS */}
        {activeTab === 'logo' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Choose Brand Logo</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {BRAND_LOGOS.map((logo) => (
                  <button
                    key={logo.id}
                    onClick={() => setSelectedLogo(logo.id)}
                    className={`py-2 border rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      selectedLogo === logo.id
                        ? 'border-purple-500 bg-purple-50/50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="text-xl">{logo.icon}</span>
                    <span className="text-[10px] font-bold">{logo.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-4">
              <label className="block text-xs font-bold text-gray-600">Or Upload Custom Logo</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="logo-upload"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold cursor-pointer hover:bg-purple-700 transition-colors shadow-sm text-sm"
                >
                  📤 Upload Image
                </label>
                <span className="text-xs text-gray-400">Supported: PNG, JPEG</span>
              </div>

              {customLogoFile && (
                <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-xl w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={customLogoFile} alt="Preview" className="w-10 h-10 object-contain rounded-lg border border-gray-100" />
                  <button
                    onClick={() => {
                      setCustomLogoFile(null);
                      if (selectedLogo === 'custom') setSelectedLogo('none');
                    }}
                    className="text-xs text-red-500 font-bold px-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {selectedLogo !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-purple-100 bg-purple-50/30 rounded-2xl">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                    <span>Logo Size</span>
                    <span>{Math.round(logoSize * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.30"
                    step="0.02"
                    value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-gray-700">Logo Shield Background</label>
                    <span className="text-[10px] text-gray-400">Clears dots behind the logo for scannability</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={logoBg}
                    onChange={(e) => setLogoBg(e.target.checked)}
                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SCANNABILITY LEVEL */}
        {activeTab === 'level' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-700">Scannability Level</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Higher error correction levels make the QR code pattern more complex and dense, but allow the QR code to be scanned even if it is partially covered (e.g. by a logo) or dirty.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {[
                { id: 'H', label: 'Best (30% Recovery)', desc: 'Maximum damage-resistant pattern. Recommended when using large logos.' },
                { id: 'Q', label: 'High (25% Recovery)', desc: 'Optimal balance for custom logos.' },
                { id: 'M', label: 'Medium (15% Recovery)', desc: 'Balanced, slightly less cluttered-looking pattern.' },
                { id: 'L', label: 'Smallest (7% Recovery)', desc: 'Less cluttered-looking, clean pattern. Best for high contrast.' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setErrorLevel(lvl.id as any)}
                  className={`p-4 border rounded-xl text-left transition-all flex flex-col justify-between h-36 ${
                    errorLevel === lvl.id
                      ? 'border-purple-500 bg-purple-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-bold text-purple-700">{lvl.label}</span>
                  <span className="text-[10px] text-gray-500 mt-2 leading-relaxed">{lvl.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Live preview and download manager */}
      <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">
          ③ Generate & download QR
        </h2>

        {/* Live Canvas View */}
        <div className="flex justify-center items-center bg-gray-50 border border-gray-100 rounded-2xl p-4 min-h-[300px]">
          <canvas ref={canvasRef} className="max-w-full h-auto object-contain rounded-lg" />
        </div>

        {/* Download Options */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Format</label>
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-800"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG / JPG</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Resolution</label>
              <select
                value={downloadSize}
                onChange={(e) => setDownloadSize(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-800"
              >
                <option value="500">500 x 500 px</option>
                <option value="1000">1000 x 1000 px</option>
                <option value="2000">2000 x 2000 px</option>
                <option value="3000">3000 x 3000 px</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleDownload}
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg text-center"
            >
              📥 Download QR CODE
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm text-center"
            >
              📋 Copy to Clipboard
            </button>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 text-center">
          QR codes generated work lifetime. We do not place ads, track scans, or store your content.
        </p>
      </div>

      {/* 100+ FRAME PRESETS MODAL */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-pink-50/30">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">✨ Premium Designer Frames</h3>
                <p className="text-xs text-gray-500 mt-1">Select from over 100 pre-designed templates with vector graphics and dynamic spacing</p>
              </div>
              <button
                onClick={() => setShowFrameModal(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center font-bold text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Search and Filters */}
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center bg-white">
              <div className="relative w-full md:flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search 100+ frames (e.g. WiFi, Ticket, Polaroid, Blue, Chat...)"
                  value={frameSearchQuery}
                  onChange={(e) => setFrameSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-250 rounded-2xl text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none placeholder-gray-400 text-gray-850"
                />
              </div>

              {/* Category selector */}
              <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                {frameCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFrameCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      frameCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {filteredFramePresets.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-4xl">🔎</span>
                  <p className="text-gray-500 font-semibold mt-4">No matching frames found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {filteredFramePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyFramePreset(preset)}
                      className="group flex flex-col items-center gap-2 p-3 border border-gray-200 hover:border-purple-500 rounded-2xl bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-1.5 relative overflow-hidden">
                        <div className="absolute inset-4 opacity-15 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] rounded" />

                        {preset.type !== 'none' && (
                          <div className="absolute inset-0 flex flex-col items-center justify-between p-1">
                            <div
                              className="absolute inset-1.5 rounded-lg opacity-90"
                              style={{
                                border: `2.5px solid ${preset.color}`,
                                backgroundColor: preset.bgColor,
                              }}
                            />

                            {preset.type === 'border' && (
                              <div
                                className="w-[85%] h-2.5 rounded-sm absolute bottom-2 flex items-center justify-center px-1"
                                style={{ backgroundColor: preset.color }}
                              >
                                <div className="w-1 h-1 bg-white rounded-full opacity-60 mr-1" />
                                <div className="h-0.5 w-6 bg-white/70 rounded-full" />
                              </div>
                            )}

                            {preset.type === 'top-tag' && (
                              <div
                                className="w-[85%] h-2.5 rounded-sm absolute top-2 flex items-center justify-center px-1"
                                style={{ backgroundColor: preset.color }}
                              >
                                <div className="w-1 h-1 bg-white rounded-full opacity-60 mr-1" />
                                <div className="h-0.5 w-6 bg-white/70 rounded-full" />
                              </div>
                            )}

                            {preset.type === 'chat' && (
                              <div
                                className="w-[80%] h-3 rounded-md absolute bottom-2 flex items-center justify-center px-1"
                                style={{ backgroundColor: preset.color }}
                              >
                                <div className="h-0.5 w-6 bg-white/70 rounded-full" />
                                <div
                                  className="w-0.5 h-0.5 absolute -top-1 left-1/2 -translate-x-1/2 border-l-2 border-r-2 border-b-2 border-transparent"
                                  style={{ borderBottomColor: preset.color }}
                                />
                              </div>
                            )}

                            {preset.type === 'chat-top' && (
                              <div
                                className="w-[80%] h-3 rounded-md absolute top-2 flex items-center justify-center px-1"
                                style={{ backgroundColor: preset.color }}
                              >
                                <div className="h-0.5 w-6 bg-white/70 rounded-full" />
                                <div
                                  className="w-0.5 h-0.5 absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent"
                                  style={{ borderTopColor: preset.color }}
                                />
                              </div>
                            )}

                            {preset.type === 'bracket' && (
                              <div
                                className="absolute inset-2 border-2 rounded-sm"
                                style={{ borderColor: preset.color, borderStyle: 'dashed' }}
                              />
                            )}

                            {preset.type === 'polaroid' && (
                              <div className="absolute inset-1.5 bg-white border border-gray-300 rounded-sm flex flex-col items-center pb-2">
                                <div className="flex-1 w-[90%] mt-1 bg-gray-50 border border-dashed border-gray-200" />
                                <div className="h-1 w-8 bg-gray-300 rounded-full mt-1" />
                              </div>
                            )}

                            {preset.type === 'phone' && (
                              <div
                                className="absolute inset-1 rounded-lg border-2"
                                style={{ borderColor: preset.color }}
                              >
                                <div className="w-4 h-1 rounded-full mx-auto mt-0.5" style={{ backgroundColor: preset.color }} />
                                <div className="w-4 h-0.5 rounded-full mx-auto absolute bottom-0.5 left-1/2 -translate-x-1/2" style={{ backgroundColor: preset.color }} />
                              </div>
                            )}

                            {preset.type === 'stamp' && (
                              <div
                                className="absolute inset-1.5 border-2 border-dashed rounded-lg"
                                style={{ borderColor: preset.color }}
                              />
                            )}

                            {preset.type === 'ticket' && (
                              <div
                                className="absolute inset-1.5 border-2 rounded-lg"
                                style={{ borderColor: preset.color }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full absolute left-[-4px] top-1/2 -translate-y-1/2 bg-gray-100" />
                                <div className="w-1.5 h-1.5 rounded-full absolute right-[-4px] top-1/2 -translate-y-1/2 bg-gray-100" />
                              </div>
                            )}

                            {preset.type === 'vintage' && (
                              <div
                                className="absolute inset-2 border double border-spacing-1 rounded-sm"
                                style={{ borderColor: preset.color }}
                              />
                            )}

                            {preset.type === 'viewfinder' && (
                              <div
                                className="absolute inset-2 border"
                                style={{ borderColor: preset.color }}
                              >
                                <div className="w-1 h-1 rounded-full absolute left-1 top-1 bg-red-500" />
                              </div>
                            )}
                          </div>
                        )}

                        {preset.type === 'none' && (
                          <span className="text-gray-300 text-2xl font-bold">✕</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 text-center truncate w-full group-hover:text-purple-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-150 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowFrameModal(false)}
                className="px-6 py-2 bg-gray-800 text-white rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 60+ PRE-MADE TEMPLATES MODAL */}
      {showTemplatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-pink-50/30">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">🎨 Pre-Made Designer Templates</h3>
                <p className="text-xs text-gray-500 mt-1">Select from over 60 custom-styled QR layouts with unique shapes, gradients, frames, and background decorations</p>
              </div>
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center font-bold text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Search and Filters */}
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center bg-white">
              <div className="relative w-full md:flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search templates (e.g. blossoms, green, gradient, Safety...)"
                  value={templateSearchQuery}
                  onChange={(e) => setTemplateSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-250 rounded-2xl text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none placeholder-gray-400 text-gray-800"
                />
              </div>

              {/* Category selector */}
              <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                {templateCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setTemplateCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      templateCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {filteredTemplatePresets.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-4xl">🔎</span>
                  <p className="text-gray-500 font-semibold mt-4">No matching templates found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {filteredTemplatePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className="group flex flex-col items-center gap-2 p-3 border border-gray-200 hover:border-purple-500 rounded-2xl bg-white hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      {/* Mini visual mockup card */}
                      <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-2.5 relative overflow-hidden">
                        
                        {/* Diagonal cross for none */}
                        {preset.id === 'curated-none' && (
                          <span className="text-gray-300 text-2xl font-bold">✕</span>
                        )}

                        {/* Visual representation of QR code style */}
                        {preset.id !== 'curated-none' && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                            {/* Card bg color */}
                            <div className="absolute inset-1.5 rounded-lg border border-gray-200 shadow-sm" style={{ backgroundColor: preset.bgColor }} />

                            {/* Dotted pattern representing QR code body */}
                            <div
                              className="w-[60%] h-[60%] opacity-80"
                              style={{
                                backgroundImage: `radial-gradient(${preset.bodyColor} 2px, transparent 2px)`,
                                backgroundSize: '6px_6px',
                              }}
                            />

                            {/* Mini Frame tag preview if layout has frame */}
                            {preset.frame === 'border' && (
                              <div className="w-[75%] h-2 rounded-sm absolute bottom-3" style={{ backgroundColor: preset.frameColor }} />
                            )}

                            {/* Floating icon representing decoration */}
                            {preset.decoration === 'flowers' && <span className="absolute top-1.5 right-1.5 text-xs">🌸</span>}
                            {preset.decoration === 'foliage' && <span className="absolute top-1.5 right-1.5 text-xs">🌿</span>}
                            {preset.decoration === 'builder' && <span className="absolute top-1.5 right-1.5 text-xs">👷</span>}
                            {preset.decoration === 'stars' && <span className="absolute top-1.5 right-1.5 text-xs">✨</span>}
                            {preset.decoration === 'hearts' && <span className="absolute top-1.5 right-1.5 text-xs">💖</span>}
                            {preset.decoration === 'balloons' && <span className="absolute top-1.5 right-1.5 text-xs">🎈</span>}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 text-center truncate w-full group-hover:text-purple-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-150 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="px-6 py-2 bg-gray-800 text-white rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
