import { useState, useEffect } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [display, setDisplay] = useState("0");

  const handleNumber = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op) => {
    if (!["+", "-", "*", "/", "×", "÷"].includes(display.slice(-1))) {
      setDisplay((prev) => prev + op);
    }
  };

  const handleEquals = () => {
    try {
      const formatted = display.replace(/×/g, "*").replace(/÷/g, "/");
      const result = evaluate(formatted);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleDecimal = () => {
    setDisplay((prev) => prev + ".");
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  // ✅ Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (!isNaN(key)) {
        handleNumber(key);
      } else if (["+", "-", "*", "/", "×", "÷"].includes(key)) {
        if (key === "*") handleOperator("×");
        else if (key === "/") handleOperator("÷");
        else handleOperator(key);
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "=") {
        handleEquals();
      } else if (key === ".") {
        handleDecimal();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key === "c" || key === "C") {
        handleClear();
      } else if (key === "(" || key === ")") {
        setDisplay((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display]);

  const buttons = [
    { label: "AC", onClick: handleClear, className: "AC" },
    {
      label: "(",
      onClick: () => setDisplay((prev) => prev + "("),
      className: "number",
    },
    {
      label: ")",
      onClick: () => setDisplay((prev) => prev + ")"),
      className: "number",
    },
    { label: "+", onClick: () => handleOperator("+"), className: "operator" },
    { label: "7", onClick: () => handleNumber("7"), className: "number" },
    { label: "8", onClick: () => handleNumber("8"), className: "number" },
    { label: "9", onClick: () => handleNumber("9"), className: "number" },
    { label: "-", onClick: () => handleOperator("-"), className: "operator" },
    { label: "4", onClick: () => handleNumber("4"), className: "number" },
    { label: "5", onClick: () => handleNumber("5"), className: "number" },
    { label: "6", onClick: () => handleNumber("6"), className: "number" },
    { label: "×", onClick: () => handleOperator("×"), className: "operator" },
    { label: "1", onClick: () => handleNumber("1"), className: "number" },
    { label: "2", onClick: () => handleNumber("2"), className: "number" },
    { label: "3", onClick: () => handleNumber("3"), className: "number" },
    { label: "÷", onClick: () => handleOperator("÷"), className: "operator" },
    { label: ".", onClick: handleDecimal, className: "number" },
    { label: "0", onClick: () => handleNumber("0"), className: "number" },
    { label: "DEL", onClick: handleDelete, className: "del" },
    { label: "=", onClick: handleEquals, className: "equals" },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="button-grid">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={button.className || ""}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
