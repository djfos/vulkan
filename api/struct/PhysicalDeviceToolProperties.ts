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
import { ToolPurposeFlags } from "../def.ts";

export interface InitPhysicalDeviceToolProperties {
  pNext?: AnyPointer;
  name?: Uint8Array;
  version?: Uint8Array;
  purposes?: ToolPurposeFlags;
  description?: Uint8Array;
  layer?: Uint8Array;
}

export class PhysicalDeviceToolProperties implements BaseStruct {
  static size = 1048;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceToolProperties);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceToolProperties) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceToolProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceToolProperties.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceToolProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.name !== undefined) this.name = data.name;
      if (data.version !== undefined) this.version = data.version;
      if (data.purposes !== undefined) this.purposes = data.purposes;
      if (data.description !== undefined) this.description = data.description;
      if (data.layer !== undefined) this.layer = data.layer;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceToolProperties.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_TOOL_PROPERTIES;
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

  get name(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 16, 256);
  }
  set name(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 16);
  }

  get version(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 272, 256);
  }
  set version(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 272);
  }

  get purposes(): ToolPurposeFlags {
    return this.#view.getUint32(528, LE);
  }
  
  set purposes(value: ToolPurposeFlags) {
    this.#view.setUint32(528, Number(value), LE);
  }

  get description(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 532, 256);
  }
  set description(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 532);
  }

  get layer(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 788, 256);
  }
  set layer(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 788);
  }
}