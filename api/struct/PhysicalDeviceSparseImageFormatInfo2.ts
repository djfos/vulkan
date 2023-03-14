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
import { StructureType, Format, ImageType, SampleCountFlagBits, ImageTiling } from "../enum.ts";
import { ImageUsageFlags } from "../def.ts";

export interface InitPhysicalDeviceSparseImageFormatInfo2 {
  pNext?: AnyPointer;
  format?: Format;
  type?: ImageType;
  samples?: SampleCountFlagBits;
  usage?: ImageUsageFlags;
  tiling?: ImageTiling;
}

export class PhysicalDeviceSparseImageFormatInfo2 implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceSparseImageFormatInfo2);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceSparseImageFormatInfo2) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceSparseImageFormatInfo2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceSparseImageFormatInfo2.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceSparseImageFormatInfo2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.format !== undefined) this.format = data.format;
      if (data.type !== undefined) this.type = data.type;
      if (data.samples !== undefined) this.samples = data.samples;
      if (data.usage !== undefined) this.usage = data.usage;
      if (data.tiling !== undefined) this.tiling = data.tiling;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceSparseImageFormatInfo2.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2;
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

  get format() {
    return this.#view.getUint32(16, LE);
  }

  set format(value: Format) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get type() {
    return this.#view.getUint32(20, LE);
  }

  set type(value: ImageType) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get samples() {
    return this.#view.getUint32(24, LE);
  }

  set samples(value: SampleCountFlagBits) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get usage() {
    return this.#view.getUint32(28, LE);
  }

  set usage(value: ImageUsageFlags) {
    this.#view.setUint32(28, Number(value), LE);
  }

  get tiling() {
    return this.#view.getUint32(32, LE);
  }

  set tiling(value: ImageTiling) {
    this.#view.setUint32(32, Number(value), LE);
  }
}