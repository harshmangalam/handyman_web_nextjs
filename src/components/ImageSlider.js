import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Typography } from "@material-ui/core";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "70vh",
  },

  paper: {
    height: "70vh",
    position: "relative",
    width: "100%",
    color: "white",
    padding: "16px",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.1,
  },

  text: {
    zIndex: 1,
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100%",

      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

function ImageSlider() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        interval={4000}
        enableMouseEvents
      >
        {[...new Array(4)].map((slider, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Paper
                className={classes.paper}
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://irvingphotographydenver.com/wp-content/uploads/2015/01/Building-Photography-Website-Cover.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className={classes.overlay} />
                <div className={classes.text}>
                  <Typography variant="h3">
                    Grid lists display a collection {index}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "16px", maxWidth: "70%" }}
                  >
                    Grid lists display a collection of images in an organized
                    grid. Grid lists display a collection of images in an
                  </Typography>
                </div>
              </Paper>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default ImageSlider;
