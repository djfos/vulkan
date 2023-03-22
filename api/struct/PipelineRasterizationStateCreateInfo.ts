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
import { StructureType, PolygonMode, FrontFace } from "../enum.ts";
import { PipelineRasterizationStateCreateFlags, Bool32, CullModeFlags } from "../def.ts";

export interface InitPipelineRasterizationStateCreateInfo {
  pNext?: AnyPointer;
  flags?: PipelineRasterizationStateCreateFlags;
  depthClampEnable?: Bool32;
  rasterizerDiscardEnable?: Bool32;
  polygonMode?: PolygonMode;
  cullMode?: CullModeFlags;
  frontFace?: FrontFace;
  depthBiasEnable?: Bool32;
  depthBiasConstantFactor?: number;
  depthBiasClamp?: number;
  depthBiasSlopeFactor?: number;
  lineWidth?: number;
}

export class PipelineRasterizationStateCreateInfo implements BaseStruct {
  static size = 64;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPipelineRasterizationStateCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPipelineRasterizationStateCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PipelineRasterizationStateCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PipelineRasterizationStateCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PipelineRasterizationStateCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.depthClampEnable !== undefined) this.depthClampEnable = data.depthClampEnable;
      if (data.rasterizerDiscardEnable !== undefined) this.rasterizerDiscardEnable = data.rasterizerDiscardEnable;
      if (data.polygonMode !== undefined) this.polygonMode = data.polygonMode;
      if (data.cullMode !== undefined) this.cullMode = data.cullMode;
      if (data.frontFace !== undefined) this.frontFace = data.frontFace;
      if (data.depthBiasEnable !== undefined) this.depthBiasEnable = data.depthBiasEnable;
      if (data.depthBiasConstantFactor !== undefined) this.depthBiasConstantFactor = data.depthBiasConstantFactor;
      if (data.depthBiasClamp !== undefined) this.depthBiasClamp = data.depthBiasClamp;
      if (data.depthBiasSlopeFactor !== undefined) this.depthBiasSlopeFactor = data.depthBiasSlopeFactor;
      if (data.lineWidth !== undefined) this.lineWidth = data.lineWidth;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PipelineRasterizationStateCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PIPELINE_RASTERIZATION_STATE_CREATE_INFO;
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

  get flags(): PipelineRasterizationStateCreateFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: PipelineRasterizationStateCreateFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get depthClampEnable(): Bool32 {
    return this.#view.getUint32(20, LE);
  }
  
  set depthClampEnable(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get rasterizerDiscardEnable(): Bool32 {
    return this.#view.getUint32(24, LE);
  }
  
  set rasterizerDiscardEnable(value: Bool32) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** optional (GL45) */
  get polygonMode(): PolygonMode {
    return this.#view.getInt32(28, LE);
  }
  
  set polygonMode(value: PolygonMode) {
    this.#view.setInt32(28, Number(value), LE);
  }

  get cullMode(): CullModeFlags {
    return this.#view.getUint32(32, LE);
  }
  
  set cullMode(value: CullModeFlags) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get frontFace(): FrontFace {
    return this.#view.getInt32(36, LE);
  }
  
  set frontFace(value: FrontFace) {
    this.#view.setInt32(36, Number(value), LE);
  }

  get depthBiasEnable(): Bool32 {
    return this.#view.getUint32(40, LE);
  }
  
  set depthBiasEnable(value: Bool32) {
    this.#view.setUint32(40, Number(value), LE);
  }

  get depthBiasConstantFactor(): number {
    return this.#view.getFloat32(44, LE);
  }
  
  set depthBiasConstantFactor(value: number) {
    this.#view.setFloat32(44, Number(value), LE);
  }

  get depthBiasClamp(): number {
    return this.#view.getFloat32(48, LE);
  }
  
  set depthBiasClamp(value: number) {
    this.#view.setFloat32(48, Number(value), LE);
  }

  get depthBiasSlopeFactor(): number {
    return this.#view.getFloat32(52, LE);
  }
  
  set depthBiasSlopeFactor(value: number) {
    this.#view.setFloat32(52, Number(value), LE);
  }

  get lineWidth(): number {
    return this.#view.getFloat32(56, LE);
  }
  
  set lineWidth(value: number) {
    this.#view.setFloat32(56, Number(value), LE);
  }
}