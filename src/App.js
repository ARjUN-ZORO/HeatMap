import { useEffect } from "react";
import styled from "styled-components";
import HeatMap from "./HeatMap";
import Navbar from "./Navbar";
import Userlist from "./Userlist";

import { useStore } from "./store/store";
import { getData } from "./store/actions";

const Container = styled.div`
  font-weight: 500;
`;

function App() {
  const { state, dispatch } = useStore();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  if (!state.userData || !state || state.loading) {
    return <>LOADINg{console.log(state)}</>;
  }
  return (
    <Container>
      <Navbar />
      <HeatMap />
      <Userlist />
    </Container>
  );
}

export default App;
