import React from 'react';

export default function Filter_Side_Bar({ allCategories, stockOptions, priceOptions, handleCheckboxChange, onClose }) {
  return (
    <div className="bg-light px-3" style={{ width: "245px", minHeight: "100vh" }}>

      {/* Categoria */}
      <div className="mb-4 w-100">
        <h6>Categoria</h6>
        <hr style={{ backgroundColor: "black", height: "1.5px", border: "none", opacity: "1" }} />
        {allCategories.map((cat) => (
          <div className="form-check" key={cat.name}>
            <input
              className="form-check-input"
              type="checkbox"
              value={cat.name}
              id={`category${cat.name}`}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`category${cat.name}`}>
              {cat.name}
            </label>
          </div>
        ))}
      </div>

      {/* Stock */}
      <div className="mb-4 w-100">
        <h6>Stock</h6>
        <hr style={{ backgroundColor: "black", height: "1.5px", border: "none", opacity: "1" }} />
        {stockOptions.map((opt) => (
          <div className="form-check" key={opt.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`stock${opt.id}`}
              value={opt.value}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`stock${opt.id}`}>
              {opt.label}
            </label>
          </div>
        ))}
      </div>

      {/* Preço */}
      <div className="mb-4 w-100">
        <h6>Preço</h6>
        <hr style={{ backgroundColor: "black", height: "1.5px", border: "none", opacity: "1" }} />
        {priceOptions.map((opt) => (
          <div className="form-check" key={opt.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`price${opt.id}`}
              value={opt.value}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`price${opt.id}`}>
              {opt.label}
            </label>
          </div>
        ))}
      </div>

      {/* Botão fechar (mobile) */}
      {onClose && (
        <button className="btn btn-outline-secondary mt-3 d-md-none" onClick={onClose}>
          Fechar
        </button>
      )}
    </div>
  );
}
