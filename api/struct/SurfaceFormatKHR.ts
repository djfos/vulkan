// deno-lint-ignore-file no-unused-vars
import {
  AnyBuffer,
  AnyPointer,
  anyBuffer,
  anyPointer,
  BUFFER,
  DATAVIEW,
  LE,
  BaseStruct,
  pointerFromView,
  notPointerObject,
} from "../util.ts";
import { Format, ColorSpaceKHR } from "../enum.ts";

export interface InitSurfaceFormatKHR {
  format?: Format;
  colorSpace?: ColorSpaceKHR;
}

export class SurfaceFormatKHR implements BaseStruct {
  static size = 8;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitSurfaceFormatKHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitSurfaceFormatKHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(SurfaceFormatKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < SurfaceFormatKHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(SurfaceFormatKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.format !== undefined) this.format = data.format;
      if (data.colorSpace !== undefined) this.colorSpace = data.colorSpace;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, SurfaceFormatKHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** Supported pair of rendering format */
  get format(): Format {
    return this.#view.getInt32(0, LE);
  }
  
  set format(value: Format) {
    this.#view.setInt32(0, Number(value), LE);
  }

  /** and color space for the surface */
  get colorSpace(): ColorSpaceKHR {
    return this.#view.getInt32(4, LE);
  }
  
  set colorSpace(value: ColorSpaceKHR) {
    this.#view.setInt32(4, Number(value), LE);
  }
}