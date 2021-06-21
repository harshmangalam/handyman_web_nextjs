import React from "react";
import { BsPersonCheck, BsCalendar } from "react-icons/bs";
import { RiEmotionHappyLine } from "react-icons/ri";
import {
  Avatar,
  Box,
  colors,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
function HowItWork() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h4" className={classes.heading}>
        How It Works
      </Typography>

      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={3}
        style={{ padding: "0px 16px" }}
      >
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>{section.icon}</Avatar>

              <Typography variant="h6" style={{ marginTop: "8px" }}>
                {section.title}
              </Typography>

              <Typography style={{ marginTop: "8px" }}>
                {section.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    background: `linear-gradient(45deg, ${colors.blue[300]} 30%, ${colors.blue[500]} 90%)`,
  },
  heading: {
    textAlign: "center",
    margin: "16px 0px",
    padding: theme.spacing(4),
    color: "white",
    fontWeight: "800",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.6s",
    "&:hover": {
      transform: "scale(0.9)",
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "8px solid tomato",
    backgroundColor: colors.blue[500],
    color: "white",
  },
}));

const sections = [
  {
    title: "Book",
    content:
      "Select the date and time you'd like your perofessional to show up",
    icon: <BsPersonCheck fontSize="40px" />,
  },
  {
    title: "Schedule",
    content: "Certified Taskers comes over and done your task",
    icon: <BsCalendar fontSize="40px" />,
  },
  {
    title: "Relax",
    content: "your task is completed to your satisfaction - guranteed",
    icon: <RiEmotionHappyLine fontSize="40px" />,
  },
];
export default HowItWork;
