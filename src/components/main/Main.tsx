import Container from "../container/Container";
import "./Main.css";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="main">
      <Container>{children}</Container>
    </main>
  );
}

export default Main;
