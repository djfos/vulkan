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
import { StructureType, ImageAspectFlagBits } from "../enum.ts";
import { Image, ImageView, BufferView, MTLTexture_id } from "../def.ts";

export interface InitExportMetalTextureInfoEXT {
  pNext?: AnyPointer;
  image?: AnyPointer;
  imageView?: AnyPointer;
  bufferView?: AnyPointer;
  plane?: ImageAspectFlagBits;
  mtlTexture?: AnyPointer;
}

export class ExportMetalTextureInfoEXT implements BaseStruct {
  static size = 56;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitExportMetalTextureInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitExportMetalTextureInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(ExportMetalTextureInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < ExportMetalTextureInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(ExportMetalTextureInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.image !== undefined) this.image = data.image;
      if (data.imageView !== undefined) this.imageView = data.imageView;
      if (data.bufferView !== undefined) this.bufferView = data.bufferView;
      if (data.plane !== undefined) this.plane = data.plane;
      if (data.mtlTexture !== undefined) this.mtlTexture = data.mtlTexture;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ExportMetalTextureInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.EXPORT_METAL_TEXTURE_INFO_EXT;
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

  get image(): Deno.PointerValue {
    return pointerFromView(this.#view, 16, LE);
  }
  
  set image(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get imageView(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set imageView(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get bufferView(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set bufferView(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get plane(): ImageAspectFlagBits {
    return this.#view.getInt32(40, LE);
  }
  
  set plane(value: ImageAspectFlagBits) {
    this.#view.setInt32(40, Number(value), LE);
  }

  get mtlTexture(): Deno.PointerValue {
    return pointerFromView(this.#view, 48, LE);
  }
  
  set mtlTexture(value: AnyPointer) {
    this.#view.setBigUint64(48, BigInt(anyPointer(value)), LE);
  }
}