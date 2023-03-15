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
import { Bool32 } from "../def.ts";

export interface InitPhysicalDeviceFragmentShadingRateEnumsFeaturesNV {
  pNext?: AnyPointer;
  fragmentShadingRateEnums?: Bool32;
  supersampleFragmentShadingRates?: Bool32;
  noInvocationFragmentShadingRates?: Bool32;
}

export class PhysicalDeviceFragmentShadingRateEnumsFeaturesNV implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceFragmentShadingRateEnumsFeaturesNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceFragmentShadingRateEnumsFeaturesNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceFragmentShadingRateEnumsFeaturesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceFragmentShadingRateEnumsFeaturesNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceFragmentShadingRateEnumsFeaturesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.fragmentShadingRateEnums !== undefined) this.fragmentShadingRateEnums = data.fragmentShadingRateEnums;
      if (data.supersampleFragmentShadingRates !== undefined) this.supersampleFragmentShadingRates = data.supersampleFragmentShadingRates;
      if (data.noInvocationFragmentShadingRates !== undefined) this.noInvocationFragmentShadingRates = data.noInvocationFragmentShadingRates;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceFragmentShadingRateEnumsFeaturesNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_FEATURES_NV;
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

  get fragmentShadingRateEnums() {
    return this.#view.getUint32(16, LE);
  }

  set fragmentShadingRateEnums(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get supersampleFragmentShadingRates() {
    return this.#view.getUint32(20, LE);
  }

  set supersampleFragmentShadingRates(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get noInvocationFragmentShadingRates() {
    return this.#view.getUint32(24, LE);
  }

  set noInvocationFragmentShadingRates(value: Bool32) {
    this.#view.setUint32(24, Number(value), LE);
  }
}