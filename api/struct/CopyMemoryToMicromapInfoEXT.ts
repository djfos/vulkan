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
import { StructureType, CopyMicromapModeEXT } from "../enum.ts";
import { MicromapEXT } from "../def.ts";
import { DeviceOrHostAddressConstKHR } from "../union.ts";

export interface InitCopyMemoryToMicromapInfoEXT {
  pNext?: AnyPointer;
  src?: DeviceOrHostAddressConstKHR;
  dst?: AnyPointer;
  mode?: CopyMicromapModeEXT;
}

export class CopyMemoryToMicromapInfoEXT implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitCopyMemoryToMicromapInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitCopyMemoryToMicromapInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(CopyMemoryToMicromapInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < CopyMemoryToMicromapInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(CopyMemoryToMicromapInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.src !== undefined) this.src = data.src;
      if (data.dst !== undefined) this.dst = data.dst;
      if (data.mode !== undefined) this.mode = data.mode;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, CopyMemoryToMicromapInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COPY_MEMORY_TO_MICROMAP_INFO_EXT;
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

  get src(): DeviceOrHostAddressConstKHR {
    throw new Error(`Unknown type: {"union":["u64","pointer"]}`);
  }
  set src(value: DeviceOrHostAddressConstKHR) {
    throw new Error(`Unknown type: {"union":["u64","pointer"]}`);
  }

  get dst(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set dst(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get mode(): CopyMicromapModeEXT {
    return this.#view.getInt32(32, LE);
  }
  
  set mode(value: CopyMicromapModeEXT) {
    this.#view.setInt32(32, Number(value), LE);
  }
}