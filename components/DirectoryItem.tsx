
import React, { useState, useRef, useEffect } from 'react';
import { Entity, EntityType, DirectoryEntity } from '../types';
import { DirectoryTree } from './DirectoryTree';
import { EntityIcon } from './EntityIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ActionButton } from './ActionButton';

interface DirectoryItemProps {
  entity: Entity;
  level: number;
  onAdd: (parentId: string, type: EntityType, name: string) => void;
  onDelete: (entityId: string) => void;
  onUpdate: (entityId: string, newName: string) => void;
}

export const DirectoryItem: React.FC<DirectoryItemProps> = React.memo(({
  entity,
  level,
  onAdd,
  onDelete,
  onUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [itemName, setItemName] = useState(entity.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDirectory = entity.type === EntityType.DIRECTORY;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggleExpand = () => {
    if (isDirectory) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAdd = (type: EntityType) => {
    const name = prompt(`Enter new ${type === EntityType.DIRECTORY ? 'folder' : 'file'} name:`);
    if (name) {
      onAdd(entity.id, type, name);
      setIsExpanded(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${entity.name}"?`)) {
      onDelete(entity.id);
    }
  };

  const handleRename = () => {
    setIsEditing(true);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  }
  
  const handleNameUpdate = () => {
    if (itemName.trim() && itemName !== entity.name) {
      onUpdate(entity.id, itemName.trim());
    } else {
        setItemName(entity.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameUpdate();
    } else if (e.key === 'Escape') {
      setItemName(entity.name);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-between p-1.5 rounded-md hover:bg-gray-700/50 transition-colors group"
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-2 flex-grow truncate cursor-pointer" onClick={handleToggleExpand}>
          <EntityIcon type={entity.type} isExpanded={isExpanded} />
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={itemName}
              onChange={handleNameChange}
              onBlur={handleNameUpdate}
              onKeyDown={handleKeyDown}
              className="bg-gray-900 text-white outline-none rounded px-1 -m-1 border border-indigo-500 flex-grow"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate">{entity.name}</span>
          )}
        </div>

        <div className={`flex items-center gap-1 transition-opacity ${isHovered || isEditing ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
          {isDirectory && <ActionButton onClick={(e) => {e.stopPropagation(); handleAdd(EntityType.DIRECTORY)}} title="Add Folder"><PlusIcon /></ActionButton>}
          {isDirectory && <ActionButton onClick={(e) => {e.stopPropagation(); handleAdd(EntityType.FILE)}} title="Add File"><PlusIcon /></ActionButton>}
          <ActionButton onClick={(e) => {e.stopPropagation(); handleRename()}} title="Rename"><PencilIcon /></ActionButton>
          <ActionButton onClick={(e) => {e.stopPropagation(); handleDelete()}} title="Delete"><TrashIcon /></ActionButton>
        </div>
      </div>
      {isDirectory && isExpanded && (entity as DirectoryEntity).children.length > 0 && (
        <DirectoryTree
          data={(entity as DirectoryEntity).children}
          level={level + 1}
          onAdd={onAdd}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
});
