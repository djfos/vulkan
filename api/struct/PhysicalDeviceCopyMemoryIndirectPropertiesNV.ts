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
import { QueueFlags } from "../def.ts";

export interface InitPhysicalDeviceCopyMemoryIndirectPropertiesNV {
  pNext?: AnyPointer;
  supportedQueues?: QueueFlags;
}

export class PhysicalDeviceCopyMemoryIndirectPropertiesNV implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceCopyMemoryIndirectPropertiesNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceCopyMemoryIndirectPropertiesNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceCopyMemoryIndirectPropertiesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceCopyMemoryIndirectPropertiesNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceCopyMemoryIndirectPropertiesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.supportedQueues !== undefined) this.supportedQueues = data.supportedQueues;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceCopyMemoryIndirectPropertiesNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_NV;
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

  /** Bitfield of which queues are supported for indirect copy */
  get supportedQueues(): QueueFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set supportedQueues(value: QueueFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }
}