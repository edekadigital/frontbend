import { Browser, AuthOptions } from 'puppeteer';

export interface IPolicyResult {
  id: string;
  breakpoints: {
    widths: number[];
  };
}

export interface IResult {
  imageTypes: IImageTypeResult[];
  policies: IPolicyResult[];
}

export interface IAnalyzeContext {
  policies: {
    [key: string]: {};
  };
  viewports: IViewport[];
  imageTypes: IImageType[];
  browser: Browser;
  parallel: number;
}

export interface IViewportConfig {
  breakpoint: number;
  width: number;
  fallback?: boolean;
}

export interface IImageTypeConfig {
  url: string;
  credentials: AuthOptions | null;
  selector: string;
  policy: string;
  overrides?: {
    [key: string]: {
      policy?: string;
    };
  };
  useRelativeUnit: boolean;
  retinaScale: number;
}

export interface IConfig {
  policies: {
    [key: string]: {};
  };
  viewports: {
    [key: string]: IViewportConfig;
  };
  imageTypes: {
    [key: string]: IImageTypeConfig;
  };
}

export interface IViewport extends IViewportConfig {
  id: string;
  fallback: boolean;
}

export interface IImageType extends IImageTypeConfig {
  id: string;
}

export interface ISource {
  media?: string;
  policy: string;
  widths: number[];
  sizes: string[];
}

export interface IFallbackSource {
  policy: string;
  width: number;
}

export interface IImageTypeResult {
  id: string;
  sources: ISource[];
  src: IFallbackSource;
}

export interface IAnalyzeOptions {
  parallel?: number;
  open?: boolean;
}

export interface IWriteOptions {
  clean?: boolean;
}
