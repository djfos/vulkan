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
import {SysmemColorSpaceFUCHSIA} from "./SysmemColorSpaceFUCHSIA.ts";
import {ComponentMapping} from "./ComponentMapping.ts";
import { StructureType, SamplerYcbcrModelConversion, SamplerYcbcrRange, ChromaLocation } from "../enum.ts";
import { FormatFeatureFlags } from "../def.ts";

export interface InitBufferCollectionPropertiesFUCHSIA {
  pNext?: AnyPointer;
  memoryTypeBits?: number;
  bufferCount?: number;
  createInfoIndex?: number;
  sysmemPixelFormat?: number | bigint;
  formatFeatures?: FormatFeatureFlags;
  sysmemColorSpaceIndex?: SysmemColorSpaceFUCHSIA;
  samplerYcbcrConversionComponents?: ComponentMapping;
  suggestedYcbcrModel?: SamplerYcbcrModelConversion;
  suggestedYcbcrRange?: SamplerYcbcrRange;
  suggestedXChromaOffset?: ChromaLocation;
  suggestedYChromaOffset?: ChromaLocation;
}

export class BufferCollectionPropertiesFUCHSIA implements BaseStruct {
  static size = 104;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitBufferCollectionPropertiesFUCHSIA);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitBufferCollectionPropertiesFUCHSIA) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(BufferCollectionPropertiesFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < BufferCollectionPropertiesFUCHSIA.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(BufferCollectionPropertiesFUCHSIA.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.memoryTypeBits !== undefined) this.memoryTypeBits = data.memoryTypeBits;
      if (data.bufferCount !== undefined) this.bufferCount = data.bufferCount;
      if (data.createInfoIndex !== undefined) this.createInfoIndex = data.createInfoIndex;
      if (data.sysmemPixelFormat !== undefined) this.sysmemPixelFormat = data.sysmemPixelFormat;
      if (data.formatFeatures !== undefined) this.formatFeatures = data.formatFeatures;
      if (data.sysmemColorSpaceIndex !== undefined) this.sysmemColorSpaceIndex = data.sysmemColorSpaceIndex;
      if (data.samplerYcbcrConversionComponents !== undefined) this.samplerYcbcrConversionComponents = data.samplerYcbcrConversionComponents;
      if (data.suggestedYcbcrModel !== undefined) this.suggestedYcbcrModel = data.suggestedYcbcrModel;
      if (data.suggestedYcbcrRange !== undefined) this.suggestedYcbcrRange = data.suggestedYcbcrRange;
      if (data.suggestedXChromaOffset !== undefined) this.suggestedXChromaOffset = data.suggestedXChromaOffset;
      if (data.suggestedYChromaOffset !== undefined) this.suggestedYChromaOffset = data.suggestedYChromaOffset;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, BufferCollectionPropertiesFUCHSIA.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.BUFFER_COLLECTION_PROPERTIES_FUCHSIA;
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

  get memoryTypeBits(): number {
    return this.#view.getUint32(16, LE);
  }
  
  set memoryTypeBits(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get bufferCount(): number {
    return this.#view.getUint32(20, LE);
  }
  
  set bufferCount(value: number) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get createInfoIndex(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set createInfoIndex(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get sysmemPixelFormat(): bigint {
    return this.#view.getBigUint64(32, LE);
  }
  
  set sysmemPixelFormat(value: number | bigint) {
    this.#view.setBigUint64(32, BigInt(value), LE);
  }

  get formatFeatures(): FormatFeatureFlags {
    return this.#view.getUint32(40, LE);
  }
  
  set formatFeatures(value: FormatFeatureFlags) {
    this.#view.setUint32(40, Number(value), LE);
  }

  get sysmemColorSpaceIndex(): SysmemColorSpaceFUCHSIA {
    return new SysmemColorSpaceFUCHSIA(this.#data.subarray(48, 48 + SysmemColorSpaceFUCHSIA.size));
  }
  set sysmemColorSpaceIndex(value: SysmemColorSpaceFUCHSIA) {
    if (value[BUFFER].byteLength < SysmemColorSpaceFUCHSIA.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 48);
  }

  get samplerYcbcrConversionComponents(): ComponentMapping {
    return new ComponentMapping(this.#data.subarray(72, 72 + ComponentMapping.size));
  }
  set samplerYcbcrConversionComponents(value: ComponentMapping) {
    if (value[BUFFER].byteLength < ComponentMapping.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 72);
  }

  get suggestedYcbcrModel(): SamplerYcbcrModelConversion {
    return this.#view.getInt32(88, LE);
  }
  
  set suggestedYcbcrModel(value: SamplerYcbcrModelConversion) {
    this.#view.setInt32(88, Number(value), LE);
  }

  get suggestedYcbcrRange(): SamplerYcbcrRange {
    return this.#view.getInt32(92, LE);
  }
  
  set suggestedYcbcrRange(value: SamplerYcbcrRange) {
    this.#view.setInt32(92, Number(value), LE);
  }

  get suggestedXChromaOffset(): ChromaLocation {
    return this.#view.getInt32(96, LE);
  }
  
  set suggestedXChromaOffset(value: ChromaLocation) {
    this.#view.setInt32(96, Number(value), LE);
  }

  get suggestedYChromaOffset(): ChromaLocation {
    return this.#view.getInt32(100, LE);
  }
  
  set suggestedYChromaOffset(value: ChromaLocation) {
    this.#view.setInt32(100, Number(value), LE);
  }
}