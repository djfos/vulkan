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
import { StructureType, PipelineRobustnessBufferBehaviorEXT, PipelineRobustnessImageBehaviorEXT } from "../enum.ts";

export interface InitPipelineRobustnessCreateInfoEXT {
  pNext?: AnyPointer;
  storageBuffers?: PipelineRobustnessBufferBehaviorEXT;
  uniformBuffers?: PipelineRobustnessBufferBehaviorEXT;
  vertexInputs?: PipelineRobustnessBufferBehaviorEXT;
  images?: PipelineRobustnessImageBehaviorEXT;
}

export class PipelineRobustnessCreateInfoEXT implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPipelineRobustnessCreateInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPipelineRobustnessCreateInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PipelineRobustnessCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PipelineRobustnessCreateInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PipelineRobustnessCreateInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.storageBuffers !== undefined) this.storageBuffers = data.storageBuffers;
      if (data.uniformBuffers !== undefined) this.uniformBuffers = data.uniformBuffers;
      if (data.vertexInputs !== undefined) this.vertexInputs = data.vertexInputs;
      if (data.images !== undefined) this.images = data.images;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PipelineRobustnessCreateInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PIPELINE_ROBUSTNESS_CREATE_INFO_EXT;
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

  get storageBuffers(): PipelineRobustnessBufferBehaviorEXT {
    return this.#view.getInt32(16, LE);
  }
  
  set storageBuffers(value: PipelineRobustnessBufferBehaviorEXT) {
    this.#view.setInt32(16, Number(value), LE);
  }

  get uniformBuffers(): PipelineRobustnessBufferBehaviorEXT {
    return this.#view.getInt32(20, LE);
  }
  
  set uniformBuffers(value: PipelineRobustnessBufferBehaviorEXT) {
    this.#view.setInt32(20, Number(value), LE);
  }

  get vertexInputs(): PipelineRobustnessBufferBehaviorEXT {
    return this.#view.getInt32(24, LE);
  }
  
  set vertexInputs(value: PipelineRobustnessBufferBehaviorEXT) {
    this.#view.setInt32(24, Number(value), LE);
  }

  get images(): PipelineRobustnessImageBehaviorEXT {
    return this.#view.getInt32(28, LE);
  }
  
  set images(value: PipelineRobustnessImageBehaviorEXT) {
    this.#view.setInt32(28, Number(value), LE);
  }
}