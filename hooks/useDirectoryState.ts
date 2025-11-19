
import { useState, useCallback } from 'react';
import { DirectoryEntity, Entity, EntityType } from '../types';

export const useDirectoryState = (initialData: DirectoryEntity) => {
  const [root, setRoot] = useState<DirectoryEntity>(initialData);

  const findAndMutate = (
    node: DirectoryEntity,
    targetId: string,
    operation: (node: DirectoryEntity, index?: number) => void
  ): DirectoryEntity => {
    // Deep clone to ensure immutability
    const newNode = JSON.parse(JSON.stringify(node));

    const traverse = (currentNode: DirectoryEntity): boolean => {
      if (currentNode.id === targetId) {
        operation(currentNode);
        return true;
      }
      if (currentNode.children) {
        for (let i = 0; i < currentNode.children.length; i++) {
          const child = currentNode.children[i];
          if (child.id === targetId) {
            operation(currentNode, i);
            return true;
          }
          if (child.type === EntityType.DIRECTORY) {
            if (traverse(child as DirectoryEntity)) {
              return true;
            }
          }
        }
      }
      return false;
    };

    traverse(newNode);
    return newNode;
  };

  const addEntity = useCallback((parentId: string, type: EntityType, name: string) => {
    const newEntity: Entity = {
      id: crypto.randomUUID(),
      name,
      type,
      parentId,
      ...(type === EntityType.DIRECTORY && { children: [] }),
    };

    const updatedRoot = findAndMutate(root, parentId, (node) => {
      if (node.type === EntityType.DIRECTORY) {
        (node as DirectoryEntity).children.push(newEntity);
      }
    });
    setRoot(updatedRoot);
  }, [root]);

  const deleteEntity = useCallback((entityId: string) => {
    // Deleting the root is not allowed in this implementation
    if (entityId === root.id) return;

    const updatedRoot = findAndMutate(root, entityId, (parentNode, index) => {
        if(index !== undefined) {
            parentNode.children.splice(index, 1);
        }
    });
    setRoot(updatedRoot);
  }, [root]);

  const updateEntityName = useCallback((entityId: string, newName: string) => {
    const updatedRoot = findAndMutate(root, entityId, (node, index) => {
        if(index !== undefined) {
            node.children[index].name = newName;
        } else {
            // This case handles updating the root node itself, though not used for rename in UI.
            node.name = newName;
        }
    });
    setRoot(updatedRoot);
  }, [root]);

  return {
    root,
    addEntity,
    deleteEntity,
    updateEntityName,
  };
};
