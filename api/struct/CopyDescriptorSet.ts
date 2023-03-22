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
import { DescriptorSet } from "../def.ts";

export interface InitCopyDescriptorSet {
  pNext?: AnyPointer;
  srcSet?: AnyPointer;
  srcBinding?: number;
  srcArrayElement?: number;
  dstSet?: AnyPointer;
  dstBinding?: number;
  dstArrayElement?: number;
  descriptorCount?: number;
}

export class CopyDescriptorSet implements BaseStruct {
  static size = 56;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitCopyDescriptorSet);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitCopyDescriptorSet) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(CopyDescriptorSet.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < CopyDescriptorSet.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(CopyDescriptorSet.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.srcSet !== undefined) this.srcSet = data.srcSet;
      if (data.srcBinding !== undefined) this.srcBinding = data.srcBinding;
      if (data.srcArrayElement !== undefined) this.srcArrayElement = data.srcArrayElement;
      if (data.dstSet !== undefined) this.dstSet = data.dstSet;
      if (data.dstBinding !== undefined) this.dstBinding = data.dstBinding;
      if (data.dstArrayElement !== undefined) this.dstArrayElement = data.dstArrayElement;
      if (data.descriptorCount !== undefined) this.descriptorCount = data.descriptorCount;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, CopyDescriptorSet.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COPY_DESCRIPTOR_SET;
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

  /** Source descriptor set */
  get srcSet(): Deno.PointerValue {
    return pointerFromView(this.#view, 16, LE);
  }
  
  set srcSet(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  /** Binding within the source descriptor set to copy from */
  get srcBinding(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set srcBinding(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** Array element within the source binding to copy from */
  get srcArrayElement(): number {
    return this.#view.getUint32(28, LE);
  }
  
  set srcArrayElement(value: number) {
    this.#view.setUint32(28, Number(value), LE);
  }

  /** Destination descriptor set */
  get dstSet(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set dstSet(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  /** Binding within the destination descriptor set to copy to */
  get dstBinding(): number {
    return this.#view.getUint32(40, LE);
  }
  
  set dstBinding(value: number) {
    this.#view.setUint32(40, Number(value), LE);
  }

  /** Array element within the destination binding to copy to */
  get dstArrayElement(): number {
    return this.#view.getUint32(44, LE);
  }
  
  set dstArrayElement(value: number) {
    this.#view.setUint32(44, Number(value), LE);
  }

  /** Number of descriptors to write (determines the size of the array pointed by pDescriptors) */
  get descriptorCount(): number {
    return this.#view.getUint32(48, LE);
  }
  
  set descriptorCount(value: number) {
    this.#view.setUint32(48, Number(value), LE);
  }
}