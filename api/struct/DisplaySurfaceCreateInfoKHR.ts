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
import {Extent2D} from "./Extent2D.ts";
import { StructureType, SurfaceTransformFlagBitsKHR, DisplayPlaneAlphaFlagBitsKHR } from "../enum.ts";
import { DisplaySurfaceCreateFlagsKHR, DisplayModeKHR } from "../def.ts";

export interface InitDisplaySurfaceCreateInfoKHR {
  pNext?: AnyPointer;
  flags?: DisplaySurfaceCreateFlagsKHR;
  displayMode?: AnyPointer;
  planeIndex?: number;
  planeStackIndex?: number;
  transform?: SurfaceTransformFlagBitsKHR;
  globalAlpha?: number;
  alphaMode?: DisplayPlaneAlphaFlagBitsKHR;
  imageExtent?: Extent2D;
}

export class DisplaySurfaceCreateInfoKHR implements BaseStruct {
  static size = 64;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitDisplaySurfaceCreateInfoKHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitDisplaySurfaceCreateInfoKHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(DisplaySurfaceCreateInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < DisplaySurfaceCreateInfoKHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(DisplaySurfaceCreateInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.displayMode !== undefined) this.displayMode = data.displayMode;
      if (data.planeIndex !== undefined) this.planeIndex = data.planeIndex;
      if (data.planeStackIndex !== undefined) this.planeStackIndex = data.planeStackIndex;
      if (data.transform !== undefined) this.transform = data.transform;
      if (data.globalAlpha !== undefined) this.globalAlpha = data.globalAlpha;
      if (data.alphaMode !== undefined) this.alphaMode = data.alphaMode;
      if (data.imageExtent !== undefined) this.imageExtent = data.imageExtent;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, DisplaySurfaceCreateInfoKHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.DISPLAY_SURFACE_CREATE_INFO_KHR;
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

  get flags(): DisplaySurfaceCreateFlagsKHR {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: DisplaySurfaceCreateFlagsKHR) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** The mode to use when displaying this surface */
  get displayMode(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set displayMode(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  /** The plane on which this surface appears.  Must be between 0 and the value returned by vkGetPhysicalDeviceDisplayPlanePropertiesKHR() in pPropertyCount. */
  get planeIndex(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set planeIndex(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  /** The z-order of the plane. */
  get planeStackIndex(): number {
    return this.#view.getUint32(36, LE);
  }
  
  set planeStackIndex(value: number) {
    this.#view.setUint32(36, Number(value), LE);
  }

  /** Transform to apply to the images as part of the scanout operation */
  get transform(): SurfaceTransformFlagBitsKHR {
    return this.#view.getInt32(40, LE);
  }
  
  set transform(value: SurfaceTransformFlagBitsKHR) {
    this.#view.setInt32(40, Number(value), LE);
  }

  /** Global alpha value.  Must be between 0 and 1, inclusive.  Ignored if alphaMode is not VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR */
  get globalAlpha(): number {
    return this.#view.getFloat32(44, LE);
  }
  
  set globalAlpha(value: number) {
    this.#view.setFloat32(44, Number(value), LE);
  }

  /** What type of alpha blending to use.  Must be a bit from vkGetDisplayPlanePropertiesKHR::supportedAlpha. */
  get alphaMode(): DisplayPlaneAlphaFlagBitsKHR {
    return this.#view.getInt32(48, LE);
  }
  
  set alphaMode(value: DisplayPlaneAlphaFlagBitsKHR) {
    this.#view.setInt32(48, Number(value), LE);
  }

  /** size of the images to use with this surface */
  get imageExtent(): Extent2D {
    return new Extent2D(this.#data.subarray(52, 52 + Extent2D.size));
  }
  set imageExtent(value: Extent2D) {
    if (value[BUFFER].byteLength < Extent2D.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 52);
  }
}