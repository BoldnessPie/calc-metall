import { useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import CalculatorForm from "./components/CalculatorForm/CalculatorForm";
import Tabs from "./components/tabs/Tabs";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Header />

      <Main>
        {!selectedCategory ? (
          <Tabs onSelect={setSelectedCategory} />
        ) : (
          <CalculatorForm
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        )}
      </Main>

      <Footer />
    </>
  );
}

export default App;
