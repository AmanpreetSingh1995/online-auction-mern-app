import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from  "./Navigation.module.css" ;

export default function 
() {
  return (
    <>
    <nav className={styles["admin-nav"]}>
      <ul>
        <li className={styles["nav-item"]}>
          <Link to="/">
          <div className={styles["logo"]}>
                <img src={logo} alt="" />
              </div>
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link to="//addProduct"><span>Add Product</span></Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link to="/admin/products"><span>My Products</span></Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link to="/admin/products"><span>My Biddings</span></Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link to="/sign-up" ><span>Signup</span></Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link to="/login"><span>Login</span></Link>
        </li>
      </ul>
    </nav>
    </>
  )
}
