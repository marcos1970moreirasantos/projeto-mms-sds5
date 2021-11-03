
import DataTable from "componentes/DataTable";
import Footer from "componentes/footer";
import NavBar from "componentes/NavBar";

function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary">Olá Mundo!</h1>
        <DataTable />
      </div>
      <Footer />

    </>
  );
}

export default App;
