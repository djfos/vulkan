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
import {TransformMatrixKHR} from "./TransformMatrixKHR.ts";
import { GeometryInstanceFlagsKHR } from "../def.ts";

export interface InitAccelerationStructureMatrixMotionInstanceNV {
  transformT0?: TransformMatrixKHR;
  transformT1?: TransformMatrixKHR;
  instanceCustomIndex?: number;
  mask?: number;
  instanceShaderBindingTableRecordOffset?: number;
  flags?: GeometryInstanceFlagsKHR;
  accelerationStructureReference?: number | bigint;
}

export class AccelerationStructureMatrixMotionInstanceNV implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitAccelerationStructureMatrixMotionInstanceNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitAccelerationStructureMatrixMotionInstanceNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(AccelerationStructureMatrixMotionInstanceNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < AccelerationStructureMatrixMotionInstanceNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(AccelerationStructureMatrixMotionInstanceNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.transformT0 !== undefined) this.transformT0 = data.transformT0;
      if (data.transformT1 !== undefined) this.transformT1 = data.transformT1;
      if (data.instanceCustomIndex !== undefined) this.instanceCustomIndex = data.instanceCustomIndex;
      if (data.mask !== undefined) this.mask = data.mask;
      if (data.instanceShaderBindingTableRecordOffset !== undefined) this.instanceShaderBindingTableRecordOffset = data.instanceShaderBindingTableRecordOffset;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.accelerationStructureReference !== undefined) this.accelerationStructureReference = data.accelerationStructureReference;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, AccelerationStructureMatrixMotionInstanceNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  get transformT0(): TransformMatrixKHR {
    return new TransformMatrixKHR(this.#data.subarray(0, 0 + TransformMatrixKHR.size));
  }
  set transformT0(value: TransformMatrixKHR) {
    if (value[BUFFER].byteLength < TransformMatrixKHR.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 0);
  }

  get transformT1(): TransformMatrixKHR {
    return new TransformMatrixKHR(this.#data.subarray(12, 12 + TransformMatrixKHR.size));
  }
  set transformT1(value: TransformMatrixKHR) {
    if (value[BUFFER].byteLength < TransformMatrixKHR.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 12);
  }

  get instanceCustomIndex(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set instanceCustomIndex(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get mask(): number {
    return this.#view.getUint32(28, LE);
  }
  
  set mask(value: number) {
    this.#view.setUint32(28, Number(value), LE);
  }

  get instanceShaderBindingTableRecordOffset(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set instanceShaderBindingTableRecordOffset(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get flags(): GeometryInstanceFlagsKHR {
    return this.#view.getUint32(36, LE);
  }
  
  set flags(value: GeometryInstanceFlagsKHR) {
    this.#view.setUint32(36, Number(value), LE);
  }

  get accelerationStructureReference(): bigint {
    return this.#view.getBigUint64(40, LE);
  }
  
  set accelerationStructureReference(value: number | bigint) {
    this.#view.setBigUint64(40, BigInt(value), LE);
  }
}