export interface Design {
  id: string;
  name: string;
  description?: string;
  width: number;
  height: number;
  thumbnailUrl?: string;
  elements: DesignElement[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface CreateDesignInput {
  name: string;
  description?: string;
  width: number;
  height: number;
  userId?: string;
}

export interface UpdateDesignInput {
  name?: string;
  description?: string;
  elements?: DesignElement[];
}

export interface DesignListResponse {
  designs: Design[];
  total: number;
  page: number;
  pageSize: number;
}
