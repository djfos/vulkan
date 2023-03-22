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
import { CommandBufferUsageFlags } from "../def.ts";

export interface InitCommandBufferBeginInfo {
  pNext?: AnyPointer;
  flags?: CommandBufferUsageFlags;
  pInheritanceInfo?: AnyPointer;
}

export class CommandBufferBeginInfo implements BaseStruct {
  static size = 32;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitCommandBufferBeginInfo);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitCommandBufferBeginInfo) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(CommandBufferBeginInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < CommandBufferBeginInfo.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(CommandBufferBeginInfo.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.pInheritanceInfo !== undefined) this.pInheritanceInfo = data.pInheritanceInfo;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, CommandBufferBeginInfo.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.COMMAND_BUFFER_BEGIN_INFO;
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

  /** Command buffer usage flags */
  get flags(): CommandBufferUsageFlags {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: CommandBufferUsageFlags) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** Pointer to inheritance info for secondary command buffers */
  get pInheritanceInfo(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pInheritanceInfo(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }
}