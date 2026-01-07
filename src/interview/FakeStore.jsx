import React, { useEffect, useState } from 'react'

export default function FakeStore() {
const [fakedata,setFakedata] = useState([]);
const [current,setCurrent] = useState(1);
const [inputchange , setInputChange] = useState("");
const [ascending,setAscending] = useState("All");

const url = "https://fakestoreapi.com/products";

// console.log(data);
const searchinputchange = fakedata.filter((item) => item.category.toLowerCase().includes(inputchange));
const sortedascdesc = [...searchinputchange].sort((a,b) => {
    if(ascending === "asn"){   
        return a.price - b.price
    }
    else if(ascending === "desc"){
        return b.price - a.price
    }
    return 0;
}) 

const sortOptions = [
  { label: "All", value: "all" },
  { label: "Price: Low → High", value: "asc" },
  { label: "Price: High → Low", value: "desc" },
];

// console.log(ascdesc);

const limits = 5;
const totallength = sortedascdesc.length / limits;
const start = (current - 1) * limits;
const end = current * limits;
const datapage = sortedascdesc.slice(start, end);

const fetchdata = async() => {
    const data = await fetch(url);
    const res = await data.json();
    console.log("res",res)
    setFakedata(res);
}


useEffect(() => {
    try{
        fetchdata();
    }catch(err){
        throw Error(err);
    }
  },[])  

  useEffect(() => {
    setCurrent(1)
  },[inputchange,ascending])



  return (
    <>
      <div>
        <h1>FakeStore</h1>
        <input type="text" onChange={(e) => setInputChange(e.target.value)} />

        <select
          onChange={(e) => setAscending(e.target.value)}
          style={{ width: "30rem" }}
        >
          {sortOptions.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}

          {/* <option value="All">All</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option> */}
        </select>

        {datapage.map((fkdata) => (
          <div
            key={fkdata.id}
            style={{ display: "flex", margin: "2rem", gap: "2rem" }}
          >
            <p> {fkdata.id}</p>
            <p>title: {fkdata.title}</p>
            <p>price: ₹{fkdata.price}</p>
            <p>category: ₹{fkdata.category}</p>
          </div>
        ))}
      </div>
      <div>
        <p>pagination</p>
        <div>
          <button
            disabled={current === 1}
            onClick={(p) => setCurrent(Math.min(p - 1, 1))}
          >
            prev
          </button>
          {Array.from({ length: totallength }, (_, i) => i + 1).map((page) => (
            <>
              <button onClick={() => setCurrent(page)}>{page}</button>
            </>
          ))}
          <button
            disabled={current === totallength}
            onClick={(p) => setCurrent(Math.max(p + 1, totallength))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
