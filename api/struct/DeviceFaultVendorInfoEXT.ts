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

export interface InitDeviceFaultVendorInfoEXT {
  description?: Uint8Array;
  vendorFaultCode?: number | bigint;
  vendorFaultData?: number | bigint;
}

export class DeviceFaultVendorInfoEXT implements BaseStruct {
  static size = 272;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDeviceFaultVendorInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDeviceFaultVendorInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DeviceFaultVendorInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DeviceFaultVendorInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DeviceFaultVendorInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.description !== undefined) this.description = data.description;
      if (data.vendorFaultCode !== undefined) this.vendorFaultCode = data.vendorFaultCode;
      if (data.vendorFaultData !== undefined) this.vendorFaultData = data.vendorFaultData;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DeviceFaultVendorInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** Free-form description of the fault */
  get description(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 0, 256);
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
    this.#data.set(byteAray, 0);
  }

  get vendorFaultCode(): bigint {
    return this.#view.getBigUint64(256, LE);
  }
  
  set vendorFaultCode(value: number | bigint) {
    this.#view.setBigUint64(256, BigInt(value), LE);
  }

  get vendorFaultData(): bigint {
    return this.#view.getBigUint64(264, LE);
  }
  
  set vendorFaultData(value: number | bigint) {
    this.#view.setBigUint64(264, BigInt(value), LE);
  }
}