import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import ServiceCard from "../../components/Services/ServiceCard";
import useSWR from "swr";
import ServiceCardLoading from "../../components/Services/ServiceCardLoading";

export default function SingleCategory() {
  const router = useRouter();
  const { data: services, error: serviceError } = useSWR("/service");

  return (
    <div>
      {/* Heading */}
      <Typography variant="h4" style={{marginBottom:"20px"}}>Services</Typography>
      {/* Services*/}

      <Grid container alignItems="center" spacing={3}>
        {!services
          ? [...new Array(4)].map((i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <ServiceCardLoading />
              </Grid>
            ))
          : services.data.services.map((service) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                <ServiceCard service={service} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
