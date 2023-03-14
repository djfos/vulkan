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
import { BufferCollectionFUCHSIA } from "../def.ts";

export interface InitBufferCollectionBufferCreateInfoFUCHSIA {
  pNext?: AnyPointer;
  collection?: BufferCollectionFUCHSIA;
  index?: number;
}

export class BufferCollectionBufferCreateInfoFUCHSIA implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitBufferCollectionBufferCreateInfoFUCHSIA);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitBufferCollectionBufferCreateInfoFUCHSIA) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(BufferCollectionBufferCreateInfoFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < BufferCollectionBufferCreateInfoFUCHSIA.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(BufferCollectionBufferCreateInfoFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.collection !== undefined) this.collection = data.collection;
      if (data.index !== undefined) this.index = data.index;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, BufferCollectionBufferCreateInfoFUCHSIA.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.BUFFER_COLLECTION_BUFFER_CREATE_INFO_FUCHSIA;
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

  get collection() {
    return pointerFromView(this.#view, 16, LE);
  }

  set collection(value: BufferCollectionFUCHSIA) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get index() {
    return this.#view.getUint32(24, LE);
  }

  set index(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }
}