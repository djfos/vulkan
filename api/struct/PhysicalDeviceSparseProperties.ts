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
import { Bool32 } from "../def.ts";

export interface InitPhysicalDeviceSparseProperties {
  residencyStandard2DBlockShape?: Bool32;
  residencyStandard2DMultisampleBlockShape?: Bool32;
  residencyStandard3DBlockShape?: Bool32;
  residencyAlignedMipSize?: Bool32;
  residencyNonResidentStrict?: Bool32;
}

export class PhysicalDeviceSparseProperties implements BaseStruct {
  static size = 20;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceSparseProperties);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceSparseProperties) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceSparseProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceSparseProperties.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceSparseProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.residencyStandard2DBlockShape !== undefined) this.residencyStandard2DBlockShape = data.residencyStandard2DBlockShape;
      if (data.residencyStandard2DMultisampleBlockShape !== undefined) this.residencyStandard2DMultisampleBlockShape = data.residencyStandard2DMultisampleBlockShape;
      if (data.residencyStandard3DBlockShape !== undefined) this.residencyStandard3DBlockShape = data.residencyStandard3DBlockShape;
      if (data.residencyAlignedMipSize !== undefined) this.residencyAlignedMipSize = data.residencyAlignedMipSize;
      if (data.residencyNonResidentStrict !== undefined) this.residencyNonResidentStrict = data.residencyNonResidentStrict;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceSparseProperties.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** Sparse resources support: GPU will access all 2D (single sample) sparse resources using the standard sparse image block shapes (based on pixel format) */
  get residencyStandard2DBlockShape(): Bool32 {
    return this.#view.getUint32(0, LE);
  }
  
  set residencyStandard2DBlockShape(value: Bool32) {
    this.#view.setUint32(0, Number(value), LE);
  }

  /** Sparse resources support: GPU will access all 2D (multisample) sparse resources using the standard sparse image block shapes (based on pixel format) */
  get residencyStandard2DMultisampleBlockShape(): Bool32 {
    return this.#view.getUint32(4, LE);
  }
  
  set residencyStandard2DMultisampleBlockShape(value: Bool32) {
    this.#view.setUint32(4, Number(value), LE);
  }

  /** Sparse resources support: GPU will access all 3D sparse resources using the standard sparse image block shapes (based on pixel format) */
  get residencyStandard3DBlockShape(): Bool32 {
    return this.#view.getUint32(8, LE);
  }
  
  set residencyStandard3DBlockShape(value: Bool32) {
    this.#view.setUint32(8, Number(value), LE);
  }

  /** Sparse resources support: Images with mip level dimensions that are NOT a multiple of the sparse image block dimensions will be placed in the mip tail */
  get residencyAlignedMipSize(): Bool32 {
    return this.#view.getUint32(12, LE);
  }
  
  set residencyAlignedMipSize(value: Bool32) {
    this.#view.setUint32(12, Number(value), LE);
  }

  /** Sparse resources support: GPU can consistently access non-resident regions of a resource, all reads return as if data is 0, writes are discarded */
  get residencyNonResidentStrict(): Bool32 {
    return this.#view.getUint32(16, LE);
  }
  
  set residencyNonResidentStrict(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }
}