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
import { StructureType, Filter, SamplerMipmapMode, SamplerAddressMode, CompareOp, BorderColor } from "../enum.ts";
import { SamplerCreateFlags, Bool32 } from "../def.ts";

export interface InitSamplerCreateInfo {
  pNext?: AnyPointer;
  flags?: SamplerCreateFlags;
  magFilter?: Filter;
  minFilter?: Filter;
  mipmapMode?: SamplerMipmapMode;
  addressModeU?: SamplerAddressMode;
  addressModeV?: SamplerAddressMode;
  addressModeW?: SamplerAddressMode;
  mipLodBias?: number;
  anisotropyEnable?: Bool32;
  maxAnisotropy?: number;
  compareEnable?: Bool32;
  compareOp?: CompareOp;
  minLod?: number;
  maxLod?: number;
  borderColor?: BorderColor;
  unnormalizedCoordinates?: Bool32;
}

export class SamplerCreateInfo implements BaseStruct {
  static size = 80;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitSamplerCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitSamplerCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(SamplerCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < SamplerCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(SamplerCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.magFilter !== undefined) this.magFilter = data.magFilter;
      if (data.minFilter !== undefined) this.minFilter = data.minFilter;
      if (data.mipmapMode !== undefined) this.mipmapMode = data.mipmapMode;
      if (data.addressModeU !== undefined) this.addressModeU = data.addressModeU;
      if (data.addressModeV !== undefined) this.addressModeV = data.addressModeV;
      if (data.addressModeW !== undefined) this.addressModeW = data.addressModeW;
      if (data.mipLodBias !== undefined) this.mipLodBias = data.mipLodBias;
      if (data.anisotropyEnable !== undefined) this.anisotropyEnable = data.anisotropyEnable;
      if (data.maxAnisotropy !== undefined) this.maxAnisotropy = data.maxAnisotropy;
      if (data.compareEnable !== undefined) this.compareEnable = data.compareEnable;
      if (data.compareOp !== undefined) this.compareOp = data.compareOp;
      if (data.minLod !== undefined) this.minLod = data.minLod;
      if (data.maxLod !== undefined) this.maxLod = data.maxLod;
      if (data.borderColor !== undefined) this.borderColor = data.borderColor;
      if (data.unnormalizedCoordinates !== undefined) this.unnormalizedCoordinates = data.unnormalizedCoordinates;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, SamplerCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.SAMPLER_CREATE_INFO;
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

  get flags(): SamplerCreateFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: SamplerCreateFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** Filter mode for magnification */
  get magFilter(): Filter {
    return this.#view.getInt32(20, LE);
  }
  
  set magFilter(value: Filter) {
    this.#view.setInt32(20, Number(value), LE);
  }

  /** Filter mode for minifiation */
  get minFilter(): Filter {
    return this.#view.getInt32(24, LE);
  }
  
  set minFilter(value: Filter) {
    this.#view.setInt32(24, Number(value), LE);
  }

  /** Mipmap selection mode */
  get mipmapMode(): SamplerMipmapMode {
    return this.#view.getInt32(28, LE);
  }
  
  set mipmapMode(value: SamplerMipmapMode) {
    this.#view.setInt32(28, Number(value), LE);
  }

  get addressModeU(): SamplerAddressMode {
    return this.#view.getInt32(32, LE);
  }
  
  set addressModeU(value: SamplerAddressMode) {
    this.#view.setInt32(32, Number(value), LE);
  }

  get addressModeV(): SamplerAddressMode {
    return this.#view.getInt32(36, LE);
  }
  
  set addressModeV(value: SamplerAddressMode) {
    this.#view.setInt32(36, Number(value), LE);
  }

  get addressModeW(): SamplerAddressMode {
    return this.#view.getInt32(40, LE);
  }
  
  set addressModeW(value: SamplerAddressMode) {
    this.#view.setInt32(40, Number(value), LE);
  }

  get mipLodBias(): number {
    return this.#view.getFloat32(44, LE);
  }
  
  set mipLodBias(value: number) {
    this.#view.setFloat32(44, Number(value), LE);
  }

  get anisotropyEnable(): Bool32 {
    return this.#view.getUint32(48, LE);
  }
  
  set anisotropyEnable(value: Bool32) {
    this.#view.setUint32(48, Number(value), LE);
  }

  get maxAnisotropy(): number {
    return this.#view.getFloat32(52, LE);
  }
  
  set maxAnisotropy(value: number) {
    this.#view.setFloat32(52, Number(value), LE);
  }

  get compareEnable(): Bool32 {
    return this.#view.getUint32(56, LE);
  }
  
  set compareEnable(value: Bool32) {
    this.#view.setUint32(56, Number(value), LE);
  }

  get compareOp(): CompareOp {
    return this.#view.getInt32(60, LE);
  }
  
  set compareOp(value: CompareOp) {
    this.#view.setInt32(60, Number(value), LE);
  }

  get minLod(): number {
    return this.#view.getFloat32(64, LE);
  }
  
  set minLod(value: number) {
    this.#view.setFloat32(64, Number(value), LE);
  }

  get maxLod(): number {
    return this.#view.getFloat32(68, LE);
  }
  
  set maxLod(value: number) {
    this.#view.setFloat32(68, Number(value), LE);
  }

  get borderColor(): BorderColor {
    return this.#view.getInt32(72, LE);
  }
  
  set borderColor(value: BorderColor) {
    this.#view.setInt32(72, Number(value), LE);
  }

  get unnormalizedCoordinates(): Bool32 {
    return this.#view.getUint32(76, LE);
  }
  
  set unnormalizedCoordinates(value: Bool32) {
    this.#view.setUint32(76, Number(value), LE);
  }
}