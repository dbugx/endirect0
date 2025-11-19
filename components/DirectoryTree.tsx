
import React from 'react';
import { DirectoryItem } from './DirectoryItem';
import { Entity, EntityType } from '../types';

interface DirectoryTreeProps {
  data: Entity[];
  level: number;
  onAdd: (parentId: string, type: EntityType, name: string) => void;
  onDelete: (entityId: string) => void;
  onUpdate: (entityId: string, newName: string) => void;
}

export const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  data,
  level,
  onAdd,
  onDelete,
  onUpdate,
}) => {
  const sortedData = [...data].sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === EntityType.DIRECTORY ? -1 : 1;
  });

  return (
    <div className="space-y-1">
      {sortedData.map((entity) => (
        <DirectoryItem
          key={entity.id}
          entity={entity}
          level={level}
          onAdd={onAdd}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
