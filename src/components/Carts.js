import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import { clearCart, deleteCart } from "./redux/cartSlice";

export default function Carts() {
  const carts = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const handle_deleteCart = (id) => {
    dispatch(deleteCart(id));
  };
  const handle_clearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <Container className="text-center">
        <h1>Carts: {carts.length}</h1>
        <button className="btn btn-danger" onClick={() => handle_clearCart()}>
          Clear Cart
        </button>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart, index) => (
              <tr key={index}>
                <th scope="row">{cart.id}</th>
                <td>{cart.name}</td>
                <td>{cart.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handle_deleteCart(cart.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
