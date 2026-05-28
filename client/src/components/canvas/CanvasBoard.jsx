import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import CanvasToolbar from "../toolbar/CanvasToolbar";
import CreativeCardNode from "../cards/CreativeCardNode";

import "@xyflow/react/dist/style.css";

const initialNodes = [];

const initialEdges = [];

function CanvasBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // This deletes a node/card by filtering it out of the nodes array.
  const deleteCard = useCallback(
    (idToDelete) => {
      setNodes((currentNodes) =>
        currentNodes.filter((node) => node.id !== idToDelete)
      );

      // This also removes any connection lines attached to that deleted card.
      setEdges((currentEdges) =>
        currentEdges.filter(
          (edge) =>
            edge.source !== idToDelete && edge.target !== idToDelete
        )
      );
    },
    [setNodes, setEdges]
  );

  // This tells React Flow which custom component to use for node type "creativeCard".
  const nodeTypes = useMemo(
    () => ({
      creativeCard: CreativeCardNode,
    }),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // This function creates new cards.
  const addCard = (cardType) => {
    const newNode = {
      id: crypto.randomUUID(),

      // This must match the key inside nodeTypes.
      type: "creativeCard",

      position: {
        x: Math.random() * 400,
        y: Math.random() * 300,
      },

      // This data gets passed into CreativeCardNode as the `data` prop.
      data: {
        ...getCardData(cardType),
        onDelete: deleteCard,
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <CanvasToolbar addCard={addCard} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

// This controls the default content for each card type.
function getCardData(cardType) {
  switch (cardType) {
    case "text":
      return {
        cardType: "text",
        label: "Write your idea here...",
      };

    case "list":
      return {
        cardType: "list",
        label: "Project checklist",
        items: ["Research idea", "Choose tech stack", "Build first version"],
      };

    case "image":
      return {
        cardType: "image",
        label: "Moodboard image",
        imageUrl: "https://placehold.co/220x120",
      };

    default:
      return {
        cardType: "text",
        label: "New card",
      };
  }
}

export default CanvasBoard;