interface TeamProgressNodeProps {
  nodes: {
    id: string;
    name: string;
    status: 'completed' | 'in-progress' | 'rejected';
    progress: number;
    checklist: { id: string; task: string; completed: boolean; }[];
  }[];
}

export function TeamProgressNodes({ nodes }: TeamProgressNodeProps) {
  // Basic implementation - you can enhance this based on your UI needs
  return (
    <div>
      {nodes.map(node => (
        <div key={node.id}>
          <h4>{node.name}</h4>
          <div>Status: {node.status}</div>
          <div>Progress: {node.progress}%</div>
          {node.checklist.map(item => (
            <div key={item.id}>
              {item.task}: {item.completed ? '✓' : '✗'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}