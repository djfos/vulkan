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

export interface InitPhysicalDeviceRepresentativeFragmentTestFeaturesNV {
  pNext?: AnyPointer;
  representativeFragmentTest?: Bool32;
}

export class PhysicalDeviceRepresentativeFragmentTestFeaturesNV implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceRepresentativeFragmentTestFeaturesNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceRepresentativeFragmentTestFeaturesNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceRepresentativeFragmentTestFeaturesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceRepresentativeFragmentTestFeaturesNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceRepresentativeFragmentTestFeaturesNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.representativeFragmentTest !== undefined) this.representativeFragmentTest = data.representativeFragmentTest;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceRepresentativeFragmentTestFeaturesNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_REPRESENTATIVE_FRAGMENT_TEST_FEATURES_NV;
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

  get representativeFragmentTest() {
    return this.#view.getUint32(16, LE);
  }

  set representativeFragmentTest(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }
}