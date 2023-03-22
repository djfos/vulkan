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
import { PipelineCreateFlags, PipelineLayout, RenderPass, Pipeline } from "../def.ts";

export interface InitGraphicsPipelineCreateInfo {
  pNext?: AnyPointer;
  flags?: PipelineCreateFlags;
  stageCount?: number;
  pStages?: AnyPointer;
  pVertexInputState?: AnyPointer;
  pInputAssemblyState?: AnyPointer;
  pTessellationState?: AnyPointer;
  pViewportState?: AnyPointer;
  pRasterizationState?: AnyPointer;
  pMultisampleState?: AnyPointer;
  pDepthStencilState?: AnyPointer;
  pColorBlendState?: AnyPointer;
  pDynamicState?: AnyPointer;
  layout?: AnyPointer;
  renderPass?: AnyPointer;
  subpass?: number;
  basePipelineHandle?: AnyPointer;
  basePipelineIndex?: number;
}

export class GraphicsPipelineCreateInfo implements BaseStruct {
  static size = 144;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitGraphicsPipelineCreateInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitGraphicsPipelineCreateInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(GraphicsPipelineCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < GraphicsPipelineCreateInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(GraphicsPipelineCreateInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.stageCount !== undefined) this.stageCount = data.stageCount;
      if (data.pStages !== undefined) this.pStages = data.pStages;
      if (data.pVertexInputState !== undefined) this.pVertexInputState = data.pVertexInputState;
      if (data.pInputAssemblyState !== undefined) this.pInputAssemblyState = data.pInputAssemblyState;
      if (data.pTessellationState !== undefined) this.pTessellationState = data.pTessellationState;
      if (data.pViewportState !== undefined) this.pViewportState = data.pViewportState;
      if (data.pRasterizationState !== undefined) this.pRasterizationState = data.pRasterizationState;
      if (data.pMultisampleState !== undefined) this.pMultisampleState = data.pMultisampleState;
      if (data.pDepthStencilState !== undefined) this.pDepthStencilState = data.pDepthStencilState;
      if (data.pColorBlendState !== undefined) this.pColorBlendState = data.pColorBlendState;
      if (data.pDynamicState !== undefined) this.pDynamicState = data.pDynamicState;
      if (data.layout !== undefined) this.layout = data.layout;
      if (data.renderPass !== undefined) this.renderPass = data.renderPass;
      if (data.subpass !== undefined) this.subpass = data.subpass;
      if (data.basePipelineHandle !== undefined) this.basePipelineHandle = data.basePipelineHandle;
      if (data.basePipelineIndex !== undefined) this.basePipelineIndex = data.basePipelineIndex;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, GraphicsPipelineCreateInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.GRAPHICS_PIPELINE_CREATE_INFO;
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

  get stageCount(): number {
    return this.#view.getUint32(20, LE);
  }
  
  set stageCount(value: number) {
    this.#view.setUint32(20, Number(value), LE);
  }

  /** One entry for each active shader stage */
  get pStages(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pStages(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get pVertexInputState(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set pVertexInputState(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get pInputAssemblyState(): Deno.PointerValue {
    return pointerFromView(this.#view, 40, LE);
  }
  
  set pInputAssemblyState(value: AnyPointer) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }

  get pTessellationState(): Deno.PointerValue {
    return pointerFromView(this.#view, 48, LE);
  }
  
  set pTessellationState(value: AnyPointer) {
    this.#view.setBigUint64(48, BigInt(anyPointer(value)), LE);
  }

  get pViewportState(): Deno.PointerValue {
    return pointerFromView(this.#view, 56, LE);
  }
  
  set pViewportState(value: AnyPointer) {
    this.#view.setBigUint64(56, BigInt(anyPointer(value)), LE);
  }

  get pRasterizationState(): Deno.PointerValue {
    return pointerFromView(this.#view, 64, LE);
  }
  
  set pRasterizationState(value: AnyPointer) {
    this.#view.setBigUint64(64, BigInt(anyPointer(value)), LE);
  }

  get pMultisampleState(): Deno.PointerValue {
    return pointerFromView(this.#view, 72, LE);
  }
  
  set pMultisampleState(value: AnyPointer) {
    this.#view.setBigUint64(72, BigInt(anyPointer(value)), LE);
  }

  get pDepthStencilState(): Deno.PointerValue {
    return pointerFromView(this.#view, 80, LE);
  }
  
  set pDepthStencilState(value: AnyPointer) {
    this.#view.setBigUint64(80, BigInt(anyPointer(value)), LE);
  }

  get pColorBlendState(): Deno.PointerValue {
    return pointerFromView(this.#view, 88, LE);
  }
  
  set pColorBlendState(value: AnyPointer) {
    this.#view.setBigUint64(88, BigInt(anyPointer(value)), LE);
  }

  get pDynamicState(): Deno.PointerValue {
    return pointerFromView(this.#view, 96, LE);
  }
  
  set pDynamicState(value: AnyPointer) {
    this.#view.setBigUint64(96, BigInt(anyPointer(value)), LE);
  }

  /** Interface layout of the pipeline */
  get layout(): Deno.PointerValue {
    return pointerFromView(this.#view, 104, LE);
  }
  
  set layout(value: AnyPointer) {
    this.#view.setBigUint64(104, BigInt(anyPointer(value)), LE);
  }

  get renderPass(): Deno.PointerValue {
    return pointerFromView(this.#view, 112, LE);
  }
  
  set renderPass(value: AnyPointer) {
    this.#view.setBigUint64(112, BigInt(anyPointer(value)), LE);
  }

  get subpass(): number {
    return this.#view.getUint32(120, LE);
  }
  
  set subpass(value: number) {
    this.#view.setUint32(120, Number(value), LE);
  }

  /** If VK_PIPELINE_CREATE_DERIVATIVE_BIT is set and this value is nonzero, it specifies the handle of the base pipeline this is a derivative of */
  get basePipelineHandle(): Deno.PointerValue {
    return pointerFromView(this.#view, 128, LE);
  }
  
  set basePipelineHandle(value: AnyPointer) {
    this.#view.setBigUint64(128, BigInt(anyPointer(value)), LE);
  }

  /** If VK_PIPELINE_CREATE_DERIVATIVE_BIT is set and this value is not -1, it specifies an index into pCreateInfos of the base pipeline this is a derivative of */
  get basePipelineIndex(): number {
    return this.#view.getInt32(136, LE);
  }
  
  set basePipelineIndex(value: number) {
    this.#view.setInt32(136, Number(value), LE);
  }
}