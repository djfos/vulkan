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
import { SwapchainImageUsageFlagsANDROID } from "../def.ts";

export interface InitSwapchainImageCreateInfoANDROID {
  pNext?: AnyPointer;
  usage?: SwapchainImageUsageFlagsANDROID;
}

export class SwapchainImageCreateInfoANDROID implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitSwapchainImageCreateInfoANDROID);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitSwapchainImageCreateInfoANDROID) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(SwapchainImageCreateInfoANDROID.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < SwapchainImageCreateInfoANDROID.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(SwapchainImageCreateInfoANDROID.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.usage !== undefined) this.usage = data.usage;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, SwapchainImageCreateInfoANDROID.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.SWAPCHAIN_IMAGE_CREATE_INFO_ANDROID;
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

  get usage(): SwapchainImageUsageFlagsANDROID {
    return this.#view.getUint32(16, LE);
  }
  
  set usage(value: SwapchainImageUsageFlagsANDROID) {
    this.#view.setUint32(16, Number(value), LE);
  }
}