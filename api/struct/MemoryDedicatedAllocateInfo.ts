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
import { Image, Buffer } from "../def.ts";

export interface InitMemoryDedicatedAllocateInfo {
  pNext?: AnyPointer;
  image?: AnyPointer;
  buffer?: AnyPointer;
}

export class MemoryDedicatedAllocateInfo implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitMemoryDedicatedAllocateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitMemoryDedicatedAllocateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(MemoryDedicatedAllocateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < MemoryDedicatedAllocateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(MemoryDedicatedAllocateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.image !== undefined) this.image = data.image;
      if (data.buffer !== undefined) this.buffer = data.buffer;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, MemoryDedicatedAllocateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.MEMORY_DEDICATED_ALLOCATE_INFO;
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

  /** Image that this allocation will be bound to */
  get image(): Deno.PointerValue {
    return pointerFromView(this.#view, 16, LE);
  }
  
  set image(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  /** Buffer that this allocation will be bound to */
  get buffer(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set buffer(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }
}