
import React from 'react';
import { EntityType } from '../types';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface EntityIconProps {
  type: EntityType;
  isExpanded?: boolean;
}

export const EntityIcon: React.FC<EntityIconProps> = ({ type, isExpanded }) => {
  if (type === EntityType.DIRECTORY) {
    return (
      <div className="flex items-center w-8">
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <FolderIcon />
      </div>
    );
  }
  return (
    <div className="flex items-center w-8 pl-4">
      <FileIcon />
    </div>
  );
};
