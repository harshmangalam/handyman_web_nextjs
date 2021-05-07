import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import useSWR from "swr";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import UploadImage from "../../components/UploadImage";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useUIDispatch } from "../../context/ui";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Service Name must be required"),
  description: Yup.string().required("Service Description must be required"),
  category: Yup.string().required("Select service category"),
});
const initialValues = {
  name: "",
  description: "",
  category: "",
  image: "",
};
export default function CreateService() {
  const { data: categoryData } = useSWR("/category/fetch_category_name");
  const uiDispatch = useUIDispatch();
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [image, setImage] = useState(null);

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    setErrors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        setSubmitting(true);
        const res = await axios.post("/service", values);
        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: res.data.type,
        });

        router.push("/");
      } catch (error) {
        if (error.response) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: error.response.data.message,
            type: "error",
          });

          setErrors(error.response.data.data);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Fragment>
      <Typography variant="h4" className={classes.title}>
        Create New Service
      </Typography>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} lg={6}>
          <Paper style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Service Name"
                fullWidth
                variant="outlined"
                name="name"
                error={Boolean(errors?.name)}
                onChange={handleChange}
              />
              <Typography color="error">
                {errors?.name?.msg || errors?.name}
              </Typography>
              <TextField
                style={{ marginTop: "20px" }}
                multiline
                rows={10}
                fullWidth
                label="Service Description..."
                variant="outlined"
                name="description"
                error={Boolean(errors?.description)}
                onChange={handleChange}
              />
              <Typography color="error">
                {errors?.description?.msg || errors?.description}
              </Typography>
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                {!categoryData ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Category"
                    name="category"
                    value={values.category}
                    error={Boolean(errors?.category)}
                    onChange={handleChange}
                  >
                    {categoryData.data.categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <Typography color="error">
                  {errors?.category?.msg || errors?.category}
                </Typography>
              </FormControl>

              <UploadImage image={image} setImage={setImage} />
              <Button
                fullWidth
                style={{ marginTop: "20px" }}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress /> : "Create"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: theme.spacing(4, 0),
  },
}));
