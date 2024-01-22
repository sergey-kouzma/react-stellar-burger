import PropTypes from "prop-types";
import done from "../../../images/done.svg";

import styles from "./OrderDetails.module.css";

const OrderDetails = ({orderId}) => {
  return (
    <div className={styles.orderDetails}>
      <div>
        <p className="text text_type_digits-large">{orderId}</p>
      </div>
      <p className="text text_type_main-medium mt-8">Идентификатор заказа</p>
      <img className="mt-15" src={done} alt="Заказ оформлен" />
      <p className="text text_type_main-medium mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;