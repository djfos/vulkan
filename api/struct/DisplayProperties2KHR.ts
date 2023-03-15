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
import {DisplayPropertiesKHR} from "./DisplayPropertiesKHR.ts";
import { StructureType } from "../enum.ts";

export interface InitDisplayProperties2KHR {
  pNext?: AnyPointer;
  displayProperties?: DisplayPropertiesKHR;
}

export class DisplayProperties2KHR implements BaseStruct {
  static size = 64;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDisplayProperties2KHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDisplayProperties2KHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DisplayProperties2KHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DisplayProperties2KHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DisplayProperties2KHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.displayProperties !== undefined) this.displayProperties = data.displayProperties;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DisplayProperties2KHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.DISPLAY_PROPERTIES_2_KHR;
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

  get displayProperties() {
    return new DisplayPropertiesKHR(this.#data.subarray(16, 16 + DisplayPropertiesKHR.size));
  }

  set displayProperties(value: DisplayPropertiesKHR) {
    if (value[BUFFER].byteLength < DisplayPropertiesKHR.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 16);
  }
}