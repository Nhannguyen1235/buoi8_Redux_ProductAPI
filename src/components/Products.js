import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  handle_addProductAPI,
  handle_deleteProductAPI,
  handle_recheckedProductAPI,
} from "./redux/productSlide";
import { addCart } from "./redux/cartSlice";
import { Container, Pagination, Table } from "reactstrap";

export default function Products() {
  const [newProduct, setNewProduct] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const handle_addCart = (product) => {
    dispatch(addCart(product));
  };
  const handle_deleteProduct = (id) => {
    dispatch(handle_deleteProductAPI(id));
  };
  const handle_addProduct = (product) => {
    dispatch(handle_addProductAPI(product));
  };
  const handle_recheckedProduct = (products) => {
    dispatch(handle_recheckedProductAPI(products));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>Không có sản phẩm nào được tìm thấy.</p>;
  }

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(offset, offset + itemsPerPage);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div>
      <Container className="text-center">
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handle_addProduct({ name: newProduct });
              setNewProduct("");
            }
          }}
        />
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Checked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={index}>
                <th scope="row">{product.id}</th>
                <td
                  className={
                    product.checked ? "product-name active" : "product-name"
                  }
                  onClick={() => handle_recheckedProduct(product)}
                >
                  {product.name}
                </td>
                <td>{product.price}</td>
                <td>{product.checked ? "true" : "false"}</td>
                <td>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => handle_addCart(product)}
                  >
                    add to cart
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handle_deleteProduct(product.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </Container>
    </div>
  );
}