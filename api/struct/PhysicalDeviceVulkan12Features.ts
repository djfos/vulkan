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
import { Bool32 } from "../def.ts";

export interface InitPhysicalDeviceVulkan12Features {
  pNext?: AnyPointer;
  samplerMirrorClampToEdge?: Bool32;
  drawIndirectCount?: Bool32;
  storageBuffer8BitAccess?: Bool32;
  uniformAndStorageBuffer8BitAccess?: Bool32;
  storagePushConstant8?: Bool32;
  shaderBufferInt64Atomics?: Bool32;
  shaderSharedInt64Atomics?: Bool32;
  shaderFloat16?: Bool32;
  shaderInt8?: Bool32;
  descriptorIndexing?: Bool32;
  shaderInputAttachmentArrayDynamicIndexing?: Bool32;
  shaderUniformTexelBufferArrayDynamicIndexing?: Bool32;
  shaderStorageTexelBufferArrayDynamicIndexing?: Bool32;
  shaderUniformBufferArrayNonUniformIndexing?: Bool32;
  shaderSampledImageArrayNonUniformIndexing?: Bool32;
  shaderStorageBufferArrayNonUniformIndexing?: Bool32;
  shaderStorageImageArrayNonUniformIndexing?: Bool32;
  shaderInputAttachmentArrayNonUniformIndexing?: Bool32;
  shaderUniformTexelBufferArrayNonUniformIndexing?: Bool32;
  shaderStorageTexelBufferArrayNonUniformIndexing?: Bool32;
  descriptorBindingUniformBufferUpdateAfterBind?: Bool32;
  descriptorBindingSampledImageUpdateAfterBind?: Bool32;
  descriptorBindingStorageImageUpdateAfterBind?: Bool32;
  descriptorBindingStorageBufferUpdateAfterBind?: Bool32;
  descriptorBindingUniformTexelBufferUpdateAfterBind?: Bool32;
  descriptorBindingStorageTexelBufferUpdateAfterBind?: Bool32;
  descriptorBindingUpdateUnusedWhilePending?: Bool32;
  descriptorBindingPartiallyBound?: Bool32;
  descriptorBindingVariableDescriptorCount?: Bool32;
  runtimeDescriptorArray?: Bool32;
  samplerFilterMinmax?: Bool32;
  scalarBlockLayout?: Bool32;
  imagelessFramebuffer?: Bool32;
  uniformBufferStandardLayout?: Bool32;
  shaderSubgroupExtendedTypes?: Bool32;
  separateDepthStencilLayouts?: Bool32;
  hostQueryReset?: Bool32;
  timelineSemaphore?: Bool32;
  bufferDeviceAddress?: Bool32;
  bufferDeviceAddressCaptureReplay?: Bool32;
  bufferDeviceAddressMultiDevice?: Bool32;
  vulkanMemoryModel?: Bool32;
  vulkanMemoryModelDeviceScope?: Bool32;
  vulkanMemoryModelAvailabilityVisibilityChains?: Bool32;
  shaderOutputViewportIndex?: Bool32;
  shaderOutputLayer?: Bool32;
  subgroupBroadcastDynamicId?: Bool32;
}

export class PhysicalDeviceVulkan12Features implements BaseStruct {
  static size = 208;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceVulkan12Features);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceVulkan12Features) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceVulkan12Features.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceVulkan12Features.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceVulkan12Features.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.samplerMirrorClampToEdge !== undefined) this.samplerMirrorClampToEdge = data.samplerMirrorClampToEdge;
      if (data.drawIndirectCount !== undefined) this.drawIndirectCount = data.drawIndirectCount;
      if (data.storageBuffer8BitAccess !== undefined) this.storageBuffer8BitAccess = data.storageBuffer8BitAccess;
      if (data.uniformAndStorageBuffer8BitAccess !== undefined) this.uniformAndStorageBuffer8BitAccess = data.uniformAndStorageBuffer8BitAccess;
      if (data.storagePushConstant8 !== undefined) this.storagePushConstant8 = data.storagePushConstant8;
      if (data.shaderBufferInt64Atomics !== undefined) this.shaderBufferInt64Atomics = data.shaderBufferInt64Atomics;
      if (data.shaderSharedInt64Atomics !== undefined) this.shaderSharedInt64Atomics = data.shaderSharedInt64Atomics;
      if (data.shaderFloat16 !== undefined) this.shaderFloat16 = data.shaderFloat16;
      if (data.shaderInt8 !== undefined) this.shaderInt8 = data.shaderInt8;
      if (data.descriptorIndexing !== undefined) this.descriptorIndexing = data.descriptorIndexing;
      if (data.shaderInputAttachmentArrayDynamicIndexing !== undefined) this.shaderInputAttachmentArrayDynamicIndexing = data.shaderInputAttachmentArrayDynamicIndexing;
      if (data.shaderUniformTexelBufferArrayDynamicIndexing !== undefined) this.shaderUniformTexelBufferArrayDynamicIndexing = data.shaderUniformTexelBufferArrayDynamicIndexing;
      if (data.shaderStorageTexelBufferArrayDynamicIndexing !== undefined) this.shaderStorageTexelBufferArrayDynamicIndexing = data.shaderStorageTexelBufferArrayDynamicIndexing;
      if (data.shaderUniformBufferArrayNonUniformIndexing !== undefined) this.shaderUniformBufferArrayNonUniformIndexing = data.shaderUniformBufferArrayNonUniformIndexing;
      if (data.shaderSampledImageArrayNonUniformIndexing !== undefined) this.shaderSampledImageArrayNonUniformIndexing = data.shaderSampledImageArrayNonUniformIndexing;
      if (data.shaderStorageBufferArrayNonUniformIndexing !== undefined) this.shaderStorageBufferArrayNonUniformIndexing = data.shaderStorageBufferArrayNonUniformIndexing;
      if (data.shaderStorageImageArrayNonUniformIndexing !== undefined) this.shaderStorageImageArrayNonUniformIndexing = data.shaderStorageImageArrayNonUniformIndexing;
      if (data.shaderInputAttachmentArrayNonUniformIndexing !== undefined) this.shaderInputAttachmentArrayNonUniformIndexing = data.shaderInputAttachmentArrayNonUniformIndexing;
      if (data.shaderUniformTexelBufferArrayNonUniformIndexing !== undefined) this.shaderUniformTexelBufferArrayNonUniformIndexing = data.shaderUniformTexelBufferArrayNonUniformIndexing;
      if (data.shaderStorageTexelBufferArrayNonUniformIndexing !== undefined) this.shaderStorageTexelBufferArrayNonUniformIndexing = data.shaderStorageTexelBufferArrayNonUniformIndexing;
      if (data.descriptorBindingUniformBufferUpdateAfterBind !== undefined) this.descriptorBindingUniformBufferUpdateAfterBind = data.descriptorBindingUniformBufferUpdateAfterBind;
      if (data.descriptorBindingSampledImageUpdateAfterBind !== undefined) this.descriptorBindingSampledImageUpdateAfterBind = data.descriptorBindingSampledImageUpdateAfterBind;
      if (data.descriptorBindingStorageImageUpdateAfterBind !== undefined) this.descriptorBindingStorageImageUpdateAfterBind = data.descriptorBindingStorageImageUpdateAfterBind;
      if (data.descriptorBindingStorageBufferUpdateAfterBind !== undefined) this.descriptorBindingStorageBufferUpdateAfterBind = data.descriptorBindingStorageBufferUpdateAfterBind;
      if (data.descriptorBindingUniformTexelBufferUpdateAfterBind !== undefined) this.descriptorBindingUniformTexelBufferUpdateAfterBind = data.descriptorBindingUniformTexelBufferUpdateAfterBind;
      if (data.descriptorBindingStorageTexelBufferUpdateAfterBind !== undefined) this.descriptorBindingStorageTexelBufferUpdateAfterBind = data.descriptorBindingStorageTexelBufferUpdateAfterBind;
      if (data.descriptorBindingUpdateUnusedWhilePending !== undefined) this.descriptorBindingUpdateUnusedWhilePending = data.descriptorBindingUpdateUnusedWhilePending;
      if (data.descriptorBindingPartiallyBound !== undefined) this.descriptorBindingPartiallyBound = data.descriptorBindingPartiallyBound;
      if (data.descriptorBindingVariableDescriptorCount !== undefined) this.descriptorBindingVariableDescriptorCount = data.descriptorBindingVariableDescriptorCount;
      if (data.runtimeDescriptorArray !== undefined) this.runtimeDescriptorArray = data.runtimeDescriptorArray;
      if (data.samplerFilterMinmax !== undefined) this.samplerFilterMinmax = data.samplerFilterMinmax;
      if (data.scalarBlockLayout !== undefined) this.scalarBlockLayout = data.scalarBlockLayout;
      if (data.imagelessFramebuffer !== undefined) this.imagelessFramebuffer = data.imagelessFramebuffer;
      if (data.uniformBufferStandardLayout !== undefined) this.uniformBufferStandardLayout = data.uniformBufferStandardLayout;
      if (data.shaderSubgroupExtendedTypes !== undefined) this.shaderSubgroupExtendedTypes = data.shaderSubgroupExtendedTypes;
      if (data.separateDepthStencilLayouts !== undefined) this.separateDepthStencilLayouts = data.separateDepthStencilLayouts;
      if (data.hostQueryReset !== undefined) this.hostQueryReset = data.hostQueryReset;
      if (data.timelineSemaphore !== undefined) this.timelineSemaphore = data.timelineSemaphore;
      if (data.bufferDeviceAddress !== undefined) this.bufferDeviceAddress = data.bufferDeviceAddress;
      if (data.bufferDeviceAddressCaptureReplay !== undefined) this.bufferDeviceAddressCaptureReplay = data.bufferDeviceAddressCaptureReplay;
      if (data.bufferDeviceAddressMultiDevice !== undefined) this.bufferDeviceAddressMultiDevice = data.bufferDeviceAddressMultiDevice;
      if (data.vulkanMemoryModel !== undefined) this.vulkanMemoryModel = data.vulkanMemoryModel;
      if (data.vulkanMemoryModelDeviceScope !== undefined) this.vulkanMemoryModelDeviceScope = data.vulkanMemoryModelDeviceScope;
      if (data.vulkanMemoryModelAvailabilityVisibilityChains !== undefined) this.vulkanMemoryModelAvailabilityVisibilityChains = data.vulkanMemoryModelAvailabilityVisibilityChains;
      if (data.shaderOutputViewportIndex !== undefined) this.shaderOutputViewportIndex = data.shaderOutputViewportIndex;
      if (data.shaderOutputLayer !== undefined) this.shaderOutputLayer = data.shaderOutputLayer;
      if (data.subgroupBroadcastDynamicId !== undefined) this.subgroupBroadcastDynamicId = data.subgroupBroadcastDynamicId;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceVulkan12Features.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.PHYSICAL_DEVICE_VULKAN_1_2_FEATURES;
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

  get samplerMirrorClampToEdge(): Bool32 {
    return this.#view.getUint32(16, LE);
  }
  
  set samplerMirrorClampToEdge(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }

  get drawIndirectCount(): Bool32 {
    return this.#view.getUint32(20, LE);
  }
  
  set drawIndirectCount(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  /** 8-bit integer variables supported in StorageBuffer */
  get storageBuffer8BitAccess(): Bool32 {
    return this.#view.getUint32(24, LE);
  }
  
  set storageBuffer8BitAccess(value: Bool32) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** 8-bit integer variables supported in StorageBuffer and Uniform */
  get uniformAndStorageBuffer8BitAccess(): Bool32 {
    return this.#view.getUint32(28, LE);
  }
  
  set uniformAndStorageBuffer8BitAccess(value: Bool32) {
    this.#view.setUint32(28, Number(value), LE);
  }

  /** 8-bit integer variables supported in PushConstant */
  get storagePushConstant8(): Bool32 {
    return this.#view.getUint32(32, LE);
  }
  
  set storagePushConstant8(value: Bool32) {
    this.#view.setUint32(32, Number(value), LE);
  }

  get shaderBufferInt64Atomics(): Bool32 {
    return this.#view.getUint32(36, LE);
  }
  
  set shaderBufferInt64Atomics(value: Bool32) {
    this.#view.setUint32(36, Number(value), LE);
  }

  get shaderSharedInt64Atomics(): Bool32 {
    return this.#view.getUint32(40, LE);
  }
  
  set shaderSharedInt64Atomics(value: Bool32) {
    this.#view.setUint32(40, Number(value), LE);
  }

  /** 16-bit floats (halfs) in shaders */
  get shaderFloat16(): Bool32 {
    return this.#view.getUint32(44, LE);
  }
  
  set shaderFloat16(value: Bool32) {
    this.#view.setUint32(44, Number(value), LE);
  }

  /** 8-bit integers in shaders */
  get shaderInt8(): Bool32 {
    return this.#view.getUint32(48, LE);
  }
  
  set shaderInt8(value: Bool32) {
    this.#view.setUint32(48, Number(value), LE);
  }

  get descriptorIndexing(): Bool32 {
    return this.#view.getUint32(52, LE);
  }
  
  set descriptorIndexing(value: Bool32) {
    this.#view.setUint32(52, Number(value), LE);
  }

  get shaderInputAttachmentArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(56, LE);
  }
  
  set shaderInputAttachmentArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(56, Number(value), LE);
  }

  get shaderUniformTexelBufferArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(60, LE);
  }
  
  set shaderUniformTexelBufferArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(60, Number(value), LE);
  }

  get shaderStorageTexelBufferArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(64, LE);
  }
  
  set shaderStorageTexelBufferArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(64, Number(value), LE);
  }

  get shaderUniformBufferArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(68, LE);
  }
  
  set shaderUniformBufferArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(68, Number(value), LE);
  }

  get shaderSampledImageArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(72, LE);
  }
  
  set shaderSampledImageArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(72, Number(value), LE);
  }

  get shaderStorageBufferArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(76, LE);
  }
  
  set shaderStorageBufferArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(76, Number(value), LE);
  }

  get shaderStorageImageArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(80, LE);
  }
  
  set shaderStorageImageArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(80, Number(value), LE);
  }

  get shaderInputAttachmentArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(84, LE);
  }
  
  set shaderInputAttachmentArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(84, Number(value), LE);
  }

  get shaderUniformTexelBufferArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(88, LE);
  }
  
  set shaderUniformTexelBufferArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(88, Number(value), LE);
  }

  get shaderStorageTexelBufferArrayNonUniformIndexing(): Bool32 {
    return this.#view.getUint32(92, LE);
  }
  
  set shaderStorageTexelBufferArrayNonUniformIndexing(value: Bool32) {
    this.#view.setUint32(92, Number(value), LE);
  }

  get descriptorBindingUniformBufferUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(96, LE);
  }
  
  set descriptorBindingUniformBufferUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(96, Number(value), LE);
  }

  get descriptorBindingSampledImageUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(100, LE);
  }
  
  set descriptorBindingSampledImageUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(100, Number(value), LE);
  }

  get descriptorBindingStorageImageUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(104, LE);
  }
  
  set descriptorBindingStorageImageUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(104, Number(value), LE);
  }

  get descriptorBindingStorageBufferUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(108, LE);
  }
  
  set descriptorBindingStorageBufferUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(108, Number(value), LE);
  }

  get descriptorBindingUniformTexelBufferUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(112, LE);
  }
  
  set descriptorBindingUniformTexelBufferUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(112, Number(value), LE);
  }

  get descriptorBindingStorageTexelBufferUpdateAfterBind(): Bool32 {
    return this.#view.getUint32(116, LE);
  }
  
  set descriptorBindingStorageTexelBufferUpdateAfterBind(value: Bool32) {
    this.#view.setUint32(116, Number(value), LE);
  }

  get descriptorBindingUpdateUnusedWhilePending(): Bool32 {
    return this.#view.getUint32(120, LE);
  }
  
  set descriptorBindingUpdateUnusedWhilePending(value: Bool32) {
    this.#view.setUint32(120, Number(value), LE);
  }

  get descriptorBindingPartiallyBound(): Bool32 {
    return this.#view.getUint32(124, LE);
  }
  
  set descriptorBindingPartiallyBound(value: Bool32) {
    this.#view.setUint32(124, Number(value), LE);
  }

  get descriptorBindingVariableDescriptorCount(): Bool32 {
    return this.#view.getUint32(128, LE);
  }
  
  set descriptorBindingVariableDescriptorCount(value: Bool32) {
    this.#view.setUint32(128, Number(value), LE);
  }

  get runtimeDescriptorArray(): Bool32 {
    return this.#view.getUint32(132, LE);
  }
  
  set runtimeDescriptorArray(value: Bool32) {
    this.#view.setUint32(132, Number(value), LE);
  }

  get samplerFilterMinmax(): Bool32 {
    return this.#view.getUint32(136, LE);
  }
  
  set samplerFilterMinmax(value: Bool32) {
    this.#view.setUint32(136, Number(value), LE);
  }

  get scalarBlockLayout(): Bool32 {
    return this.#view.getUint32(140, LE);
  }
  
  set scalarBlockLayout(value: Bool32) {
    this.#view.setUint32(140, Number(value), LE);
  }

  get imagelessFramebuffer(): Bool32 {
    return this.#view.getUint32(144, LE);
  }
  
  set imagelessFramebuffer(value: Bool32) {
    this.#view.setUint32(144, Number(value), LE);
  }

  get uniformBufferStandardLayout(): Bool32 {
    return this.#view.getUint32(148, LE);
  }
  
  set uniformBufferStandardLayout(value: Bool32) {
    this.#view.setUint32(148, Number(value), LE);
  }

  get shaderSubgroupExtendedTypes(): Bool32 {
    return this.#view.getUint32(152, LE);
  }
  
  set shaderSubgroupExtendedTypes(value: Bool32) {
    this.#view.setUint32(152, Number(value), LE);
  }

  get separateDepthStencilLayouts(): Bool32 {
    return this.#view.getUint32(156, LE);
  }
  
  set separateDepthStencilLayouts(value: Bool32) {
    this.#view.setUint32(156, Number(value), LE);
  }

  get hostQueryReset(): Bool32 {
    return this.#view.getUint32(160, LE);
  }
  
  set hostQueryReset(value: Bool32) {
    this.#view.setUint32(160, Number(value), LE);
  }

  get timelineSemaphore(): Bool32 {
    return this.#view.getUint32(164, LE);
  }
  
  set timelineSemaphore(value: Bool32) {
    this.#view.setUint32(164, Number(value), LE);
  }

  get bufferDeviceAddress(): Bool32 {
    return this.#view.getUint32(168, LE);
  }
  
  set bufferDeviceAddress(value: Bool32) {
    this.#view.setUint32(168, Number(value), LE);
  }

  get bufferDeviceAddressCaptureReplay(): Bool32 {
    return this.#view.getUint32(172, LE);
  }
  
  set bufferDeviceAddressCaptureReplay(value: Bool32) {
    this.#view.setUint32(172, Number(value), LE);
  }

  get bufferDeviceAddressMultiDevice(): Bool32 {
    return this.#view.getUint32(176, LE);
  }
  
  set bufferDeviceAddressMultiDevice(value: Bool32) {
    this.#view.setUint32(176, Number(value), LE);
  }

  get vulkanMemoryModel(): Bool32 {
    return this.#view.getUint32(180, LE);
  }
  
  set vulkanMemoryModel(value: Bool32) {
    this.#view.setUint32(180, Number(value), LE);
  }

  get vulkanMemoryModelDeviceScope(): Bool32 {
    return this.#view.getUint32(184, LE);
  }
  
  set vulkanMemoryModelDeviceScope(value: Bool32) {
    this.#view.setUint32(184, Number(value), LE);
  }

  get vulkanMemoryModelAvailabilityVisibilityChains(): Bool32 {
    return this.#view.getUint32(188, LE);
  }
  
  set vulkanMemoryModelAvailabilityVisibilityChains(value: Bool32) {
    this.#view.setUint32(188, Number(value), LE);
  }

  get shaderOutputViewportIndex(): Bool32 {
    return this.#view.getUint32(192, LE);
  }
  
  set shaderOutputViewportIndex(value: Bool32) {
    this.#view.setUint32(192, Number(value), LE);
  }

  get shaderOutputLayer(): Bool32 {
    return this.#view.getUint32(196, LE);
  }
  
  set shaderOutputLayer(value: Bool32) {
    this.#view.setUint32(196, Number(value), LE);
  }

  get subgroupBroadcastDynamicId(): Bool32 {
    return this.#view.getUint32(200, LE);
  }
  
  set subgroupBroadcastDynamicId(value: Bool32) {
    this.#view.setUint32(200, Number(value), LE);
  }
}