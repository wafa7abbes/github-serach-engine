import React from "react";
import moment from "moment";
import { useState } from "react";
import { EditText } from "react-edit-text";
import StarIcon from "@mui/icons-material/Star";
import { color } from "../common/palette";

function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState(false);
  const startingDate = moment().subtract(1, "months").format("YYYY-MM-DD");
  const formattedStartingDate = moment()
    .subtract(1, "months")
    .format("dd DD MMMM, YYYY");

  const getData = () => {
    return fetch(
      `https://api.github.com/search/repositories?q=${selectedLanguage}+language:${selectedLanguage}+created:>${startingDate}&sort=stars&order=desc&per_page=3`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data_________________", data);
        setItems([...items, ...data.items]);
        setDisplay(true);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 24,
        padding: 24,
      }}
    >
      <h1 style={{ color: color.paleViolet }}>Welcome to our search engine</h1>
      <p style={{ color: color.dimGrey, marginTop: 8 }}>
        Here you can search for the most starred github repository in the last
        month.
      </p>

      <div style={{ marginTop: 24 }}>
        <div>
          <EditText
            placeholder="Type your the programming language..."
            value={selectedLanguage}
            onSave={() => {
              getData();
            }}
            onChange={(value) => {
              setSelectedLanguage(value);
              setItems([]);
              setDisplay(false);
            }}
            style={{
              border: "2px solid #98817b",
              width: 800,
              borderRadius: 25,
              padding: 12,
            }}
            color={"primary"}
          />
        </div>
        <div
          style={{
            width: 800,
            marginBottom: 40,
          }}
        >
          {display && (
            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <h3>Most Stars: {selectedLanguage}</h3>
              <p style={{ color: color.dimGrey }}>
                Repos created since {formattedStartingDate}
              </p>
            </div>
          )}
          {display && !items.length && <p>No result found!</p>}
          {items.map((item, index, id) => {
            return (
              <div
                key={id}
                style={{
                  width: 800,
                  backgroundColor: index % 2 ? "#F9EBEA" : "#EAECEE",
                }}
              >
                <div
                  style={{
                    padding: 16,
                  }}
                >
                  <a href={item.html_url}>{item.full_name}</a>
                  <div
                    style={{
                      paddingLeft: 8,
                      paddingTop: 8,
                    }}
                  >
                    <p>{item.description}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 8,
                    }}
                  >
                    <p style={{ color: color.dimGrey }}>
                      Created:{" "}
                      {moment(item.created_at).format("dd DD MMMM, YYYY")}
                    </p>
                    <div
                      style={{
                        marginLeft: 24,
                        display: "flex",
                      }}
                    >
                      <StarIcon aria-label="Star" color={"primary"}></StarIcon>
                      <p style={{ color: color.dimGrey }}>
                        {item.stargazers_count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
