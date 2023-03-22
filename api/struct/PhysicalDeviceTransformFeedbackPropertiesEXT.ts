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
import { DeviceSize, Bool32 } from "../def.ts";

export interface InitPhysicalDeviceTransformFeedbackPropertiesEXT {
  pNext?: AnyPointer;
  maxTransformFeedbackStreams?: number;
  maxTransformFeedbackBuffers?: number;
  maxTransformFeedbackBufferSize?: DeviceSize;
  maxTransformFeedbackStreamDataSize?: number;
  maxTransformFeedbackBufferDataSize?: number;
  maxTransformFeedbackBufferDataStride?: number;
  transformFeedbackQueries?: Bool32;
  transformFeedbackStreamsLinesTriangles?: Bool32;
  transformFeedbackRasterizationStreamSelect?: Bool32;
  transformFeedbackDraw?: Bool32;
}

export class PhysicalDeviceTransformFeedbackPropertiesEXT implements BaseStruct {
  static size = 64;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceTransformFeedbackPropertiesEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceTransformFeedbackPropertiesEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceTransformFeedbackPropertiesEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceTransformFeedbackPropertiesEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceTransformFeedbackPropertiesEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.maxTransformFeedbackStreams !== undefined) this.maxTransformFeedbackStreams = data.maxTransformFeedbackStreams;
      if (data.maxTransformFeedbackBuffers !== undefined) this.maxTransformFeedbackBuffers = data.maxTransformFeedbackBuffers;
      if (data.maxTransformFeedbackBufferSize !== undefined) this.maxTransformFeedbackBufferSize = data.maxTransformFeedbackBufferSize;
      if (data.maxTransformFeedbackStreamDataSize !== undefined) this.maxTransformFeedbackStreamDataSize = data.maxTransformFeedbackStreamDataSize;
      if (data.maxTransformFeedbackBufferDataSize !== undefined) this.maxTransformFeedbackBufferDataSize = data.maxTransformFeedbackBufferDataSize;
      if (data.maxTransformFeedbackBufferDataStride !== undefined) this.maxTransformFeedbackBufferDataStride = data.maxTransformFeedbackBufferDataStride;
      if (data.transformFeedbackQueries !== undefined) this.transformFeedbackQueries = data.transformFeedbackQueries;
      if (data.transformFeedbackStreamsLinesTriangles !== undefined) this.transformFeedbackStreamsLinesTriangles = data.transformFeedbackStreamsLinesTriangles;
      if (data.transformFeedbackRasterizationStreamSelect !== undefined) this.transformFeedbackRasterizationStreamSelect = data.transformFeedbackRasterizationStreamSelect;
      if (data.transformFeedbackDraw !== undefined) this.transformFeedbackDraw = data.transformFeedbackDraw;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceTransformFeedbackPropertiesEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_PROPERTIES_EXT;
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

  get maxTransformFeedbackStreams(): number {
    return this.#view.getUint32(16, LE);
  }
  
  set maxTransformFeedbackStreams(value: number) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get maxTransformFeedbackBuffers(): number {
    return this.#view.getUint32(20, LE);
  }
  
  set maxTransformFeedbackBuffers(value: number) {
    this.#view.setUint32(20, Number(value), LE);
  }

  get maxTransformFeedbackBufferSize(): bigint {
    return this.#view.getBigUint64(24, LE);
  }
  
  set maxTransformFeedbackBufferSize(value: number | bigint) {
    this.#view.setBigUint64(24, BigInt(value), LE);
  }

  get maxTransformFeedbackStreamDataSize(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set maxTransformFeedbackStreamDataSize(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get maxTransformFeedbackBufferDataSize(): number {
    return this.#view.getUint32(36, LE);
  }
  
  set maxTransformFeedbackBufferDataSize(value: number) {
    this.#view.setUint32(36, Number(value), LE);
  }

  get maxTransformFeedbackBufferDataStride(): number {
    return this.#view.getUint32(40, LE);
  }
  
  set maxTransformFeedbackBufferDataStride(value: number) {
    this.#view.setUint32(40, Number(value), LE);
  }

  get transformFeedbackQueries(): Bool32 {
    return this.#view.getUint32(44, LE);
  }
  
  set transformFeedbackQueries(value: Bool32) {
    this.#view.setUint32(44, Number(value), LE);
  }

  get transformFeedbackStreamsLinesTriangles(): Bool32 {
    return this.#view.getUint32(48, LE);
  }
  
  set transformFeedbackStreamsLinesTriangles(value: Bool32) {
    this.#view.setUint32(48, Number(value), LE);
  }

  get transformFeedbackRasterizationStreamSelect(): Bool32 {
    return this.#view.getUint32(52, LE);
  }
  
  set transformFeedbackRasterizationStreamSelect(value: Bool32) {
    this.#view.setUint32(52, Number(value), LE);
  }

  get transformFeedbackDraw(): Bool32 {
    return this.#view.getUint32(56, LE);
  }
  
  set transformFeedbackDraw(value: Bool32) {
    this.#view.setUint32(56, Number(value), LE);
  }
}