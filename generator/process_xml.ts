// deno-lint-ignore-file no-explicit-any
import {
  assert,
  unreachable,
} from "https://deno.land/std@0.179.0/_util/asserts.ts";

const api = JSON.parse(
  Deno.readTextFileSync(new URL("../data/vk.json", import.meta.url)),
);

type Content = string | Block | (() => void);
type Block = Content[];

export class FileBuilder {
  lines = [] as string[];
  ident = 0;

  output() {
    return this.lines.join("\n");
  }

  getIdent() {
    return this.ident;
  }

  newline() {
    this.lines.push("");
  }

  emit(content: Content, noIdent = false) {
    if (Array.isArray(content)) {
      this.ident += noIdent ? 0 : 1;
      content.forEach((c) => this.emit(c));
      this.ident -= noIdent ? 0 : 1;
    } else if (typeof content == "string") {
      this.lines.push("  ".repeat(this.ident) + content);
    } else {
      content();
    }
  }

  block(fn: CallableFunction) {
    this.ident += 1;
    fn();
    this.ident -= 1;
  }
}

export function jsify(name: string) {
  if (name === "function") {
    return "vk_function";
  } else {
    return name;
  }
}

export function valueToJS(value: string) {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value.replaceAll(/F$/g, "").replaceAll(/U\)$/g, ")").replaceAll(
      /ULL\)$/g,
      "n)",
    );
  } else if (typeof value === "undefined") {
    return undefined;
  } else {
    throw new Error("Unknown value type " + Deno.inspect(value));
  }
}

const C_TYPES = {
  "uint8_t": "number",
  "uint16_t": "number",
  "uint32_t": "number",
  "uint64_t": "number | bigint",
  "int8_t": "number",
  "int16_t": "number",
  "int32_t": "number",
  "int64_t": "number | bigint",
  "float": "number",
  "double": "number",
  "char": "number",
  "size_t": "number | bigint",
  "ssize_t": "number | bigint",
  "HINSTANCE": "Deno.PointerValue",
  "HWND": "Deno.PointerValue",
  "Window": "Deno.PointerValue",
  "xcb_window_t": "Deno.PointerValue",
  "zx_handle_t": "Deno.PointerValue",
  "GgpStreamDescriptor": "Deno.PointerValue",
  "HANDLE": "Deno.PointerValue",
  "DWORD": "number",
  "LPCWSTR": "Deno.PointerValue",
  "int": "number",
  "GgpFrameToken": "number | bigint",
  "HMONITOR": "Deno.PointerValue",
  "VisualID": "number",
  "xcb_visualid_t": "number",
  "RROutput": "number",
};

export function typeToJS(ty: string): string {
  if (ty in C_TYPES) {
    return (C_TYPES as any)[ty];
  } else {
    if (ty.startsWith("PFN_")) {
      return "Deno.PointerValue";
    }
    return ty;
  }
}

const C_TYPES_FFI = {
  "uint8_t": "u8",
  "uint16_t": "u16",
  "uint32_t": "u32",
  "uint64_t": "u64",
  "int8_t": "i8",
  "int16_t": "i16",
  "int32_t": "i32",
  "int64_t": "i64",
  "float": "f32",
  "double": "f64",
  "char": "u8",
  "size_t": "usize",
  "ssize_t": "isize",
  "void": "void",
  "HINSTANCE": "pointer",
  "HWND": "pointer",
  "Window": "pointer",
  "xcb_window_t": "pointer",
  "zx_handle_t": "pointer",
  "GgpStreamDescriptor": "pointer",
  "HANDLE": "pointer",
  "DWORD": "u32",
  "LPCWSTR": "pointer",
  "int": "i32",
  "GgpFrameToken": "u64",
  "HMONITOR": "pointer",
  "VisualID": "u32",
  "xcb_visualid_t": "u32",
  "RROutput": "u32",
};

export const tymap = {
  u8: "Uint8Array",
  i8: "Int8Array",
  u16: "Uint16Array",
  i16: "Int16Array",
  u32: "Uint32Array",
  i32: "Int32Array",
  u64: "BigUint64Array",
  i64: "BigInt64Array",
  f32: "Float32Array",
  f64: "Float64Array",
  pointer: "BigUint64Array",
} as const;

type TupleElementUnion<T extends readonly any[]> = T[number];

const ffiNumberTypes = [
  "u8",
  "i8",
  "u16",
  "i16",
  "u32",
  "i32",
  "f32",
  "f64",
  "u64",
  "i64",
  "usize",
  "isize",
] as const;

const ffiPlainTypes = [...ffiNumberTypes, "pointer", "function"] as const;
type FFIPlainType = TupleElementUnion<typeof ffiPlainTypes>;

export function isNarrayType(type: unknown): type is keyof typeof tymap {
  return ffiNumberTypes.includes(type as any) && type != "usize" &&
    type != "usize";
}

interface FFIStruct {
  struct: FFIType[];
}

interface FFIUnion {
  union: FFIType[];
}

interface FFIArray {
  array: Exclude<FFIType, FFIArray>;
  len: number;
}

export type FFIType =
  | FFIPlainType
  | FFIStruct
  | FFIUnion
  | FFIArray;

interface TypeInfo {
  name: string;
  size: number;
  alignment: number;
  ffi: Exclude<FFIType, FFIArray>;
  // for struct and union
  member?: Field[];
  sType?: string;
}

export interface Typedef {
  name: string;
  type: string;
  alias?: boolean;
  ffi: Exclude<FFIType, FFIArray>;
}

export interface Constant {
  name: string;
  value: any;
  comment?: string;
}

export interface Constants {
  name: string;
  comment?: string;
  constants: Constant[];
}

export interface Enums {
  name: string;
  bitwidth: number;
  comment?: string;
  enums: Constant[];
}

export type FieldType = TypeInfo | {
  array: TypeInfo;
  len: number;
  narray?: (typeof tymap)[keyof typeof tymap];
};

export interface Field {
  name: string;
  offset: number;
  type: FieldType;
  comment?: string;
}

export interface Struct {
  name: string;
  fields: Field[];
  comment?: string;
  size: number;
  // some structs don't have sType
  sType: string | undefined;
}

export interface UnionType {
  name: string;
  type: string;
  ffi: FFIType;
  text?: string;
  comment?: string;
}

export interface Union {
  name: string;
  types: Field[];
  comment?: string;
  size: number;
}

export interface CommandParams {
  name: string;
  type: string;
  text?: string;
  comment?: string;
  len?: string;
  optional: boolean;
  ffi: FFIType | "buffer";
}

export interface Command {
  name: string;
  type: string;
  params: CommandParams[];
  successCodes: string[];
  errorCodes: string[];
  comment?: string;
  ffi: {
    parameters: (FFIType | "buffer")[];
    result: FFIType | "void";
  };
}

export interface Vender {
  name: string;
}

export const typedefs: Typedef[] = [];
export const constants: Constants[] = [];
export const enums: Enums[] = [];
export const structs: Struct[] = [];
export const unions: Union[] = [];
export const commands: Command[] = [];
export const vendors: Vender[] = [];

for (const data of api.registry.enums) {
  if (data.$type === "bitmask" || data.$type === "enum") {
    if (!data.enum) data.enum = [];
    if (!Array.isArray(data.enum)) data.enum = [data.enum];
    enums.push({
      name: data.$name,
      bitwidth: data.$bitwidth ?? 32,
      comment: data.$comment,
      enums: data.enum.map((e: any) => ({
        name: e.$name,
        value: e.$value !== undefined
          ? valueToJS(e.$value)
          : e.$bitpos !== undefined
          ? `1 << ${e.$bitpos}`
          : e.$alias !== undefined
          ? e.$alias
          : undefined,
        comment: e.$comment,
      })),
    });
  } else if ("enum" in data) {
    if (!data.enum) data.enum = [];
    if (!Array.isArray(data.enum)) data.enum = [data.enum];
    constants.push({
      name: data.$name,
      comment: data.$comment,
      constants: data.enum.map((member: any) => ({
        name: member.$name,
        value: valueToJS(member.$value),
        comment: member.$comment,
      })),
    });
  } else {
    console.log("unknown", data);
  }
}

export function extendEnum(ext: {
  $extends: string;
  $alias?: string;
  $bitpos?: number;
  $value?: number;
  $extnumber?: number;
  $offset?: number;
  $name: string;
  $comment?: string;
}) {
  const base = enums.find((e) => e.name === ext.$extends);
  if (!base) {
    throw new Error(`Enum ${ext.$extends} not found`);
  }
  if (base.enums.some((e) => e.name === ext.$name)) return;
  base.enums.push({
    name: ext.$name,
    value: ext.$alias ??
      (ext.$bitpos !== undefined ? `1 << ${ext.$bitpos}` : ext.$value ??
        `1${String(ext.$extnumber! - 1).padStart(6, "0")}${
          ext.$offset!.toString().padStart(3, "0")
        }`),
    comment: ext.$comment,
  });
}

export function extendConstants(name: string, ext: any) {
  let base = constants.find((e) => e.name === name);
  if (!base) {
    base = {
      name,
      constants: [],
    };
    constants.push(base);
  }
  base.constants.push({
    name: ext.$name,
    value: valueToJS(ext.$value),
  });
}

for (const vendor of api.registry.tags.tag) {
  const name = vendor.$name;
  vendors.push({ name });
}

for (const ft of api.registry.feature) {
  for (const x of ft.require) {
    if ("enum" in x) {
      if (!Array.isArray(x.enum)) x.enum = [x.enum];
      for (const e of x.enum) {
        if (e.$extends) {
          extendEnum(e);
        }
      }
    }
  }
}

for (const ext of api.registry.extensions.extension) {
  if (!Array.isArray(ext.require)) ext.require = [ext.require];
  for (const x of ext.require) {
    if ("enum" in x) {
      if (!Array.isArray(x.enum)) x.enum = [x.enum];
      for (const e of x.enum) {
        if (e.$extends) {
          extendEnum(Object.assign({
            $extnumber: ext.$number,
          }, e));
        } else if (e.$name && e.$value) {
          extendConstants(ext.$name, e);
        }
      }
    }
  }
}

function getFFIPlainTypeSize(type: FFIPlainType): number {
  switch (type) {
    case "u8":
    case "i8":
      return 1;
    case "u16":
    case "i16":
      return 2;
    case "u32":
    case "i32":
    case "f32":
      return 4;
    case "u64":
    case "i64":
    case "f64":
    case "pointer":
    case "function":
    case "usize":
    case "isize":
      return 8;
    default:
      throw new TypeError(`Unsupported ffi type: ${type}`);
  }
}

function isFFIPlainType(value: unknown): value is FFIPlainType {
  return typeof value == "string" && ffiPlainTypes.includes(value as any);
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

export const typeInfoMap = new Map<string, TypeInfo | null>();

export function getFoundTypeInfo(type: string) {
  const info = typeInfoMap.get(type);
  assert(info !== undefined && info !== null);
  return info;
}

function addTypeInfo(info: TypeInfo) {
  assert(!typeInfoMap.has(info.name));
  typeInfoMap.set(info.name, info);
}

function align(size: number, alignment: number): number {
  return Math.ceil(size / alignment) * alignment;
}

function maybeText(object: any) {
  const value = object["#text"];
  if (typeof value == "string") {
    return value;
  } else {
    return undefined;
  }
}

function getText(object: any) {
  const value = maybeText(object);
  assert(value !== undefined, `${object} has no text`);
  return value;
}

function toAarray(value: any) {
  return Array.isArray(value) ? value : [value];
}

function getConstantValue(name: string): any {
  for (const _constants of constants) {
    for (const _constant of _constants.constants) {
      if (_constant.name == name) {
        return _constant.value;
      }
    }
  }
  throw Error("constant not found.");
}

function getTypeInfoOrArrayInfo(member: any) {
  const text = maybeText(member);

  if (text?.endsWith("*")) {
    const pointerSize = getFFIPlainTypeSize("pointer");
    return {
      name: "pointer",
      alignment: pointerSize,
      size: pointerSize,
      ffi: "pointer",
    } satisfies TypeInfo;
  }

  const type = getText(member.type);
  const typeInfo = getTypeInfoRecursive(type);
  // array
  if (text?.startsWith("[")) {
    let len: undefined | number = undefined;
    if (member.enum) {
      // <member><type>uint8_t</type> <name>ScalingList4x4</name>[<enum>STD_VIDEO_H264_SCALING_LIST_4X4_NUM_LISTS</enum>][<enum>STD_VIDEO_H264_SCALING_LIST_4X4_NUM_ELEMENTS</enum>]</member>
      const enums = toAarray(member.enum);
      const values = enums.map(getText).map(getConstantValue);
      const numberValues = values.map((value) => {
        const _v = typeof value == "number" ? value : Number(value);
        assert((!isNaN(_v)) && _v !== 0);
        return _v;
      });
      len = numberValues.reduce((acc, cur) => acc * cur, 1);
    } else {
      const match = text.match(/^\[(\d+)\]*/);
      if (match) {
        len = parseInt(match[1]);
      }
    }
    if (len === undefined || isNaN(len)) {
      throw new Error(`Invalid length: ${Deno.inspect(member)}`);
    }

    const narray = Reflect.get(tymap, String(typeInfo.ffi));
    return { array: typeInfo, len, narray };
  }
  return typeInfo;
}

function getTypeInfoRecursive(typeName: string): TypeInfo {
  {
    assert(typeof typeName == "string");
    const info = typeInfoMap.get(typeName);
    if (info !== undefined) {
      if (info === null) throw new TypeError("Recursive array definition");
      return info;
    }
  }
  // now, typeInfoMap doesn't has typeName.
  // try to parse.

  // mark
  typeInfoMap.set(typeName, null);

  const types = api.registry.types.type as any[];
  const ty = types.find((ty) => ty.$name == typeName);
  assert(["struct", "union"].includes(ty.$category) && ty.member);
  const member: any[] = Array.isArray(ty.member) ? ty.member : [ty.member];
  const fields = member.map((member): Field => {
    const info = getTypeInfoOrArrayInfo(member);
    const name = getText(member.name);
    return {
      name,
      type: info,
      offset: 0,
      comment: member.comment && maybeText(member.comment),
    };
  });

  const ffiArray: FFIType[] = fields.map((f) => {
    const info = f.type;
    if ("len" in info) {
      return { array: info.array.ffi, len: info.len };
    }
    return info.ffi;
  });

  let ffi: FFIType | undefined = undefined;
  let size = 0;
  let alignment = 1;
  if (ty.$category == "struct") {
    ffi = { struct: ffiArray };
    for (const f of fields) {
      const typeInfo = f.type;
      if ("len" in typeInfo) {
        const _alignment = typeInfo.array.alignment;
        const _size = typeInfo.array.size;
        alignment = Math.max(alignment, _alignment);
        size = align(size, _alignment);
        f.offset = size;
        size += _size * typeInfo.len;
      } else {
        alignment = Math.max(alignment, typeInfo.alignment);
        size = align(size, typeInfo.alignment);
        f.offset = size;
        size += typeInfo.size;
      }
    }
  } else if (ty.$category == "union") {
    ffi = { union: ffiArray };
    for (const f of fields) {
      const info = f.type;
      if ("len" in info) {
        size = Math.max(size, info.array.size * info.len);
        alignment = Math.max(alignment, info.array.alignment);
      } else {
        size = Math.max(size, info.size);
        alignment = Math.max(alignment, info.alignment);
      }
    }
  } else {
    unreachable();
  }
  size = align(size, alignment);

  assert(ffi !== undefined);
  assert(typeInfoMap.get(typeName) === null);
  const info: TypeInfo = {
    name: typeName,
    alignment,
    size,
    ffi,
    member: fields,
  };
  typeInfoMap.set(typeName, info);
  return info;
}

// primitives
for (const [type, ffi] of Object.entries(C_TYPES_FFI)) {
  if (isFFIPlainType(ffi)) {
    const size = getFFIPlainTypeSize(ffi);
    typeInfoMap.set(type, {
      name: type,
      size,
      alignment: size,
      ffi: ffi,
    });
  }
}

// plain types
for (const ty of api.registry.types.type) {
  if (ty.$alias) continue;

  if (
    (ty.$category === "basetype" || ty.$category === "bitmask") &&
    ty["#text"] === "typedef;"
  ) {
    const typeInfo = getFoundTypeInfo(ty.type["#text"]);
    addTypeInfo({
      name: getText(ty.name),
      size: typeInfo.size,
      alignment: typeInfo.alignment,
      ffi: typeInfo.ffi,
    });
    typedefs.push({
      name: ty.name["#text"],
      type: typeToJS(ty.type["#text"]),
      ffi: typeInfo.ffi,
    });
  } else if (ty.$category === "basetype") {
    const name = getText(ty.name);
    const tx = getText(ty);
    const pointerSize = getFFIPlainTypeSize("pointer");
    if (tx.startsWith("#ifdef __OBJC__")) {
      if (tx.includes("\ntypedef ") && tx.endsWith("*;\n#endif")) {
        addTypeInfo({
          name,
          size: pointerSize,
          alignment: pointerSize,
          ffi: "pointer",
        });
        typedefs.push({
          name,
          type: "Deno.PointerValue",
          ffi: "pointer",
        });
      }
    }
    if (tx.startsWith("typedef struct ") && tx.endsWith("*;")) {
      addTypeInfo({
        name,
        size: pointerSize,
        alignment: pointerSize,
        ffi: "pointer",
      });
      typedefs.push({
        name,
        type: "Deno.PointerValue",
        ffi: "pointer",
      });
    }
  } else if (ty.$category === "handle") {
    const pointerSize = getFFIPlainTypeSize("pointer");
    const name = ty.$name ?? ty.name["#text"];
    addTypeInfo({
      name,
      size: pointerSize,
      alignment: pointerSize,
      ffi: "pointer",
    });
    typedefs.push({
      name,
      type: ty.$alias ?? "Deno.PointerValue",
      ffi: "pointer",
    });
  } else if (ty.$category === "enum") {
    const name = ty.$name;
    assert(typeof name == "string");
    addTypeInfo({
      name: name,
      size: 4,
      alignment: 4,
      ffi: "i32",
    });
  } else if (ty.$category === "funcpointer") {
    const name = getText(ty.name);
    const pointerSize = getFFIPlainTypeSize("pointer");
    addTypeInfo({
      name: name,
      size: pointerSize,
      alignment: pointerSize,
      ffi: "function",
    });
  }
}

// alias
for (const ty of api.registry.types.type) {
  if (ty.$name && ty.$alias) {
    const info = getTypeInfoRecursive(ty.$alias);
    addTypeInfo({
      name: ty.$name,
      size: info.size,
      alignment: info.alignment,
      ffi: info.ffi,
    });
    typedefs.push({
      name: ty.$name,
      type: ty.$alias,
      alias: true,
      ffi: info.ffi,
    });
  }
}

for (const ty of api.registry.types.type) {
  if (ty.$category === "struct" && ty.member) {
    const type = ty.$name;
    const info = getTypeInfoRecursive(type);
    typeInfoMap.set(info.name, info);
  } else if (ty.$category === "union" && ty.member) {
    const type = ty.$name;
    const info = getTypeInfoRecursive(type);
    typeInfoMap.set(info.name, info);
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

for (const ty of api.registry.types.type) {
  if (ty.$category === "struct" && ty.member) {
    const structName = ty.$name;
    assert(typeof structName == "string");
    const typeInfo = getFoundTypeInfo(structName);

    const memberInfos = typeInfo.member;
    assert(memberInfos !== undefined && memberInfos.length > 0);

    let sType: string | undefined = undefined;
    for (const member of toAarray(ty.member)) {
      const name = getText(member.name);
      if (name == "sType") {
        const values = member.$values?.split(",");
        if (values) {
          // if (values.length > 1) console.log(`${structName}, ${values}`);
          assert(values.length == 1);
          sType = values[0];
        }
      }
    }
    structs.push({
      name: structName,
      fields: memberInfos,
      comment: ty.$comment,
      size: typeInfo.size,
      sType,
    });
  } else if (ty.$category === "union" && ty.member) {
    const unionName = ty.$name;
    assert(typeof unionName == "string");
    const typeInfo = getFoundTypeInfo(unionName);

    const memberInfos = typeInfo.member;
    assert(memberInfos !== undefined && memberInfos.length > 0);

    unions.push({
      name: ty.$name,
      types: memberInfos,
      comment: ty.$comment,
      size: typeInfo.size,
    });
  }
}

for (const cmd of api.registry.commands.command) {
  if (cmd.$alias) continue; // TODO
  const name = getText(cmd.proto.name);
  const type = getText(cmd.proto.type);
  const params: CommandParams[] = [];
  if (cmd.param) {
    const _params = toAarray(cmd.param);
    for (const param of _params) {
      const name = getText(param.name);
      const type = getText(param.type);
      const optional = param.$optional;
      const len = param.$len;
      const comment = param.$comment;
      const text = maybeText(param);

      const getFFI = () => {
        if (text?.endsWith("*")) return "buffer";
        const typeInfo = getFoundTypeInfo(type);
        return typeInfo.ffi;
      };
      const ffi = getFFI();
      params.push({
        name,
        type,
        optional,
        len,
        comment,
        text,
        ffi,
      });
    }
  }

  const getResult = () => {
    const text = maybeText(cmd);
    if (text?.endsWith("*")) return "pointer";
    if (type == "void") return "void";
    return getFoundTypeInfo(type).ffi;
  };
  const result = getResult();
  commands.push({
    name,
    type,
    params,
    comment: cmd.$comment,
    successCodes: cmd.$successcodes?.split(",") ?? [],
    errorCodes: cmd.$errorcodes?.split(",") ?? [],
    ffi: {
      parameters: params.map((e) => e.ffi),
      result: result,
    },
  });
}
