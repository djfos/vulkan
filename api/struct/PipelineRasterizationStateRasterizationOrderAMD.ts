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
import { StructureType, RasterizationOrderAMD } from "../enum.ts";

export interface InitPipelineRasterizationStateRasterizationOrderAMD {
  pNext?: AnyPointer;
  rasterizationOrder?: RasterizationOrderAMD;
}

export class PipelineRasterizationStateRasterizationOrderAMD implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPipelineRasterizationStateRasterizationOrderAMD);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPipelineRasterizationStateRasterizationOrderAMD) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PipelineRasterizationStateRasterizationOrderAMD.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PipelineRasterizationStateRasterizationOrderAMD.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PipelineRasterizationStateRasterizationOrderAMD.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.rasterizationOrder !== undefined) this.rasterizationOrder = data.rasterizationOrder;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PipelineRasterizationStateRasterizationOrderAMD.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PIPELINE_RASTERIZATION_STATE_RASTERIZATION_ORDER_AMD;
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

  /** Rasterization order to use for the pipeline */
  get rasterizationOrder(): RasterizationOrderAMD {
    return this.#view.getInt32(16, LE);
  }
  
  set rasterizationOrder(value: RasterizationOrderAMD) {
    this.#view.setInt32(16, Number(value), LE);
  }
}