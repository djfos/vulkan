// deno-lint-ignore-file no-inner-declarations no-explicit-any
import {
  commands,
  constants,
  enums,
  Field,
  FileBuilder,
  jsify,
  Struct,
  structs,
  typedefs,
  typeToJS,
  unions,
  vendors,
} from "./process_xml.ts";
import { parse } from "https://deno.land/std@0.179.0/path/mod.ts";
import {
  assert,
  unreachable,
} from "https://deno.land/std@0.179.0/_util/asserts.ts";

const nameSetEnums = new Set<string>(enums.map((it) => it.name));
const nameSetStrucs = new Set<string>(structs.map((it) => it.name));
const nameSetUnions = new Set<string>(unions.map((it) => it.name));
const nameSetDefs = new Set<string>();

/**
 * without alias
 */
const pureTypeDefs = [];
const aliasTypeDefs = [];
for (const def of typedefs) {
  if (!def.alias) {
    pureTypeDefs.push(def);
    nameSetDefs.add(def.name);
  } else {
    aliasTypeDefs.push(def);
  }
}
// for alias chain
for (let i = 0; i < 3; i++) {
  for (const def of aliasTypeDefs) {
    if ((!nameSetStrucs.has(def.name)) && nameSetStrucs.has(def.type)) {
      nameSetStrucs.add(def.name);
    } else if ((!nameSetEnums.has(def.name)) && nameSetEnums.has(def.type)) {
      nameSetEnums.add(def.name);
    }
  }
}

for (const def of aliasTypeDefs) {
  if ((!nameSetStrucs.has(def.name)) && (!nameSetEnums.has(def.name))) {
    nameSetDefs.add(def.name);
  }
}

function writeFile(path: string, text: string, append = false) {
  const info = parse(path);
  Deno.mkdirSync(info.dir, { recursive: true });
  Deno.writeTextFileSync(path, text, { append: append });
}

function stripVk(name: any): string {
  if (typeof name !== "string") return name;
  if (name.startsWith("Vk") || name.startsWith("vk")) return name.slice(2);
  else if (name.startsWith("VK_")) return name.slice(3);
  return name;
}

function toConstCase(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .map((x) => x.toUpperCase())
    .join("_");
}

{
  const b = new FileBuilder();
  b.emit("/// Type definitions");

  for (const ty of pureTypeDefs) {
    b.newline();
    b.emit(`export type ${stripVk(ty.name)} = ${stripVk(ty.type)};`);
  }

  const alias = aliasTypeDefs.filter((def) => nameSetDefs.has(def.name));
  for (const ty of alias) {
    b.newline();
    b.emit(`export type ${stripVk(ty.name)} = ${stripVk(ty.type)};`);
  }
  writeFile("api/def.ts", b.output());
}

{
  const builder = new FileBuilder();
  builder.emit("/// Constants");

  for (const e of constants) {
    builder.newline();
    builder.emit(`/// ${e.name}`);
    if (e.comment) builder.emit(`/// ${e.comment}`);
    builder.newline();
    for (const c of e.constants) {
      if (c.name.includes("_SPEC_VERSION")) continue;
      if (c.comment) builder.emit(`/** ${c.comment} */`);
      builder.emit(`export const ${stripVk(c.name)} = ${stripVk(c.value)};`);
    }
  }
  writeFile("api/constant.ts", builder.output());
}

{
  const b = new FileBuilder();
  b.emit("// deno-lint-ignore-file no-empty-enum");

  for (const e of enums) {
    b.newline();
    if (e.comment) b.emit(`/** ${e.comment} */`);

    const enumClassName = stripVk(e.name);
    b.emit(`export enum ${enumClassName} {`);
    const ec = toConstCase(enumClassName).replace("_FLAG_BITS", "");
    b.block(() => {
      const pushed: string[] = [];
      for (const c of e.enums) {
        if (c.comment) b.emit(`/** ${c.comment} */`);
        const n = stripVk(c.name);
        function maybeSlice(x: string, vkOnly = false) {
          if (typeof x !== "string") return x;
          if (vkOnly && !x.startsWith("VK_")) return x;
          x = stripVk(x);
          let sliced = x.startsWith?.(ec + "_") ? x.slice(ec.length + 1) : x;
          if (e.name.endsWith("FlagBits") && sliced.endsWith("_BIT")) {
            sliced = sliced.slice(0, -4);
          }
          if (sliced.match?.(/^[0-9]/)) sliced = "VK_" + sliced;
          return sliced;
        }
        const finalName = maybeSlice(n);
        if (pushed.includes(finalName)) continue;
        pushed.push(finalName);

        const finalValue =
          typeof c.value === "string" && c.value.startsWith("VK")
            ? maybeSlice(
              e.enums.find((x) => x.name === c.value)?.value ?? c.value,
              true,
            )
            : c.value;
        b.emit(`${finalName} = ${finalValue},`);
      }
    });
    b.emit(`}`);
  }
  const enumAlias = aliasTypeDefs.filter((def) => nameSetEnums.has(def.name));
  for (const def of enumAlias) {
    b.newline();
    b.emit(`export type ${stripVk(def.name)} = ${stripVk(def.type)}`);
  }
  writeFile("api/enum.ts", b.output());
}

function addImports(types: string[]) {
  const _structs = new Set<string>();
  const _unions = new Set<string>();
  const _enums = new Set<string>();
  const _defs = new Set<string>();

  for (const type of types) {
    if (nameSetStrucs.has(type)) {
      _structs.add(stripVk(type));
    } else if (nameSetUnions.has(type)) {
      _unions.add(stripVk(type));
    } else if (nameSetEnums.has(type)) {
      _enums.add(stripVk(type));
    } else if (nameSetDefs.has(type)) {
      _defs.add(stripVk(type));
    }
  }

  return {
    structs: [..._structs],
    unions: [..._unions],
    enums: [..._enums],
    defs: [..._defs],
  };
}

class ClassEmitter {
  fileBuilder: FileBuilder;
  struct: Struct;
  className: string;

  constructor(
    fileBuilder: FileBuilder,
    struct: Struct,
  ) {
    this.fileBuilder = fileBuilder;
    this.struct = struct;
    this.className = stripVk(struct.name);
  }

  emitImports() {
    const b = this.fileBuilder;
    // imports
    b.emit([
      `import {`,
      [
        "AnyBuffer,",
        "AnyPointer,",
        "anyBuffer,",
        "anyPointer,",
        "BUFFER,",
        "DATAVIEW,",
        "LE,",
        "BaseStruct,",
        "pointerFromView,",
        "notPointerObject,",
      ],
      `} from "../util.ts";`,
    ], true);

    const imports = addImports(this.struct.fields.map((f) => {
      return "len" in f.type ? f.type.array.name : f.type.name;
    }));
    if (imports.structs.length > 0) {
      imports.structs.forEach((name) => {
        if (name != "BaseInStructure" && name != "BaseOutStructure") {
          b.emit(`import {${name}} from "./${name}.ts";`);
        }
      });
    }
    if (imports.enums.length > 0) {
      b.emit(`import { ${[...imports.enums].join(", ")} } from "../enum.ts";`);
    }
    if (imports.defs.length > 0) {
      b.emit(`import { ${[...imports.defs].join(", ")} } from "../def.ts";`);
    }
    if (imports.unions.length > 0) {
      b.emit(
        `import { ${[...imports.unions].join(", ")} } from "../union.ts";`,
      );
    }
  }

  getFields() {
    return this.struct.fields.filter((f) => f.name != "sType");
  }

  emitInitInterface() {
    const b = this.fileBuilder;
    const s = this.struct;
    const properties = this.getFields().map((f) => {
      const name = jsify(f.name);
      if ("len" in f.type) {
        if (f.type.narray) {
          return `${name}?: ${f.type.narray};`;
        }
        const type = stripVk(typeToJS(f.type.array.name));
        return `${name}?: ${type}[];`;
      } else {
        if (f.type.ffi == "pointer") {
          return `${name}?: AnyPointer;`;
        }
        const type = stripVk(typeToJS(f.type.name));
        return `${name}?: ${type};`;
      }
    });
    b.emit([
      `export interface Init${stripVk(s.name)} {`,
      [...properties],
      `}`,
    ], true);
  }

  emitConstructor() {
    const b = this.fileBuilder;
    const className = this.className;

    const fieldAssigns = this.getFields().map((f) => {
      const name = jsify(f.name);
      return `if (data.${name} !== undefined) this.${name} = data.${name};`;
    });

    b.emit([
      `constructor();`,
      `constructor(ptr: Deno.PointerValue);`,
      `constructor(init: Init${className});`,
      `constructor(data: Uint8Array);`,
      `constructor(data?: Deno.PointerValue | Uint8Array | Init${className}) {`,
      [
        `if (data === undefined || data === null) {`,
        [
          `this.#data = new Uint8Array(${className}.size);`,
          "this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);",
        ],
        "} else if (data instanceof Uint8Array) {",
        [
          `if (data.byteLength < ${className}.size) {`,
          [
            `throw new Error("Data buffer too small");`,
          ],
          "}",
          "this.#data = data;",
          "this.#view = new DataView(data.buffer, data.byteOffset);",
        ],
        "} else if(notPointerObject(data)) {",
        [
          `this.#data = new Uint8Array(${className}.size);`,
          "this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);",
          ...fieldAssigns,
        ],
        `} else {`,
        [
          `this.#data = new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(data, ${className}.size));`,
          "this.#view = new DataView(this.#data.buffer, this.#data.byteOffset);",
        ],
        "}",
        () => {
          if (this.struct.sType) {
            const sType = this.struct.sType.slice("VK_STRUCTURE_TYPE_".length);
            b.emit(`this.sType = StructureType.${sType};`);
          }
        },
      ],
      "}",
    ], true);
  }

  emitGetterAndSetter(f: Field) {
    const fieldName = jsify(f.name);
    const offset = f.offset;
    if ("len" in f.type) {
      const info = f.type;
      const len = info.len;
      if (info.narray) {
        // typed array
        const narray = info.narray;
        return [
          `get ${fieldName}(): ${narray} {`,
          [`return new ${narray}(this.#data.buffer, ${offset}, ${len});`],
          `}`,
          `set ${fieldName}(value: ${narray}) {`,
          [
            `if (value.length > ${len}) {`,
            [`throw Error("buffer is too big");`],
            `}`,
            // for BigUint64Array
            `const byteAray = new Uint8Array(`,
            [
              `value.buffer,`,
              `value.byteOffset,`,
              `value.byteLength,`,
            ],
            `);`,
            `this.#data.set(byteAray, ${offset});`,
          ],
          `}`,
        ];
      }

      const typeName = stripVk(typeToJS(info.array.name));
      const typeSize = info.array.size;
      return [
        `get ${fieldName}(): ${typeName}[] {`,
        [
          `const result: ${typeName}[] = [];`,
          `for (let i = 0; i < ${len}; i++) {`,
          [
            `const start = ${offset} + i * ${typeName}.size;`,
            `const element = new ${typeName}(this.#data.subarray(start, start + ${typeName}.size));`,
            `result.push(element);`,
          ],
          `}`,
          `return result;`,
        ],
        `}`,
        `set ${fieldName}(value: ${typeName}[]) {`,
        [
          `if (value.length > ${len}) {`,
          [`throw Error("buffer is too big");`],
          `}`,
          `for (let i = 0; i < value.length; i++) {`,
          [
            `this.#data.set(value[i][BUFFER], ${offset} + i * ${typeSize});`,
          ],
          "}",
        ],
        `}`,
      ];
    }

    // plain type -- struct
    if (typeof f.type.ffi == "object") {
      const typeName = stripVk(f.type.name);
      if ("struct" in f.type.ffi) {
        return [
          `get ${fieldName}(): ${typeName} {`,
          [
            `return new ${typeName}(this.#data.subarray(${offset}, ${offset} + ${typeName}.size));`,
          ],
          `}`,
          `set ${fieldName}(value: ${typeName}) {`,
          [
            `if (value[BUFFER].byteLength < ${typeName}.size) {`,
            [
              `throw new Error("Data buffer too small");`,
            ],
            "}",
            `this.#data.set(value[BUFFER], ${offset});`,
          ],
          `}`,
        ];
      } else {
        assert("union" in f.type.ffi);
        // TODO
        return [
          `get ${fieldName}(): ${typeName} {`,
          [
            `throw new Error(\`Unknown type: ${JSON.stringify(f.type.ffi)}\`);`,
          ],
          `}`,
          `set ${fieldName}(value: ${typeName}) {`,
          [
            `throw new Error(\`Unknown type: ${JSON.stringify(f.type.ffi)}\`);`,
          ],
          `}`,
        ];
      }
    }

    // plain type -- other
    let typeName: string | undefined = stripVk(f.type.name);
    if (typeName.toLowerCase() == typeName) typeName = undefined;
    if (typeName == "DWORD") typeName = undefined;
    // TODO need a better way to add more names as hints

    switch (f.type.ffi) {
      case "i8":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getInt8(${offset});`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setInt8(${offset}, Number(value));`],
          `}`,
        ];
      case "u8":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getUint8(${offset});`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setUint8(${offset}, Number(value));`],
          `}`,
        ];
      case "i16":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getInt16(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setInt16(${offset}, Number(value), LE);`],
          `}`,
        ];
      case "u16":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getUint16(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setUint16(${offset}, Number(value), LE);`],
          `}`,
        ];
      case "i32":
        return [
          `get ${fieldName}(): ${typeName ?? "number"} {`,
          [`return this.#view.getInt32(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: ${typeName ?? "number"}) {`,
          [`this.#view.setInt32(${offset}, Number(value), LE);`],
          `}`,
        ];
      case "u32":
        return [
          `get ${fieldName}(): ${typeName ?? "number"} {`,
          [`return this.#view.getUint32(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: ${typeName ?? "number"}) {`,
          [`this.#view.setUint32(${offset}, Number(value), LE);`],
          `}`,
        ];
      case "isize":
      case "i64":
        return [
          `get ${fieldName}(): bigint {`,
          [`return this.#view.getBigInt64(${offset});`],
          `}`,
          "",
          `set ${fieldName}(value: number | bigint) {`,
          [`this.#view.setBigInt64(${offset}, BigInt(value), LE);`],
          `}`,
        ];
      case "usize":
      case "u64":
        return [
          `get ${fieldName}(): bigint {`,
          [`return this.#view.getBigUint64(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: number | bigint) {`,
          [`this.#view.setBigUint64(${offset}, BigInt(value), LE);`],
          `}`,
        ];
      case "pointer":
        return [
          `get ${fieldName}(): Deno.PointerValue {`,
          [`return pointerFromView(this.#view, ${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: AnyPointer) {`,
          [`this.#view.setBigUint64(${offset}, BigInt(anyPointer(value)), LE);`],
          `}`,
        ];
      case "function":
        return [
          `get ${fieldName}(): Deno.PointerValue {`,
          [`return pointerFromView(this.#view, ${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: Deno.PointerValue) {`,
          [`this.#view.setBigUint64(${offset}, BigInt(anyPointer(value)), LE);`],
          `}`,
        ];
      case "f32":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getFloat32(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setFloat32(${offset}, Number(value), LE);`],
          `}`,
        ];
      case "f64":
        return [
          `get ${fieldName}(): number {`,
          [`return this.#view.getFloat64(${offset}, LE);`],
          `}`,
          "",
          `set ${fieldName}(value: number) {`,
          [`this.#view.setFloat64(${offset}, Number(value), LE);`],
          `}`,
        ];
    }

    unreachable();
  }

  emit() {
    const b = this.fileBuilder;
    const s = this.struct;
    b.emit("// deno-lint-ignore-file no-unused-vars");
    this.emitImports();
    b.newline();
    this.emitInitInterface();
    b.newline();

    b.emit(`export class ${this.className} implements BaseStruct {`);
    b.block(() => {
      b.emit(`static size = ${s.size};`);

      b.newline();
      b.emit("#data!: Uint8Array;");
      b.emit("#view!: DataView;");

      b.newline();
      b.emit(`get [BUFFER]() { return this.#data; }`);
      b.emit(`get [DATAVIEW]() { return this.#view; }`);

      b.newline();
      this.emitConstructor();
      for (const f of this.struct.fields) {
        b.newline();
        if (f.comment) b.emit(`/** ${f.comment} */`);
        b.emit(this.emitGetterAndSetter(f), true);
      }
    });
    b.emit(`}`);
  }
}

{
  const classNames = [] as string[];
  for (const s of structs) {
    const b = new FileBuilder();
    const emitter = new ClassEmitter(b, s);
    emitter.emit();
    classNames.push(emitter.className);
    writeFile(`api/struct/${emitter.className}.ts`, b.output());
  }
  {
    // alias
    const structAlias = aliasTypeDefs.filter((def) =>
      nameSetStrucs.has(def.name)
    );
    for (const def of structAlias) {
      const b = new FileBuilder();
      const className = stripVk(def.name);
      classNames.push(className);
      b.emit([
        `import { ${stripVk(def.type)} } from "./${stripVk(def.type)}.ts";`,
        `export type ${className} = ${stripVk(def.type)};`,
      ]);
      writeFile(`api/struct/${className}.ts`, b.output());
    }
  }
  {
    // complete re-export
    const b = new FileBuilder();
    classNames.forEach((name) => b.emit(`export * from "./${name}.ts";`));
    writeFile(`api/struct/mod.ts`, b.output());
  }
  {
    // common re-export
    const b = new FileBuilder();
    const commonStructs = classNames.filter((name) => {
      for (const vendor of vendors) {
        if (name.endsWith(vendor.name)) return false;
      }
      if (name.startsWith("StdVideo")) return false;
      return true;
    });
    commonStructs.push(
      "DebugUtilsMessengerCallbackDataEXT",
      "DebugUtilsMessengerCreateInfoEXT",
      "SurfaceFormatKHR",
      "SurfaceCapabilitiesKHR",
      "SwapchainCreateInfoKHR",
      "PresentInfoKHR",
    );
    commonStructs.forEach((name) => b.emit(`export * from "./${name}.ts";`));
    writeFile(`api/struct/common.ts`, b.output());
  }
}

{
  const b = new FileBuilder();
  b.newline();
  b.emit("/// Unions");

  for (const s of unions) {
    b.newline();
    if (s.comment) b.emit(`/** ${s.comment} */`);
    b.emit(`export class ${stripVk(s.name)} {`);
    b.block(() => {
      b.emit(`static size = ${s.size};`);

      b.newline();

      b.emit("#data: Uint8Array;");
      b.emit("#view: DataView;");

      b.newline();

      b.emit("constructor(data: Uint8Array) {");
      b.block(() => {
        b.emit(`if (data.byteLength < ${stripVk(s.name)}.size) {`);
        b.block(() => {
          b.emit(`throw new Error("Data buffer too small");`);
        });
        b.emit("}");
        b.emit("this.#data = data;");
        b.emit("this.#view = new DataView(data.buffer);");
      });
      b.emit("}");
    });
    b.emit(`}`);
  }
  writeFile(`api/union.ts`, b.output());
}

function toSkipCMD(name: string) {
  if (name === "vkCreateSwapchainKHR") return false;
  if (name === "vkGetPhysicalDeviceSurfaceSupportKHR") return false;
  if (name === "vkGetPhysicalDeviceSurfaceCapabilitiesKHR") return false;
  if (name === "vkGetPhysicalDeviceSurfaceFormatsKHR") return false;
  if (name === "vkGetPhysicalDeviceSurfacePresentModesKHR") return false;
  if (name === "vkDestroySwapchainKHR") return false;
  if (name === "vkGetSwapchainImagesKHR") return false;
  if (name === "vkAcquireNextImageKHR") return false;
  if (name === "vkQueuePresentKHR") return false;
  if (name === "vkDestroySurfaceKHR") return false;

  if (name.endsWith("NV")) return true;
  if (name.endsWith("NX")) return true;
  if (name.endsWith("NVX")) return true;
  if (name.endsWith("NN")) return true;
  if (name.endsWith("KHR")) return true;
  if (name.endsWith("EXT")) return true;
  if (name.endsWith("QCOM")) return true;
  if (name.endsWith("FUCHSIA")) return true;
  if (name.endsWith("INTEL")) return true;
  if (name.endsWith("ANDROID")) return true;
  if (name.endsWith("VALVE")) return true;
  if (name.endsWith("HUAWEI")) return true;
  if (name.endsWith("GGP")) return true;
  if (name.endsWith("AMD")) return true;
  if (name.endsWith("GOOGLE")) return true;
  if (name.endsWith("MVK")) return true;
  return false;
}

{
  const b = new FileBuilder();
  b.emit("// deno-lint-ignore-file no-unused-vars");
  b.emit(`import { AnyBuffer, anyBuffer } from "./util.ts";`);
  // import
  const _types = new Set<string>();
  for (const cmd of commands) {
    for (const param of cmd.params) {
      _types.add(param.type);
    }
  }
  const imports = addImports([..._types]);
  if (imports.enums.length > 0) {
    b.emit([
      `import {`,
      [
        "Result,",
        ...imports.enums.map((name) => name + ","),
      ],
      `} from "./enum.ts";`,
    ], true);
  }
  if (imports.defs.length > 0) {
    b.emit([
      `import {`,
      [
        ...imports.defs.map((name) => name + ","),
      ],
      `} from "./def.ts";`,
    ], true);
  }

  const symbols = commands.filter((cmd) => !toSkipCMD(cmd.name)).map((cmd) => {
    const lines = JSON.stringify(cmd.ffi, null, 2).split("\n");
    lines[0] = `"${cmd.name}": ` + lines[0];
    lines[lines.length - 1] = lines[lines.length - 1] + ",";
    return lines;
  });

  b.emit([
    `const libFile = Deno.build.os === "windows" ? "vulkan-1" : Deno.build.os === "darwin" ? "libvulkan.dylib.1" : "libvulkan.so.1";`,
    `const _lib = Deno.dlopen(libFile, {`,
    ...symbols,
    `});`,
    `const lib = _lib.symbols;`,
  ], true);

  b.newline();

  b.emit([
    `export class VulkanError extends Error {`,
    [
      `constructor(public code: Result) {`,
      [
        `super(\`Vulkan error: \${code} (\${Result[code]})\`);`,
      ],
      `}`,
    ],
    `}`,
  ]);
  b.newline();
  b.emit("/// Commands");

  for (const cmd of commands) {
    if (toSkipCMD(cmd.name)) continue;

    const cmdName = stripVk(cmd.name);
    const returnType = stripVk(typeToJS(cmd.type));

    const _arguments = cmd.params.map((param) => {
      const name = jsify(param.name);
      const text = param.text?.endsWith("*") ? `anyBuffer(${name})` : name;
      return text + ",";
    });
    const _paramters = cmd.params.map((param) => {
      const name = jsify(param.name);
      const text = param.text?.endsWith("*")
        ? `AnyBuffer`
        : stripVk(typeToJS(param.type));
      return `${name}: ${text},`;
    });
    b.newline();
    if (cmd.comment) b.emit(`/** ${cmd.comment} */`);
    b.emit([
      `export function ${cmdName}(`,
      _paramters,
      `): ${returnType} {`,
      () => {
        if (cmd.type == "void") {
          b.emit([
            `lib.${cmd.name}(`,
            _arguments,
            `);`,
          ]);
        } else if (cmd.type == "VkResult") {
          const conditions = cmd.successCodes.map((e) =>
            `ret === Result.${stripVk(e)}`
          ).join(" || ");

          b.emit([
            `const ret = lib.${cmd.name}(`,
            _arguments,
            `);`,
            `if (${conditions}) {`,
            [
              "return ret;",
            ],
            `} else {`,
            [
              `throw new VulkanError(ret as Result);`,
            ],
            `}`,
          ]);
        } else {
          b.emit([
            `const ret = lib.${cmd.name}(`,
            _arguments,
            `);`,
            `return ret;`,
          ]);
        }
      },
      `}`,
    ], true);
  }

  writeFile(`api/cmd.ts`, b.output());
}
