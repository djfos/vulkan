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
import { DebugReportFlagsEXT } from "../def.ts";

export interface InitDebugReportCallbackCreateInfoEXT {
  pNext?: AnyPointer;
  flags?: DebugReportFlagsEXT;
  pfnCallback?: Deno.PointerValue;
  pUserData?: AnyPointer;
}

export class DebugReportCallbackCreateInfoEXT implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDebugReportCallbackCreateInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDebugReportCallbackCreateInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DebugReportCallbackCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DebugReportCallbackCreateInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DebugReportCallbackCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.pfnCallback !== undefined) this.pfnCallback = data.pfnCallback;
      if (data.pUserData !== undefined) this.pUserData = data.pUserData;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DebugReportCallbackCreateInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT;
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

  /** Indicates which events call this callback */
  get flags(): DebugReportFlagsEXT {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: DebugReportFlagsEXT) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** Function pointer of a callback function */
  get pfnCallback(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pfnCallback(value: Deno.PointerValue) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  /** User data provided to callback function */
  get pUserData(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set pUserData(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }
}