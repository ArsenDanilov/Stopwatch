import styles from "./app.module.css";
import { Stopwatch } from "./Stopwatch";

export const App = () => {

  return (
    <>
      <div className={styles.container}>
        Stopwatch
        <div className={styles.dial}>
          <Stopwatch />
        </div>
      </div>
    </>
  );
};
