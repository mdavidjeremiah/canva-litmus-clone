export interface Asset {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: Date;
  userId?: string;
}

export interface CreateAssetInput {
  name: string;
  mimeType: string;
  size: number;
  url: string;
  userId?: string;
}

export interface UploadResult {
  asset: Asset;
  url: string;
}
