function CanvasToolbar({ addCard }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 10,
        display: "flex",
        gap: "8px",
        background: "white",
        padding: "10px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
    >
      <button onClick={() => addCard("text")}>+ Text</button>
      <button onClick={() => addCard("list")}>+ List</button>
      <button onClick={() => addCard("image")}>+ Image</button>
    </div>
  );
}

export default CanvasToolbar;
