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
import { StructureType, LogicOp } from "../enum.ts";
import { PipelineColorBlendStateCreateFlags, Bool32 } from "../def.ts";

export interface InitPipelineColorBlendStateCreateInfo {
  pNext?: AnyPointer;
  flags?: PipelineColorBlendStateCreateFlags;
  logicOpEnable?: Bool32;
  logicOp?: LogicOp;
  attachmentCount?: number;
  pAttachments?: AnyPointer;
  blendConstants?: Float32Array;
}

export class PipelineColorBlendStateCreateInfo implements BaseStruct {
  static size = 56;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPipelineColorBlendStateCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPipelineColorBlendStateCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PipelineColorBlendStateCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PipelineColorBlendStateCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PipelineColorBlendStateCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.logicOpEnable !== undefined) this.logicOpEnable = data.logicOpEnable;
      if (data.logicOp !== undefined) this.logicOp = data.logicOp;
      if (data.attachmentCount !== undefined) this.attachmentCount = data.attachmentCount;
      if (data.pAttachments !== undefined) this.pAttachments = data.pAttachments;
      if (data.blendConstants !== undefined) this.blendConstants = data.blendConstants;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PipelineColorBlendStateCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PIPELINE_COLOR_BLEND_STATE_CREATE_INFO;
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

  get flags(): PipelineColorBlendStateCreateFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: PipelineColorBlendStateCreateFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get logicOpEnable(): Bool32 {
    return this.#view.getUint32(20, LE);
  }
  
  set logicOpEnable(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get logicOp(): LogicOp {
    return this.#view.getInt32(24, LE);
  }
  
  set logicOp(value: LogicOp) {
    this.#view.setInt32(24, Number(value), LE);
  }

  /** # of pAttachments */
  get attachmentCount(): number {
    return this.#view.getUint32(28, LE);
  }
  
  set attachmentCount(value: number) {
    this.#view.setUint32(28, Number(value), LE);
  }

  get pAttachments(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set pAttachments(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get blendConstants(): Float32Array {
    return new Float32Array(this.#data.buffer, 40, 4);
  }
  set blendConstants(value: Float32Array) {
    if (value.length > 4) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 40);
  }
}