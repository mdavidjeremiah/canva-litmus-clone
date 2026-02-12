import fs from "fs/promises";
import path from "path";
import { config } from "../config";

export interface StorageService {
  store(filename: string, buffer: Buffer, mimeType: string): Promise<string>;
  get(url: string): Promise<Buffer>;
  delete(url: string): Promise<void>;
}

class LocalStorageService implements StorageService {
  private storagePath: string;

  constructor() {
    this.storagePath = path.resolve(config.storage.path);
    this.ensureStorageDir();
  }

  private async ensureStorageDir(): Promise<void> {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error("Failed to create storage directory:", error);
    }
  }

  async store(filename: string, buffer: Buffer, _mimeType: string): Promise<string> {
    const filePath = path.join(this.storagePath, filename);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  }

  async get(url: string): Promise<Buffer> {
    const filename = url.replace("/uploads/", "");
    const filePath = path.join(this.storagePath, filename);
    return fs.readFile(filePath);
  }

  async delete(url: string): Promise<void> {
    const filename = url.replace("/uploads/", "");
    const filePath = path.join(this.storagePath, filename);
    await fs.unlink(filePath);
  }
}

class S3StorageService implements StorageService {
  async store(_filename: string, _buffer: Buffer, _mimeType: string): Promise<string> {
    throw new Error("S3 storage not implemented yet");
  }

  async get(_url: string): Promise<Buffer> {
    throw new Error("S3 storage not implemented yet");
  }

  async delete(_url: string): Promise<void> {
    throw new Error("S3 storage not implemented yet");
  }
}

export const storageService: StorageService =
  config.storage.type === "s3" ? new S3StorageService() : new LocalStorageService();
