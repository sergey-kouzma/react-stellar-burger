import { ingredientPropType } from "../../../utils/prop-types.js";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = (props) => {
  return (
    <div className={styles.ingredient}>
      <img
        className="mb-15"
        src={props.data.image_large}
        alt={props.data.name}
      />

      <p className="text text_type_main-medium  mb-15">{props.data.name}</p>
      <div className={styles.composition}>
        <div className={styles.compositionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.data.calories}
          </p>
        </div>
        <div className={styles.compositionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.data.proteins}
          </p>
        </div>
        <div className={styles.compositionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.data.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
};

export default IngredientDetails;