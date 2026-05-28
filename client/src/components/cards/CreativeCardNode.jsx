// Handle lets cards connect to each other with lines/arrows.
import { Handle, Position } from "@xyflow/react";

// This component represents ONE card/node on the canvas.
// React Flow automatically gives us `id` and `data`.
function CreativeCardNode({ id, data }) {
  // data.cardType tells us what kind of card this is:
  // "text", "list", or "image"
  const { cardType, label, items, imageUrl, onDelete } = data;

  return (
    <div
      style={{
        width: "220px",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "14px",
        padding: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top connection point */}
      <Handle type="target" position={Position.Top} />

      {/* Card header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <strong>{getCardTitle(cardType)}</strong>

        {/* Delete button */}
        <button
          onClick={() => onDelete(id)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ×
        </button>
      </div>

      {/* Render different content based on card type */}
      {cardType === "text" && (
        <p style={{ margin: 0 }}>{label}</p>
      )}

      {cardType === "list" && (
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          {items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {cardType === "image" && (
        <div>
          <img
            src={imageUrl}
            alt={label}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "8px",
            }}
          />
          <p style={{ margin: 0 }}>{label}</p>
        </div>
      )}

      {/* Bottom connection point */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// This gives each card type a readable heading.
function getCardTitle(cardType) {
  switch (cardType) {
    case "text":
      return "Text Note";
    case "list":
      return "Checklist";
    case "image":
      return "Image Card";
    default:
      return "Card";
  }
}

export default CreativeCardNode;