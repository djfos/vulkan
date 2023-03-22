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

export interface InitStdVideoEncodeH264WeightTableFlags {
  luma_weight_l0_flag?: number;
  chroma_weight_l0_flag?: number;
  luma_weight_l1_flag?: number;
  chroma_weight_l1_flag?: number;
}

export class StdVideoEncodeH264WeightTableFlags implements BaseStruct {
  static size = 16;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitStdVideoEncodeH264WeightTableFlags);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitStdVideoEncodeH264WeightTableFlags) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(StdVideoEncodeH264WeightTableFlags.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < StdVideoEncodeH264WeightTableFlags.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(StdVideoEncodeH264WeightTableFlags.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.luma_weight_l0_flag !== undefined) this.luma_weight_l0_flag = data.luma_weight_l0_flag;
      if (data.chroma_weight_l0_flag !== undefined) this.chroma_weight_l0_flag = data.chroma_weight_l0_flag;
      if (data.luma_weight_l1_flag !== undefined) this.luma_weight_l1_flag = data.luma_weight_l1_flag;
      if (data.chroma_weight_l1_flag !== undefined) this.chroma_weight_l1_flag = data.chroma_weight_l1_flag;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, StdVideoEncodeH264WeightTableFlags.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** each bit n represents the nth entry in reference list l0, n <= num_ref_idx_l0_active_minus1 */
  get luma_weight_l0_flag(): number {
    return this.#view.getUint32(0, LE);
  }
  
  set luma_weight_l0_flag(value: number) {
    this.#view.setUint32(0, Number(value), LE);
  }

  /** each bit n represents the nth entry in reference list l0, n <= num_ref_idx_l0_active_minus1 */
  get chroma_weight_l0_flag(): number {
    return this.#view.getUint32(4, LE);
  }
  
  set chroma_weight_l0_flag(value: number) {
    this.#view.setUint32(4, Number(value), LE);
  }

  /** each bit n represents the nth entry in reference list l1, n <= num_ref_idx_l1_active_minus1 */
  get luma_weight_l1_flag(): number {
    return this.#view.getUint32(8, LE);
  }
  
  set luma_weight_l1_flag(value: number) {
    this.#view.setUint32(8, Number(value), LE);
  }

  /** each bit n represents the nth entry in reference list l1, n <= num_ref_idx_l1_active_minus1 */
  get chroma_weight_l1_flag(): number {
    return this.#view.getUint32(12, LE);
  }
  
  set chroma_weight_l1_flag(value: number) {
    this.#view.setUint32(12, Number(value), LE);
  }
}