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
import {BufferCopy2} from "./BufferCopy2.ts";
import { StructureType } from "../enum.ts";
import { Buffer } from "../def.ts";

export interface InitCopyBufferInfo2 {
  pNext?: AnyPointer;
  srcBuffer?: Buffer;
  dstBuffer?: Buffer;
  regionCount?: number;
  pRegions?: AnyPointer;
}

export class CopyBufferInfo2 implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitCopyBufferInfo2);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitCopyBufferInfo2) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(CopyBufferInfo2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < CopyBufferInfo2.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(CopyBufferInfo2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.srcBuffer !== undefined) this.srcBuffer = data.srcBuffer;
      if (data.dstBuffer !== undefined) this.dstBuffer = data.dstBuffer;
      if (data.regionCount !== undefined) this.regionCount = data.regionCount;
      if (data.pRegions !== undefined) this.pRegions = data.pRegions;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, CopyBufferInfo2.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COPY_BUFFER_INFO_2;
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

  get srcBuffer() {
    return pointerFromView(this.#view, 16, LE);
  }

  set srcBuffer(value: Buffer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get dstBuffer() {
    return pointerFromView(this.#view, 24, LE);
  }

  set dstBuffer(value: Buffer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get regionCount() {
    return this.#view.getUint32(32, LE);
  }

  set regionCount(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get pRegions() {
    return pointerFromView(this.#view, 40, LE);
  }

  set pRegions(value: AnyPointer) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }
}