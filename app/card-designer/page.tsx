'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  LayoutGrid, Type, QrCode, Square, Paintbrush, FolderHeart, 
  Undo2, Redo2, ZoomIn, ZoomOut, Trash2, Copy, Lock, Unlock, 
  Layers, Download, Plus, Sparkles, AlertCircle, Eye, RefreshCw, 
  RotateCw, ArrowUp, ArrowDown, ChevronRight, Check, FileDown, 
  Printer, X, Upload
} from 'lucide-react';
import { CardElement, CardState, ShapeType, QrType } from '@/lib/types';
import { generateTemplates, CATEGORIES, PRESETS } from '@/lib/templates';
import { generateQRCode } from '@/lib/qr';

export default function CardDesignerPage() {
  const [mounted, setMounted] = useState(false);
  
  // Card states
  const [cardState, setCardState] = useState<CardState>({
    name: 'Untitled Design',
    width: 1050,
    height: 600,
    presetSize: 'us_standard',
    orientation: 'landscape',
    isDoubleSided: true,
    bleed: 30,
    backgrounds: {
      front: { type: 'color', color: '#1e293b' },
      back: { type: 'gradient', color: '#0f172a', gradientStart: '#0f172a', gradientEnd: '#1e293b', gradientAngle: 135 }
    },
    elements: []
  });

  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // Undo/Redo stacks
  const [undoStack, setUndoStack] = useState<CardState[]>([]);
  const [redoStack, setRedoStack] = useState<CardState[]>([]);
  
  // Editor navigation and controls
  const [activeTab, setActiveTab] = useState<'templates' | 'text' | 'qr' | 'shapes' | 'background' | 'my-designs'>('templates');
  const [zoom, setZoom] = useState(60); // percentage
  const [showGuides, setShowGuides] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [templates, setTemplates] = useState<any[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<CardState[]>([]);
  const [visibleTemplatesCount, setVisibleTemplatesCount] = useState(15);
  
  useEffect(() => {
    setVisibleTemplatesCount(15);
  }, [searchTerm, selectedCategory]);
  
  // 3D Preview and export states
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Drag and resize operation state
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    isResizing: boolean;
    resizeHandle: string | null;
    startX: number;
    startY: number;
    startElX: number;
    startElY: number;
    startElW: number;
    startElH: number;
  }>({
    isDragging: false,
    isResizing: false,
    resizeHandle: null,
    startX: 0,
    startY: 0,
    startElX: 0,
    startElY: 0,
    startElW: 0,
    startElH: 0
  });

  // QR Code Form builder state
  const [qrForm, setQrForm] = useState<{
    type: QrType;
    url: string;
    text: string;
    phone: string;
    email: string;
    emailSubject: string;
    emailBody: string;
    vcard: {
      firstName: string;
      lastName: string;
      org: string;
      title: string;
      phone: string;
      email: string;
      url: string;
      address: string;
    }
  }>({
    type: 'url',
    url: 'https://google.com',
    text: 'Hello World',
    phone: '+15551234567',
    email: 'hello@example.com',
    emailSubject: 'Business Contact',
    emailBody: 'Hi, let\'s stay in touch!',
    vcard: {
      firstName: 'John',
      lastName: 'Doe',
      org: 'Company Inc.',
      title: 'Managing Director',
      phone: '+15551234567',
      email: 'john@example.com',
      url: 'www.example.com',
      address: '123 Main St, New York, NY'
    }
  });

  // Editor container ref for auto-zoom calculations
  const workspaceRef = useRef<HTMLDivElement>(null);
  const canvasRefFront = useRef<HTMLDivElement>(null);
  const canvasRefBack = useRef<HTMLDivElement>(null);

  // Load fonts, templates and saved designs on mount
  useEffect(() => {
    setMounted(true);
    
    // 1. Dynamic Font Injection
    const fonts = [
      'Inter', 'Montserrat', 'Playfair+Display', 'Lora', 
      'Space+Grotesk', 'Syne', 'Outfit', 'Fira+Code', 
      'Great+Vibes', 'Cinzel', 'DM+Sans'
    ];
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${f}:wght@300;400;500;600;700;800&`).join('')}display=swap`;
    document.head.appendChild(fontLink);

    // 2. Load Templates
    const allTemplates = generateTemplates();
    setTemplates(allTemplates);
    
    // Load default template (Corporate Executive Dark Landscape)
    const defaultTpl = allTemplates.find(t => t.id.includes('corporate-executive-landscape-dark'));
    if (defaultTpl) {
      applyTemplate(defaultTpl);
    } else if (allTemplates.length > 0) {
      applyTemplate(allTemplates[0]);
    }

    // 3. Load Saved Designs from LocalStorage
    try {
      const saved = localStorage.getItem('card_designs');
      if (saved) {
        setSavedDesigns(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved designs', e);
    }
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  // Save current design state for undo
  const pushState = (newState: CardState) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(cardState))]);
    setRedoStack([]); // Clear redo stack on new action
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, prev.length - 1));
    setRedoStack(prev => [...prev, JSON.parse(JSON.stringify(cardState))]);
    setCardState(previous);
    setSelectedElementId(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, prev.length - 1));
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(cardState))]);
    setCardState(next);
    setSelectedElementId(null);
  };

  const updateCardState = (updater: (prev: CardState) => CardState) => {
    pushState(cardState);
    setCardState(prev => updater(prev));
  };

  // Helper to compile QR Text
  const compileQrText = (form: typeof qrForm) => {
    switch (form.type) {
      case 'url':
        return form.url.startsWith('http') ? form.url : `https://${form.url}`;
      case 'phone':
        return `tel:${form.phone}`;
      case 'email':
        return `mailto:${form.email}?subject=${encodeURIComponent(form.emailSubject)}&body=${encodeURIComponent(form.emailBody)}`;
      case 'text':
        return form.text;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${form.vcard.lastName};${form.vcard.firstName};;;\nFN:${form.vcard.firstName} ${form.vcard.lastName}\nORG:${form.vcard.org}\nTITLE:${form.vcard.title}\nTEL;TYPE=CELL:${form.vcard.phone}\nEMAIL;TYPE=PREF,INTERNET:${form.vcard.email}\nURL:${form.vcard.url}\nADR;TYPE=WORK:;;${form.vcard.address};;;;\nEND:VCARD`;
      default:
        return form.url;
    }
  };

  // Apply template to workspace
  const applyTemplate = (tpl: any) => {
    pushState(cardState);
    setCardState({
      name: tpl.name,
      width: tpl.width || 1050,
      height: tpl.height || 600,
      presetSize: tpl.presetSize || 'us_standard',
      orientation: tpl.orientation || 'landscape',
      isDoubleSided: tpl.isDoubleSided,
      bleed: 30,
      backgrounds: JSON.parse(JSON.stringify(tpl.backgrounds)),
      elements: JSON.parse(JSON.stringify(tpl.elements))
    });
    setSelectedElementId(null);
  };

  // Add Element
  const addTextElement = (preset: 'heading' | 'subheading' | 'body' | 'contact') => {
    const textOptions = {
      heading: { text: 'New Heading', fontSize: 32, fontWeight: '750' },
      subheading: { text: 'Subheading Title', fontSize: 18, fontWeight: '600' },
      body: { text: 'Paragraph body text details...', fontSize: 12, fontWeight: '400' },
      contact: { text: '📞  +1 (555) 019-0000', fontSize: 13, fontWeight: '400' }
    };
    const option = textOptions[preset];
    
    const newEl: CardElement = {
      id: `el-text-${Date.now()}`,
      type: 'text',
      side: activeSide,
      x: cardState.width / 2 - 150,
      y: cardState.height / 2 - 25,
      width: 300,
      height: 50,
      rotation: 0,
      opacity: 1,
      locked: false,
      zIndex: cardState.elements.length + 1,
      text: option.text,
      fontFamily: 'Inter',
      fontSize: option.fontSize,
      fontWeight: option.fontWeight,
      color: cardState.backgrounds[activeSide].type === 'color' && cardState.backgrounds[activeSide].color === '#ffffff' ? '#0f172a' : '#ffffff',
      align: 'center'
    };

    updateCardState(prev => ({
      ...prev,
      elements: [...prev.elements, newEl]
    }));
    setSelectedElementId(newEl.id);
  };

  const addShapeElement = (shapeType: ShapeType) => {
    const isLine = shapeType === 'line';
    const newEl: CardElement = {
      id: `el-shape-${Date.now()}`,
      type: 'shape',
      side: activeSide,
      x: cardState.width / 2 - (isLine ? 200 : 75),
      y: cardState.height / 2 - (isLine ? 2 : 75),
      width: isLine ? 400 : 150,
      height: isLine ? 4 : 150,
      rotation: 0,
      opacity: 0.8,
      locked: false,
      zIndex: cardState.elements.length + 1,
      shapeType,
      fill: '#6366f1',
      stroke: '#4f46e5',
      strokeWidth: 0,
      borderRadius: 0
    };

    updateCardState(prev => ({
      ...prev,
      elements: [...prev.elements, newEl]
    }));
    setSelectedElementId(newEl.id);
  };

  const addQrElement = async () => {
    const qrText = compileQrText(qrForm);
    const darkColor = cardState.backgrounds[activeSide].type === 'color' && cardState.backgrounds[activeSide].color === '#ffffff' ? '#000000' : '#ffffff';
    const lightColor = cardState.backgrounds[activeSide].type === 'color' && cardState.backgrounds[activeSide].color === '#ffffff' ? '#ffffff' : '#1e293b';

    try {
      const base64 = await generateQRCode(qrText, {
        color: { dark: darkColor, light: lightColor }
      });

      const newEl: CardElement = {
        id: `el-qr-${Date.now()}`,
        type: 'qr',
        side: activeSide,
        x: cardState.width / 2 - 80,
        y: cardState.height / 2 - 80,
        width: 160,
        height: 160,
        rotation: 0,
        opacity: 1,
        locked: false,
        zIndex: cardState.elements.length + 1,
        qrType: qrForm.type,
        qrText,
        src: base64,
        qrColorDark: darkColor,
        qrColorLight: lightColor,
        qrMargin: 1
      };

      updateCardState(prev => ({
        ...prev,
        elements: [...prev.elements, newEl]
      }));
      setSelectedElementId(newEl.id);
    } catch (e) {
      console.error(e);
    }
  };

  // Update QR details on existing selected QR element
  const updateSelectedQr = async () => {
    if (!selectedElementId) return;
    const el = cardState.elements.find(e => e.id === selectedElementId);
    if (!el || el.type !== 'qr') return;

    const qrText = compileQrText(qrForm);
    try {
      const base64 = await generateQRCode(qrText, {
        color: { 
          dark: el.qrColorDark || '#000000', 
          light: el.qrColorLight || '#ffffff' 
        }
      });

      updateCardState(prev => ({
        ...prev,
        elements: prev.elements.map(e => {
          if (e.id === selectedElementId) {
            return {
              ...e,
              qrType: qrForm.type,
              qrText,
              src: base64
            };
          }
          return e;
        })
      }));
    } catch (e) {
      console.error('Failed to update QR', e);
    }
  };

  // Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isLogo: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgUrl = event.target.result as string;
          const newEl: CardElement = {
            id: `el-img-${Date.now()}`,
            type: isLogo ? 'logo' : 'image',
            side: activeSide,
            x: cardState.width / 2 - 100,
            y: cardState.height / 2 - 100,
            width: 200,
            height: 200,
            rotation: 0,
            opacity: 1,
            locked: false,
            zIndex: cardState.elements.length + 1,
            src: imgUrl,
            borderRadius: isLogo ? 50 : 0
          };
          updateCardState(prev => ({
            ...prev,
            elements: [...prev.elements, newEl]
          }));
          setSelectedElementId(newEl.id);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Modify Element properties
  const updateSelectedElement = (updates: Partial<CardElement>) => {
    if (!selectedElementId) return;
    
    // We update without pushing to history stack on every keypress of text / color slider.
    // However, to capture standard property changes, we update elements array
    setCardState(prev => ({
      ...prev,
      elements: prev.elements.map(el => {
        if (el.id === selectedElementId) {
          return { ...el, ...updates };
        }
        return el;
      })
    }));
  };

  // Drag and Resize handlers
  const handleElementMouseDown = (e: React.MouseEvent, element: CardElement) => {
    if (element.locked) return;
    e.stopPropagation();
    
    setSelectedElementId(element.id);
    
    setDragState({
      isDragging: true,
      isResizing: false,
      resizeHandle: null,
      startX: e.clientX,
      startY: e.clientY,
      startElX: element.x,
      startElY: element.y,
      startElW: element.width,
      startElH: element.height
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, element: CardElement, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    setDragState({
      isDragging: false,
      isResizing: true,
      resizeHandle: handle,
      startX: e.clientX,
      startY: e.clientY,
      startElX: element.x,
      startElY: element.y,
      startElW: element.width,
      startElH: element.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const scale = zoom / 100;
      const dx = (e.clientX - dragState.startX) / scale;
      const dy = (e.clientY - dragState.startY) / scale;
      
      if (dragState.isDragging && selectedElementId) {
        let newX = Math.round(dragState.startElX + dx);
        let newY = Math.round(dragState.startElY + dy);
        
        // Smart Snapping
        const snapThreshold = 10;
        
        // Center alignment snaps
        const elWidth = dragState.startElW;
        const elHeight = dragState.startElH;
        
        const cardCenterX = cardState.width / 2;
        const cardCenterY = cardState.height / 2;
        
        const elCenterX = newX + elWidth / 2;
        const elCenterY = newY + elHeight / 2;
        
        if (Math.abs(elCenterX - cardCenterX) < snapThreshold) {
          newX = cardCenterX - elWidth / 2;
        }
        if (Math.abs(elCenterY - cardCenterY) < snapThreshold) {
          newY = cardCenterY - elHeight / 2;
        }
        
        // Edges and Bleed snaps
        if (Math.abs(newX - cardState.bleed) < snapThreshold) newX = cardState.bleed;
        if (Math.abs(newY - cardState.bleed) < snapThreshold) newY = cardState.bleed;
        if (Math.abs(newX + elWidth - (cardState.width - cardState.bleed)) < snapThreshold) {
          newX = cardState.width - cardState.bleed - elWidth;
        }
        if (Math.abs(newY + elHeight - (cardState.height - cardState.bleed)) < snapThreshold) {
          newY = cardState.height - cardState.bleed - elHeight;
        }

        setCardState(prev => ({
          ...prev,
          elements: prev.elements.map(el => {
            if (el.id === selectedElementId) {
              return { ...el, x: newX, y: newY };
            }
            return el;
          })
        }));
      }
      
      if (dragState.isResizing && selectedElementId && dragState.resizeHandle) {
        const el = cardState.elements.find(e => e.id === selectedElementId);
        if (!el) return;
        
        let newW = dragState.startElW;
        let newH = dragState.startElH;
        let newX = dragState.startElX;
        let newY = dragState.startElY;
        
        const aspect = dragState.startElW / dragState.startElH;
        const keepAspect = el.type === 'qr' || el.type === 'logo';
        
        switch (dragState.resizeHandle) {
          case 'br':
            newW = Math.max(20, dragState.startElW + dx);
            newH = keepAspect ? newW / aspect : Math.max(20, dragState.startElH + dy);
            break;
          case 'bl':
            newW = Math.max(20, dragState.startElW - dx);
            newX = dragState.startElX + (dragState.startElW - newW);
            newH = keepAspect ? newW / aspect : Math.max(20, dragState.startElH + dy);
            break;
          case 'tr':
            newW = Math.max(20, dragState.startElW + dx);
            newH = keepAspect ? newW / aspect : Math.max(20, dragState.startElH - dy);
            newY = dragState.startElY + (dragState.startElH - newH);
            break;
          case 'tl':
            newW = Math.max(20, dragState.startElW - dx);
            newX = dragState.startElX + (dragState.startElW - newW);
            newH = keepAspect ? newW / aspect : Math.max(20, dragState.startElH - dy);
            newY = dragState.startElY + (dragState.startElH - newH);
            break;
        }

        setCardState(prev => ({
          ...prev,
          elements: prev.elements.map(e => {
            if (e.id === selectedElementId) {
              return { 
                ...e, 
                x: Math.round(newX), 
                y: Math.round(newY), 
                width: Math.round(newW), 
                height: Math.round(newH) 
              };
            }
            return e;
          })
        }));
      }
    };

    const handleMouseUp = () => {
      if (dragState.isDragging || dragState.isResizing) {
        // Record undo history when drag finishes
        pushState(cardState);
        setDragState(prev => ({
          ...prev,
          isDragging: false,
          isResizing: false,
          resizeHandle: null
        }));
      }
    };

    if (dragState.isDragging || dragState.isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, selectedElementId, zoom, cardState]);

  // Operations: Duplicate, Delete, Align
  const handleDeleteElement = () => {
    if (!selectedElementId) return;
    updateCardState(prev => ({
      ...prev,
      elements: prev.elements.filter(e => e.id !== selectedElementId)
    }));
    setSelectedElementId(null);
  };

  const handleDuplicateElement = () => {
    if (!selectedElementId) return;
    const el = cardState.elements.find(e => e.id === selectedElementId);
    if (!el) return;
    
    const duplicate: CardElement = {
      ...JSON.parse(JSON.stringify(el)),
      id: `${el.type}-${Date.now()}`,
      x: el.x + 30,
      y: el.y + 30,
      zIndex: cardState.elements.length + 1
    };

    updateCardState(prev => ({
      ...prev,
      elements: [...prev.elements, duplicate]
    }));
    setSelectedElementId(duplicate.id);
  };

  const bringToFront = () => {
    if (!selectedElementId) return;
    const maxZ = Math.max(...cardState.elements.map(e => e.zIndex || 0), 0);
    updateSelectedElement({ zIndex: maxZ + 1 });
  };

  const sendToBack = () => {
    if (!selectedElementId) return;
    const minZ = Math.min(...cardState.elements.map(e => e.zIndex || 0), 0);
    updateSelectedElement({ zIndex: minZ - 1 });
  };

  // Card Size modifications
  const handleSizePresetChange = (preset: 'us_standard' | 'euro_standard' | 'square' | 'custom') => {
    updateCardState(prev => {
      let width = prev.width;
      let height = prev.height;
      
      if (preset === 'us_standard') {
        width = prev.orientation === 'landscape' ? 1050 : 600;
        height = prev.orientation === 'landscape' ? 600 : 1050;
      } else if (preset === 'euro_standard') {
        width = prev.orientation === 'landscape' ? 1004 : 650;
        height = prev.orientation === 'landscape' ? 650 : 1004;
      } else if (preset === 'square') {
        width = 750;
        height = 750;
      }

      return {
        ...prev,
        presetSize: preset,
        width,
        height
      };
    });
  };

  const toggleOrientation = () => {
    updateCardState(prev => {
      if (prev.presetSize === 'square') return prev;
      
      const newOrientation = prev.orientation === 'landscape' ? 'portrait' : 'landscape';
      const width = prev.height;
      const height = prev.width;
      
      // Swap coordinates of all elements proportionally to match the new dimensions
      const scaleX = width / prev.width;
      const scaleY = height / prev.height;
      
      const updatedElements = prev.elements.map(el => ({
        ...el,
        x: Math.round(el.x * scaleX),
        y: Math.round(el.y * scaleY),
        width: Math.round(el.width * scaleX),
        height: Math.round(el.height * scaleY)
      }));

      return {
        ...prev,
        orientation: newOrientation,
        width,
        height,
        elements: updatedElements
      };
    });
  };

  // Save design to local list
  const saveDesignToLocal = () => {
    const design: CardState = {
      ...cardState,
      id: cardState.id || `design-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    
    let updatedList = [...savedDesigns];
    const index = savedDesigns.findIndex(d => d.id === design.id);
    
    if (index >= 0) {
      updatedList[index] = design;
    } else {
      updatedList.unshift(design);
    }
    
    setSavedDesigns(updatedList);
    localStorage.setItem('card_designs', JSON.stringify(updatedList));
    setCardState(design);
    
    alert('Design saved successfully to "My Designs"!');
  };

  const deleteSavedDesign = (e: React.MouseEvent, designId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this design?')) return;
    
    const updated = savedDesigns.filter(d => d.id !== designId);
    setSavedDesigns(updated);
    localStorage.setItem('card_designs', JSON.stringify(updated));
  };

  // Export functions (PDF, PNG)
  const exportAsImage = async (format: 'png' | 'jpeg') => {
    setIsExporting(true);
    const html2canvas = (await import('html2canvas')).default;
    
    const exportSide = async (side: 'front' | 'back') => {
      const el = side === 'front' ? canvasRefFront.current : canvasRefBack.current;
      if (!el) return null;
      
      // Temporary style adjustments to export at 100% scale
      const origTransform = el.style.transform;
      el.style.transform = 'scale(1)';
      
      const canvas = await html2canvas(el, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null,
        logging: false
      });
      
      el.style.transform = origTransform;
      return canvas.toDataURL(`image/${format}`, 1.0);
    };

    try {
      const frontData = await exportSide('front');
      if (frontData) {
        const link = document.createElement('a');
        link.download = `${cardState.name.replace(/\s+/g, '_')}_front.${format}`;
        link.href = frontData;
        link.click();
      }
      
      if (cardState.isDoubleSided) {
        const backData = await exportSide('back');
        if (backData) {
          const link = document.createElement('a');
          link.download = `${cardState.name.replace(/\s+/g, '_')}_back.${format}`;
          link.href = backData;
          link.click();
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to export images.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const captureSide = async (side: 'front' | 'back') => {
        const el = side === 'front' ? canvasRefFront.current : canvasRefBack.current;
        if (!el) return null;
        
        const origTransform = el.style.transform;
        el.style.transform = 'scale(1)';
        
        const canvas = await html2canvas(el, {
          scale: 3, // Premium quality
          useCORS: true,
          logging: false
        });
        
        el.style.transform = origTransform;
        return canvas;
      };

      const canvasFront = await captureSide('front');
      if (!canvasFront) throw new Error('Failed to capture front side');

      // Convert card width/height from pixels to mm (300 DPI: 1px = 0.0846mm)
      const mmWidth = cardState.width * 0.0846 * 3;
      const mmHeight = cardState.height * 0.0846 * 3;
      
      // Determine format orientation
      const orientation = cardState.orientation === 'landscape' ? 'l' : 'p';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [mmWidth, mmHeight]
      });

      const imgFront = canvasFront.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgFront, 'JPEG', 0, 0, mmWidth, mmHeight);

      if (cardState.isDoubleSided) {
        const canvasBack = await captureSide('back');
        if (canvasBack) {
          pdf.addPage([mmWidth, mmHeight], orientation);
          const imgBack = canvasBack.toDataURL('image/jpeg', 1.0);
          pdf.addImage(imgBack, 'JPEG', 0, 0, mmWidth, mmHeight);
        }
      }

      pdf.save(`${cardState.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to export print-ready PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  // Auto-fit zoom when mounting or card dimensions change
  useEffect(() => {
    if (workspaceRef.current) {
      const containerWidth = workspaceRef.current.clientWidth;
      const pad = 80;
      const computedZoom = Math.min(100, Math.floor(((containerWidth - pad) / cardState.width) * 100));
      setZoom(Math.max(30, computedZoom));
    }
  }, [cardState.width, cardState.height]);

  // Selected element shortcut updates
  const selectedEl = cardState.elements.find(e => e.id === selectedElementId);

  // Template Search and Filters
  const filteredTemplates = templates.filter(tpl => {
    const matchesSearch = tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tpl.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-10 w-10 animate-spin text-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Loading Designer Studio...</p>
        </div>
      </div>
    );
  }

  // Common styling for element renderer
  const renderCardContent = (el: CardElement, scale: number) => {
    switch (el.type) {
      case 'text':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontFamily: el.fontFamily || 'Inter',
              fontSize: `${(el.fontSize || 14) * scale}px`,
              fontWeight: el.fontWeight || '400',
              fontStyle: el.fontStyle || 'normal',
              color: el.color || '#000000',
              textAlign: el.align || 'left',
              letterSpacing: el.letterSpacing ? `${el.letterSpacing * scale}px` : undefined,
              lineHeight: el.lineHeight || 1.2,
              textDecoration: el.textDecoration || 'none',
              wordBreak: 'break-word',
              display: 'flex',
              alignItems: 'center',
              justifyContent: el.align === 'center' ? 'center' : el.align === 'right' ? 'flex-end' : 'flex-start'
            }}
          >
            {el.text}
          </div>
        );
      case 'image':
      case 'logo':
        return (
          <div
            className="relative w-full h-full overflow-hidden"
            style={{ borderRadius: `${(el.borderRadius || 0) * scale}px` }}
          >
            {el.src ? (
              <img
                src={el.src}
                alt="Uploaded Asset"
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-500/20 border-2 border-dashed border-indigo-500 text-indigo-400 font-bold text-sm">
                LOGO
              </div>
            )}
          </div>
        );
      case 'qr':
        return (
          <div className="w-full h-full p-1" style={{ backgroundColor: '#ffffff', borderRadius: `${4 * scale}px` }}>
            {el.src ? (
              <img
                src={el.src}
                alt="QR Code"
                className="w-full h-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-slate-200 animate-pulse" />
            )}
          </div>
        );
      case 'shape':
        if (el.shapeType === 'circle') {
          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: el.fill || '#cbd5e1',
                borderRadius: '50%',
                border: el.strokeWidth && el.strokeWidth > 0 ? `${el.strokeWidth * scale}px solid ${el.stroke}` : 'none'
              }}
            />
          );
        } else if (el.shapeType === 'triangle') {
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              <polygon
                points="50,0 100,100 0,100"
                fill={el.fill || '#cbd5e1'}
                stroke={el.stroke || 'none'}
                strokeWidth={el.strokeWidth || 0}
              />
            </svg>
          );
        } else if (el.shapeType === 'line') {
          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: el.fill || '#cbd5e1',
                borderRadius: `${(el.borderRadius || 0) * scale}px`
              }}
            />
          );
        } else {
          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: el.fill || '#cbd5e1',
                borderRadius: `${(el.borderRadius || 0) * scale}px`,
                border: el.strokeWidth && el.strokeWidth > 0 ? `${el.strokeWidth * scale}px solid ${el.stroke}` : 'none'
              }}
            />
          );
        }
      default:
        return null;
    }
  };

  const getBackgroundStyle = (bg: CardState['backgrounds']['front']) => {
    if (bg.type === 'gradient') {
      return {
        background: `linear-gradient(${bg.gradientAngle || 135}deg, ${bg.gradientStart || bg.color}, ${bg.gradientEnd || '#1e293b'})`
      };
    }
    return { backgroundColor: bg.color };
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-900 text-slate-100 font-sans">
      
      {/* 1. LEFT NAVIGATION BAR */}
      <div className="flex h-full w-18 flex-col items-center border-r border-slate-800 bg-slate-950 py-4 gap-4 flex-shrink-0">
        {[
          { id: 'templates', icon: LayoutGrid, label: 'Templates' },
          { id: 'text', icon: Type, label: 'Text' },
          { id: 'qr', icon: QrCode, label: 'QR Code' },
          { id: 'shapes', icon: Square, label: 'Shapes' },
          { id: 'background', icon: Paintbrush, label: 'Colors' },
          { id: 'my-designs', icon: FolderHeart, label: 'Saved' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
              title={tab.label}
            >
              <Icon className="h-5.5 w-5.5" />
              <span className="absolute left-20 z-50 scale-0 rounded bg-slate-950 px-2 py-1 text-xs text-white shadow-md group-hover:scale-100 transition-all whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. LEFT SIDEBAR PANEL */}
      <div className="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden flex-shrink-0">
        
        {/* Tab Header */}
        <div className="border-b border-slate-800 p-4">
          <h2 className="text-base font-bold capitalize text-white">
            {activeTab === 'my-designs' ? 'My Saved Designs' : `${activeTab} Options`}
          </h2>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          
          {/* A. TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />

              {/* Horizontal scroll categories */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap border cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-indigo-650 text-white border-indigo-600'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap border cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-650 text-white border-indigo-600'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Templates Grid (displays subset of the generated templates) */}
              <div className="grid grid-cols-1 gap-3">
                {filteredTemplates.slice(0, visibleTemplatesCount).map(tpl => {
                  const frontBg = tpl.backgrounds.front;
                  const isDark = frontBg.color === '#111827';
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl)}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left hover:border-slate-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      <div 
                        className="h-28 w-full relative flex items-center justify-center p-4"
                        style={getBackgroundStyle(frontBg)}
                      >
                        {/* Scaled thumbnail preview */}
                        <div className="scale-[0.16] origin-center absolute w-[1050px] h-[600px] pointer-events-none">
                          {tpl.elements.filter((e: any) => e.side === 'front').map((el: any) => (
                            <div
                              key={el.id}
                              style={{
                                position: 'absolute',
                                left: `${el.x}px`,
                                top: `${el.y}px`,
                                width: `${el.width}px`,
                                height: `${el.height}px`,
                                zIndex: el.zIndex
                              }}
                            >
                              {renderCardContent(el, 1)}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{tpl.name}</p>
                        <span className="text-[10px] font-semibold text-slate-500">{tpl.category} · {tpl.isDoubleSided ? 'Double-sided' : 'Single-sided'}</span>
                      </div>
                    </button>
                  );
                })}
                
                {filteredTemplates.length > visibleTemplatesCount && (
                  <button
                    type="button"
                    onClick={() => setVisibleTemplatesCount(prev => prev + 24)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Load More Templates ({filteredTemplates.length - visibleTemplatesCount} remaining)
                  </button>
                )}
                {filteredTemplates.length === 0 && (
                  <div className="flex flex-col items-center py-8 text-center text-slate-500">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p className="text-sm font-medium">No templates found matching filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* B. TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">Click to add text styles to your card side:</p>
              
              <button
                onClick={() => addTextElement('heading')}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:bg-slate-900 transition-all cursor-pointer text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-extrabold text-xl">H</div>
                <div>
                  <span className="text-sm font-bold text-white block">Add Big Heading</span>
                  <span className="text-xs text-slate-500">For Name or Brands</span>
                </div>
              </button>

              <button
                onClick={() => addTextElement('subheading')}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:bg-slate-900 transition-all cursor-pointer text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-bold text-sm">S</div>
                <div>
                  <span className="text-sm font-bold text-white block">Add Subheading</span>
                  <span className="text-xs text-slate-500">For Title / Designation</span>
                </div>
              </button>

              <button
                onClick={() => addTextElement('body')}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:bg-slate-900 transition-all cursor-pointer text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">B</div>
                <div>
                  <span className="text-sm font-bold text-white block">Add Body Text</span>
                  <span className="text-xs text-slate-500">For descriptions / notes</span>
                </div>
              </button>

              <button
                onClick={() => addTextElement('contact')}
                className="w-full flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:bg-slate-900 transition-all cursor-pointer text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 text-xs">C</div>
                <div>
                  <span className="text-sm font-bold text-white block">Add Contact Detail</span>
                  <span className="text-xs text-slate-500">Phone, Email, Address, etc.</span>
                </div>
              </button>
            </div>
          )}

          {/* C. QR CODE */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">Generate QR code content below and add it to the card side:</p>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">QR Code Type</label>
                <select
                  value={qrForm.type}
                  onChange={e => setQrForm(prev => ({ ...prev, type: e.target.value as QrType }))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="url">Website URL</option>
                  <option value="vcard">vCard Contact Card</option>
                  <option value="email">Email Link</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Custom Text</option>
                </select>
              </div>

              {/* Dynamic Inputs based on type */}
              {qrForm.type === 'url' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Website Address</label>
                  <input
                    type="text"
                    value={qrForm.url}
                    onChange={e => setQrForm(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="example.com"
                  />
                </div>
              )}

              {qrForm.type === 'text' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Text Content</label>
                  <textarea
                    value={qrForm.text}
                    onChange={e => setQrForm(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full h-20 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
                    placeholder="Enter message..."
                  />
                </div>
              )}

              {qrForm.type === 'phone' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Phone Number</label>
                  <input
                    type="text"
                    value={qrForm.phone}
                    onChange={e => setQrForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="+1 555 123 4567"
                  />
                </div>
              )}

              {qrForm.type === 'email' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={qrForm.email}
                      onChange={e => setQrForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                      placeholder="hello@domain.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Subject</label>
                    <input
                      type="text"
                      value={qrForm.emailSubject}
                      onChange={e => setQrForm(prev => ({ ...prev, emailSubject: e.target.value }))}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {qrForm.type === 'vcard' && (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500">First Name</label>
                      <input
                        type="text"
                        value={qrForm.vcard.firstName}
                        onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, firstName: e.target.value } }))}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500">Last Name</label>
                      <input
                        type="text"
                        value={qrForm.vcard.lastName}
                        onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, lastName: e.target.value } }))}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Company</label>
                    <input
                      type="text"
                      value={qrForm.vcard.org}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, org: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Title</label>
                    <input
                      type="text"
                      value={qrForm.vcard.title}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, title: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Phone</label>
                    <input
                      type="text"
                      value={qrForm.vcard.phone}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, phone: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Email</label>
                    <input
                      type="text"
                      value={qrForm.vcard.email}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, email: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Website</label>
                    <input
                      type="text"
                      value={qrForm.vcard.url}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, url: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Address</label>
                    <input
                      type="text"
                      value={qrForm.vcard.address}
                      onChange={e => setQrForm(prev => ({ ...prev, vcard: { ...prev.vcard, address: e.target.value } }))}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {selectedEl && selectedEl.type === 'qr' ? (
                  <button
                    onClick={updateSelectedQr}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-550 hover:to-indigo-550 py-2.5 text-center text-sm font-bold text-white cursor-pointer transition-all active:scale-95"
                  >
                    Update Selected QR
                  </button>
                ) : (
                  <button
                    onClick={addQrElement}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-550 py-2.5 text-center text-sm font-bold text-white cursor-pointer transition-all active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    Insert QR Code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* D. SHAPES & IMAGES */}
          {activeTab === 'shapes' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Geometric Shapes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addShapeElement('rect')}
                    className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 cursor-pointer"
                  >
                    <div className="h-8 w-12 rounded border border-indigo-500 bg-indigo-500/10 mb-2" />
                    <span className="text-xs text-slate-300">Rectangle</span>
                  </button>
                  <button
                    onClick={() => addShapeElement('circle')}
                    className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full border border-indigo-500 bg-indigo-500/10 mb-2" />
                    <span className="text-xs text-slate-300">Circle</span>
                  </button>
                  <button
                    onClick={() => addShapeElement('triangle')}
                    className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 cursor-pointer"
                  >
                    <div className="h-8 w-8 border-l-[16px] border-r-[16px] border-b-[32px] border-l-transparent border-r-transparent border-b-indigo-500/30 border-indigo-500 mb-2" />
                    <span className="text-xs text-slate-300">Triangle</span>
                  </button>
                  <button
                    onClick={() => addShapeElement('line')}
                    className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 cursor-pointer"
                  >
                    <div className="h-1 w-12 bg-indigo-500 mb-6 mt-3" />
                    <span className="text-xs text-slate-300">Line</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Upload Custom Assets</h3>
                <div className="space-y-3">
                  {/* Photo / Portrait upload */}
                  <div>
                    <label className="flex flex-col items-center justify-center h-24 w-full rounded-xl border border-slate-800 border-dashed bg-slate-900/40 hover:bg-slate-900 cursor-pointer p-4 group transition-all text-center">
                      <Upload className="h-5 w-5 text-indigo-400 group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold text-slate-300 mt-1.5 block">Upload Portrait Photo</span>
                      <span className="text-[10px] text-slate-500">JPG, PNG (max 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Logo upload */}
                  <div>
                    <label className="flex flex-col items-center justify-center h-24 w-full rounded-xl border border-slate-800 border-dashed bg-slate-900/40 hover:bg-slate-900 cursor-pointer p-4 group transition-all text-center">
                      <Sparkles className="h-5 w-5 text-purple-400 group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold text-slate-300 mt-1.5 block">Upload Brand Logo</span>
                      <span className="text-[10px] text-slate-500">Transparents preferred</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E. BACKGROUNDS */}
          {activeTab === 'background' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">Apply backgrounds to the selected card side ({activeSide}):</p>
              
              {/* Type Switcher */}
              <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                <button
                  onClick={() => updateCardState(prev => {
                    const bg = prev.backgrounds[activeSide];
                    return {
                      ...prev,
                      backgrounds: {
                        ...prev.backgrounds,
                        [activeSide]: { ...bg, type: 'color' }
                      }
                    };
                  })}
                  className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    cardState.backgrounds[activeSide].type === 'color' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Solid Color
                </button>
                <button
                  onClick={() => updateCardState(prev => {
                    const bg = prev.backgrounds[activeSide];
                    return {
                      ...prev,
                      backgrounds: {
                        ...prev.backgrounds,
                        [activeSide]: { 
                          ...bg, 
                          type: 'gradient',
                          gradientStart: bg.gradientStart || bg.color || '#1e293b',
                          gradientEnd: bg.gradientEnd || '#0f172a',
                          gradientAngle: bg.gradientAngle || 135
                        }
                      }
                    };
                  })}
                  className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    cardState.backgrounds[activeSide].type === 'gradient' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gradients
                </button>
              </div>

              {cardState.backgrounds[activeSide].type === 'color' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-400">Custom Color:</label>
                    <input
                      type="color"
                      value={cardState.backgrounds[activeSide].color}
                      onChange={e => updateCardState(prev => ({
                        ...prev,
                        backgrounds: {
                          ...prev.backgrounds,
                          [activeSide]: { ...prev.backgrounds[activeSide], color: e.target.value }
                        }
                      }))}
                      className="h-9 w-9 rounded-lg border border-slate-700 cursor-pointer overflow-hidden bg-transparent"
                    />
                    <span className="text-xs font-mono text-white">{cardState.backgrounds[activeSide].color}</span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-2">Preset Palettes</span>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        '#ffffff', '#f8fafc', '#f1f5f9', '#1e293b', '#0f172a',
                        '#111827', '#020617', '#e11d48', '#ea580c', '#ca8a04',
                        '#16a34a', '#0891b2', '#2563eb', '#4f46e5', '#9333ea',
                        '#db2777', '#1a1a2e', '#232946', '#2b2d42', '#1b1b1b'
                      ].map(color => (
                        <button
                          key={color}
                          onClick={() => updateCardState(prev => ({
                            ...prev,
                            backgrounds: {
                              ...prev.backgrounds,
                              [activeSide]: { ...prev.backgrounds[activeSide], color }
                            }
                          }))}
                          className="h-8 rounded-lg border border-slate-800 shadow-inner cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">Start Color</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={cardState.backgrounds[activeSide].gradientStart || '#1e293b'}
                          onChange={e => updateCardState(prev => ({
                            ...prev,
                            backgrounds: {
                              ...prev.backgrounds,
                              [activeSide]: { ...prev.backgrounds[activeSide], gradientStart: e.target.value }
                            }
                          }))}
                          className="h-8 w-8 rounded cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-slate-300 uppercase">{cardState.backgrounds[activeSide].gradientStart || '#1e293b'}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500">End Color</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={cardState.backgrounds[activeSide].gradientEnd || '#0f172a'}
                          onChange={e => updateCardState(prev => ({
                            ...prev,
                            backgrounds: {
                              ...prev.backgrounds,
                              [activeSide]: { ...prev.backgrounds[activeSide], gradientEnd: e.target.value }
                            }
                          }))}
                          className="h-8 w-8 rounded cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-slate-300 uppercase">{cardState.backgrounds[activeSide].gradientEnd || '#0f172a'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                      <span>Gradient Angle</span>
                      <span>{cardState.backgrounds[activeSide].gradientAngle || 135}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={cardState.backgrounds[activeSide].gradientAngle || 135}
                      onChange={e => updateCardState(prev => ({
                        ...prev,
                        backgrounds: {
                          ...prev.backgrounds,
                          [activeSide]: { ...prev.backgrounds[activeSide], gradientAngle: parseInt(e.target.value) }
                        }
                      }))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <span className="text-xs font-semibold text-slate-400 block mb-2">Preset Gradients</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { start: '#4f46e5', end: '#06b6d4', name: 'Indigo Spark' },
                        { start: '#111827', end: '#1f2937', name: 'Corporate Dark' },
                        { start: '#ec4899', end: '#8b5cf6', name: 'Cosmic Violet' },
                        { start: '#059669', end: '#3b82f6', name: 'Ocean Emerald' },
                        { start: '#f59e0b', end: '#ef4444', name: 'Warm Sunset' },
                        { start: '#0f172a', end: '#1e293b', name: 'Slate Night' }
                      ].map((grad, idx) => (
                        <button
                          key={idx}
                          onClick={() => updateCardState(prev => ({
                            ...prev,
                            backgrounds: {
                              ...prev.backgrounds,
                              [activeSide]: {
                                ...prev.backgrounds[activeSide],
                                gradientStart: grad.start,
                                gradientEnd: grad.end,
                                gradientAngle: 135
                              }
                            }
                          }))}
                          className="h-10 rounded-lg border border-slate-800 text-[10px] font-semibold text-white flex items-center justify-center hover:scale-103 transition-all cursor-pointer overflow-hidden relative shadow-md"
                          style={{ background: `linear-gradient(135deg, ${grad.start}, ${grad.end})` }}
                        >
                          <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">{grad.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* F. MY SAVED DESIGNS */}
          {activeTab === 'my-designs' && (
            <div className="space-y-3">
              {savedDesigns.map(design => (
                <div
                  key={design.id}
                  onClick={() => {
                    pushState(cardState);
                    setCardState(design);
                  }}
                  className="group relative flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 cursor-pointer transition-all"
                >
                  <div 
                    className="h-12 w-20 rounded border border-slate-800 flex-shrink-0 relative overflow-hidden"
                    style={getBackgroundStyle(design.backgrounds.front)}
                  >
                    <div className="scale-[0.08] origin-top-left absolute w-[1050px] h-[600px] pointer-events-none">
                      {design.elements.filter(e => e.side === 'front').map(el => (
                        <div
                          key={el.id}
                          style={{
                            position: 'absolute',
                            left: `${el.x}px`,
                            top: `${el.y}px`,
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                            zIndex: el.zIndex
                          }}
                        >
                          {renderCardContent(el, 1)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{design.name}</p>
                    <span className="text-[10px] text-slate-500 block">
                      {design.orientation === 'landscape' ? 'Landscape' : 'Portrait'} · {design.isDoubleSided ? 'Double' : 'Single'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => deleteSavedDesign(e, design.id!)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                    title="Delete Saved Card"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {savedDesigns.length === 0 && (
                <div className="flex flex-col items-center py-10 text-center text-slate-500">
                  <FolderHeart className="h-10 w-10 mb-2 text-slate-655" />
                  <p className="text-sm font-medium">No saved designs yet.</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-[200px]">Save your customizations to list them here.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* 3. CENTER WORKSPACE (THE CANVAS) */}
      <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden relative" ref={workspaceRef}>
        
        {/* Workspace Toolbar Header */}
        <div className="h-14 border-b border-slate-800 bg-slate-950/60 backdrop-blur-md px-6 flex items-center justify-between z-10 flex-shrink-0">
          
          {/* File Actions */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={cardState.name}
              onChange={e => setCardState(prev => ({ ...prev, name: e.target.value }))}
              className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 max-w-[180px]"
            />
            <span className="text-xs text-slate-500">({cardState.orientation})</span>
          </div>

          {/* Edit controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              title="Undo"
            >
              <Undo2 className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              title="Redo"
            >
              <Redo2 className="h-4.5 w-4.5" />
            </button>
            
            <div className="w-px h-5 bg-slate-800 mx-1" />

            <button
              onClick={() => setZoom(prev => Math.max(30, prev - 10))}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="h-4.5 w-4.5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-300 px-1">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(150, prev + 10))}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Settings & Toggle Actions */}
          <div className="flex items-center gap-3">
            
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                showGuides
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Guides: {showGuides ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={saveDesignToLocal}
              className="flex items-center gap-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer active:scale-95 shadow-md"
            >
              Save Design
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setShowPreviewModal(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-500/10"
            >
              <Eye className="h-3.5 w-3.5" />
              Realistic Preview
            </button>
          </div>
        </div>

        {/* Dynamic Zoom Workspace container */}
        <div className="flex-1 overflow-auto p-10 flex items-center justify-center custom-scrollbar">
          
          {/* Card Frame containing Front or Back */}
          <div 
            className="relative"
            style={{
              width: `${cardState.width * (zoom / 100)}px`,
              height: `${cardState.height * (zoom / 100)}px`,
              transition: 'width 0.15s ease, height 0.15s ease'
            }}
          >
            
            {/* FRONT CARD WRAPPER */}
            <div
              ref={canvasRefFront}
              id="business-card-front"
              className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all select-none duration-300 ${
                activeSide === 'front' ? 'block z-10' : 'hidden'
              }`}
              style={{
                width: `${cardState.width}px`,
                height: `${cardState.height}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                ...getBackgroundStyle(cardState.backgrounds.front)
              }}
              onClick={() => setSelectedElementId(null)}
            >
              {/* Bleed Guideline overlays */}
              {showGuides && (
                <div 
                  className="absolute border border-dashed border-red-500/40 pointer-events-none rounded-xl"
                  style={{
                    left: `${cardState.bleed}px`,
                    top: `${cardState.bleed}px`,
                    right: `${cardState.bleed}px`,
                    bottom: `${cardState.bleed}px`,
                    zIndex: 9999
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Safe Area Margin</span>
                </div>
              )}

              {/* Elements Renderer */}
              {cardState.elements
                .filter(el => el.side === 'front')
                .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                .map(el => {
                  const isSelected = selectedElementId === el.id;
                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleElementMouseDown(e, el)}
                      onClick={(e) => {
                        if (!el.locked) {
                          e.stopPropagation();
                        }
                      }}
                      className={`absolute group cursor-move ${
                        isSelected ? 'ring-2 ring-indigo-500 z-50' : 'hover:ring-1 hover:ring-slate-400'
                      }`}
                      style={{
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`,
                        transform: `rotate(${el.rotation || 0}deg)`,
                        opacity: el.opacity ?? 1,
                        zIndex: el.zIndex
                      }}
                    >
                      {/* Render Actual Element */}
                      {renderCardContent(el, 1)}

                      {/* Selection handles */}
                      {isSelected && !el.locked && (
                        <>
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'tl')}
                            className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nwse-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'tr')}
                            className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nesw-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'bl')}
                            className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nesw-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'br')}
                            className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nwse-resize shadow-md"
                          />
                        </>
                      )}

                      {/* Lock overlay tag */}
                      {el.locked && (
                        <div className="absolute top-1 right-1 bg-black/60 p-1 rounded-md text-white pointer-events-none">
                          <Lock className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* BACK CARD WRAPPER */}
            <div
              ref={canvasRefBack}
              id="business-card-back"
              className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all select-none duration-300 ${
                activeSide === 'back' ? 'block z-10' : 'hidden'
              }`}
              style={{
                width: `${cardState.width}px`,
                height: `${cardState.height}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                ...getBackgroundStyle(cardState.backgrounds.back)
              }}
              onClick={() => setSelectedElementId(null)}
            >
              {/* Bleed Guideline overlays */}
              {showGuides && (
                <div 
                  className="absolute border border-dashed border-red-500/40 pointer-events-none rounded-xl"
                  style={{
                    left: `${cardState.bleed}px`,
                    top: `${cardState.bleed}px`,
                    right: `${cardState.bleed}px`,
                    bottom: `${cardState.bleed}px`,
                    zIndex: 9999
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Safe Area Margin</span>
                </div>
              )}

              {/* Elements Renderer */}
              {cardState.elements
                .filter(el => el.side === 'back')
                .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                .map(el => {
                  const isSelected = selectedElementId === el.id;
                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleElementMouseDown(e, el)}
                      onClick={(e) => {
                        if (!el.locked) {
                          e.stopPropagation();
                        }
                      }}
                      className={`absolute group cursor-move ${
                        isSelected ? 'ring-2 ring-indigo-500 z-50' : 'hover:ring-1 hover:ring-slate-400'
                      }`}
                      style={{
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`,
                        transform: `rotate(${el.rotation || 0}deg)`,
                        opacity: el.opacity ?? 1,
                        zIndex: el.zIndex
                      }}
                    >
                      {/* Render Actual Element */}
                      {renderCardContent(el, 1)}

                      {/* Selection handles */}
                      {isSelected && !el.locked && (
                        <>
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'tl')}
                            className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nwse-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'tr')}
                            className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nesw-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'bl')}
                            className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nesw-resize shadow-md"
                          />
                          <div 
                            onMouseDown={(e) => handleResizeMouseDown(e, el, 'br')}
                            className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border border-indigo-500 bg-white cursor-nwse-resize shadow-md"
                          />
                        </>
                      )}

                      {/* Lock overlay tag */}
                      {el.locked && (
                        <div className="absolute top-1 right-1 bg-black/60 p-1 rounded-md text-white pointer-events-none">
                          <Lock className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

          </div>
        </div>

        {/* Front / Back Toggle Selector and quick specs */}
        <div className="h-16 border-t border-slate-800 bg-slate-950/60 backdrop-blur-md px-6 flex items-center justify-between z-10 flex-shrink-0">
          
          <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setActiveSide('front')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSide === 'front' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Front Side Design
            </button>
            <button
              onClick={() => {
                if (!cardState.isDoubleSided) {
                  if (confirm('Enable double-sided layout to design the back side?')) {
                    updateCardState(prev => ({ ...prev, isDoubleSided: true }));
                    setActiveSide('back');
                  }
                } else {
                  setActiveSide('back');
                }
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSide === 'back' ? 'bg-indigo-650 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Back Side Design
            </button>
          </div>

          <div className="flex gap-2">
            {/* Quick action: Add logo, add QR */}
            <button
              onClick={() => {
                const isL = cardState.orientation === 'landscape';
                const newEl: CardElement = {
                  id: `logo-shape-${Date.now()}`,
                  type: 'logo',
                  side: activeSide,
                  x: isL ? 100 : 150,
                  y: isL ? 100 : 150,
                  width: 80,
                  height: 80,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  zIndex: cardState.elements.length + 1,
                  shapeType: 'circle',
                  fill: '#6366f1/10',
                  stroke: '#6366f1',
                  strokeWidth: 4,
                  text: 'CO'
                };
                updateCardState(prev => ({ ...prev, elements: [...prev.elements, newEl] }));
                setSelectedElementId(newEl.id);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Add Logo Shape
            </button>
          </div>
        </div>

      </div>

      {/* 4. RIGHT SIDEBAR PANEL (ELEMENT PROPERTIES / INSPECTOR) */}
      <div className="flex h-full w-80 flex-col border-l border-slate-800 bg-slate-950 overflow-y-auto custom-scrollbar flex-shrink-0">
        
        {/* Properties Header */}
        <div className="border-b border-slate-800 p-4">
          <h2 className="text-base font-bold text-white">
            {selectedEl ? 'Element Settings' : 'Card Global Settings'}
          </h2>
        </div>

        {/* Selected Element Editor Panel */}
        {selectedEl ? (
          <div className="p-4 space-y-5">
            
            {/* Type indicator and delete */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-indigo-400 capitalize bg-indigo-500/10 px-2.5 py-1 rounded-md">{selectedEl.type} Element</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDuplicateElement}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 cursor-pointer"
                  title="Duplicate"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => updateSelectedElement({ locked: !selectedEl.locked })}
                  className={`p-1.5 rounded-lg border cursor-pointer ${
                    selectedEl.locked
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                  title={selectedEl.locked ? 'Unlock' : 'Lock Position'}
                >
                  {selectedEl.locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={handleDeleteElement}
                  className="p-1.5 rounded-lg border border-red-950 bg-red-950/20 text-red-400 hover:bg-red-950/40 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Position & Size */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Dimensions</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">X Position (px)</label>
                  <input
                    type="number"
                    value={selectedEl.x}
                    disabled={selectedEl.locked}
                    onChange={e => updateSelectedElement({ x: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Y Position (px)</label>
                  <input
                    type="number"
                    value={selectedEl.y}
                    disabled={selectedEl.locked}
                    onChange={e => updateSelectedElement({ y: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Width (px)</label>
                  <input
                    type="number"
                    value={selectedEl.width}
                    disabled={selectedEl.locked}
                    onChange={e => updateSelectedElement({ width: Math.max(10, parseInt(e.target.value) || 10) })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Height (px)</label>
                  <input
                    type="number"
                    value={selectedEl.height}
                    disabled={selectedEl.locked}
                    onChange={e => updateSelectedElement({ height: Math.max(10, parseInt(e.target.value) || 10) })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Rotation & Opacity */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <label>Rotation</label>
                  <span>{selectedEl.rotation || 0}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={selectedEl.rotation || 0}
                  disabled={selectedEl.locked}
                  onChange={e => updateSelectedElement({ rotation: parseInt(e.target.value) })}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <label>Opacity</label>
                  <span>{Math.round((selectedEl.opacity ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={(selectedEl.opacity ?? 1) * 100}
                  onChange={e => updateSelectedElement({ opacity: parseInt(e.target.value) / 100 })}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />
              </div>
            </div>

            {/* Layer arrangement buttons */}
            <div className="space-y-2 border-t border-slate-850 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Z-Order (Layers)</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={bringToFront}
                  className="flex items-center justify-center gap-1.5 py-1.5 border border-slate-800 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  Bring Front
                </button>
                <button
                  onClick={sendToBack}
                  className="flex items-center justify-center gap-1.5 py-1.5 border border-slate-800 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                  Send Back
                </button>
              </div>
            </div>

            {/* A. Text specific fields */}
            {selectedEl.type === 'text' && (
              <div className="space-y-4 border-t border-slate-850 pt-4">
                
                {/* Content input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Text Content</label>
                  <textarea
                    value={selectedEl.text || ''}
                    onChange={e => updateSelectedElement({ text: e.target.value })}
                    className="w-full h-16 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Font family selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Font Family</label>
                  <select
                    value={selectedEl.fontFamily || 'Inter'}
                    onChange={e => updateSelectedElement({ fontFamily: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    {['Inter', 'Montserrat', 'Playfair Display', 'Lora', 'Space Grotesk', 'Syne', 'Outfit', 'Fira Code', 'Great Vibes', 'Cinzel', 'DM Sans'].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Typography styling row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Font Size (pt)</label>
                    <input
                      type="number"
                      value={selectedEl.fontSize || 14}
                      onChange={e => updateSelectedElement({ fontSize: parseInt(e.target.value) || 12 })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Font Weight</label>
                    <select
                      value={selectedEl.fontWeight || '400'}
                      onChange={e => updateSelectedElement({ fontWeight: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    >
                      <option value="300">Light</option>
                      <option value="400">Regular</option>
                      <option value="500">Medium</option>
                      <option value="600">Semi-Bold</option>
                      <option value="750">Bold</option>
                      <option value="850">Extra-Bold</option>
                    </select>
                  </div>
                </div>

                {/* Alignment & Text Color */}
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Text Align</label>
                    <div className="flex rounded-md bg-slate-900 p-0.5 border border-slate-800">
                      {(['left', 'center', 'right'] as const).map(align => (
                        <button
                          key={align}
                          onClick={() => updateSelectedElement({ align })}
                          className={`flex-1 text-center py-1 rounded text-xs capitalize cursor-pointer ${
                            selectedEl.align === align ? 'bg-indigo-650 text-white font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Text Color</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.color || '#ffffff'}
                        onChange={e => updateSelectedElement({ color: e.target.value })}
                        className="h-8 w-8 rounded border border-slate-700 cursor-pointer overflow-hidden"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.color}</span>
                    </div>
                  </div>
                </div>

                {/* More typography specs */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-850">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Letter Spacing (px)</label>
                    <input
                      type="number"
                      value={selectedEl.letterSpacing || 0}
                      onChange={e => updateSelectedElement({ letterSpacing: parseInt(e.target.value) || 0 })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Decoration</label>
                    <select
                      value={selectedEl.textDecoration || 'none'}
                      onChange={e => updateSelectedElement({ textDecoration: e.target.value as any })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
                    >
                      <option value="none">None</option>
                      <option value="underline">Underline</option>
                      <option value="line-through">Line Through</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* B. Shape specific fields */}
            {selectedEl.type === 'shape' && (
              <div className="space-y-4 border-t border-slate-850 pt-4">
                
                {/* Shape Type select */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Shape Type</label>
                  <select
                    value={selectedEl.shapeType || 'rect'}
                    onChange={e => updateSelectedElement({ shapeType: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="rect">Rectangle / Block</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>

                {/* Fill and Stroke colors */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Fill Color</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.fill || '#6366f1'}
                        onChange={e => updateSelectedElement({ fill: e.target.value })}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.fill}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Border Color</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.stroke || '#4f46e5'}
                        onChange={e => updateSelectedElement({ stroke: e.target.value })}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.stroke}</span>
                    </div>
                  </div>
                </div>

                {/* Stroke Width and Border Radius */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Border Width (px)</label>
                    <input
                      type="number"
                      value={selectedEl.strokeWidth || 0}
                      onChange={e => updateSelectedElement({ strokeWidth: parseInt(e.target.value) || 0 })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">Border Radius (px)</label>
                    <input
                      type="number"
                      value={selectedEl.borderRadius || 0}
                      onChange={e => updateSelectedElement({ borderRadius: parseInt(e.target.value) || 0 })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* C. QR specific fields */}
            {selectedEl.type === 'qr' && (
              <div className="space-y-4 border-t border-slate-850 pt-4">
                
                {/* Info Note */}
                <div className="rounded-lg bg-indigo-500/10 p-2.5 text-[10px] leading-relaxed text-indigo-400 flex items-start gap-1.5">
                  <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                  <span>Configure QR content on the left panel (QR Tab) and click <b>Update Selected QR</b>.</span>
                </div>

                {/* QR Colors */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">QR Code Color</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.qrColorDark || '#000000'}
                        onChange={async (e) => {
                          const val = e.target.value;
                          const base64 = await generateQRCode(selectedEl.qrText || '', {
                            color: { dark: val, light: selectedEl.qrColorLight || '#ffffff' }
                          });
                          updateSelectedElement({ qrColorDark: val, src: base64 });
                        }}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.qrColorDark}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Background Color</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.qrColorLight || '#ffffff'}
                        onChange={async (e) => {
                          const val = e.target.value;
                          const base64 = await generateQRCode(selectedEl.qrText || '', {
                            color: { dark: selectedEl.qrColorDark || '#000000', light: val }
                          });
                          updateSelectedElement({ qrColorLight: val, src: base64 });
                        }}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.qrColorLight}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* D. Logo/Brand specific fields */}
            {selectedEl.type === 'logo' && (
              <div className="space-y-4 border-t border-slate-850 pt-4">
                
                {/* Logo Image Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Custom Logo Image</label>
                  {selectedEl.src ? (
                    <div className="space-y-2">
                      <div className="relative h-20 w-full rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2">
                        <img src={selectedEl.src} alt="logo-thumbnail" className="h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => updateSelectedElement({ src: undefined })}
                          className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-red-500 hover:bg-red-650 text-white cursor-pointer"
                          title="Remove custom logo"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 block text-center">Using custom logo image (overrides monogram)</span>
                    </div>
                  ) : (
                    <div>
                      <label className="flex flex-col items-center justify-center w-full h-20 border border-dashed border-slate-800 rounded-xl bg-slate-900 hover:bg-slate-850 cursor-pointer transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                          <Upload className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 mb-1" />
                          <p className="text-[10px] text-slate-400 group-hover:text-white">Upload JPG/PNG Logo</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                updateSelectedElement({ src: event.target?.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Monogram string */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Monogram letters</label>
                  <input
                    type="text"
                    value={selectedEl.text || ''}
                    maxLength={3}
                    onChange={e => updateSelectedElement({ text: e.target.value })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    placeholder="CO"
                  />
                </div>

                {/* Shape backing */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Logo Shape Frame</label>
                  <select
                    value={selectedEl.shapeType || 'circle'}
                    onChange={e => updateSelectedElement({ shapeType: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="circle">Circular Crest</option>
                    <option value="rect">Square Frame</option>
                    <option value="triangle">Triangle Shield</option>
                  </select>
                </div>

                {/* Shape colors */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Border Stroke</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.stroke || '#6366f1'}
                        onChange={e => updateSelectedElement({ stroke: e.target.value })}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.stroke}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block">Fill BG</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedEl.fill || '#1e293b'}
                        onChange={e => updateSelectedElement({ fill: e.target.value })}
                        className="h-8 w-8 rounded cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-350">{selectedEl.fill}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Card Settings (When no element is selected) */
          <div className="p-4 space-y-5">
            
            {/* Template specs */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Current Design Specifications</span>
              <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-400">
                <span>Preset Standard:</span>
                <span className="text-white text-right capitalize">{cardState.presetSize.replace('_', ' ')}</span>
                <span>Active dimensions:</span>
                <span className="text-white text-right font-mono">{cardState.width} x {cardState.height} px</span>
                <span>Orientation:</span>
                <span className="text-white text-right capitalize">{cardState.orientation}</span>
                <span>Layers Count:</span>
                <span className="text-white text-right font-mono">{cardState.elements.length}</span>
              </div>
            </div>

            {/* Size Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">Standard Sizes</label>
              <select
                value={cardState.presetSize}
                onChange={e => handleSizePresetChange(e.target.value as any)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value="us_standard">US Standard (3.5" x 2.0")</option>
                <option value="euro_standard">UK/Europe (85mm x 55mm)</option>
                <option value="square">Square Card (2.5" x 2.5")</option>
                <option value="custom">Custom Sizes</option>
              </select>
            </div>

            {/* Custom sizing inputs (Only visible if preset is custom) */}
            {cardState.presetSize === 'custom' && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Width (px)</label>
                  <input
                    type="number"
                    value={cardState.width}
                    onChange={e => updateCardState(prev => ({ ...prev, width: Math.max(300, parseInt(e.target.value) || 300) }))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500">Height (px)</label>
                  <input
                    type="number"
                    value={cardState.height}
                    onChange={e => updateCardState(prev => ({ ...prev, height: Math.max(300, parseInt(e.target.value) || 300) }))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* Orientation Toggles */}
            {cardState.presetSize !== 'square' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 block">Card Layout Orientation</label>
                <div className="flex gap-2">
                  <button
                    onClick={toggleOrientation}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                      cardState.orientation === 'landscape'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Landscape
                  </button>
                  <button
                    onClick={toggleOrientation}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                      cardState.orientation === 'portrait'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Portrait
                  </button>
                </div>
              </div>
            )}

            {/* Double Sided Card Toggle */}
            <div className="flex items-center justify-between border-t border-slate-850 pt-4">
              <div>
                <label className="text-sm font-bold text-white block">Double-sided Card</label>
                <span className="text-[11px] text-slate-500">Design front and back pages</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cardState.isDoubleSided}
                  onChange={e => updateCardState(prev => ({ ...prev, isDoubleSided: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-350 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-650"></div>
              </label>
            </div>

            {/* Bleed details */}
            <div className="space-y-2 border-t border-slate-850 pt-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Bleed / Margin Safe border</span>
                <span>{cardState.bleed} px</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={cardState.bleed}
                onChange={e => updateCardState(prev => ({ ...prev, bleed: parseInt(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-slate-500 leading-normal block">
                Standard print bleed is 0.125" (30px). Keep text inside safe-zone lines to avoid clipping.
              </span>
            </div>

          </div>
        )}
      </div>

      {/* 5. REALISTIC 3D CARD PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-opacity duration-300">
          
          {/* Modal Content */}
          <div className="relative max-w-4xl w-full bg-slate-950 border border-slate-850 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center shadow-2xl overflow-hidden">
            
            {/* Close button */}
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer hover:scale-105 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* A. Left side: The 3D Mockup render */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              
              {/* Perspective card box container */}
              <div 
                className="relative cursor-pointer select-none group perspective-1000"
                style={{
                  width: `${cardState.width}px`,
                  height: `${cardState.height}px`,
                  maxWidth: '100%',
                  // Dynamic height scaling for responsive layouts
                  aspectRatio: `${cardState.width} / ${cardState.height}`
                }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Flipping animation box */}
                <div
                  className="relative w-full h-full duration-700 preserve-3d"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-slate-100/10"
                    style={getBackgroundStyle(cardState.backgrounds.front)}
                  >
                    {cardState.elements
                      .filter(el => el.side === 'front')
                      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                      .map(el => (
                        <div
                          key={el.id}
                          style={{
                            position: 'absolute',
                            left: `${el.x}px`,
                            top: `${el.y}px`,
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                            transform: `rotate(${el.rotation || 0}deg)`,
                            opacity: el.opacity ?? 1,
                            zIndex: el.zIndex
                          }}
                        >
                          {renderCardContent(el, 1)}
                        </div>
                      ))}
                    {/* Shadow overlay glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-slate-100/10"
                    style={{
                      transform: 'rotateY(180deg)',
                      ...getBackgroundStyle(cardState.backgrounds.back)
                    }}
                  >
                    {cardState.elements
                      .filter(el => el.side === 'back')
                      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                      .map(el => (
                        <div
                          key={el.id}
                          style={{
                            position: 'absolute',
                            left: `${el.x}px`,
                            top: `${el.y}px`,
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                            transform: `rotate(${el.rotation || 0}deg)`,
                            opacity: el.opacity ?? 1,
                            zIndex: el.zIndex
                          }}
                        >
                          {renderCardContent(el, 1)}
                        </div>
                      ))}
                    {/* Shadow overlay glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                  </div>

                </div>
              </div>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="mt-6 flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Flip Card Preview
              </button>
            </div>

            {/* B. Right side: Export Specs and Download triggers */}
            <div className="w-full md:w-80 space-y-6 flex-shrink-0 md:border-l md:border-slate-850 md:pl-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{cardState.name}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Standard Business card. Realistic dimensions computed for high-fidelity 300 DPI exports.
                </p>
              </div>

              <div className="space-y-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Export Formats</span>
                
                {/* PDF print ready download */}
                <button
                  onClick={exportAsPDF}
                  disabled={isExporting}
                  className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-4 text-white text-left font-bold shadow-lg shadow-indigo-650/10 cursor-pointer disabled:opacity-50 transition-all duration-200 active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm block">Print-Ready PDF</span>
                      <span className="text-[10px] text-slate-300 font-semibold uppercase">300 DPI Vector layout</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </button>

                {/* PNG image download */}
                <button
                  onClick={() => exportAsImage('png')}
                  disabled={isExporting}
                  className="w-full flex items-center justify-between rounded-xl border border-slate-850 bg-slate-900 p-4 text-white text-left font-bold cursor-pointer disabled:opacity-50 transition-all hover:bg-slate-850 active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm block">Download Front & Back (PNG)</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Lossless High-Res Images</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </button>

                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center gap-2 justify-center rounded-xl border border-slate-850 bg-slate-900 py-3 text-sm font-semibold text-slate-300 hover:text-white cursor-pointer hover:bg-slate-850 transition-all"
                >
                  <Printer className="h-4 w-4" />
                  Print Locally
                </button>
              </div>

              <div className="border-t border-slate-850 pt-4 flex gap-2 items-start text-[10px] text-slate-500 leading-normal">
                <AlertCircle className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>
                  Print-ready PDFs use real physical sizing models. Keep standard printers loaded with 350gsm paper for optimal results.
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
