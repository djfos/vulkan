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
import { StructureType, ExternalFenceHandleTypeFlagBits } from "../enum.ts";
import { Fence, FenceImportFlags } from "../def.ts";

export interface InitImportFenceWin32HandleInfoKHR {
  pNext?: AnyPointer;
  fence?: Fence;
  flags?: FenceImportFlags;
  handleType?: ExternalFenceHandleTypeFlagBits;
  handle?: Deno.PointerValue;
  name?: Deno.PointerValue;
}

export class ImportFenceWin32HandleInfoKHR implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitImportFenceWin32HandleInfoKHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitImportFenceWin32HandleInfoKHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(ImportFenceWin32HandleInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < ImportFenceWin32HandleInfoKHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(ImportFenceWin32HandleInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.fence !== undefined) this.fence = data.fence;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.handleType !== undefined) this.handleType = data.handleType;
      if (data.handle !== undefined) this.handle = data.handle;
      if (data.name !== undefined) this.name = data.name;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ImportFenceWin32HandleInfoKHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.IMPORT_FENCE_WIN32_HANDLE_INFO_KHR;
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

  get fence() {
    return pointerFromView(this.#view, 16, LE);
  }

  set fence(value: Fence) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get flags() {
    return this.#view.getUint32(24, LE);
  }

  set flags(value: FenceImportFlags) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get handleType() {
    return this.#view.getUint32(28, LE);
  }

  set handleType(value: ExternalFenceHandleTypeFlagBits) {
    this.#view.setUint32(28, Number(value), LE);
  }

  get handle() {
    return pointerFromView(this.#view, 32, LE);
  }

  set handle(value: Deno.PointerValue) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get name() {
    return pointerFromView(this.#view, 40, LE);
  }

  set name(value: Deno.PointerValue) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }
}