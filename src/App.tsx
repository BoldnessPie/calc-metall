import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import CalculateForm from "./components/calculateForm/CalculateForm";
import Tabs from "./components/tabs/Tabs";

function App() {
  return (
    <>
      <Header />

      <Main>
        <Tabs />
        <CalculateForm />
      </Main>

      <Footer />
    </>
  );
}

export default App;
