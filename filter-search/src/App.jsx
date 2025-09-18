import { useState } from "react";
import { products } from "./products";
import {
  hasOutOfStock,
  allAffordable,
  findByTag,
  totalPrice,
  sortByName,
  sortByPrice, 
  extractHashtags,
  isValidSwedishZip,
  maskEmails,
  deepCountTags,
  factorial,
  findByIdRecursive,
  setInStock,
  curry,
  priceAtMost,
} from "./exercises";

function App() {
  const [filter, setFilter] = useState("");
  const [onlyStock, setOnlyStock] = useState(false);
  const [sortDir, setSortDir] = useState("asc");

  const runTests = () => {
    console.clear();
    console.log("== HOFs ==");
    console.log("hasOutOfStock:", hasOutOfStock(products));
    console.log("allAffordable(500):", allAffordable(products, 500));
    console.log("findByTag('book'):", findByTag(products, "book"));
    console.log("totalPrice:", totalPrice(products));
    console.log(
      "sortByName desc:",
      sortByName(products, "desc").map((p) => p.name)
    );

    console.log("\n== Regex ==");
    console.log(
      "extractHashtags:",
      extractHashtags("Idag #frontend #Chas! #100DaysOfCode")
    );
    console.log(
      "isValidSwedishZip:",
      ["12345", "123 45", "12 345"].map(isValidSwedishZip)
    );
    console.log(
      "maskEmails:",
      maskEmails("Kontakta: user@example.com, test@chas.se")
    );

    console.log("\n== Rekursion ==");
    console.log("deepCountTags:", deepCountTags(products));
    console.log("factorial(5):", factorial(5));
    console.log("findByIdRecursive(3):", findByIdRecursive(products, 3));

    console.log("\n== FP ==");
    console.log(
      "setInStock id=2 true:",
      setInStock(products, 2, true).find((p) => p.id === 2)
    );
    const cheap = products.filter(priceAtMost(200));
    console.log(
      "priceAtMost(200):",
      cheap.map((p) => p.name)
    );
    const add = (a, b) => a + b;
    const cAdd = curry(add);
    console.log("curry(add)(2)(3):", cAdd(2)(3));
  };

  
  let regex = null;
  if (filter.trim() !== "") {
    try {
      regex = new RegExp(filter, "i");
    } catch {
      regex = null;
    }
  }

  let filtered = products
    .filter((p) => (onlyStock ? p.inStock : true))
    .filter(
      (p) => !regex || regex.test(p.name) || p.tags.some((t) => regex.test(t))
    );

  
  if (sortDir === "asc" || sortDir === "desc") {
    filtered = sortByName(filtered, sortDir);
  } else if (sortDir === "price-asc") {
    filtered = sortByPrice(filtered, "asc");
  } else if (sortDir === "price-desc") {
    filtered = sortByPrice(filtered, "desc");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AF01 – Avancerad JS</h1>
      <p className="muted">HOFs • Regex • Rekursion • FP</p>

      <section>
        <h2>Övningar</h2>
        <button onClick={runTests}>Kör tester (se konsolen)</button>
      </section>

      <section>
        <h2>Mini-app: Produktlista med filter & sök</h2>
        <input
          type="search"
          placeholder="Sök (regex stöds)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Namn ↑</option>
          <option value="desc">Namn ↓</option>
          <option value="price-asc">Pris ↑</option>
          <option value="price-desc">Pris ↓</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={(e) => setOnlyStock(e.target.checked)}
          />
          Endast i lager
        </label>

        <div style={{ display: "grid", gap: ".5rem", marginTop: "1rem" }}>
          {filtered.map((p) => (
            <article
              key={p.id}
              style={{
                border: "1px solid #ddd",
                padding: ".5rem",
                borderRadius: "6px",
              }}
            >
              <h3>{p.name}</h3>
              <p>
                <strong>{p.price} kr</strong>{" "}
                <span>{p.inStock ? "I lager" : "Slut"}</span>
              </p>
              <p style={{ opacity: 0.7 }}>
                {p.tags.map((t) => `#${t}`).join(" ")}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
