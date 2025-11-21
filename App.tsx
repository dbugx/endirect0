
import React from 'react';
import { DirectoryTree } from './components/DirectoryTree';
import { initialData } from './data/initialData';
import { EntityType } from './types';

const App: React.FC = () => {
  const root = initialData;

  const addEntity = (parentId: string, type: EntityType, name: string) => {
    console.log("Functionality disabled");
  };

  const deleteEntity = (entityId: string) => {
    console.log("Functionality disabled");
  };

  const updateEntityName = (entityId: string, newName: string) => {
    console.log("Functionality disabled");
  };

  const handleAddRootFolder = () => {
    console.log("Functionality disabled");
  };

  const handleAddRootFile = () => {
    console.log("Functionality disabled");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Entity DIR
          </h1>
          <p className="text-gray-400 mt-2">A sleek and interactive directory management tool.</p>
        </header>

        <main className="bg-gray-800/50 rounded-lg shadow-2xl shadow-indigo-900/20 p-4 sm:p-6 backdrop-blur-sm border border-gray-700">
           <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
              <h2 className="text-xl font-bold text-gray-300">Root Directory</h2>
              <div className="flex space-x-2">
                 <button onClick={handleAddRootFolder} className="px-3 py-1.5 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
                    Add Folder
                 </button>
                 <button onClick={handleAddRootFile} className="px-3 py-1.5 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500">
                    Add File
                 </button>
              </div>
           </div>
          {root && (
            <DirectoryTree
              data={root.children}
              level={0}
              onAdd={addEntity}
              onDelete={deleteEntity}
              onUpdate={updateEntityName}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
