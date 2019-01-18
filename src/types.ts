import { Browser } from 'puppeteer';

export interface IPolicyResult {
  id: string;
  widths: number[];
}

export interface IResult {
  imageTypes: IImageTypeResult[];
  policies: IPolicyResult[];
}

export interface IAnalyzeContext {
  viewports: any[];
  imageTypes: any[];
  browser: Browser;
}

export interface IViewportConfig {
  breakpoint: number;
  width: number;
  fallback?: boolean;
}

export interface IImageTypeConfig {
  url: string;
  credentials?: {
    username: string;
    password: string;
  };
  selector: string;
  policy: string;
  policyOverrides?: {
    [key: string]: string;
  };
  useRelativeUnit: boolean;
  retinaScale: number;
}

export interface IConfig {
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
  open?: boolean;
}

export interface IWriteOptions {
  clean?: boolean;
}
