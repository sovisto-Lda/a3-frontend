import React, { useEffect, useState } from "react";
import Category_Card from '../components/Products/Category_Card';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(1);

    const [page, setPage] = useState(1);
    const [limit] = useState(6); 
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        filter: {
          categories: [],
          stock: undefined,
          color: undefined,
          priceMin: undefined,
          priceMax: undefined,
        },
        sort: {

        }

    });

    const fetchProducts = async (filtersToUse = null) => {
        setLoading(true);

        const endpoint = filtersToUse ? `http://localhost:5000/products/filtered/${page}` : "http://localhost:5000/products";
        const options = filtersToUse
            ? {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(filtersToUse),
            }
            : {};

        await fetch(endpoint, options)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
            }
            return response.json();
            
        })
        .then(data => {
            console.log(data);
            setProducts(data.data)
            setTotalPages(data.totalPages)
            setPage(data.page)
        })        
        .finally (() => {
            setLoading(false)
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };


    useEffect(() => {
        if (filters) {
          console.log(filters)
          fetchProducts(filters);
        }
    }, [filters, page]);

    const handleCheckboxChange = (e) => {
        const { id, checked, value } = e.target;

        if (id.startsWith("category")) {
            setFilters((prev) => {
                const newCategories = checked
                    ? [...prev.filter.categories, value]
                    : prev.filter.categories.filter((c) => c !== value);
                return { ...prev, filter: {...prev.filter, categories: newCategories }};
            });
        }

        setPage(1)
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setPage(newPage);
        }
      };


  let categories = ["Aves", "Domésticos", "Mamíferos Selvagens", "Insetos e Aracnídeos", "Répteis"];

  return (
    <main>
      <h1>Categorias</h1>
      <div className="container-fluid">
        <div className="row">
          <Category_Card />
          <Category_Card />
          <Category_Card />
          <Category_Card />
          <Category_Card />
        </div>
      </div>
      <div className="d-flex">
        <aside className="bg-light p-3">
          <h5 className="mb-3">Filters</h5>

          {/* Categories Filter */}
          <div className="mb-4">
            <h6>Categories</h6>
            
            {categories.map((item, index) => (

                <div className="form-check" key={`div${item}`}>
                    <input
                        key={`input${item}`}
                        className="form-check-input"
                        type="checkbox"
                        value={item}
                        id={`category${item}`}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={`category${item}`} key={`label${item}`}>
                        {item}
                    </label>
                </div>    
            ))}             
          </div>

          
        </aside>

        {/* Main Content */}
        <div className="p-3 col-5">
          <h1>Products in the database:</h1>
          {loading ? (
            <div className="spinner-border text-primary" role="status" />
          ) : (
            Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} className="border p-2 mb-2">
                      <p>{product.name}</p>
                      <p>{product.category}</p>
                    </div>
                  ))
            ) : (
                <p>No products found.</p>
            )
            
          )}

        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
            <button
                className="btn btn-outline-primary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || loading}
            >
            &laquo; Prev
            </button>
            <span className="px-3">Page {page} of {totalPages}</span>
            <button
                className="btn btn-outline-primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || loading}
            >
            Next &raquo;
            </button>
        </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
