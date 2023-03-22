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

export interface InitBufferCollectionConstraintsInfoFUCHSIA {
  pNext?: AnyPointer;
  minBufferCount?: number;
  maxBufferCount?: number;
  minBufferCountForCamping?: number;
  minBufferCountForDedicatedSlack?: number;
  minBufferCountForSharedSlack?: number;
}

export class BufferCollectionConstraintsInfoFUCHSIA implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitBufferCollectionConstraintsInfoFUCHSIA);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitBufferCollectionConstraintsInfoFUCHSIA) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(BufferCollectionConstraintsInfoFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < BufferCollectionConstraintsInfoFUCHSIA.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(BufferCollectionConstraintsInfoFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.minBufferCount !== undefined) this.minBufferCount = data.minBufferCount;
      if (data.maxBufferCount !== undefined) this.maxBufferCount = data.maxBufferCount;
      if (data.minBufferCountForCamping !== undefined) this.minBufferCountForCamping = data.minBufferCountForCamping;
      if (data.minBufferCountForDedicatedSlack !== undefined) this.minBufferCountForDedicatedSlack = data.minBufferCountForDedicatedSlack;
      if (data.minBufferCountForSharedSlack !== undefined) this.minBufferCountForSharedSlack = data.minBufferCountForSharedSlack;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, BufferCollectionConstraintsInfoFUCHSIA.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.BUFFER_COLLECTION_CONSTRAINTS_INFO_FUCHSIA;
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

  get minBufferCount(): number {
    return this.#view.getUint32(16, LE);
  }
  
  set minBufferCount(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get maxBufferCount(): number {
    return this.#view.getUint32(20, LE);
  }
  
  set maxBufferCount(value: number) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get minBufferCountForCamping(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set minBufferCountForCamping(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get minBufferCountForDedicatedSlack(): number {
    return this.#view.getUint32(28, LE);
  }
  
  set minBufferCountForDedicatedSlack(value: number) {
    this.#view.setUint32(28, Number(value), LE);
  }

  get minBufferCountForSharedSlack(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set minBufferCountForSharedSlack(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }
}