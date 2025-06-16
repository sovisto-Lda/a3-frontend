import React from 'react';

export default function Filter_Side_Bar({ allCategories, stockOptions, priceOptions, handleCheckboxChange, onClose, filters=undefined }) {
  return (
    <div className="p-3" style={{ width: "245px", minHeight: "100vh" }}>

      {/* Categoria */}
      <div className="mb-4 w-100">
        <h6 className>Categoria</h6>
        <hr style={{ backgroundColor: "black", height: "1.5px", border: "none", opacity: "1" }} />
        {allCategories.map((cat) => (
          <div className="form-check ms-1" key={cat.name}>
            <input
              className="form-check-input custom-checkbox"
              style={{
                  width: '17px',
                  height: '17px',
                  border: '1.5px solid black',
                  borderRadius: '3px',
              }}
              type="checkbox"
              value={cat.name}
              id={`category${cat.name}`}
              onChange={handleCheckboxChange}
              checked={filters.filter.categories.includes(cat.name)}
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
          <div className="form-check ms-1" key={opt.id}>
            <input
              className="form-check-input custom-checkbox"
                style={{
                    width: '17px',
                    height: '17px',
                    border: '1.5px solid black',
                    borderRadius: '3px',
                }}
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
          <div className="form-check ms-1" key={opt.id}>
            <input
              className="form-check-input custom-checkbox"
              style={{
                  width: '17px',
                  height: '17px',
                  border: '1.5px solid black',
                  borderRadius: '3px',
              }}
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
        <button className="primary-button mt-5 w-100" style={{ fontSize: "0.85rem", padding: "4px 8px" }} onClick={onClose}>
          Fechar
        </button>
      )}
    </div>
  );
}
