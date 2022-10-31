import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";

const url = "http://localhost:5000"

const SearchRequest = (value) => {
  const data = axios.get(`${url}/change?search=${value}`);
  return data;
};

var SearchTimeout = 0;

export default function Home() {
  const router = useRouter();
  const [Search, setSearch] = useState();
const [confirmSearch, setConfirmSearch] = useState() 

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      if (SearchTimeout) clearTimeout(SearchTimeout);
      SearchTimeout = setTimeout(async () => {
        const res = await SearchRequest(value);
        setSearch(res.data);
      }, 1000);
    }
  };

  const handleSearch = (e) => {
    const { innerText } = e.target;
    console.log(setSearch);
    router.push({
      pathname: "/search",
      query: { content: innerText },
    });
  };

  const Results = () =>
    Search.map((res) => (
      <p className="py-2 px-3" onClick={handleSearch}>
        {res}
      </p>
    ));

  return (
    <div className="home">
      <div className="w-full h-full flex items-center flex-col">
        <div className="text-center my-5 title">
          <h1 className="text-4xl">WIKIPEDIA</h1>
          <p className="text-2xl">The Free Encyclopedia</p>
        </div>
        <div className="h-1/2 w-full flex items-center justify-evenly flex-col">
          <figure className="relative my-5">
            <Image
              src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"
              width={200}
              height={150}
              layout="fill"
              priority
            />
          </figure>
          <div className="search-container p-1 relative">
            <label className="relative border flex border-gray-500 rounded w-full h-full">
              <input
                type="text"
                className="pl-5 h-full"
                onChange={handleChange}
              />
              <button className="search bg-blue-600">
                <AiOutlineSearch size={15} className="text-white m-auto" />
              </button>
              {Search && (
                <div className="results absolute border border-gray-500">
                  {Results()}
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
