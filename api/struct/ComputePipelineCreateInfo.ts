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
import {PipelineShaderStageCreateInfo} from "./PipelineShaderStageCreateInfo.ts";
import { StructureType } from "../enum.ts";
import { PipelineCreateFlags, PipelineLayout, Pipeline } from "../def.ts";

export interface InitComputePipelineCreateInfo {
  pNext?: AnyPointer;
  flags?: PipelineCreateFlags;
  stage?: PipelineShaderStageCreateInfo;
  layout?: AnyPointer;
  basePipelineHandle?: AnyPointer;
  basePipelineIndex?: number;
}

export class ComputePipelineCreateInfo implements BaseStruct {
  static size = 96;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitComputePipelineCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitComputePipelineCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(ComputePipelineCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < ComputePipelineCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(ComputePipelineCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.stage !== undefined) this.stage = data.stage;
      if (data.layout !== undefined) this.layout = data.layout;
      if (data.basePipelineHandle !== undefined) this.basePipelineHandle = data.basePipelineHandle;
      if (data.basePipelineIndex !== undefined) this.basePipelineIndex = data.basePipelineIndex;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ComputePipelineCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COMPUTE_PIPELINE_CREATE_INFO;
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

  /** Pipeline creation flags */
  get flags(): PipelineCreateFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: PipelineCreateFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get stage(): PipelineShaderStageCreateInfo {
    return new PipelineShaderStageCreateInfo(this.#data.subarray(24, 24 + PipelineShaderStageCreateInfo.size));
  }
  set stage(value: PipelineShaderStageCreateInfo) {
    if (value[BUFFER].byteLength < PipelineShaderStageCreateInfo.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 24);
  }

  /** Interface layout of the pipeline */
  get layout(): Deno.PointerValue {
    return pointerFromView(this.#view, 72, LE);
  }
  
  set layout(value: AnyPointer) {
    this.#view.setBigUint64(72, BigInt(anyPointer(value)), LE);
  }

  /** If VK_PIPELINE_CREATE_DERIVATIVE_BIT is set and this value is nonzero, it specifies the handle of the base pipeline this is a derivative of */
  get basePipelineHandle(): Deno.PointerValue {
    return pointerFromView(this.#view, 80, LE);
  }
  
  set basePipelineHandle(value: AnyPointer) {
    this.#view.setBigUint64(80, BigInt(anyPointer(value)), LE);
  }

  /** If VK_PIPELINE_CREATE_DERIVATIVE_BIT is set and this value is not -1, it specifies an index into pCreateInfos of the base pipeline this is a derivative of */
  get basePipelineIndex(): number {
    return this.#view.getInt32(88, LE);
  }
  
  set basePipelineIndex(value: number) {
    this.#view.setInt32(88, Number(value), LE);
  }
}