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
import { ImageLayout } from "../enum.ts";
import { Sampler, ImageView } from "../def.ts";

export interface InitDescriptorImageInfo {
  sampler?: AnyPointer;
  imageView?: AnyPointer;
  imageLayout?: ImageLayout;
}

export class DescriptorImageInfo implements BaseStruct {
  static size = 24;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDescriptorImageInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDescriptorImageInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DescriptorImageInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DescriptorImageInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DescriptorImageInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.sampler !== undefined) this.sampler = data.sampler;
      if (data.imageView !== undefined) this.imageView = data.imageView;
      if (data.imageLayout !== undefined) this.imageLayout = data.imageLayout;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DescriptorImageInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** Sampler to write to the descriptor in case it is a SAMPLER or COMBINED_IMAGE_SAMPLER descriptor. Ignored otherwise. */
  get sampler(): Deno.PointerValue {
    return pointerFromView(this.#view, 0, LE);
  }
  
  set sampler(value: AnyPointer) {
    this.#view.setBigUint64(0, BigInt(anyPointer(value)), LE);
  }

  /** Image view to write to the descriptor in case it is a SAMPLED_IMAGE, STORAGE_IMAGE, COMBINED_IMAGE_SAMPLER, or INPUT_ATTACHMENT descriptor. Ignored otherwise. */
  get imageView(): Deno.PointerValue {
    return pointerFromView(this.#view, 8, LE);
  }
  
  set imageView(value: AnyPointer) {
    this.#view.setBigUint64(8, BigInt(anyPointer(value)), LE);
  }

  /** Layout the image is expected to be in when accessed using this descriptor (only used if imageView is not VK_NULL_HANDLE). */
  get imageLayout(): ImageLayout {
    return this.#view.getInt32(16, LE);
  }
  
  set imageLayout(value: ImageLayout) {
    this.#view.setInt32(16, Number(value), LE);
  }
}