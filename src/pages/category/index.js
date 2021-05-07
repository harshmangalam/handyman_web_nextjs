import { Grid, Typography } from "@material-ui/core";
import CategoryCard from "../../components/Category/CategoryCard";
import useSWR from "swr";
import CategoryCardLoading from "../../components/Category/CategoryCardLoading";

export default function SingleCategory() {
  const { data: categories, error: categoryError } = useSWR("/category");

  return (
    <div>
      {/* Heading */}
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Categories
      </Typography>
      {/* Categories*/}

      <Grid container alignItems="center" spacing={3}>
        {!categories
          ? [...new Array(4)].map((i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <CategoryCardLoading />
              </Grid>
            ))
          : categories.data.categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                <CategoryCard category={category} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
