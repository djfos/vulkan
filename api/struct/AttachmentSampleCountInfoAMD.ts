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
import { StructureType, SampleCountFlagBits } from "../enum.ts";

export interface InitAttachmentSampleCountInfoAMD {
  pNext?: AnyPointer;
  colorAttachmentCount?: number;
  pColorAttachmentSamples?: AnyPointer;
  depthStencilAttachmentSamples?: SampleCountFlagBits;
}

export class AttachmentSampleCountInfoAMD implements BaseStruct {
  static size = 40;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitAttachmentSampleCountInfoAMD);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitAttachmentSampleCountInfoAMD) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(AttachmentSampleCountInfoAMD.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < AttachmentSampleCountInfoAMD.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(AttachmentSampleCountInfoAMD.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.colorAttachmentCount !== undefined) this.colorAttachmentCount = data.colorAttachmentCount;
      if (data.pColorAttachmentSamples !== undefined) this.pColorAttachmentSamples = data.pColorAttachmentSamples;
      if (data.depthStencilAttachmentSamples !== undefined) this.depthStencilAttachmentSamples = data.depthStencilAttachmentSamples;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, AttachmentSampleCountInfoAMD.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.ATTACHMENT_SAMPLE_COUNT_INFO_AMD;
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

  get colorAttachmentCount(): number {
    return this.#view.getUint32(16, LE);
  }
  
  set colorAttachmentCount(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get pColorAttachmentSamples(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pColorAttachmentSamples(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get depthStencilAttachmentSamples(): SampleCountFlagBits {
    return this.#view.getInt32(32, LE);
  }
  
  set depthStencilAttachmentSamples(value: SampleCountFlagBits) {
    this.#view.setInt32(32, Number(value), LE);
  }
}