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
import {ImageSubresourceLayers} from "./ImageSubresourceLayers.ts";
import {Offset3D} from "./Offset3D.ts";
import { StructureType } from "../enum.ts";

export interface InitImageBlit2 {
  pNext?: AnyPointer;
  srcSubresource?: ImageSubresourceLayers;
  srcOffsets?: Offset3D[];
  dstSubresource?: ImageSubresourceLayers;
  dstOffsets?: Offset3D[];
}

export class ImageBlit2 implements BaseStruct {
  static size = 96;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitImageBlit2);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitImageBlit2) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(ImageBlit2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < ImageBlit2.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(ImageBlit2.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.srcSubresource !== undefined) this.srcSubresource = data.srcSubresource;
      if (data.srcOffsets !== undefined) this.srcOffsets = data.srcOffsets;
      if (data.dstSubresource !== undefined) this.dstSubresource = data.dstSubresource;
      if (data.dstOffsets !== undefined) this.dstOffsets = data.dstOffsets;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ImageBlit2.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.IMAGE_BLIT_2;
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

  get srcSubresource(): ImageSubresourceLayers {
    return new ImageSubresourceLayers(this.#data.subarray(16, 16 + ImageSubresourceLayers.size));
  }
  set srcSubresource(value: ImageSubresourceLayers) {
    if (value[BUFFER].byteLength < ImageSubresourceLayers.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 16);
  }

  /** Specified in pixels for both compressed and uncompressed images */
  get srcOffsets(): Offset3D[] {
    const result: Offset3D[] = [];
    for (let i = 0; i < 2; i++) {
      const start = 32 + i * Offset3D.size;
      const element = new Offset3D(this.#data.subarray(start, start + Offset3D.size));
      result.push(element);
    }
    return result;
  }
  set srcOffsets(value: Offset3D[]) {
    if (value.length > 2) {
      throw Error("buffer is too big");
    }
    for (let i = 0; i < value.length; i++) {
      this.#data.set(value[i][BUFFER], 32 + i * 12);
    }
  }

  get dstSubresource(): ImageSubresourceLayers {
    return new ImageSubresourceLayers(this.#data.subarray(56, 56 + ImageSubresourceLayers.size));
  }
  set dstSubresource(value: ImageSubresourceLayers) {
    if (value[BUFFER].byteLength < ImageSubresourceLayers.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 56);
  }

  /** Specified in pixels for both compressed and uncompressed images */
  get dstOffsets(): Offset3D[] {
    const result: Offset3D[] = [];
    for (let i = 0; i < 2; i++) {
      const start = 72 + i * Offset3D.size;
      const element = new Offset3D(this.#data.subarray(start, start + Offset3D.size));
      result.push(element);
    }
    return result;
  }
  set dstOffsets(value: Offset3D[]) {
    if (value.length > 2) {
      throw Error("buffer is too big");
    }
    for (let i = 0; i < value.length; i++) {
      this.#data.set(value[i][BUFFER], 72 + i * 12);
    }
  }
}