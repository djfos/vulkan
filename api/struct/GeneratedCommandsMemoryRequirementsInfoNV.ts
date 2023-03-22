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
import { StructureType, PipelineBindPoint } from "../enum.ts";
import { Pipeline, IndirectCommandsLayoutNV } from "../def.ts";

export interface InitGeneratedCommandsMemoryRequirementsInfoNV {
  pNext?: AnyPointer;
  pipelineBindPoint?: PipelineBindPoint;
  pipeline?: AnyPointer;
  indirectCommandsLayout?: AnyPointer;
  maxSequencesCount?: number;
}

export class GeneratedCommandsMemoryRequirementsInfoNV implements BaseStruct {
  static size = 48;

  #data!: Uint8Array;
  #view!: DataView;

  get [BUFFER]() { return this.#data; }
  get [DATAVIEW]() { return this.#view; }

  constructor();
  constructor(ptr: Deno.PointerValue);
  constructor(init: InitGeneratedCommandsMemoryRequirementsInfoNV);
  constructor(data: Uint8Array);
  constructor(data?: Deno.PointerValue | Uint8Array | InitGeneratedCommandsMemoryRequirementsInfoNV) {
    if (data === undefined || data === null) {
      this.#data = new Uint8Array(GeneratedCommandsMemoryRequirementsInfoNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    } else if (data instanceof Uint8Array) {
      if (data.byteLength < GeneratedCommandsMemoryRequirementsInfoNV.size) {
        throw new Error("Data buffer too small");
      }
      this.#data = data;
      this.#view = new DataView(data.buffer, data.byteOffset);
    } else if(notPointerObject(data)) {
      this.#data = new Uint8Array(GeneratedCommandsMemoryRequirementsInfoNV.size);
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
      if (data.pNext !== undefined) this.pNext = data.pNext;
      if (data.pipelineBindPoint !== undefined) this.pipelineBindPoint = data.pipelineBindPoint;
      if (data.pipeline !== undefined) this.pipeline = data.pipeline;
      if (data.indirectCommandsLayout !== undefined) this.indirectCommandsLayout = data.indirectCommandsLayout;
      if (data.maxSequencesCount !== undefined) this.maxSequencesCount = data.maxSequencesCount;
    } else {
      this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, GeneratedCommandsMemoryRequirementsInfoNV.size));
      this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);
    }
    this.sType = StructureType.GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_NV;
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

  get pipelineBindPoint(): PipelineBindPoint {
    return this.#view.getInt32(16, LE);
  }
  
  set pipelineBindPoint(value: PipelineBindPoint) {
    this.#view.setInt32(16, Number(value), LE);
  }

  get pipeline(): Deno.PointerValue {
    return pointerFromView(this.#view, 24, LE);
  }
  
  set pipeline(value: AnyPointer) {
    this.#view.setBigUint64(24, BigInt(anyPointer(value)), LE);
  }

  get indirectCommandsLayout(): Deno.PointerValue {
    return pointerFromView(this.#view, 32, LE);
  }
  
  set indirectCommandsLayout(value: AnyPointer) {
    this.#view.setBigUint64(32, BigInt(anyPointer(value)), LE);
  }

  get maxSequencesCount(): number {
    return this.#view.getUint32(40, LE);
  }
  
  set maxSequencesCount(value: number) {
    this.#view.setUint32(40, Number(value), LE);
  }
}