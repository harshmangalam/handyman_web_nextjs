import { Box, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import ServiceCard from "../../../components/Services/ServiceCard";
import ServiceDetail from "../../../components/Services/ServiceDetail";

import useSWR from "swr";
import axios from "axios";

export default function SingleService({ service, services }) {
  const router = useRouter();

  const serviceId = router.query.serviceId;
  const {
    data: serviceData,
    error: serviceError,
  } = useSWR(`/service/${serviceId}`, { initialData: service });
  const {
    data: reletedServices,
    error: reletedServicesErr,
  } = useSWR(`/service`, { initialData: services });

  if (serviceError) return <div>Service Error</div>;
  if (reletedServicesErr) return <div>Suggestion service error</div>;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <ServiceDetail service={serviceData.data.service} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid item xs={12}>
          <Box marginBottom="16px">
          <Typography variant="h5">Releted Services</Typography>
          </Box>
        </Grid>
        {reletedServices.data.services.map((service) => (
          <Grid item xs={12} key={service._id}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  try {
    const serviceId = context.query.serviceId;

    const res = await Promise.all([
      await axios.get(`/service/${serviceId}`),
      await axios.get(`/service`),
    ]);

    return {
      props: {
        service: res[0].data,
        services: res[1].data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
