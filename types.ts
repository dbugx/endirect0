
export enum EntityType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

export interface BaseEntity {
  id: string;
  name: string;
  type: EntityType;
  parentId: string | null;
}

export interface FileEntity extends BaseEntity {
  type: EntityType.FILE;
}

export interface DirectoryEntity extends BaseEntity {
  type: EntityType.DIRECTORY;
  children: Entity[];
}

export type Entity = FileEntity | DirectoryEntity;
