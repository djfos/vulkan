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

export interface InitPhysicalDeviceSubpassShadingPropertiesHUAWEI {
  pNext?: AnyPointer;
  maxSubpassShadingWorkgroupSizeAspectRatio?: number;
}

export class PhysicalDeviceSubpassShadingPropertiesHUAWEI implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceSubpassShadingPropertiesHUAWEI);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceSubpassShadingPropertiesHUAWEI) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceSubpassShadingPropertiesHUAWEI.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceSubpassShadingPropertiesHUAWEI.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceSubpassShadingPropertiesHUAWEI.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.maxSubpassShadingWorkgroupSizeAspectRatio !== undefined) this.maxSubpassShadingWorkgroupSizeAspectRatio = data.maxSubpassShadingWorkgroupSizeAspectRatio;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceSubpassShadingPropertiesHUAWEI.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_SUBPASS_SHADING_PROPERTIES_HUAWEI;
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

  get maxSubpassShadingWorkgroupSizeAspectRatio() {
    return this.#view.getUint32(16, LE);
  }

  set maxSubpassShadingWorkgroupSizeAspectRatio(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }
}