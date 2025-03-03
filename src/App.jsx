import styles from "./app.module.css";
import { Dial } from "./Dial";

export const App = () => {

  return (
    <>
      <div className={styles.container}>
        Stopwatch
        <div className={styles.dial}>
          <Dial />
        </div>
      </div>
    </>
  );
};
