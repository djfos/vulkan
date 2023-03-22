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
import { AccessFlags, Buffer, DeviceSize } from "../def.ts";

export interface InitBufferMemoryBarrier {
  pNext?: AnyPointer;
  srcAccessMask?: AccessFlags;
  dstAccessMask?: AccessFlags;
  srcQueueFamilyIndex?: number;
  dstQueueFamilyIndex?: number;
  buffer?: AnyPointer;
  offset?: DeviceSize;
  size?: DeviceSize;
}

export class BufferMemoryBarrier implements BaseStruct {
  static size = 56;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitBufferMemoryBarrier);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitBufferMemoryBarrier) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(BufferMemoryBarrier.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < BufferMemoryBarrier.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(BufferMemoryBarrier.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.srcAccessMask !== undefined) this.srcAccessMask = data.srcAccessMask;
      if (data.dstAccessMask !== undefined) this.dstAccessMask = data.dstAccessMask;
      if (data.srcQueueFamilyIndex !== undefined) this.srcQueueFamilyIndex = data.srcQueueFamilyIndex;
      if (data.dstQueueFamilyIndex !== undefined) this.dstQueueFamilyIndex = data.dstQueueFamilyIndex;
      if (data.buffer !== undefined) this.buffer = data.buffer;
      if (data.offset !== undefined) this.offset = data.offset;
      if (data.size !== undefined) this.size = data.size;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, BufferMemoryBarrier.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.BUFFER_MEMORY_BARRIER;
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

  /** Memory accesses from the source of the dependency to synchronize */
  get srcAccessMask(): AccessFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set srcAccessMask(value: AccessFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** Memory accesses from the destination of the dependency to synchronize */
  get dstAccessMask(): AccessFlags {
    return this.#view.getUint32(20, LE);
  }
  
  set dstAccessMask(value: AccessFlags) {
    this.#view.setUint32(20, Number(value), LE);
  }

  /** Queue family to transition ownership from */
  get srcQueueFamilyIndex(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set srcQueueFamilyIndex(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** Queue family to transition ownership to */
  get dstQueueFamilyIndex(): number {
    return this.#view.getUint32(28, LE);
  }
  
  set dstQueueFamilyIndex(value: number) {
    this.#view.setUint32(28, Number(value), LE);
  }

  /** Buffer to sync */
  get buffer(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set buffer(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  /** Offset within the buffer to sync */
  get offset(): bigint {
    return this.#view.getBigUint64(40, LE);
  }
  
  set offset(value: number | bigint) {
    this.#view.setBigUint64(40, BigInt(value), LE);
  }

  /** Amount of bytes to sync */
  get size(): bigint {
    return this.#view.getBigUint64(48, LE);
  }
  
  set size(value: number | bigint) {
    this.#view.setBigUint64(48, BigInt(value), LE);
  }
}