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
import { RenderPass, Framebuffer, Bool32, QueryControlFlags, QueryPipelineStatisticFlags } from "../def.ts";

export interface InitCommandBufferInheritanceInfo {
  pNext?: AnyPointer;
  renderPass?: AnyPointer;
  subpass?: number;
  framebuffer?: AnyPointer;
  occlusionQueryEnable?: Bool32;
  queryFlags?: QueryControlFlags;
  pipelineStatistics?: QueryPipelineStatisticFlags;
}

export class CommandBufferInheritanceInfo implements BaseStruct {
  static size = 56;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitCommandBufferInheritanceInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitCommandBufferInheritanceInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(CommandBufferInheritanceInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < CommandBufferInheritanceInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(CommandBufferInheritanceInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.renderPass !== undefined) this.renderPass = data.renderPass;
      if (data.subpass !== undefined) this.subpass = data.subpass;
      if (data.framebuffer !== undefined) this.framebuffer = data.framebuffer;
      if (data.occlusionQueryEnable !== undefined) this.occlusionQueryEnable = data.occlusionQueryEnable;
      if (data.queryFlags !== undefined) this.queryFlags = data.queryFlags;
      if (data.pipelineStatistics !== undefined) this.pipelineStatistics = data.pipelineStatistics;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, CommandBufferInheritanceInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COMMAND_BUFFER_INHERITANCE_INFO;
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

  /** Render pass for secondary command buffers */
  get renderPass(): Deno.PointerValue {
    return pointerFromView(this.#view, 16, LE);
  }
  
  set renderPass(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get subpass(): number {
    return this.#view.getUint32(24, LE);
  }
  
  set subpass(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** Framebuffer for secondary command buffers */
  get framebuffer(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set framebuffer(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  /** Whether this secondary command buffer may be executed during an occlusion query */
  get occlusionQueryEnable(): Bool32 {
    return this.#view.getUint32(40, LE);
  }
  
  set occlusionQueryEnable(value: Bool32) {
    this.#view.setUint32(40, Number(value), LE);
  }

  /** Query flags used by this secondary command buffer, if executed during an occlusion query */
  get queryFlags(): QueryControlFlags {
    return this.#view.getUint32(44, LE);
  }
  
  set queryFlags(value: QueryControlFlags) {
    this.#view.setUint32(44, Number(value), LE);
  }

  /** Pipeline statistics that may be counted for this secondary command buffer */
  get pipelineStatistics(): QueryPipelineStatisticFlags {
    return this.#view.getUint32(48, LE);
  }
  
  set pipelineStatistics(value: QueryPipelineStatisticFlags) {
    this.#view.setUint32(48, Number(value), LE);
  }
}