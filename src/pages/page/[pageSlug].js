import React, { Fragment } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import Head from "next/head";
function index({ page }) {
  return (
    <Fragment>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <div>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {page.title}
        </Typography>
        <Paper style={{ wordWrap: "break-word",padding:"24px",marginTop:"20px" }} elevation={0}>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Paper>
      </div>
    </Fragment>
  );
}

export default index;

export const getServerSideProps = async (ctx) => {
  try {
    const pageSlug = ctx.query.pageSlug;
    const res = await axios.get(`/page/${pageSlug}`);

    return {
      props: {
        page: res.data.data.page,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
