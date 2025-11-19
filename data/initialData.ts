
import { DirectoryEntity, EntityType, Entity } from '../types';

const generateEntity = (
  type: EntityType,
  name: string,
  parentId: string | null,
  children: Entity[] = []
): Entity => {
  const id = crypto.randomUUID();
  if (type === EntityType.DIRECTORY) {
    return {
      id,
      name,
      parentId,
      type: EntityType.DIRECTORY,
      children: children.map(child => ({ ...child, parentId: id })),
    } as DirectoryEntity;
  }
  return { id, name, parentId, type: EntityType.FILE };
};

export const initialData: DirectoryEntity = generateEntity(
  EntityType.DIRECTORY,
  'root',
  null,
  [
    generateEntity(EntityType.DIRECTORY, 'src', 'root', [
      generateEntity(EntityType.DIRECTORY, 'components', 'src', [
        generateEntity(EntityType.FILE, 'Button.tsx', 'components'),
        generateEntity(EntityType.FILE, 'Input.tsx', 'components'),
      ]),
      generateEntity(EntityType.DIRECTORY, 'hooks', 'src', [
        generateEntity(EntityType.FILE, 'useDirectoryState.ts', 'hooks'),
      ]),
      generateEntity(EntityType.FILE, 'App.tsx', 'src'),
      generateEntity(EntityType.FILE, 'index.tsx', 'src'),
    ]),
    generateEntity(EntityType.DIRECTORY, 'public', 'root', [
      generateEntity(EntityType.FILE, 'index.html', 'public'),
      generateEntity(EntityType.FILE, 'vite.svg', 'public'),
    ]),
    generateEntity(EntityType.FILE, 'package.json', 'root'),
    generateEntity(EntityType.FILE, 'README.md', 'root'),
  ]
) as DirectoryEntity;
