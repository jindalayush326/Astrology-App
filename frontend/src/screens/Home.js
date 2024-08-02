import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
export default function Home() {
  const [detailsCat, setdetailsCat] = useState([]);
  const [detailsItems, setdetailsItems] = useState([]);
  const [search, setSearch] = useState("");
  const loaddetailsItems = async () => {
    let response = await fetch("http://localhost:5000/api/detailsData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setdetailsItems(response[0]);
    setdetailsCat(response[1]);
  };

  useEffect(() => {
    loaddetailsItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                {" "}
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://www.shutterstock.com/image-illustration/numerology-black-hole-secret-knowledge-260nw-2316226085.jpg"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.shutterstock.com/image-vector/vastu-vedic-hindu-astrology-3-260nw-1795246354.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.shutterstock.com/image-vector/palmistry-hieromancy-set-witchcraft-fortune-260nw-2115688811.jpg"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {" "}
        {detailsCat !== []                                     
          ? detailsCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr
                    id="hr-success"
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {detailsItems !== [] ? (                
                    detailsItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase() 
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            {console.log(filterItems.url)}
                            <Card
                              detailsName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data Found </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
}
