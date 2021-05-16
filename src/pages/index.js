import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";
import CategoryCard from "../components/Category/CategoryCard";
import ImageSlider from "../components/ImageSlider";
import axios from "axios";

export default function Home({ categories }) {
  return (
    <div>
      <Head>
        <title>Home | HandymanServiceu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {/* category list  */}
        <section>
          <ImageSlider />
        </section>
        <section style={{ marginTop: "36px" }}>
          <Typography variant="h4">Categories</Typography>
          <Grid
            container
            alignItems="center"
            spacing={3}
            style={{ marginTop: "16px" }}
          >
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                <CategoryCard category={category} />
              </Grid>
            ))}
          </Grid>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("/category?limit=4");

    return {
      props: {
        categories: res.data.data.categories,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
