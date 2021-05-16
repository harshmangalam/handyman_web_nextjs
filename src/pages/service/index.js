import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import ServiceCard from "../../components/Services/ServiceCard";
import useSWR from "swr";
import ServiceCardLoading from "../../components/Services/ServiceCardLoading";
import { Skeleton } from "@material-ui/lab";

export default function SingleCategory() {
  const router = useRouter();
  const { data: services, error: serviceError } = useSWR("/service");

  return (
    <div>
      {/* Heading */}
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Services
      </Typography>
      {/* Services*/}

      <Grid container alignItems="center" spacing={3}>
        {!services
          ? [...new Array(4)].map((i) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={i}>
                <Skeleton variant="rect" width="100%" height="150px" />
              </Grid>
            ))
          : services.data.services.map((service) => (
              <Grid  item xs={12} sm={12} md={6} lg={4} xl={3}  key={service._id}>
                <ServiceCard service={service} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
