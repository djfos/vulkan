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

export interface InitQueueFamilyQueryResultStatusPropertiesKHR {
  pNext?: AnyPointer;
  queryResultStatusSupport?: Bool32;
}

export class QueueFamilyQueryResultStatusPropertiesKHR implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitQueueFamilyQueryResultStatusPropertiesKHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitQueueFamilyQueryResultStatusPropertiesKHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(QueueFamilyQueryResultStatusPropertiesKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < QueueFamilyQueryResultStatusPropertiesKHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(QueueFamilyQueryResultStatusPropertiesKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.queryResultStatusSupport !== undefined) this.queryResultStatusSupport = data.queryResultStatusSupport;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, QueueFamilyQueryResultStatusPropertiesKHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.QUEUE_FAMILY_QUERY_RESULT_STATUS_PROPERTIES_KHR;
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

  get queryResultStatusSupport() {
    return this.#view.getUint32(16, LE);
  }

  set queryResultStatusSupport(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }
}