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
import { Bool32 } from "../def.ts";

export interface InitPhysicalDeviceFeatures {
  robustBufferAccess?: Bool32;
  fullDrawIndexUint32?: Bool32;
  imageCubeArray?: Bool32;
  independentBlend?: Bool32;
  geometryShader?: Bool32;
  tessellationShader?: Bool32;
  sampleRateShading?: Bool32;
  dualSrcBlend?: Bool32;
  logicOp?: Bool32;
  multiDrawIndirect?: Bool32;
  drawIndirectFirstInstance?: Bool32;
  depthClamp?: Bool32;
  depthBiasClamp?: Bool32;
  fillModeNonSolid?: Bool32;
  depthBounds?: Bool32;
  wideLines?: Bool32;
  largePoints?: Bool32;
  alphaToOne?: Bool32;
  multiViewport?: Bool32;
  samplerAnisotropy?: Bool32;
  textureCompressionETC2?: Bool32;
  textureCompressionASTC_LDR?: Bool32;
  textureCompressionBC?: Bool32;
  occlusionQueryPrecise?: Bool32;
  pipelineStatisticsQuery?: Bool32;
  vertexPipelineStoresAndAtomics?: Bool32;
  fragmentStoresAndAtomics?: Bool32;
  shaderTessellationAndGeometryPointSize?: Bool32;
  shaderImageGatherExtended?: Bool32;
  shaderStorageImageExtendedFormats?: Bool32;
  shaderStorageImageMultisample?: Bool32;
  shaderStorageImageReadWithoutFormat?: Bool32;
  shaderStorageImageWriteWithoutFormat?: Bool32;
  shaderUniformBufferArrayDynamicIndexing?: Bool32;
  shaderSampledImageArrayDynamicIndexing?: Bool32;
  shaderStorageBufferArrayDynamicIndexing?: Bool32;
  shaderStorageImageArrayDynamicIndexing?: Bool32;
  shaderClipDistance?: Bool32;
  shaderCullDistance?: Bool32;
  shaderFloat64?: Bool32;
  shaderInt64?: Bool32;
  shaderInt16?: Bool32;
  shaderResourceResidency?: Bool32;
  shaderResourceMinLod?: Bool32;
  sparseBinding?: Bool32;
  sparseResidencyBuffer?: Bool32;
  sparseResidencyImage2D?: Bool32;
  sparseResidencyImage3D?: Bool32;
  sparseResidency2Samples?: Bool32;
  sparseResidency4Samples?: Bool32;
  sparseResidency8Samples?: Bool32;
  sparseResidency16Samples?: Bool32;
  sparseResidencyAliased?: Bool32;
  variableMultisampleRate?: Bool32;
  inheritedQueries?: Bool32;
}

export class PhysicalDeviceFeatures implements BaseStruct {
  static size = 220;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitPhysicalDeviceFeatures);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitPhysicalDeviceFeatures) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(PhysicalDeviceFeatures.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < PhysicalDeviceFeatures.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(PhysicalDeviceFeatures.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.robustBufferAccess !== undefined) this.robustBufferAccess = data.robustBufferAccess;
      if (data.fullDrawIndexUint32 !== undefined) this.fullDrawIndexUint32 = data.fullDrawIndexUint32;
      if (data.imageCubeArray !== undefined) this.imageCubeArray = data.imageCubeArray;
      if (data.independentBlend !== undefined) this.independentBlend = data.independentBlend;
      if (data.geometryShader !== undefined) this.geometryShader = data.geometryShader;
      if (data.tessellationShader !== undefined) this.tessellationShader = data.tessellationShader;
      if (data.sampleRateShading !== undefined) this.sampleRateShading = data.sampleRateShading;
      if (data.dualSrcBlend !== undefined) this.dualSrcBlend = data.dualSrcBlend;
      if (data.logicOp !== undefined) this.logicOp = data.logicOp;
      if (data.multiDrawIndirect !== undefined) this.multiDrawIndirect = data.multiDrawIndirect;
      if (data.drawIndirectFirstInstance !== undefined) this.drawIndirectFirstInstance = data.drawIndirectFirstInstance;
      if (data.depthClamp !== undefined) this.depthClamp = data.depthClamp;
      if (data.depthBiasClamp !== undefined) this.depthBiasClamp = data.depthBiasClamp;
      if (data.fillModeNonSolid !== undefined) this.fillModeNonSolid = data.fillModeNonSolid;
      if (data.depthBounds !== undefined) this.depthBounds = data.depthBounds;
      if (data.wideLines !== undefined) this.wideLines = data.wideLines;
      if (data.largePoints !== undefined) this.largePoints = data.largePoints;
      if (data.alphaToOne !== undefined) this.alphaToOne = data.alphaToOne;
      if (data.multiViewport !== undefined) this.multiViewport = data.multiViewport;
      if (data.samplerAnisotropy !== undefined) this.samplerAnisotropy = data.samplerAnisotropy;
      if (data.textureCompressionETC2 !== undefined) this.textureCompressionETC2 = data.textureCompressionETC2;
      if (data.textureCompressionASTC_LDR !== undefined) this.textureCompressionASTC_LDR = data.textureCompressionASTC_LDR;
      if (data.textureCompressionBC !== undefined) this.textureCompressionBC = data.textureCompressionBC;
      if (data.occlusionQueryPrecise !== undefined) this.occlusionQueryPrecise = data.occlusionQueryPrecise;
      if (data.pipelineStatisticsQuery !== undefined) this.pipelineStatisticsQuery = data.pipelineStatisticsQuery;
      if (data.vertexPipelineStoresAndAtomics !== undefined) this.vertexPipelineStoresAndAtomics = data.vertexPipelineStoresAndAtomics;
      if (data.fragmentStoresAndAtomics !== undefined) this.fragmentStoresAndAtomics = data.fragmentStoresAndAtomics;
      if (data.shaderTessellationAndGeometryPointSize !== undefined) this.shaderTessellationAndGeometryPointSize = data.shaderTessellationAndGeometryPointSize;
      if (data.shaderImageGatherExtended !== undefined) this.shaderImageGatherExtended = data.shaderImageGatherExtended;
      if (data.shaderStorageImageExtendedFormats !== undefined) this.shaderStorageImageExtendedFormats = data.shaderStorageImageExtendedFormats;
      if (data.shaderStorageImageMultisample !== undefined) this.shaderStorageImageMultisample = data.shaderStorageImageMultisample;
      if (data.shaderStorageImageReadWithoutFormat !== undefined) this.shaderStorageImageReadWithoutFormat = data.shaderStorageImageReadWithoutFormat;
      if (data.shaderStorageImageWriteWithoutFormat !== undefined) this.shaderStorageImageWriteWithoutFormat = data.shaderStorageImageWriteWithoutFormat;
      if (data.shaderUniformBufferArrayDynamicIndexing !== undefined) this.shaderUniformBufferArrayDynamicIndexing = data.shaderUniformBufferArrayDynamicIndexing;
      if (data.shaderSampledImageArrayDynamicIndexing !== undefined) this.shaderSampledImageArrayDynamicIndexing = data.shaderSampledImageArrayDynamicIndexing;
      if (data.shaderStorageBufferArrayDynamicIndexing !== undefined) this.shaderStorageBufferArrayDynamicIndexing = data.shaderStorageBufferArrayDynamicIndexing;
      if (data.shaderStorageImageArrayDynamicIndexing !== undefined) this.shaderStorageImageArrayDynamicIndexing = data.shaderStorageImageArrayDynamicIndexing;
      if (data.shaderClipDistance !== undefined) this.shaderClipDistance = data.shaderClipDistance;
      if (data.shaderCullDistance !== undefined) this.shaderCullDistance = data.shaderCullDistance;
      if (data.shaderFloat64 !== undefined) this.shaderFloat64 = data.shaderFloat64;
      if (data.shaderInt64 !== undefined) this.shaderInt64 = data.shaderInt64;
      if (data.shaderInt16 !== undefined) this.shaderInt16 = data.shaderInt16;
      if (data.shaderResourceResidency !== undefined) this.shaderResourceResidency = data.shaderResourceResidency;
      if (data.shaderResourceMinLod !== undefined) this.shaderResourceMinLod = data.shaderResourceMinLod;
      if (data.sparseBinding !== undefined) this.sparseBinding = data.sparseBinding;
      if (data.sparseResidencyBuffer !== undefined) this.sparseResidencyBuffer = data.sparseResidencyBuffer;
      if (data.sparseResidencyImage2D !== undefined) this.sparseResidencyImage2D = data.sparseResidencyImage2D;
      if (data.sparseResidencyImage3D !== undefined) this.sparseResidencyImage3D = data.sparseResidencyImage3D;
      if (data.sparseResidency2Samples !== undefined) this.sparseResidency2Samples = data.sparseResidency2Samples;
      if (data.sparseResidency4Samples !== undefined) this.sparseResidency4Samples = data.sparseResidency4Samples;
      if (data.sparseResidency8Samples !== undefined) this.sparseResidency8Samples = data.sparseResidency8Samples;
      if (data.sparseResidency16Samples !== undefined) this.sparseResidency16Samples = data.sparseResidency16Samples;
      if (data.sparseResidencyAliased !== undefined) this.sparseResidencyAliased = data.sparseResidencyAliased;
      if (data.variableMultisampleRate !== undefined) this.variableMultisampleRate = data.variableMultisampleRate;
      if (data.inheritedQueries !== undefined) this.inheritedQueries = data.inheritedQueries;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, PhysicalDeviceFeatures.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** out of bounds buffer accesses are well defined */
  get robustBufferAccess(): Bool32 {
    return this.#view.getUint32(0, LE);
  }
  
  set robustBufferAccess(value: Bool32) {
    this.#view.setUint32(0, Number(value), LE);
  }

  /** full 32-bit range of indices for indexed draw calls */
  get fullDrawIndexUint32(): Bool32 {
    return this.#view.getUint32(4, LE);
  }
  
  set fullDrawIndexUint32(value: Bool32) {
    this.#view.setUint32(4, Number(value), LE);
  }

  /** image views which are arrays of cube maps */
  get imageCubeArray(): Bool32 {
    return this.#view.getUint32(8, LE);
  }
  
  set imageCubeArray(value: Bool32) {
    this.#view.setUint32(8, Number(value), LE);
  }

  /** blending operations are controlled per-attachment */
  get independentBlend(): Bool32 {
    return this.#view.getUint32(12, LE);
  }
  
  set independentBlend(value: Bool32) {
    this.#view.setUint32(12, Number(value), LE);
  }

  /** geometry stage */
  get geometryShader(): Bool32 {
    return this.#view.getUint32(16, LE);
  }
  
  set geometryShader(value: Bool32) {
    this.#view.setUint32(16, Number(value), LE);
  }

  /** tessellation control and evaluation stage */
  get tessellationShader(): Bool32 {
    return this.#view.getUint32(20, LE);
  }
  
  set tessellationShader(value: Bool32) {
    this.#view.setUint32(20, Number(value), LE);
  }

  /** per-sample shading and interpolation */
  get sampleRateShading(): Bool32 {
    return this.#view.getUint32(24, LE);
  }
  
  set sampleRateShading(value: Bool32) {
    this.#view.setUint32(24, Number(value), LE);
  }

  /** blend operations which take two sources */
  get dualSrcBlend(): Bool32 {
    return this.#view.getUint32(28, LE);
  }
  
  set dualSrcBlend(value: Bool32) {
    this.#view.setUint32(28, Number(value), LE);
  }

  /** logic operations */
  get logicOp(): Bool32 {
    return this.#view.getUint32(32, LE);
  }
  
  set logicOp(value: Bool32) {
    this.#view.setUint32(32, Number(value), LE);
  }

  /** multi draw indirect */
  get multiDrawIndirect(): Bool32 {
    return this.#view.getUint32(36, LE);
  }
  
  set multiDrawIndirect(value: Bool32) {
    this.#view.setUint32(36, Number(value), LE);
  }

  /** indirect drawing can use non-zero firstInstance */
  get drawIndirectFirstInstance(): Bool32 {
    return this.#view.getUint32(40, LE);
  }
  
  set drawIndirectFirstInstance(value: Bool32) {
    this.#view.setUint32(40, Number(value), LE);
  }

  /** depth clamping */
  get depthClamp(): Bool32 {
    return this.#view.getUint32(44, LE);
  }
  
  set depthClamp(value: Bool32) {
    this.#view.setUint32(44, Number(value), LE);
  }

  /** depth bias clamping */
  get depthBiasClamp(): Bool32 {
    return this.#view.getUint32(48, LE);
  }
  
  set depthBiasClamp(value: Bool32) {
    this.#view.setUint32(48, Number(value), LE);
  }

  /** point and wireframe fill modes */
  get fillModeNonSolid(): Bool32 {
    return this.#view.getUint32(52, LE);
  }
  
  set fillModeNonSolid(value: Bool32) {
    this.#view.setUint32(52, Number(value), LE);
  }

  /** depth bounds test */
  get depthBounds(): Bool32 {
    return this.#view.getUint32(56, LE);
  }
  
  set depthBounds(value: Bool32) {
    this.#view.setUint32(56, Number(value), LE);
  }

  /** lines with width greater than 1 */
  get wideLines(): Bool32 {
    return this.#view.getUint32(60, LE);
  }
  
  set wideLines(value: Bool32) {
    this.#view.setUint32(60, Number(value), LE);
  }

  /** points with size greater than 1 */
  get largePoints(): Bool32 {
    return this.#view.getUint32(64, LE);
  }
  
  set largePoints(value: Bool32) {
    this.#view.setUint32(64, Number(value), LE);
  }

  /** the fragment alpha component can be forced to maximum representable alpha value */
  get alphaToOne(): Bool32 {
    return this.#view.getUint32(68, LE);
  }
  
  set alphaToOne(value: Bool32) {
    this.#view.setUint32(68, Number(value), LE);
  }

  /** viewport arrays */
  get multiViewport(): Bool32 {
    return this.#view.getUint32(72, LE);
  }
  
  set multiViewport(value: Bool32) {
    this.#view.setUint32(72, Number(value), LE);
  }

  /** anisotropic sampler filtering */
  get samplerAnisotropy(): Bool32 {
    return this.#view.getUint32(76, LE);
  }
  
  set samplerAnisotropy(value: Bool32) {
    this.#view.setUint32(76, Number(value), LE);
  }

  /** ETC texture compression formats */
  get textureCompressionETC2(): Bool32 {
    return this.#view.getUint32(80, LE);
  }
  
  set textureCompressionETC2(value: Bool32) {
    this.#view.setUint32(80, Number(value), LE);
  }

  /** ASTC LDR texture compression formats */
  get textureCompressionASTC_LDR(): Bool32 {
    return this.#view.getUint32(84, LE);
  }
  
  set textureCompressionASTC_LDR(value: Bool32) {
    this.#view.setUint32(84, Number(value), LE);
  }

  /** BC1-7 texture compressed formats */
  get textureCompressionBC(): Bool32 {
    return this.#view.getUint32(88, LE);
  }
  
  set textureCompressionBC(value: Bool32) {
    this.#view.setUint32(88, Number(value), LE);
  }

  /** precise occlusion queries returning actual sample counts */
  get occlusionQueryPrecise(): Bool32 {
    return this.#view.getUint32(92, LE);
  }
  
  set occlusionQueryPrecise(value: Bool32) {
    this.#view.setUint32(92, Number(value), LE);
  }

  /** pipeline statistics query */
  get pipelineStatisticsQuery(): Bool32 {
    return this.#view.getUint32(96, LE);
  }
  
  set pipelineStatisticsQuery(value: Bool32) {
    this.#view.setUint32(96, Number(value), LE);
  }

  /** stores and atomic ops on storage buffers and images are supported in vertex, tessellation, and geometry stages */
  get vertexPipelineStoresAndAtomics(): Bool32 {
    return this.#view.getUint32(100, LE);
  }
  
  set vertexPipelineStoresAndAtomics(value: Bool32) {
    this.#view.setUint32(100, Number(value), LE);
  }

  /** stores and atomic ops on storage buffers and images are supported in the fragment stage */
  get fragmentStoresAndAtomics(): Bool32 {
    return this.#view.getUint32(104, LE);
  }
  
  set fragmentStoresAndAtomics(value: Bool32) {
    this.#view.setUint32(104, Number(value), LE);
  }

  /** tessellation and geometry stages can export point size */
  get shaderTessellationAndGeometryPointSize(): Bool32 {
    return this.#view.getUint32(108, LE);
  }
  
  set shaderTessellationAndGeometryPointSize(value: Bool32) {
    this.#view.setUint32(108, Number(value), LE);
  }

  /** image gather with run-time values and independent offsets */
  get shaderImageGatherExtended(): Bool32 {
    return this.#view.getUint32(112, LE);
  }
  
  set shaderImageGatherExtended(value: Bool32) {
    this.#view.setUint32(112, Number(value), LE);
  }

  /** the extended set of formats can be used for storage images */
  get shaderStorageImageExtendedFormats(): Bool32 {
    return this.#view.getUint32(116, LE);
  }
  
  set shaderStorageImageExtendedFormats(value: Bool32) {
    this.#view.setUint32(116, Number(value), LE);
  }

  /** multisample images can be used for storage images */
  get shaderStorageImageMultisample(): Bool32 {
    return this.#view.getUint32(120, LE);
  }
  
  set shaderStorageImageMultisample(value: Bool32) {
    this.#view.setUint32(120, Number(value), LE);
  }

  /** read from storage image does not require format qualifier */
  get shaderStorageImageReadWithoutFormat(): Bool32 {
    return this.#view.getUint32(124, LE);
  }
  
  set shaderStorageImageReadWithoutFormat(value: Bool32) {
    this.#view.setUint32(124, Number(value), LE);
  }

  /** write to storage image does not require format qualifier */
  get shaderStorageImageWriteWithoutFormat(): Bool32 {
    return this.#view.getUint32(128, LE);
  }
  
  set shaderStorageImageWriteWithoutFormat(value: Bool32) {
    this.#view.setUint32(128, Number(value), LE);
  }

  /** arrays of uniform buffers can be accessed with dynamically uniform indices */
  get shaderUniformBufferArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(132, LE);
  }
  
  set shaderUniformBufferArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(132, Number(value), LE);
  }

  /** arrays of sampled images can be accessed with dynamically uniform indices */
  get shaderSampledImageArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(136, LE);
  }
  
  set shaderSampledImageArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(136, Number(value), LE);
  }

  /** arrays of storage buffers can be accessed with dynamically uniform indices */
  get shaderStorageBufferArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(140, LE);
  }
  
  set shaderStorageBufferArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(140, Number(value), LE);
  }

  /** arrays of storage images can be accessed with dynamically uniform indices */
  get shaderStorageImageArrayDynamicIndexing(): Bool32 {
    return this.#view.getUint32(144, LE);
  }
  
  set shaderStorageImageArrayDynamicIndexing(value: Bool32) {
    this.#view.setUint32(144, Number(value), LE);
  }

  /** clip distance in shaders */
  get shaderClipDistance(): Bool32 {
    return this.#view.getUint32(148, LE);
  }
  
  set shaderClipDistance(value: Bool32) {
    this.#view.setUint32(148, Number(value), LE);
  }

  /** cull distance in shaders */
  get shaderCullDistance(): Bool32 {
    return this.#view.getUint32(152, LE);
  }
  
  set shaderCullDistance(value: Bool32) {
    this.#view.setUint32(152, Number(value), LE);
  }

  /** 64-bit floats (doubles) in shaders */
  get shaderFloat64(): Bool32 {
    return this.#view.getUint32(156, LE);
  }
  
  set shaderFloat64(value: Bool32) {
    this.#view.setUint32(156, Number(value), LE);
  }

  /** 64-bit integers in shaders */
  get shaderInt64(): Bool32 {
    return this.#view.getUint32(160, LE);
  }
  
  set shaderInt64(value: Bool32) {
    this.#view.setUint32(160, Number(value), LE);
  }

  /** 16-bit integers in shaders */
  get shaderInt16(): Bool32 {
    return this.#view.getUint32(164, LE);
  }
  
  set shaderInt16(value: Bool32) {
    this.#view.setUint32(164, Number(value), LE);
  }

  /** shader can use texture operations that return resource residency information (requires sparseNonResident support) */
  get shaderResourceResidency(): Bool32 {
    return this.#view.getUint32(168, LE);
  }
  
  set shaderResourceResidency(value: Bool32) {
    this.#view.setUint32(168, Number(value), LE);
  }

  /** shader can use texture operations that specify minimum resource LOD */
  get shaderResourceMinLod(): Bool32 {
    return this.#view.getUint32(172, LE);
  }
  
  set shaderResourceMinLod(value: Bool32) {
    this.#view.setUint32(172, Number(value), LE);
  }

  /** Sparse resources support: Resource memory can be managed at opaque page level rather than object level */
  get sparseBinding(): Bool32 {
    return this.#view.getUint32(176, LE);
  }
  
  set sparseBinding(value: Bool32) {
    this.#view.setUint32(176, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident buffers */
  get sparseResidencyBuffer(): Bool32 {
    return this.#view.getUint32(180, LE);
  }
  
  set sparseResidencyBuffer(value: Bool32) {
    this.#view.setUint32(180, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident 2D (non-MSAA non-depth/stencil) images */
  get sparseResidencyImage2D(): Bool32 {
    return this.#view.getUint32(184, LE);
  }
  
  set sparseResidencyImage2D(value: Bool32) {
    this.#view.setUint32(184, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident 3D images */
  get sparseResidencyImage3D(): Bool32 {
    return this.#view.getUint32(188, LE);
  }
  
  set sparseResidencyImage3D(value: Bool32) {
    this.#view.setUint32(188, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident MSAA 2D images with 2 samples */
  get sparseResidency2Samples(): Bool32 {
    return this.#view.getUint32(192, LE);
  }
  
  set sparseResidency2Samples(value: Bool32) {
    this.#view.setUint32(192, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident MSAA 2D images with 4 samples */
  get sparseResidency4Samples(): Bool32 {
    return this.#view.getUint32(196, LE);
  }
  
  set sparseResidency4Samples(value: Bool32) {
    this.#view.setUint32(196, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident MSAA 2D images with 8 samples */
  get sparseResidency8Samples(): Bool32 {
    return this.#view.getUint32(200, LE);
  }
  
  set sparseResidency8Samples(value: Bool32) {
    this.#view.setUint32(200, Number(value), LE);
  }

  /** Sparse resources support: GPU can access partially resident MSAA 2D images with 16 samples */
  get sparseResidency16Samples(): Bool32 {
    return this.#view.getUint32(204, LE);
  }
  
  set sparseResidency16Samples(value: Bool32) {
    this.#view.setUint32(204, Number(value), LE);
  }

  /** Sparse resources support: GPU can correctly access data aliased into multiple locations (opt-in) */
  get sparseResidencyAliased(): Bool32 {
    return this.#view.getUint32(208, LE);
  }
  
  set sparseResidencyAliased(value: Bool32) {
    this.#view.setUint32(208, Number(value), LE);
  }

  /** multisample rate must be the same for all pipelines in a subpass */
  get variableMultisampleRate(): Bool32 {
    return this.#view.getUint32(212, LE);
  }
  
  set variableMultisampleRate(value: Bool32) {
    this.#view.setUint32(212, Number(value), LE);
  }

  /** Queries may be inherited from primary to secondary command buffers */
  get inheritedQueries(): Bool32 {
    return this.#view.getUint32(216, LE);
  }
  
  set inheritedQueries(value: Bool32) {
    this.#view.setUint32(216, Number(value), LE);
  }
}