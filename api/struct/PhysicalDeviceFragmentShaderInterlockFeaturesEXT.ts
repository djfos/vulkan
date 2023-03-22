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

export interface InitPhysicalDeviceFragmentShaderInterlockFeaturesEXT {
  pNext?: AnyPointer;
  fragmentShaderSampleInterlock?: Bool32;
  fragmentShaderPixelInterlock?: Bool32;
  fragmentShaderShadingRateInterlock?: Bool32;
}

export class PhysicalDeviceFragmentShaderInterlockFeaturesEXT implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceFragmentShaderInterlockFeaturesEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceFragmentShaderInterlockFeaturesEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceFragmentShaderInterlockFeaturesEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceFragmentShaderInterlockFeaturesEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceFragmentShaderInterlockFeaturesEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.fragmentShaderSampleInterlock !== undefined) this.fragmentShaderSampleInterlock = data.fragmentShaderSampleInterlock;
      if (data.fragmentShaderPixelInterlock !== undefined) this.fragmentShaderPixelInterlock = data.fragmentShaderPixelInterlock;
      if (data.fragmentShaderShadingRateInterlock !== undefined) this.fragmentShaderShadingRateInterlock = data.fragmentShaderShadingRateInterlock;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceFragmentShaderInterlockFeaturesEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_FRAGMENT_SHADER_INTERLOCK_FEATURES_EXT;
  }

  get sType(): StructureType {
    return this.#view.getInt32(0, LE);
  }
  
  set sType(value: StructureType) {
    this.#view.setInt32(0, Number(value), LE);
  }

  /** Pointer to next structure */
  get pNext(): Deno.PointerValue {
    return pointerFromView(this.#view, 8, LE);
  }
  
  set pNext(value: AnyPointer) {
    this.#view.setBigUint64(8, BigInt(anyPointer(value)), LE);
  }

  get fragmentShaderSampleInterlock(): Bool32 {
    return this.#view.getUint32(16, LE);
  }
  
  set fragmentShaderSampleInterlock(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get fragmentShaderPixelInterlock(): Bool32 {
    return this.#view.getUint32(20, LE);
  }
  
  set fragmentShaderPixelInterlock(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get fragmentShaderShadingRateInterlock(): Bool32 {
    return this.#view.getUint32(24, LE);
  }
  
  set fragmentShaderShadingRateInterlock(value: Bool32) {
    this.#view.setUint32(24, Number(value), LE);
  }
}