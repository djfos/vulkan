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
import { StructureType } from "../enum.ts";

export interface InitVideoDecodeH264SessionParametersAddInfoEXT {
  pNext?: AnyPointer;
  stdSPSCount?: number;
  pStdSPSs?: AnyPointer;
  stdPPSCount?: number;
  pStdPPSs?: AnyPointer;
}

export class VideoDecodeH264SessionParametersAddInfoEXT implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitVideoDecodeH264SessionParametersAddInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitVideoDecodeH264SessionParametersAddInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(VideoDecodeH264SessionParametersAddInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < VideoDecodeH264SessionParametersAddInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(VideoDecodeH264SessionParametersAddInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.stdSPSCount !== undefined) this.stdSPSCount = data.stdSPSCount;
      if (data.pStdSPSs !== undefined) this.pStdSPSs = data.pStdSPSs;
      if (data.stdPPSCount !== undefined) this.stdPPSCount = data.stdPPSCount;
      if (data.pStdPPSs !== undefined) this.pStdPPSs = data.pStdPPSs;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, VideoDecodeH264SessionParametersAddInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.VIDEO_DECODE_H264_SESSION_PARAMETERS_ADD_INFO_EXT;
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

  get stdSPSCount(): number {
    return this.#view.getUint32(16, LE);
  }
  
  set stdSPSCount(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get pStdSPSs(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pStdSPSs(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get stdPPSCount(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set stdPPSCount(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  /** List of Picture Parameters associated with the spsStd, above */
  get pStdPPSs(): Deno.PointerValue {
    return pointerFromView(this.#view, 40, LE);
  }
  
  set pStdPPSs(value: AnyPointer) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }
}