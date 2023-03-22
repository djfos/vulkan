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
import { StructureType, ImageLayout, ResolveModeFlagBits, AttachmentLoadOp, AttachmentStoreOp } from "../enum.ts";
import { ImageView } from "../def.ts";
import { ClearValue } from "../union.ts";

export interface InitRenderingAttachmentInfo {
  pNext?: AnyPointer;
  imageView?: AnyPointer;
  imageLayout?: ImageLayout;
  resolveMode?: ResolveModeFlagBits;
  resolveImageView?: AnyPointer;
  resolveImageLayout?: ImageLayout;
  loadOp?: AttachmentLoadOp;
  storeOp?: AttachmentStoreOp;
  clearValue?: ClearValue;
}

export class RenderingAttachmentInfo implements BaseStruct {
  static size = 72;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitRenderingAttachmentInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitRenderingAttachmentInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(RenderingAttachmentInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < RenderingAttachmentInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(RenderingAttachmentInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.imageView !== undefined) this.imageView = data.imageView;
      if (data.imageLayout !== undefined) this.imageLayout = data.imageLayout;
      if (data.resolveMode !== undefined) this.resolveMode = data.resolveMode;
      if (data.resolveImageView !== undefined) this.resolveImageView = data.resolveImageView;
      if (data.resolveImageLayout !== undefined) this.resolveImageLayout = data.resolveImageLayout;
      if (data.loadOp !== undefined) this.loadOp = data.loadOp;
      if (data.storeOp !== undefined) this.storeOp = data.storeOp;
      if (data.clearValue !== undefined) this.clearValue = data.clearValue;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, RenderingAttachmentInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.RENDERING_ATTACHMENT_INFO;
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

  get imageView(): Deno.PointerValue {
    return pointerFromView(this.#view, 16, LE);
  }
  
  set imageView(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get imageLayout(): ImageLayout {
    return this.#view.getInt32(24, LE);
  }
  
  set imageLayout(value: ImageLayout) {
    this.#view.setInt32(24, Number(value), LE);
  }

  get resolveMode(): ResolveModeFlagBits {
    return this.#view.getInt32(28, LE);
  }
  
  set resolveMode(value: ResolveModeFlagBits) {
    this.#view.setInt32(28, Number(value), LE);
  }

  get resolveImageView(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set resolveImageView(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get resolveImageLayout(): ImageLayout {
    return this.#view.getInt32(40, LE);
  }
  
  set resolveImageLayout(value: ImageLayout) {
    this.#view.setInt32(40, Number(value), LE);
  }

  get loadOp(): AttachmentLoadOp {
    return this.#view.getInt32(44, LE);
  }
  
  set loadOp(value: AttachmentLoadOp) {
    this.#view.setInt32(44, Number(value), LE);
  }

  get storeOp(): AttachmentStoreOp {
    return this.#view.getInt32(48, LE);
  }
  
  set storeOp(value: AttachmentStoreOp) {
    this.#view.setInt32(48, Number(value), LE);
  }

  get clearValue(): ClearValue {
    throw new Error(`Unknown type: {"union":[{"union":[{"array":"f32","len":4},{"array":"i32","len":4},{"array":"u32","len":4}]},{"struct":["f32","u32"]}]}`);
  }
  set clearValue(value: ClearValue) {
    throw new Error(`Unknown type: {"union":[{"union":[{"array":"f32","len":4},{"array":"i32","len":4},{"array":"u32","len":4}]},{"struct":["f32","u32"]}]}`);
  }
}