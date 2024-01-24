declare module 'electron-screenshot-app' {
  interface Display {
    id: number;
    bounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    workArea: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    scaleFactor: number;
    rotation: number;
    touchSupport: 'available' | 'unavailable' | 'unknown';
  }

  interface CaptureOptions {
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    scale?: number;
  }

  export function listDisplays(): Promise<Display[]>;
  export function captureDisplays(displays: Display[], options?: CaptureOptions): Promise<Buffer>;
}
