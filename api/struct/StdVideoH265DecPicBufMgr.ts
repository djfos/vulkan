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

export interface InitStdVideoH265DecPicBufMgr {
  max_latency_increase_plus1?: Uint32Array;
  max_dec_pic_buffering_minus1?: Uint8Array;
  max_num_reorder_pics?: Uint8Array;
}

export class StdVideoH265DecPicBufMgr implements BaseStruct {
  static size = 44;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitStdVideoH265DecPicBufMgr);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitStdVideoH265DecPicBufMgr) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(StdVideoH265DecPicBufMgr.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < StdVideoH265DecPicBufMgr.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(StdVideoH265DecPicBufMgr.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.max_latency_increase_plus1 !== undefined) this.max_latency_increase_plus1 = data.max_latency_increase_plus1;
      if (data.max_dec_pic_buffering_minus1 !== undefined) this.max_dec_pic_buffering_minus1 = data.max_dec_pic_buffering_minus1;
      if (data.max_num_reorder_pics !== undefined) this.max_num_reorder_pics = data.max_num_reorder_pics;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, StdVideoH265DecPicBufMgr.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** represents sps_max_latency_increase_plus1 or vps_max_latency_increase_plus1 */
  get max_latency_increase_plus1(): Uint32Array {
    return new Uint32Array(this.#data.buffer, 0, 7);
  }
  set max_latency_increase_plus1(value: Uint32Array) {
    if (value.length > 7) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 0);
  }

  /** represents sps_max_dec_pic_buffering_minus1 or vps_max_dec_pic_buffering_minus1 */
  get max_dec_pic_buffering_minus1(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 28, 7);
  }
  set max_dec_pic_buffering_minus1(value: Uint8Array) {
    if (value.length > 7) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 28);
  }

  /** represents sps_max_num_reorder_pics or vps_max_num_reorder_pics */
  get max_num_reorder_pics(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 35, 7);
  }
  set max_num_reorder_pics(value: Uint8Array) {
    if (value.length > 7) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 35);
  }
}