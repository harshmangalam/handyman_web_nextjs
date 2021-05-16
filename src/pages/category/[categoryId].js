import { Box, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import ServiceCard from "../../components/Services/ServiceCard";
import axios from "axios";
import CategoryDetail from "../../components/Category/CategoryDetail";
import useSWR from "swr";
import { Fragment } from "react";

export default function SingleCategory({ services, category }) {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: serviceData, error: serviceError } = useSWR(
    categoryId ? `/service?categoryId=${categoryId}` : null,
    { initialData: services }
  );
  const { data: categoryData, error: categoryError } = useSWR(
    categoryId ? `/category/${categoryId}` : null,
    {
      initialData: category,
    }
  );

  if (serviceError) return <div>Service Error</div>;
  if (categoryError) return <div>Category Error</div>;

  return (
    <Fragment>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Box marginBottom="30px">
            <CategoryDetail category={categoryData.data.category} />
          </Box>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Grid item container spacing={2} xs={12} md={8}>
          {serviceData.data.services.map((service) => (
            <Grid item xs={12} md={4} key={service._id}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  try {
    const categoryId = context.query.categoryId;

    const res = await Promise.all([
      await axios.get(`/service?category=${categoryId}`),
      await axios.get(`/category/${categoryId}`),
    ]);

    return {
      props: {
        services: res[0].data,
        category: res[1].data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
