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
import {DisplayPlaneCapabilitiesKHR} from "./DisplayPlaneCapabilitiesKHR.ts";
import { StructureType } from "../enum.ts";

export interface InitDisplayPlaneCapabilities2KHR {
  pNext?: AnyPointer;
  capabilities?: DisplayPlaneCapabilitiesKHR;
}

export class DisplayPlaneCapabilities2KHR implements BaseStruct {
  static size = 88;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDisplayPlaneCapabilities2KHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDisplayPlaneCapabilities2KHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DisplayPlaneCapabilities2KHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DisplayPlaneCapabilities2KHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DisplayPlaneCapabilities2KHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.capabilities !== undefined) this.capabilities = data.capabilities;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DisplayPlaneCapabilities2KHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.DISPLAY_PLANE_CAPABILITIES_2_KHR;
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

  get capabilities() {
    return new DisplayPlaneCapabilitiesKHR(this.#data.subarray(16, 16 + DisplayPlaneCapabilitiesKHR.size));
  }

  set capabilities(value: DisplayPlaneCapabilitiesKHR) {
    if (value[BUFFER].byteLength < DisplayPlaneCapabilitiesKHR.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 16);
  }
}