import React, { useEffect, useState } from "react";
import Category_Card from '../components/Products/Category_Card';
import Product_Card from '../components/Product_Cards/Product_Card';
import { useSearchParams } from 'react-router-dom';
import Custom_order_CTA from '../components/misc/Custom_Order_CTA/Custom_Order_CTA.jsx';
import Filter_Side_Bar from "../components/Products/Filter_Side_Bar.jsx";  


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(1);

    const [page, setPage] = useState(1);
    const [limit] = useState(6); 
    const [totalPages, setTotalPages] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [allCategories, setAllCategories] = useState([]);


    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';
    const defaultCategory = searchParams.get('category');


    const stockOptions = [
        { id: "InStock", label: "Em Stock", value: "in_Stock" },
      //{ id: "OutOfStock", label: "Fora de Stock", value: "out_of_stock" },
    ];

    const priceOptions = [
        {id: "0-3", label: "0 - 3€", value: "0-3"},
        {id: "3-6", label: "3 - 6€", value: "3-6"},
        {id: "6-", label: "Mais de 6€", value: "15-"}
    ]

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

        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");
        const endpoint = `http://localhost:5000/products/${page}${search ? `?search=${encodeURIComponent(search)}` : ''}`;
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
    }, [filters, page, searchTerm]);

    const handleCheckboxChange = (e) => {
        const { id, checked, value } = e.target;

        if (id.startsWith("stock")) {
          setFilters((prev) => ({
            ...prev,
            filter: { ...prev.filter, stock: checked ? 1 : undefined }
          }));
        }

        if (id.startsWith("price")) {
          let [min, max] = value.split("-").map(Number);
          if (checked) {
            setFilters((prev) => ({
              ...prev,
              filter: {
                ...prev.filter,
                priceMin: min,
                priceMax: isNaN(max) ? undefined : max
              }
            }));
          } else {
            setFilters((prev) => ({
              ...prev,
              filter: { ...prev.filter, priceMin: undefined, priceMax: undefined }
            }));
          }
        }

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
          const firstFive = data.slice(0, 5);
          setAllCategories(firstFive);

          // Apply default filter only once
          if (defaultCategory) {
            setFilters((prev) => ({
              ...prev,
              filter: {
                ...prev.filter,
                categories: [defaultCategory],
              },
            }));
          }
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
      {/* Botão mobile fixo acima dos produtos */}
      <div className="d-md-none text-end mb-2">
        <button
          className="primary-button w-100"
          onClick={() => setShowMobileFilters(true)}
        >
          Filtros
        </button>
      </div>

      {/* Layout principal */}
      <div className="d-flex" style={{ minWidth: 0 }}>
        {/* Sidebar desktop */}
        <div className="d-none d-md-flex flex-shrink-0">
          <Filter_Side_Bar
            allCategories={allCategories}
            stockOptions={stockOptions}
            priceOptions={priceOptions}
            handleCheckboxChange={handleCheckboxChange}
            filters={filters}
          />
        </div>

        {/* Sidebar mobile */}
        {showMobileFilters && (
          <div
            className="position-fixed top-0 start-0 bg-white shadow"
            style={{ width: "245px", zIndex: 1050, height: "100vh" }}
          >
            <Filter_Side_Bar
              allCategories={allCategories}
              stockOptions={stockOptions}
              priceOptions={priceOptions}
              handleCheckboxChange={handleCheckboxChange}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="flex-grow-1 ms-3">
          <div className="container-fluid px-0">
            <div className="row">
              {loading ? (
                <div className="spinner-border text-primary" role="status" />
              ) : (
                Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
                      <Product_Card
                        name={product.name}
                        image={product.images[0]}
                        price={product.price}
                        ratingPerc={product.ratingPerc}
                      />
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )
              )}
            </div>
            
            {/* Paginação colada ao fim dos produtos */}
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
      </div>
    </main>
  );
};

export default ProductsPage;
