import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import styled from '@emotion/styled';
import { ResearchDocument, DocumentStatus } from '../types/researchDocument';
import 'reactflow/dist/style.css';

const NodeContent = styled.div`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  
  .title {
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
  }
  
  .department {
    font-size: 10px;
    opacity: 0.8;
  }
`;

interface DocumentNodeProps {
  data: {
    document: ResearchDocument;
    onClick: (doc: ResearchDocument) => void;
  };
}

// Custom Node Component
const DocumentNode = ({ data }: DocumentNodeProps) => {
  const { document, onClick } = data;
  
  return (
    <NodeContent
      onClick={() => onClick(document)}
      style={{ 
        background: document.style?.color,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (document.style?.hoverColor) {
          e.currentTarget.style.background = document.style.hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (document.style?.color) {
          e.currentTarget.style.background = document.style.color;
        }
      }}
    >
      <div className="title">{document.title}</div>
      <div className="department">{document.departmentName}</div>
    </NodeContent>
  );
};

// Convert documents to React Flow nodes
const createNodes = (
  documents: ResearchDocument[],
  onClick: (doc: ResearchDocument) => void
): Node[] => {
  return documents.map((doc, index) => ({
    id: doc.id,
    type: 'documentNode',
    position: { x: index * 200, y: index * 100 }, // Simple layout
    data: { document, onClick },
  }));
};

// Create edges from document connections
const createEdges = (documents: ResearchDocument[]): Edge[] => {
  const edges: Edge[] = [];
  
  documents.forEach(doc => {
    doc.connectedDocuments?.forEach(targetId => {
      edges.push({
        id: `${doc.id}-${targetId}`,
        source: doc.id,
        target: targetId,
        type: 'smoothstep',
      });
    });
  });
  
  return edges;
};

interface DocumentGraphProps {
  documents: ResearchDocument[];
  onNodeClick: (doc: ResearchDocument) => void;
}

export const DocumentGraph = ({ documents, onNodeClick }: DocumentGraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const nodeTypes = {
    documentNode: DocumentNode,
  };
  
  // Initialize nodes and edges
  useCallback(() => {
    setNodes(createNodes(documents, onNodeClick));
    setEdges(createEdges(documents));
  }, [documents, onNodeClick]);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};