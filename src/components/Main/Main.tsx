import Container from "../Container/Container";
import "./Main.css";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="main">
      <div className="main__container">
        <Container>{children}</Container>
      </div>
    </main>
  );
}

export default Main;
