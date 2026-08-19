export type ElementType = 'text' | 'image' | 'qr' | 'shape' | 'logo';

export type ShapeType = 'rect' | 'circle' | 'line' | 'triangle';

export type QrType = 'url' | 'vcard' | 'email' | 'phone' | 'text';

export interface CardElement {
  id: string;
  type: ElementType;
  side: 'front' | 'back';
  x: number; // pixel position relative to nominal card width (e.g. 1050)
  y: number; // pixel position relative to nominal card height (e.g. 600)
  width: number;
  height: number;
  rotation: number; // 0 to 360
  opacity: number; // 0 to 1
  locked: boolean;
  zIndex: number;
  
  // Text specific
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string; // '300' | '400' | '500' | '600' | '700' | '800'
  fontStyle?: 'normal' | 'italic';
  color?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  textDecoration?: 'none' | 'underline' | 'line-through';

  // Image/Logo specific
  src?: string; // base64 or stock path
  borderRadius?: number;

  // Shape specific
  shapeType?: ShapeType;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;

  // QR specific
  qrType?: QrType;
  qrData?: any; // object or string depending on type
  qrColorDark?: string;
  qrColorLight?: string;
  qrMargin?: number;
  qrText?: string; // compiled raw text encoded inside QR
}

export interface CardState {
  id?: string;
  name: string;
  width: number; // e.g. 1050 (3.5 inches at 300 DPI)
  height: number; // e.g. 600 (2 inches at 300 DPI)
  presetSize: 'us_standard' | 'euro_standard' | 'square' | 'custom';
  orientation: 'landscape' | 'portrait';
  isDoubleSided: boolean;
  bleed: number; // bleed guide in pixels (e.g. 30)
  backgrounds: {
    front: {
      type: 'color' | 'gradient' | 'pattern';
      color: string;
      gradientStart?: string;
      gradientEnd?: string;
      gradientAngle?: number;
      pattern?: string;
    };
    back: {
      type: 'color' | 'gradient' | 'pattern';
      color: string;
      gradientStart?: string;
      gradientEnd?: string;
      gradientAngle?: number;
      pattern?: string;
    };
  };
  elements: CardElement[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  orientation: 'landscape' | 'portrait';
  isDoubleSided: boolean;
  presetSize: 'us_standard' | 'euro_standard' | 'square' | 'custom';
  backgrounds: CardState['backgrounds'];
  elements: CardElement[];
}
