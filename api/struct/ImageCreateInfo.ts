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
import {Extent3D} from "./Extent3D.ts";
import { StructureType, ImageType, Format, SampleCountFlagBits, ImageTiling, SharingMode, ImageLayout } from "../enum.ts";
import { ImageCreateFlags, ImageUsageFlags } from "../def.ts";

export interface InitImageCreateInfo {
  pNext?: AnyPointer;
  flags?: ImageCreateFlags;
  imageType?: ImageType;
  format?: Format;
  extent?: Extent3D;
  mipLevels?: number;
  arrayLayers?: number;
  samples?: SampleCountFlagBits;
  tiling?: ImageTiling;
  usage?: ImageUsageFlags;
  sharingMode?: SharingMode;
  queueFamilyIndexCount?: number;
  pQueueFamilyIndices?: AnyPointer;
  initialLayout?: ImageLayout;
}

export class ImageCreateInfo implements BaseStruct {
  static size = 88;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitImageCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitImageCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(ImageCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < ImageCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(ImageCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.imageType !== undefined) this.imageType = data.imageType;
      if (data.format !== undefined) this.format = data.format;
      if (data.extent !== undefined) this.extent = data.extent;
      if (data.mipLevels !== undefined) this.mipLevels = data.mipLevels;
      if (data.arrayLayers !== undefined) this.arrayLayers = data.arrayLayers;
      if (data.samples !== undefined) this.samples = data.samples;
      if (data.tiling !== undefined) this.tiling = data.tiling;
      if (data.usage !== undefined) this.usage = data.usage;
      if (data.sharingMode !== undefined) this.sharingMode = data.sharingMode;
      if (data.queueFamilyIndexCount !== undefined) this.queueFamilyIndexCount = data.queueFamilyIndexCount;
      if (data.pQueueFamilyIndices !== undefined) this.pQueueFamilyIndices = data.pQueueFamilyIndices;
      if (data.initialLayout !== undefined) this.initialLayout = data.initialLayout;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ImageCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.IMAGE_CREATE_INFO;
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

  /** Image creation flags */
  get flags(): ImageCreateFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: ImageCreateFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get imageType(): ImageType {
    return this.#view.getInt32(20, LE);
  }
  
  set imageType(value: ImageType) {
    this.#view.setInt32(20, Number(value), LE);
  }

  get format(): Format {
    return this.#view.getInt32(24, LE);
  }
  
  set format(value: Format) {
    this.#view.setInt32(24, Number(value), LE);
  }

  get extent(): Extent3D {
    return new Extent3D(this.#data.subarray(28, 28 + Extent3D.size));
  }
  set extent(value: Extent3D) {
    if (value[BUFFER].byteLength < Extent3D.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 28);
  }

  get mipLevels(): number {
    return this.#view.getUint32(40, LE);
  }
  
  set mipLevels(value: number) {
    this.#view.setUint32(40, Number(value), LE);
  }

  get arrayLayers(): number {
    return this.#view.getUint32(44, LE);
  }
  
  set arrayLayers(value: number) {
    this.#view.setUint32(44, Number(value), LE);
  }

  get samples(): SampleCountFlagBits {
    return this.#view.getInt32(48, LE);
  }
  
  set samples(value: SampleCountFlagBits) {
    this.#view.setInt32(48, Number(value), LE);
  }

  get tiling(): ImageTiling {
    return this.#view.getInt32(52, LE);
  }
  
  set tiling(value: ImageTiling) {
    this.#view.setInt32(52, Number(value), LE);
  }

  /** Image usage flags */
  get usage(): ImageUsageFlags {
    return this.#view.getUint32(56, LE);
  }
  
  set usage(value: ImageUsageFlags) {
    this.#view.setUint32(56, Number(value), LE);
  }

  /** Cross-queue-family sharing mode */
  get sharingMode(): SharingMode {
    return this.#view.getInt32(60, LE);
  }
  
  set sharingMode(value: SharingMode) {
    this.#view.setInt32(60, Number(value), LE);
  }

  /** Number of queue families to share across */
  get queueFamilyIndexCount(): number {
    return this.#view.getUint32(64, LE);
  }
  
  set queueFamilyIndexCount(value: number) {
    this.#view.setUint32(64, Number(value), LE);
  }

  /** Array of queue family indices to share across */
  get pQueueFamilyIndices(): Deno.PointerValue {
    return pointerFromView(this.#view, 72, LE);
  }
  
  set pQueueFamilyIndices(value: AnyPointer) {
    this.#view.setBigUint64(72, BigInt(anyPointer(value)), LE);
  }

  /** Initial image layout for all subresources */
  get initialLayout(): ImageLayout {
    return this.#view.getInt32(80, LE);
  }
  
  set initialLayout(value: ImageLayout) {
    this.#view.setInt32(80, Number(value), LE);
  }
}