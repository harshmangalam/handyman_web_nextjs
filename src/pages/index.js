import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";
import CategoryCard from "../components/Category/CategoryCard";
import CategoryCardLoading from "../components/Category/CategoryCardLoading";
import useSWR from "swr";
import ImageSlider from "../components/ImageSlider";
export default function Home() {
  const { data: categoryData, error: categoryErr } = useSWR("/category");

  if (categoryErr) {
    return <div>Error.</div>;
  }

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
        <section style={{marginTop:"36px"}}>
          <Typography variant="h4">Categories</Typography>
          <Grid container alignItems="center" spacing={3} style={{marginTop:"16px"}}>
            {!categoryData
              ? [...new Array(4)].map((i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <CategoryCardLoading />
                  </Grid>
                ))
              : categoryData.data.categories.map((category) => (
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
