export type LayoutSchema = {
  schemaVersion: string;
  lastModifiedBy: string;
  title: string;
  report: {
    paperType: 'A3' | 'A4' | 'A5' | 'B4' | 'B5' | 'B4_ISO' | 'B5_ISO' | 'user';
    width: number;
    height: number;
    orientation: 'landscape' | 'portrait';
    margin: [number, number, number, number];
  };
  state: {
    layoutGuides: Array<{
      type: 'x' | 'y';
      position: number;
    }>;
  };
  sections: AnySectionSchema[];
};

export type AnySectionSchema = HeaderSectionSchema | DetailSectionSchema | FooterSectionSchema;

export type SectionSchema = {
  id: string;
  height: number;
  autoStretch: boolean;
  items: AnyItemSchema[];
};

export type HeaderSectionSchema = SectionSchema & {
  type: 'header';
  everyPage: boolean;
  display: boolean;
};

export type DetailSectionSchema = SectionSchema & {
  type: 'detail';
};

export type FooterSectionSchema = SectionSchema & {
  type: 'footer';
  display: boolean;
};

export type GraphicItemSchema = RectItemSchema | EllipseItemSchema | LineItemSchema | TextItemSchema | TextBlockItemSchema | ImageBlockItemSchema | ImageItemSchema;
export type AnyItemSchema = GraphicItemSchema | StackViewItemSchema;

export type ItemSchema = {
  id: string;
  display: boolean;
  description: string;
  followStretch: 'none' | 'y' | 'height';
  affectBottomMargin: boolean;
};

export type ItemBorderStyleSchema = {
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted';
};

export type ItemTextStyleSchema = {
  fontFamily: ['Helvetica' | 'Courier New' | 'Times New Roman' | 'IPAMincho' | 'IPAPMincho' | 'IPAGothic' | 'IPAPGothic'];
  fontSize: number;
  color: string;
  fontStyle: Array<'bold' | 'italic' | 'underline' | 'linethrough'>;
  textAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  lineHeight: number;
  lineHeightRatio: number | '';
  letterSpacing: number | '';
};

export type BoundsItemSchema = ItemSchema & {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RectItemSchema = BoundsItemSchema & {
  type: 'rect';
  borderRadius: number;
  style: ItemBorderStyleSchema & {
    fillColor: string;
  };
};

export type EllipseItemSchema = ItemSchema & {
  type: 'ellipse';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  style: ItemBorderStyleSchema & {
    fillColor: string;
  };
};

export type LineItemSchema = ItemSchema & {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  style: ItemBorderStyleSchema;
};

export type TextItemSchema = BoundsItemSchema & {
  type: 'text';
  texts: string[];
  style: ItemTextStyleSchema;
};

export type TextBlockItemSchema = BoundsItemSchema & {
  type: 'text-block';
  referenceId: '';
  value: string;
  multipleLine: boolean;
  format: {
    base: string;
  } & (TextBlockFormatNoneSchema | TextBlockFormatDatetimeSchema | TextBlockFormatNumberSchema | TextBlockFormatPaddingSchema);
  style: ItemTextStyleSchema & {
    overflow: 'truncate' | 'fit' | 'expand';
    wordWrap: 'break-word' | 'none';
  };
};

export type TextBlockFormatNoneSchema = {
  type: '';
};

export type TextBlockFormatDatetimeSchema = {
  type: 'datetime';
  datetime: {
    format: string;
  };
}

export type TextBlockFormatNumberSchema = {
  type: 'number';
  number: {
    delimiter: string;
    precision: number;
  };
};

export type TextBlockFormatPaddingSchema = {
  type: 'padding';
  padding: {
    length: number;
    char: string;
    direction: 'L' | 'R';
  };
};

export type ImageBlockItemSchema = BoundsItemSchema & {
  type: 'image-block';
  style: {
    positionX: 'left' | 'center' | 'right';
    positionY: 'top' | 'middle' | 'bottom';
  };
};

export type ImageItemSchema = BoundsItemSchema & {
  type: 'image';
  data: {
    mimeType: 'image/png' | 'image/jpeg';
    base64: string;
  };
};

export type StackViewItemSchema = ItemSchema & {
  type: 'stack-view';
  x: number;
  y: number;
  width: number;
  followStretch: Omit<ItemSchema['followStretch'], 'height'>;
  rows: StackViewRowSchema[];
};

export type StackViewRowSchema = {
  id: string;
  height: number;
  autoStretch: boolean;
  display: boolean;
  items: GraphicItemSchema[];
};
