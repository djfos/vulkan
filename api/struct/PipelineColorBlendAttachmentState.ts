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
import { BlendFactor, BlendOp } from "../enum.ts";
import { Bool32, ColorComponentFlags } from "../def.ts";

export interface InitPipelineColorBlendAttachmentState {
  blendEnable?: Bool32;
  srcColorBlendFactor?: BlendFactor;
  dstColorBlendFactor?: BlendFactor;
  colorBlendOp?: BlendOp;
  srcAlphaBlendFactor?: BlendFactor;
  dstAlphaBlendFactor?: BlendFactor;
  alphaBlendOp?: BlendOp;
  colorWriteMask?: ColorComponentFlags;
}

export class PipelineColorBlendAttachmentState implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPipelineColorBlendAttachmentState);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPipelineColorBlendAttachmentState) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PipelineColorBlendAttachmentState.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PipelineColorBlendAttachmentState.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PipelineColorBlendAttachmentState.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.blendEnable !== undefined) this.blendEnable = data.blendEnable;
      if (data.srcColorBlendFactor !== undefined) this.srcColorBlendFactor = data.srcColorBlendFactor;
      if (data.dstColorBlendFactor !== undefined) this.dstColorBlendFactor = data.dstColorBlendFactor;
      if (data.colorBlendOp !== undefined) this.colorBlendOp = data.colorBlendOp;
      if (data.srcAlphaBlendFactor !== undefined) this.srcAlphaBlendFactor = data.srcAlphaBlendFactor;
      if (data.dstAlphaBlendFactor !== undefined) this.dstAlphaBlendFactor = data.dstAlphaBlendFactor;
      if (data.alphaBlendOp !== undefined) this.alphaBlendOp = data.alphaBlendOp;
      if (data.colorWriteMask !== undefined) this.colorWriteMask = data.colorWriteMask;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PipelineColorBlendAttachmentState.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  get blendEnable(): Bool32 {
    return this.#view.getUint32(0, LE);
  }
  
  set blendEnable(value: Bool32) {
    this.#view.setUint32(0, Number(value), LE);
  }

  get srcColorBlendFactor(): BlendFactor {
    return this.#view.getInt32(4, LE);
  }
  
  set srcColorBlendFactor(value: BlendFactor) {
    this.#view.setInt32(4, Number(value), LE);
  }

  get dstColorBlendFactor(): BlendFactor {
    return this.#view.getInt32(8, LE);
  }
  
  set dstColorBlendFactor(value: BlendFactor) {
    this.#view.setInt32(8, Number(value), LE);
  }

  get colorBlendOp(): BlendOp {
    return this.#view.getInt32(12, LE);
  }
  
  set colorBlendOp(value: BlendOp) {
    this.#view.setInt32(12, Number(value), LE);
  }

  get srcAlphaBlendFactor(): BlendFactor {
    return this.#view.getInt32(16, LE);
  }
  
  set srcAlphaBlendFactor(value: BlendFactor) {
    this.#view.setInt32(16, Number(value), LE);
  }

  get dstAlphaBlendFactor(): BlendFactor {
    return this.#view.getInt32(20, LE);
  }
  
  set dstAlphaBlendFactor(value: BlendFactor) {
    this.#view.setInt32(20, Number(value), LE);
  }

  get alphaBlendOp(): BlendOp {
    return this.#view.getInt32(24, LE);
  }
  
  set alphaBlendOp(value: BlendOp) {
    this.#view.setInt32(24, Number(value), LE);
  }

  get colorWriteMask(): ColorComponentFlags {
    return this.#view.getUint32(28, LE);
  }
  
  set colorWriteMask(value: ColorComponentFlags) {
    this.#view.setUint32(28, Number(value), LE);
  }
}