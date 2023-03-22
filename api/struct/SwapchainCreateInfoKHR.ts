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
import { StructureType, Format, ColorSpaceKHR, SharingMode, SurfaceTransformFlagBitsKHR, CompositeAlphaFlagBitsKHR, PresentModeKHR } from "../enum.ts";
import { SwapchainCreateFlagsKHR, SurfaceKHR, ImageUsageFlags, Bool32, SwapchainKHR } from "../def.ts";

export interface InitSwapchainCreateInfoKHR {
  pNext?: AnyPointer;
  flags?: SwapchainCreateFlagsKHR;
  surface?: AnyPointer;
  minImageCount?: number;
  imageFormat?: Format;
  imageColorSpace?: ColorSpaceKHR;
  imageExtent?: Extent2D;
  imageArrayLayers?: number;
  imageUsage?: ImageUsageFlags;
  imageSharingMode?: SharingMode;
  queueFamilyIndexCount?: number;
  pQueueFamilyIndices?: AnyPointer;
  preTransform?: SurfaceTransformFlagBitsKHR;
  compositeAlpha?: CompositeAlphaFlagBitsKHR;
  presentMode?: PresentModeKHR;
  clipped?: Bool32;
  oldSwapchain?: AnyPointer;
}

export class SwapchainCreateInfoKHR implements BaseStruct {
  static size = 104;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitSwapchainCreateInfoKHR);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitSwapchainCreateInfoKHR) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(SwapchainCreateInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < SwapchainCreateInfoKHR.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(SwapchainCreateInfoKHR.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.flags !== undefined) this.flags = data.flags;
      if (data.surface !== undefined) this.surface = data.surface;
      if (data.minImageCount !== undefined) this.minImageCount = data.minImageCount;
      if (data.imageFormat !== undefined) this.imageFormat = data.imageFormat;
      if (data.imageColorSpace !== undefined) this.imageColorSpace = data.imageColorSpace;
      if (data.imageExtent !== undefined) this.imageExtent = data.imageExtent;
      if (data.imageArrayLayers !== undefined) this.imageArrayLayers = data.imageArrayLayers;
      if (data.imageUsage !== undefined) this.imageUsage = data.imageUsage;
      if (data.imageSharingMode !== undefined) this.imageSharingMode = data.imageSharingMode;
      if (data.queueFamilyIndexCount !== undefined) this.queueFamilyIndexCount = data.queueFamilyIndexCount;
      if (data.pQueueFamilyIndices !== undefined) this.pQueueFamilyIndices = data.pQueueFamilyIndices;
      if (data.preTransform !== undefined) this.preTransform = data.preTransform;
      if (data.compositeAlpha !== undefined) this.compositeAlpha = data.compositeAlpha;
      if (data.presentMode !== undefined) this.presentMode = data.presentMode;
      if (data.clipped !== undefined) this.clipped = data.clipped;
      if (data.oldSwapchain !== undefined) this.oldSwapchain = data.oldSwapchain;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, SwapchainCreateInfoKHR.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.SWAPCHAIN_CREATE_INFO_KHR;
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

  get flags(): SwapchainCreateFlagsKHR {
    return this.#view.getUint32(16, LE);
  }
  
  set flags(value: SwapchainCreateFlagsKHR) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** The swapchain's target surface */
  get surface(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set surface(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  /** Minimum number of presentation images the application needs */
  get minImageCount(): number {
    return this.#view.getUint32(32, LE);
  }
  
  set minImageCount(value: number) {
    this.#view.setUint32(32, Number(value), LE);
  }

  /** Format of the presentation images */
  get imageFormat(): Format {
    return this.#view.getInt32(36, LE);
  }
  
  set imageFormat(value: Format) {
    this.#view.setInt32(36, Number(value), LE);
  }

  /** Colorspace of the presentation images */
  get imageColorSpace(): ColorSpaceKHR {
    return this.#view.getInt32(40, LE);
  }
  
  set imageColorSpace(value: ColorSpaceKHR) {
    this.#view.setInt32(40, Number(value), LE);
  }

  /** Dimensions of the presentation images */
  get imageExtent(): Extent2D {
    return new Extent2D(this.#data.subarray(44, 44 + Extent2D.size));
  }
  set imageExtent(value: Extent2D) {
    if (value[BUFFER].byteLength < Extent2D.size) {
      throw new Error("Data buffer too small");
    }
    this.#data.set(value[BUFFER], 44);
  }

  /** Determines the number of views for multiview/stereo presentation */
  get imageArrayLayers(): number {
    return this.#view.getUint32(52, LE);
  }
  
  set imageArrayLayers(value: number) {
    this.#view.setUint32(52, Number(value), LE);
  }

  /** Bits indicating how the presentation images will be used */
  get imageUsage(): ImageUsageFlags {
    return this.#view.getUint32(56, LE);
  }
  
  set imageUsage(value: ImageUsageFlags) {
    this.#view.setUint32(56, Number(value), LE);
  }

  /** Sharing mode used for the presentation images */
  get imageSharingMode(): SharingMode {
    return this.#view.getInt32(60, LE);
  }
  
  set imageSharingMode(value: SharingMode) {
    this.#view.setInt32(60, Number(value), LE);
  }

  /** Number of queue families having access to the images in case of concurrent sharing mode */
  get queueFamilyIndexCount(): number {
    return this.#view.getUint32(64, LE);
  }
  
  set queueFamilyIndexCount(value: number) {
    this.#view.setUint32(64, Number(value), LE);
  }

  /** Array of queue family indices having access to the images in case of concurrent sharing mode */
  get pQueueFamilyIndices(): Deno.PointerValue {
    return pointerFromView(this.#view, 72, LE);
  }
  
  set pQueueFamilyIndices(value: AnyPointer) {
    this.#view.setBigUint64(72, BigInt(anyPointer(value)), LE);
  }

  /** The transform, relative to the device's natural orientation, applied to the image content prior to presentation */
  get preTransform(): SurfaceTransformFlagBitsKHR {
    return this.#view.getInt32(80, LE);
  }
  
  set preTransform(value: SurfaceTransformFlagBitsKHR) {
    this.#view.setInt32(80, Number(value), LE);
  }

  /** The alpha blending mode used when compositing this surface with other surfaces in the window system */
  get compositeAlpha(): CompositeAlphaFlagBitsKHR {
    return this.#view.getInt32(84, LE);
  }
  
  set compositeAlpha(value: CompositeAlphaFlagBitsKHR) {
    this.#view.setInt32(84, Number(value), LE);
  }

  /** Which presentation mode to use for presents on this swap chain */
  get presentMode(): PresentModeKHR {
    return this.#view.getInt32(88, LE);
  }
  
  set presentMode(value: PresentModeKHR) {
    this.#view.setInt32(88, Number(value), LE);
  }

  /** Specifies whether presentable images may be affected by window clip regions */
  get clipped(): Bool32 {
    return this.#view.getUint32(92, LE);
  }
  
  set clipped(value: Bool32) {
    this.#view.setUint32(92, Number(value), LE);
  }

  /** Existing swap chain to replace, if any */
  get oldSwapchain(): Deno.PointerValue {
    return pointerFromView(this.#view, 96, LE);
  }
  
  set oldSwapchain(value: AnyPointer) {
    this.#view.setBigUint64(96, BigInt(anyPointer(value)), LE);
  }
}