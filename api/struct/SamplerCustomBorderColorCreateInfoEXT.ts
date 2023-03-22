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
import { StructureType, Format } from "../enum.ts";
import { ClearColorValue } from "../union.ts";

export interface InitSamplerCustomBorderColorCreateInfoEXT {
  pNext?: AnyPointer;
  customBorderColor?: ClearColorValue;
  format?: Format;
}

export class SamplerCustomBorderColorCreateInfoEXT implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitSamplerCustomBorderColorCreateInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitSamplerCustomBorderColorCreateInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(SamplerCustomBorderColorCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < SamplerCustomBorderColorCreateInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(SamplerCustomBorderColorCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.customBorderColor !== undefined) this.customBorderColor = data.customBorderColor;
      if (data.format !== undefined) this.format = data.format;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, SamplerCustomBorderColorCreateInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.SAMPLER_CUSTOM_BORDER_COLOR_CREATE_INFO_EXT;
  }

  get sType(): StructureType {
    return this.#view.getInt32(0, LE);
  }
  
  set sType(value: StructureType) {
    this.#view.setInt32(0, Number(value), LE);
  }

  get pNext(): Deno.PointerValue {
    return pointerFromView(this.#view, 8, LE);
  }
  
  set pNext(value: AnyPointer) {
    this.#view.setBigUint64(8, BigInt(anyPointer(value)), LE);
  }

  get customBorderColor(): ClearColorValue {
    throw new Error(`Unknown type: {"union":[{"array":"f32","len":4},{"array":"i32","len":4},{"array":"u32","len":4}]}`);
  }
  set customBorderColor(value: ClearColorValue) {
    throw new Error(`Unknown type: {"union":[{"array":"f32","len":4},{"array":"i32","len":4},{"array":"u32","len":4}]}`);
  }

  get format(): Format {
    return this.#view.getInt32(32, LE);
  }
  
  set format(value: Format) {
    this.#view.setInt32(32, Number(value), LE);
  }
}