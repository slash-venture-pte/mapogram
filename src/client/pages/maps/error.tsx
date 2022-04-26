

import { withRouter, NextRouter, Router } from 'next/router'

import Layout from "../../components/Layout";
import GenerationFailed from "../../components/maps/GenerationFailed"

interface WithRouterProps {
  router: NextRouter
}

interface MapStatusPageProps extends WithRouterProps {

}

const MapGenerationErrorPage = (props: MapStatusPageProps) => {
  return (
    <Layout title="Map Generating Error">
      <h1>Map Generating Error </h1>
      <p>
        Please wait while map is generating
      </p>
      <GenerationFailed />
      
    </Layout>
  );
};


export async function getServerSideProps() {
  return { props: {  } }
}

export default withRouter(MapGenerationErrorPage);
