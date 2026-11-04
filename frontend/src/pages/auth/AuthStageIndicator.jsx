const AuthStageIndicator = ({ steps, activeStep, label, styles }) => (
  <ol className={styles.stageList} aria-label={label}>
    {steps.map((step, index) => {
      const stepNumber = index + 1;
      const isComplete = stepNumber < activeStep;
      const isActive = stepNumber === activeStep;

      return (
        <li
          key={step}
          className={`${styles.stageItem} ${
            isActive ? styles.stageItemActive : ""
          } ${isComplete ? styles.stageItemComplete : ""}`}
          aria-current={isActive ? "step" : undefined}
        >
          <span
            className={`${styles.stageMarker} ${
              isActive ? styles.stageMarkerActive : ""
            } ${isComplete ? styles.stageMarkerComplete : ""}`}
          >
            {isComplete ? "✓" : stepNumber}
          </span>
          <span className={styles.stageLabel}>{step}</span>
          {stepNumber < steps.length && (
            <span
              className={`${styles.stageConnector} ${
                isComplete ? styles.stageConnectorComplete : ""
              }`}
              aria-hidden="true"
            />
          )}
        </li>
      );
    })}
  </ol>
);

export default AuthStageIndicator;
