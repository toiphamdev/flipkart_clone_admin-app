import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";
function Home() {
  return (
    <Layout sidebar>
      <div className="homeContainer">
        <div className="homeProductWrapper">
          <Card></Card>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
