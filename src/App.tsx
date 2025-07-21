import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Header />

      <Main>
        <Navbar />
        <Form />
      </Main>

      <Footer />
    </>
  );
}

export default App;
