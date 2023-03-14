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
import {StdVideoH265VideoParameterSet} from "./StdVideoH265VideoParameterSet.ts";
import {StdVideoH265SequenceParameterSet} from "./StdVideoH265SequenceParameterSet.ts";
import {StdVideoH265PictureParameterSet} from "./StdVideoH265PictureParameterSet.ts";
import { StructureType } from "../enum.ts";

export interface InitVideoDecodeH265SessionParametersAddInfoEXT {
  pNext?: AnyPointer;
  stdVPSCount?: number;
  pStdVPSs?: AnyPointer;
  stdSPSCount?: number;
  pStdSPSs?: AnyPointer;
  stdPPSCount?: number;
  pStdPPSs?: AnyPointer;
}

export class VideoDecodeH265SessionParametersAddInfoEXT implements BaseStruct {
  static size = 64;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitVideoDecodeH265SessionParametersAddInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitVideoDecodeH265SessionParametersAddInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(VideoDecodeH265SessionParametersAddInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < VideoDecodeH265SessionParametersAddInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(VideoDecodeH265SessionParametersAddInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.stdVPSCount !== undefined) this.stdVPSCount = data.stdVPSCount;
      if (data.pStdVPSs !== undefined) this.pStdVPSs = data.pStdVPSs;
      if (data.stdSPSCount !== undefined) this.stdSPSCount = data.stdSPSCount;
      if (data.pStdSPSs !== undefined) this.pStdSPSs = data.pStdSPSs;
      if (data.stdPPSCount !== undefined) this.stdPPSCount = data.stdPPSCount;
      if (data.pStdPPSs !== undefined) this.pStdPPSs = data.pStdPPSs;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, VideoDecodeH265SessionParametersAddInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.VIDEO_DECODE_H265_SESSION_PARAMETERS_ADD_INFO_EXT;
  }

  get sType() {
    return this.#view.getUint32(0, LE);
  }

  set sType(value: StructureType) {
    this.#view.setUint32(0, Number(value), LE);
  }

  get pNext() {
    return pointerFromView(this.#view, 8, LE);
  }

  set pNext(value: AnyPointer) {
    this.#view.setBigUint64(8, BigInt(anyPointer(value)), LE);
  }

  get stdVPSCount() {
    return this.#view.getUint32(16, LE);
  }

  set stdVPSCount(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get pStdVPSs() {
    return pointerFromView(this.#view, 24, LE);
  }

  set pStdVPSs(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get stdSPSCount() {
    return this.#view.getUint32(32, LE);
  }

  set stdSPSCount(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get pStdSPSs() {
    return pointerFromView(this.#view, 40, LE);
  }

  set pStdSPSs(value: AnyPointer) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }

  get stdPPSCount() {
    return this.#view.getUint32(48, LE);
  }

  set stdPPSCount(value: number) {
    this.#view.setUint32(48, Number(value), LE);
  }

  get pStdPPSs() {
    return pointerFromView(this.#view, 56, LE);
  }

  set pStdPPSs(value: AnyPointer) {
    this.#view.setBigUint64(56, BigInt(anyPointer(value)), LE);
  }
}