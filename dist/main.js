"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
async function createDistFolder(dist) {
    await (fs.existsSync(dist) ? null : fs.mkdirSync(dist, { recursive: true }));
}
async function copyFolder(src, dist) {
    const files = fs.readdirSync(src);
    await createDistFolder(dist);
    for (const file of files) {
        const srcFiles = path.join(src, file);
        const distFiles = path.join(dist, file);
        const stats = fs.lstatSync(srcFiles);
        if (stats.isDirectory()) {
            await copyFolder(srcFiles, distFiles);
        }
        else {
            await fs.copyFileSync(srcFiles, distFiles);
        }
    }
}
const srcDir = path.join(process.cwd(), "src/content");
const distDir = path.join(process.cwd(), "posts");
copyFolder(srcDir, distDir);
//# sourceMappingURL=main.js.map