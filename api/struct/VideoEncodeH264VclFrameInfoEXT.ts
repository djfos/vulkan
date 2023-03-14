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
import {VideoEncodeH264ReferenceListsInfoEXT} from "./VideoEncodeH264ReferenceListsInfoEXT.ts";
import {VideoEncodeH264NaluSliceInfoEXT} from "./VideoEncodeH264NaluSliceInfoEXT.ts";
import {StdVideoEncodeH264PictureInfo} from "./StdVideoEncodeH264PictureInfo.ts";
import { StructureType } from "../enum.ts";

export interface InitVideoEncodeH264VclFrameInfoEXT {
  pNext?: AnyPointer;
  pReferenceFinalLists?: AnyPointer;
  naluSliceEntryCount?: number;
  pNaluSliceEntries?: AnyPointer;
  pCurrentPictureInfo?: AnyPointer;
}

export class VideoEncodeH264VclFrameInfoEXT implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitVideoEncodeH264VclFrameInfoEXT);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitVideoEncodeH264VclFrameInfoEXT) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(VideoEncodeH264VclFrameInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < VideoEncodeH264VclFrameInfoEXT.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(VideoEncodeH264VclFrameInfoEXT.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.pReferenceFinalLists !== undefined) this.pReferenceFinalLists = data.pReferenceFinalLists;
      if (data.naluSliceEntryCount !== undefined) this.naluSliceEntryCount = data.naluSliceEntryCount;
      if (data.pNaluSliceEntries !== undefined) this.pNaluSliceEntries = data.pNaluSliceEntries;
      if (data.pCurrentPictureInfo !== undefined) this.pCurrentPictureInfo = data.pCurrentPictureInfo;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, VideoEncodeH264VclFrameInfoEXT.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.VIDEO_ENCODE_H264_VCL_FRAME_INFO_EXT;
  }

  get sType() {
    return this.#view.getUint32(0, LE);
  }

  set sType(value: StructureType) {
    this.#view.setUint32(0, Number(value), LE);
  }

  get pNext() {
    return pointerFromView(this.#view, 8, LE);
  }

  set pNext(value: AnyPointer) {
    this.#view.setBigUint64(8, BigInt(anyPointer(value)), LE);
  }

  get pReferenceFinalLists() {
    return pointerFromView(this.#view, 16, LE);
  }

  set pReferenceFinalLists(value: AnyPointer) {
    this.#view.setBigUint64(16, BigInt(anyPointer(value)), LE);
  }

  get naluSliceEntryCount() {
    return this.#view.getUint32(24, LE);
  }

  set naluSliceEntryCount(value: number) {
    this.#view.setUint32(24, Number(value), LE);
  }

  get pNaluSliceEntries() {
    return pointerFromView(this.#view, 32, LE);
  }

  set pNaluSliceEntries(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get pCurrentPictureInfo() {
    return pointerFromView(this.#view, 40, LE);
  }

  set pCurrentPictureInfo(value: AnyPointer) {
    this.#view.setBigUint64(40, BigInt(anyPointer(value)), LE);
  }
}