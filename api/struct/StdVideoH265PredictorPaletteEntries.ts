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

export interface InitStdVideoH265PredictorPaletteEntries {
  PredictorPaletteEntries?: Uint16Array;
}

export class StdVideoH265PredictorPaletteEntries implements BaseStruct {
  static size = 768;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitStdVideoH265PredictorPaletteEntries);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitStdVideoH265PredictorPaletteEntries) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(StdVideoH265PredictorPaletteEntries.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < StdVideoH265PredictorPaletteEntries.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(StdVideoH265PredictorPaletteEntries.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.PredictorPaletteEntries !== undefined) this.PredictorPaletteEntries = data.PredictorPaletteEntries;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, StdVideoH265PredictorPaletteEntries.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  get PredictorPaletteEntries(): Uint16Array {
    return new Uint16Array(this.#data.buffer, 0, 384);
  }
  set PredictorPaletteEntries(value: Uint16Array) {
    if (value.length > 384) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 0);
  }
}