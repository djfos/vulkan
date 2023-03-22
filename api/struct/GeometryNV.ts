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
import {GeometryDataNV} from "./GeometryDataNV.ts";
import { StructureType, GeometryTypeKHR } from "../enum.ts";
import { GeometryFlagsKHR } from "../def.ts";

export interface InitGeometryNV {
  pNext?: AnyPointer;
  geometryType?: GeometryTypeKHR;
  geometry?: GeometryDataNV;
  flags?: GeometryFlagsKHR;
}

export class GeometryNV implements BaseStruct {
  static size = 168;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitGeometryNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitGeometryNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(GeometryNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < GeometryNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(GeometryNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.geometryType !== undefined) this.geometryType = data.geometryType;
      if (data.geometry !== undefined) this.geometry = data.geometry;
      if (data.flags !== undefined) this.flags = data.flags;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, GeometryNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.GEOMETRY_NV;
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

  get geometryType(): GeometryTypeKHR {
    return this.#view.getInt32(16, LE);
  }
  
  set geometryType(value: GeometryTypeKHR) {
    this.#view.setInt32(16, Number(value), LE);
  }

  get geometry(): GeometryDataNV {
    return new GeometryDataNV(this.#data.subarray(24, 24 + GeometryDataNV.size));
  }
  set geometry(value: GeometryDataNV) {
    if (value[BUFFER].byteLength < GeometryDataNV.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 24);
  }

  get flags(): GeometryFlagsKHR {
    return this.#view.getUint32(160, LE);
  }
  
  set flags(value: GeometryFlagsKHR) {
    this.#view.setUint32(160, Number(value), LE);
  }
}