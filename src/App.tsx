import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CalculatorForm from "./components/CalculatorForm/CalculatorForm";
import Tabs from "./components/Tabs/Tabs";

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
