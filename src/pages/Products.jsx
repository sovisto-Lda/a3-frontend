import React, { useEffect, useState } from "react";
import Category_Card from '../components/Products/Category_Card';
import Product_Card from '../components/Product_Cards/Product_Card';
import Custom_order_CTA from '../components/misc/Custom_Order_CTA/Custom_Order_CTA.jsx';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(1);

    const [page, setPage] = useState(1);
    const [limit] = useState(6); 
    const [totalPages, setTotalPages] = useState(1);

    const [allCategories, setAllCategories] = useState([]);

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

    // useEffect para ir buscar as categorias à db
    useEffect(() => {
      fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => {
        //Cria uma lista apenas com 5 categorias
        const firstFive = data.slice(0, 5);
        setAllCategories(firstFive);
      })
      .catch(err => {
        console.error("Failed to get categories: ", err);
      });
    }, []);


  let categories = ["Aves", "Domésticos", "Mamíferos Selvagens", "Insetos e Aracnídeos", "Répteis"];

  return (
    <main>
      {/* Botão de produto personalizado */}
      <div className = "d-flex" style={{
          backgroundColor: "#ECECEC",
          padding: "16px",
          marginLeft: "-50px",
          marginRight: "-50px"
        }}>
        <Custom_order_CTA noMargin />
      </div>
      <h1 className = "mt-4 mb-3">Categorias</h1>
      <div className="container-fluid px-0" style = {{marginBottom: "80px"}}>
        <div className="row justify-content-between gap-3">
        {allCategories.map((cat, index) => (
          <div className="col-lg col-md-2 col-sm-12" key={index}>
          
            <Category_Card
              name={cat.name}
              image={cat.image}
            />
          
        </div>
        ))}
        </div>
      </div>
      <div className="mb-5">
        <h1>
          Explore todos os produtos
        </h1>
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
        <div className="ms-4 flex-grow-1">
          <div className="container-fluid px-0">
            <div className="row">
              {allCategories.map((cat, index) => (
                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                  <Product_Card
                    key={index}
                    name={cat.name}
                    image={cat.image}
                    price={5.99}
                    ratingPerc={80}
                  />
                </div>
                ))}
            </div>
          </div>
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
