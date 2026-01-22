import BanksImg from "../../assets/images/money.webp";
import GovernmentImg from "../../assets/images/governancy.jpeg";
import RestaurantsImg from "../../assets/images/food.jpeg";
import MarketsImg from "../../assets/images/markets.jpeg";
import BuldingImg from "../../assets/images/Bulding.jpeg";
import Box from "../Reuseable_component/Box";

let data = [
  {
    title: "Banks",
    description: "Find the nearest banks and ATMs quickly and efficiently.",
    image: BanksImg,
  },
  {
    title: "Government Offices",
    description: "Access information about local government services easily.",
    image: GovernmentImg,
  },
  {
    title: "Restaurants",
    description: "Discover the best restaurants and enjoy your favorite meals.",
    image: RestaurantsImg,
  },
  {
    title: "Markets",
    description: "Explore local markets and shop for fresh products and goods.",
    image: MarketsImg,
  },
  {
    title: "Real Estate Registration",
    description:
      "Get details about property registration and related services.",
    image: BuldingImg,
  },
];

export default function Branding() {
  return (
    <section className="container mt-3 " id="go_to_servieces">
      <div className="Header-section">
        <h2 className="main-text-color text-center mb-4">
          What are you heading Serviece
        </h2>

        <hr
          color="white"
          style={{ width: "30%", height: "7px" }}
          className="mt-2"
        />

        <hr color="white" style={{ width: "20%", height: "7px" }} />
      </div>
      <div className="row mt-5">
        {data.map((item, i) => {
          return (
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={i}>
              <Box
                title={item.title}
                description={item.description}
                image={item.image}
              />
              ;
            </div>
          );
        })}
      </div>
      <hr />
    </section>
  );
}
