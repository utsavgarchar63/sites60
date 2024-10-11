import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Toolbar = ({
  execCommand,
  showDialog,
  exportHTML,
  onBackgroundColorChange,
  onPreview,
  onSelectBackgroundImage,
  onAiText,
  onAddSection,
}) => {
  const actions = [
    { name: "bold", icon: "bi-type-bold" },
    { name: "italic", icon: "bi-type-italic" },
    { name: "underline", icon: "bi-type-underline" },
    { name: "createLink", icon: "bi-link" },
    { name: "unlink", icon: "bi-link-45deg" },
    { name: "insertOrderedList", icon: "bi-list-ol" },
    { name: "insertUnorderedList", icon: "bi-list-ul" },
  ];

  return (
    <div className="toolbar p-2 bg-gray-100 border-b border-gray-300 flex space-x-2">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className="btn btn-sm text-gray-700 hover:text-black"
          onClick={() => execCommand(action.name)}
        >
          <i className={`bi ${action.icon}`} title={action.name}></i>
        </button>
      ))}

      <input
        type="color"
        className="btn btn-sm"
        onChange={(e) => execCommand("foreColor", e.target.value)}
        title="Text Color"
      />

      <select
        className="text-sm bg-white border border-gray-300 rounded px-2 py-1"
        onChange={(e) => execCommand("fontSize", e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <select
        className="text-sm bg-white border border-gray-300 rounded px-2 py-1"
        onChange={(e) => execCommand("fontName", e.target.value)}
      >
        {[
          "Arial",
          "Helvetica",
          "Times New Roman",
          "Courier",
          "Verdana",
          "Georgia",
          "Palatino",
          "Garamond",
          "Bookman",
          "Comic Sans MS",
          "Trebuchet MS",
          "Arial Black",
          "Impact",
        ].map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={() => showDialog("import")}
      >
        <i className="bi bi-file-earmark-arrow-up"></i> Import HTML
      </button>
      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={() => showDialog("source")}
      >
        <i className="bi bi-code-slash"></i> View Source
      </button>
      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={() => showDialog("sections")}
      >
        Add Section
      </button>
      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={exportHTML}
      >
        <i className="bi bi-download"></i> Export HTML
      </button>
      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={onPreview}
      >
        <i className="bi bi-eye"></i> Preview
      </button>

      <button
        className="text-sm text-blue-500 hover:text-blue-700"
        onClick={onAiText}
      >
        <i className="bi bi-chat-text"></i> AiText
      </button>
    </div>
  );
};

export default Toolbar;
