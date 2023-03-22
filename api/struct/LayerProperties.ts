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

export interface InitLayerProperties {
  layerName?: Uint8Array;
  specVersion?: number;
  implementationVersion?: number;
  description?: Uint8Array;
}

export class LayerProperties implements BaseStruct {
  static size = 520;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitLayerProperties);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitLayerProperties) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(LayerProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < LayerProperties.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(LayerProperties.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.layerName !== undefined) this.layerName = data.layerName;
      if (data.specVersion !== undefined) this.specVersion = data.specVersion;
      if (data.implementationVersion !== undefined) this.implementationVersion = data.implementationVersion;
      if (data.description !== undefined) this.description = data.description;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, LayerProperties.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
  }

  /** layer name */
  get layerName(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 0, 256);
  }
  set layerName(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 0);
  }

  /** version of the layer specification implemented */
  get specVersion(): number {
    return this.#view.getUint32(256, LE);
  }
  
  set specVersion(value: number) {
    this.#view.setUint32(256, Number(value), LE);
  }

  /** build or release version of the layer's library */
  get implementationVersion(): number {
    return this.#view.getUint32(260, LE);
  }
  
  set implementationVersion(value: number) {
    this.#view.setUint32(260, Number(value), LE);
  }

  /** Free-form description of the layer */
  get description(): Uint8Array {
    return new Uint8Array(this.#data.buffer, 264, 256);
  }
  set description(value: Uint8Array) {
    if (value.length > 256) {
      throw Error("buffer is too big");
    }
    const byteAray = new Uint8Array(
      value.buffer,
      value.byteOffset,
      value.byteLength,
    );
    this.#data.set(byteAray, 264);
  }
}